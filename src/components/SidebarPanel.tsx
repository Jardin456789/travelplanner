'use client';

import { useEffect, useMemo, useState, useCallback, type CSSProperties } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDown, ChevronUp, Calendar, Plus } from 'lucide-react';
import { parseISO, isBefore } from 'date-fns';
import { formatDate, useCurrentDate } from '@/lib/date-utils';
import ItineraryCard from '@/components/ItineraryCard';
import TransportIcon from '@/components/TransportIcon';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/design-system/components';
import type { DayItinerary, Itinerary } from '@/types/travel';
import { useMonthGrouping } from '@/hooks/useMonthGrouping';

interface SidebarPanelProps {
  itinerary: Itinerary;
  steps: DayItinerary[];
  expandedMonths: Set<string>;
  selectedStep: DayItinerary | null;
  isSavingOrder: boolean;
  reorderError: string | null;
  onToggleMonth: (monthKey: string) => void;
  onSelectStep: (step: DayItinerary) => void;
  onEditStep: (step: DayItinerary) => void;
  onReorder: (steps: DayItinerary[]) => Promise<void> | void;
  onOpenAddStep: () => void;
}

const getStepKey = (step: DayItinerary) =>
  step.id ? `step-${step.id}` : `step-${step.date}-${step.order}`;

function SortableDayCard({
  day,
  itineraryId,
  isSelected,
  isPastStep,
  onSelectStep,
  onEditStep,
  disableDrag,
}: {
  day: DayItinerary;
  itineraryId: number;
  isSelected: boolean;
  isPastStep: boolean;
  onSelectStep: (step: DayItinerary) => void;
  onEditStep: (step: DayItinerary) => void;
  disableDrag: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: getStepKey(day),
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleProps = disableDrag ? undefined : { ...attributes, ...listeners };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'relative z-20 drop-shadow-lg' : undefined}
    >
      <ItineraryCard
        dayItinerary={day}
        itineraryId={itineraryId}
        isSelected={isSelected}
        isPast={isPastStep}
        onSelect={() => onSelectStep(day)}
        onEdit={() => onEditStep(day)}
        dragHandleProps={handleProps}
        isDragging={isDragging}
        disableDrag={disableDrag}
      />
    </div>
  );
}

export default function SidebarPanel({
  itinerary,
  steps,
  expandedMonths,
  selectedStep,
  isSavingOrder,
  reorderError,
  onToggleMonth,
  onSelectStep,
  onEditStep,
  onReorder,
  onOpenAddStep,
}: SidebarPanelProps) {
  const clientCurrentDate = useCurrentDate();
  const [orderedSteps, setOrderedSteps] = useState<DayItinerary[]>(steps);

  useEffect(() => {
    setOrderedSteps(steps);
  }, [steps]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const { groupedByMonth } = useMonthGrouping({ dayItineraries: orderedSteps });

  const stepByOrder = useMemo(() => {
    const map = new Map<number, DayItinerary>();
    orderedSteps.forEach((step) => map.set(step.order, step));
    return map;
  }, [orderedSteps]);

  const previousStepFor = useCallback(
    (order: number) => stepByOrder.get(order - 1),
    [stepByOrder]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (isSavingOrder) {
        return;
      }
      const { active, over } = event;
      if (!over || active.id === over.id) {
        return;
      }

      setOrderedSteps((prevSteps) => {
        const prevIds = prevSteps.map(getStepKey);
        const oldIndex = prevIds.indexOf(active.id as string);
        const newIndex = prevIds.indexOf(over.id as string);

        if (oldIndex === -1 || newIndex === -1) {
          return prevSteps;
        }

        const reordered = arrayMove(prevSteps, oldIndex, newIndex).map((step, index) => ({
          ...step,
          order: index + 1,
        }));

        void (async () => {
          try {
            await onReorder(reordered);
          } catch {
            setOrderedSteps(prevSteps);
          }
        })();

        return reordered;
      });
    },
    [isSavingOrder, onReorder]
  );

  return (
    <div className="hidden lg:flex lg:w-80 bg-white lg:border-r border-gray-200 flex-col order-2 lg:order-1 lg:h-full">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <AppHeader
          title={itinerary.title}
          description={itinerary.description}
          startDate={formatDate(itinerary.startDate)}
          endDate={formatDate(itinerary.endDate)}
        />

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                🗺️ Étapes ({orderedSteps.length})
              </h3>
              {isSavingOrder && (
                <span className="text-xs text-blue-600">Enregistrement…</span>
              )}
            </div>
            {reorderError && (
              <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                {reorderError}
              </div>
            )}
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={orderedSteps.map(getStepKey)}
              strategy={verticalListSortingStrategy}
            >
              {Object.entries(groupedByMonth).map(([monthKey, monthDays]) => {
                const isExpanded = expandedMonths.has(monthKey);
                const monthName = monthKey
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');

                return (
                  <div key={monthKey} className="space-y-2">
                    <button
                      onClick={() => onToggleMonth(monthKey)}
                      className="w-full flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900 text-sm">{monthName}</span>
                        <span className="text-xs text-gray-600 bg-white px-1.5 py-0.5 rounded border">
                          {monthDays.length}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="space-y-2 ml-3 border-l border-gray-300 pl-3">
                        {monthDays.map((stepGroup, groupIndex) => {
                          if (stepGroup.type === 'single') {
                            const day = stepGroup.day;
                            const previousStep = previousStepFor(day.order);
                            const dayDate = parseISO(day.date);
                            dayDate.setHours(0, 0, 0, 0);
                            const isPastStep = isBefore(dayDate, clientCurrentDate);

                            return (
                              <div key={`${getStepKey(day)}-group-${groupIndex}`} className="space-y-2">
                                {day.order > 1 && previousStep?.id && (
                                  <TransportIcon fromStep={previousStep} itineraryId={itinerary.id} />
                                )}
                                <SortableDayCard
                                  day={day}
                                  itineraryId={itinerary.id}
                                  isSelected={selectedStep?.order === day.order}
                                  isPastStep={isPastStep}
                                  onSelectStep={onSelectStep}
                                  onEditStep={onEditStep}
                                  disableDrag={isSavingOrder}
                                />
                              </div>
                            );
                          }

                          const { days, startDate, endDate, destination } = stepGroup;
                          const isRangeSelected =
                            selectedStep && days.some((day) => day.order === selectedStep.order);
                          const firstDayOrder = days[0]?.order;
                          const previousStep =
                            typeof firstDayOrder === 'number'
                              ? previousStepFor(firstDayOrder)
                              : undefined;

                          return (
                            <div key={`range-${monthKey}-${groupIndex}`} className="space-y-2">
                              {days[0].order > 1 && previousStep?.id && (
                                <TransportIcon fromStep={previousStep} itineraryId={itinerary.id} />
                              )}
                              <div
                                className={`border rounded-md overflow-hidden transition-colors ${
                                  isRangeSelected
                                    ? 'bg-blue-50 border-blue-300'
                                    : 'bg-white border-gray-200'
                                }`}
                              >
                                <button
                                  onClick={() => onSelectStep(days[0])}
                                  className={`w-full p-3 text-left transition-colors ${
                                    isRangeSelected ? 'hover:bg-blue-100' : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                                        {days.length}
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-gray-900 text-sm">
                                          {destination.name}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                          {formatDate(startDate)}
                                          {startDate.getTime() !== endDate.getTime() &&
                                            ` - ${formatDate(endDate)}`}
                                        </p>
                                      </div>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                  </div>
                                </button>

                                <div className="border-t border-white/30">
                                  {days.map((day) => {
                                    const dayDate = parseISO(day.date);
                                    dayDate.setHours(0, 0, 0, 0);
                                    return (
                                      <div
                                        key={`${getStepKey(day)}-range-line`}
                                        className="px-3 py-2 border-b border-gray-100 last:border-b-0"
                                      >
                                        <SortableDayCard
                                          day={day}
                                          itineraryId={itinerary.id}
                                          isSelected={selectedStep?.order === day.order}
                                          isPastStep={isBefore(dayDate, clientCurrentDate)}
                                          onSelectStep={onSelectStep}
                                          onEditStep={onEditStep}
                                          disableDrag={isSavingOrder}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>

        <div className="pt-2">
          <Button className="w-full h-8 text-sm" onClick={onOpenAddStep}>
            <Plus className="w-3 h-3 mr-2" />
            Ajouter une étape
          </Button>
        </div>
      </div>
    </div>
  );
}
