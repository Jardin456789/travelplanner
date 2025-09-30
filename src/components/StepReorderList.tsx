'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DayItinerary } from '@/types/travel';
import { Calendar, GripHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { formatDate } from '@/lib/date-utils';

interface StepReorderListProps {
  steps: DayItinerary[];
  onReorder: (steps: DayItinerary[]) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

interface SortableItemProps {
  step: DayItinerary;
  isCurrent?: boolean;
}

function getSortableId(step: DayItinerary) {
  return step.id ?? `${step.destination.id}-${step.order}`;
}

function SortableStepItem({ step, isCurrent }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: getSortableId(step),
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 5 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border px-3 py-2 bg-white shadow-sm flex items-center gap-3 ${
        isDragging ? 'ring-2 ring-blue-400 shadow-lg' : 'border-gray-200'
      }`}
    >
      <button
        className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
        {...attributes}
        {...listeners}
        aria-label={`Déplacer l'étape ${step.order}`}
      >
        <GripHorizontal className="h-4 w-4" />
      </button>
      <div className="flex-1">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(step.date)}</span>
          <span className="text-gray-300">•</span>
          <span>Jour {step.order}</span>
          {isCurrent && (
            <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
              Aujourd&apos;hui
            </span>
          )}
        </div>
        <div className="text-sm font-medium text-gray-900">
          {step.destination?.name ?? 'Destination inconnue'}
        </div>
        {step.notes && (
          <div className="text-xs text-gray-500 truncate">{step.notes}</div>
        )}
      </div>
    </div>
  );
}

export function StepReorderList({ steps, onReorder, onCancel, isSubmitting = false }: StepReorderListProps) {
  const [items, setItems] = useState<DayItinerary[]>(steps);

  useEffect(() => {
    setItems(steps);
  }, [steps]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { pressDelay: 120, pressTolerance: 8 }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const ids = useMemo(() => items.map((step) => getSortableId(step)), [items]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const updated = arrayMove(items, oldIndex, newIndex).map((step, index) => ({
      ...step,
      order: index + 1,
    }));

    setItems(updated);

    try {
      await onReorder(updated);
    } catch (error) {
      console.error('Reorder error', error);
      setItems([...steps]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="rounded-md border border-dashed border-gray-300 bg-white/70 p-3">
        <p className="text-sm font-medium text-gray-700">
          Glissez-déposez les étapes pour mettre à jour l&apos;ordre de l&apos;itinéraire.
        </p>
        <p className="text-xs text-gray-500">
          L&apos;ordre est sauvegardé automatiquement lorsque vous relâchez une étape.
        </p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((step) => (
              <SortableStepItem
                key={getSortableId(step)}
                step={step}
                isCurrent={false}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Quitter le mode tri
        </Button>
      </div>
    </div>
  );
}
