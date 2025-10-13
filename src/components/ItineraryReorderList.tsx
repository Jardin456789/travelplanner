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

  const cardClassName = cn(
    'group relative flex flex-col gap-3 overflow-hidden rounded-xl border bg-white/95 p-4 shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
    isDragging
      ? 'border-sky-200 ring-2 ring-sky-300 shadow-lg'
      : 'border-slate-200/80 hover:border-sky-200/70 hover:shadow-md',
    disablePointer && 'cursor-not-allowed opacity-40',
  );

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cardClassName}
      role="listitem"
      aria-roledescription="élément réorganisable"
      {...(!disablePointer ? { ...attributes, ...listeners } : {})}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 opacity-90"
      />

      <div className="relative flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span className="flex items-center gap-2 text-slate-600">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-600">
              {index + 1}
            </span>
            Étape
          </span>
          {step.date && (
            <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[11px] text-slate-600">
              {step.date}
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-slate-900">{step.title}</p>
        {step.notes && <p className="text-xs leading-relaxed text-slate-500">{step.notes}</p>}
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
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
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
    [ids, onChange],
  );

  return (
    <section className={cn('space-y-4', className)} aria-label={title ?? 'Réorganiser les étapes'}>
      <header className="space-y-1">
        {title && <h2 className="text-sm font-semibold text-gray-900">{title}</h2>}
        <p className="text-xs text-gray-500">
          Astuce&nbsp;: attrapez n’importe quelle carte avec la souris, le tactile ou le clavier
          (barre d’espace puis flèches) pour déplacer les étapes.
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
