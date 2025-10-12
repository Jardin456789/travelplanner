'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReorderableStep {
  id: string;
  title: string;
  date?: string;
  notes?: string;
}

interface ItineraryReorderListProps<T extends ReorderableStep> {
  steps: T[];
  onChange: (nextSteps: T[]) => void;
  title?: string;
  className?: string;
}

function SortableStepItem<T extends ReorderableStep>({
  step,
  index,
  disablePointer = false,
}: {
  step: T;
  index: number;
  disablePointer?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: step.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragHandleClass = cn(
    'flex h-8 w-8 items-center justify-center rounded-md border text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
    isDragging
      ? 'border-blue-300 bg-blue-50 text-blue-700 shadow'
      : 'border-gray-200 bg-white hover:bg-gray-50',
    disablePointer && 'cursor-not-allowed opacity-40'
  );

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-colors',
        isDragging && 'ring-2 ring-blue-300'
      )}
      role="listitem"
      aria-roledescription="élément réorganisable"
    >
      <button
        type="button"
        className={dragHandleClass}
        aria-label={`Déplacer ${step.title}`}
        {...(!disablePointer ? { ...attributes, ...listeners } : {})}
      >
        <GripVertical className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium text-gray-700">Étape {index + 1}</span>
          {step.date && <span>{step.date}</span>}
        </div>
        <p className="text-sm font-semibold text-gray-900">{step.title}</p>
        {step.notes && <p className="text-xs text-gray-500">{step.notes}</p>}
      </div>
    </li>
  );
}

export function ItineraryReorderList<T extends ReorderableStep>({
  steps,
  onChange,
  title,
  className,
}: ItineraryReorderListProps<T>) {
  const [items, setItems] = useState<T[]>(steps);

  useEffect(() => {
    setItems(steps);
  }, [steps]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) {
        return;
      }

      const oldIndex = ids.indexOf(active.id as string);
      const newIndex = ids.indexOf(over.id as string);

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return;
      }

      setItems((previous) => {
        const reordered = arrayMove(previous, oldIndex, newIndex);
        onChange(reordered);
        return reordered;
      });
    },
    [ids, onChange]
  );

  return (
    <section
      className={cn('space-y-4', className)}
      aria-label={title ?? 'Réorganiser les étapes'}
    >
      <header className="space-y-1">
        {title && <h2 className="text-sm font-semibold text-gray-900">{title}</h2>}
        <p className="text-xs text-gray-500">
          Astuce&nbsp;: utilisez la souris, le tactile ou le clavier (barre d’espace puis flèches) pour déplacer les étapes.
        </p>
      </header>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <ol className="space-y-3" role="list">
            {items.map((step, index) => (
              <SortableStepItem key={step.id} step={step} index={index} />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
    </section>
  );
}
