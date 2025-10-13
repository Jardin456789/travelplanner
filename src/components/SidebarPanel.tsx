'use client';

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
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
import { ChevronDown, ChevronUp, Calendar, Pencil, Plus } from 'lucide-react';
import { parseISO, isBefore } from 'date-fns';
import { formatDate, useCurrentDate } from '@/lib/date-utils';
import ItineraryCard from '@/components/ItineraryCard';
import TransportIcon from '@/components/TransportIcon';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/design-system/components';
import type { DayItinerary, Itinerary } from '@/types/travel';
import { useMonthGrouping } from '@/hooks/useMonthGrouping';
import { cn } from '@/lib/utils';

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

const sortStepsChronologically = (steps: DayItinerary[]) =>
  [...steps].sort((a, b) => {
    const firstDate = new Date(a.date).getTime();
    const secondDate = new Date(b.date).getTime();
    if (firstDate !== secondDate) {
      return firstDate - secondDate;
    }
    return a.order - b.order;
  });

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

  const interactionProps = disableDrag ? {} : { ...attributes, ...listeners };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'relative z-20 drop-shadow-lg' : undefined}
      {...interactionProps}
    >
      <ItineraryCard
        dayItinerary={day}
        itineraryId={itineraryId}
        isSelected={isSelected}
        isPast={isPastStep}
        onSelect={() => onSelectStep(day)}
        onEdit={() => onEditStep(day)}
        isDragging={isDragging}
        disableDrag={disableDrag}
      />
    </div>
  );
}

function RangeSubStepItem({
  day,
  isSelected,
  isPastStep,
  isTodayStep,
  onSelectStep,
  onEditStep,
  disableDrag,
}: {
  day: DayItinerary;
  isSelected: boolean;
  isPastStep: boolean;
  isTodayStep: boolean;
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

  const interactionProps = disableDrag ? {} : { ...attributes, ...listeners };
  const restInteractionProps = { ...interactionProps } as Partial<HTMLAttributes<HTMLDivElement>>;
  const sortableKeyDown = restInteractionProps.onKeyDown as
    | ((event: ReactKeyboardEvent<HTMLDivElement>) => void)
    | undefined;
  if (restInteractionProps.onKeyDown) {
    delete restInteractionProps.onKeyDown;
  }
  const computedTabIndex = restInteractionProps.tabIndex ?? 0;
  if (restInteractionProps.tabIndex !== undefined) {
    delete restInteractionProps.tabIndex;
  }

  const itemClass = cn(
    'group relative flex items-start gap-3 rounded-xl border bg-white/95 p-3 transition-all duration-200',
    isSelected
      ? 'border-sky-300 bg-sky-50/40 shadow-sm'
      : 'border-slate-200 hover:border-sky-200 hover:bg-sky-50/30',
    isDragging && 'shadow-lg ring-1 ring-sky-200',
    disableDrag ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={itemClass}
      role="button"
      tabIndex={computedTabIndex}
      {...restInteractionProps}
      onClick={() => onSelectStep(day)}
      onKeyDown={(event) => {
        sortableKeyDown?.(event);
        if (event.defaultPrevented) {
          return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelectStep(day);
        }
      }}
    >
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-2 text-slate-600">
            <Calendar className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
            <span className="font-medium text-slate-700">{formatDate(day.date)}</span>
          </span>
          <div className="flex items-center gap-1">
            {isTodayStep && (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                Aujourd&apos;hui
              </span>
            )}
            {!isPastStep && !isTodayStep && (
              <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-[2px] text-[10px] font-medium text-sky-600">
                À venir
              </span>
            )}
            {isPastStep && !isTodayStep && (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-[2px] text-[10px] font-medium text-slate-500">
                Terminé
              </span>
            )}
          </div>
        </div>
        {day.notes && <p className="text-xs leading-relaxed text-slate-600">{day.notes}</p>}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-slate-400 transition hover:bg-sky-50/70 hover:text-sky-600"
        onClick={(event) => {
          event.stopPropagation();
          onEditStep(day);
        }}
        aria-label={`Modifier l'étape du ${formatDate(day.date)}`}
      >
        <Pencil className="h-3.5 w-3.5" />
      </Button>
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
  const [orderedSteps, setOrderedSteps] = useState<DayItinerary[]>(() =>
    sortStepsChronologically(steps),
  );

  useEffect(() => {
    setOrderedSteps(sortStepsChronologically(steps));
  }, [steps]);

  const normalizedCurrentDate = useMemo(() => {
    const dateCopy = new Date(clientCurrentDate);
    dateCopy.setHours(0, 0, 0, 0);
    return dateCopy;
  }, [clientCurrentDate]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const { groupedByMonth } = useMonthGrouping({ dayItineraries: orderedSteps });

  const stepByOrder = useMemo(() => {
    const map = new Map<number, DayItinerary>();
    orderedSteps.forEach((step) => map.set(step.order, step));
    return map;
  }, [orderedSteps]);

  const previousStepFor = useCallback((order: number) => stepByOrder.get(order - 1), [stepByOrder]);

  const { pastDaysCount, nextStep } = useMemo(() => {
    let pastCount = 0;
    let upcomingStep: DayItinerary | undefined;

    for (const step of orderedSteps) {
      const stepDate = parseISO(step.date);
      stepDate.setHours(0, 0, 0, 0);
      if (stepDate.getTime() <= normalizedCurrentDate.getTime()) {
        pastCount += 1;
      }
      if (!upcomingStep && stepDate.getTime() >= normalizedCurrentDate.getTime()) {
        upcomingStep = step;
      }
    }

    return { pastDaysCount: pastCount, nextStep: upcomingStep };
  }, [normalizedCurrentDate, orderedSteps]);

  const totalDays = orderedSteps.length;
  const nextDateLabel = nextStep ? formatDate(nextStep.date) : undefined;

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (isSavingOrder) {
        return;
      }
      const { active, over } = event;
      if (!over || active.id === over.id) {
        return;
      }

      let previousSnapshot: DayItinerary[] | null = null;
      let reorderedSnapshot: DayItinerary[] | null = null;

      setOrderedSteps((prevSteps) => {
        previousSnapshot = prevSteps;

        const prevIds = prevSteps.map(getStepKey);
        const oldIndex = prevIds.indexOf(active.id as string);
        const newIndex = prevIds.indexOf(over.id as string);

        if (oldIndex === -1 || newIndex === -1) {
          previousSnapshot = null;
          return prevSteps;
        }

        const reordered = arrayMove(prevSteps, oldIndex, newIndex).map((step, index) => ({
          ...step,
          order: index + 1,
        }));

        reorderedSnapshot = reordered;
        return reordered;
      });

      if (reorderedSnapshot && previousSnapshot) {
        void (async () => {
          try {
            await onReorder(reorderedSnapshot as DayItinerary[]);
          } catch {
            setOrderedSteps(previousSnapshot as DayItinerary[]);
          }
        })();
      }
    },
    [isSavingOrder, onReorder],
  );

  return (
    <div className="hidden lg:flex lg:w-80 bg-white lg:border-r border-gray-200 flex-col order-2 lg:order-1 lg:h-full">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <AppHeader
          title={itinerary.title}
          description={itinerary.description}
          startDate={formatDate(itinerary.startDate)}
          endDate={formatDate(itinerary.endDate)}
          currentDay={Math.min(pastDaysCount, totalDays)}
          totalDays={totalDays}
          nextDestination={nextStep?.destination?.name}
          nextDateLabel={nextDateLabel}
        />

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                🗺️ Étapes ({orderedSteps.length})
              </h3>
              {isSavingOrder && <span className="text-xs text-blue-600">Enregistrement…</span>}
            </div>
            {reorderError && (
              <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                {reorderError}
              </div>
            )}
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
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
                              <div
                                key={`${getStepKey(day)}-group-${groupIndex}`}
                                className="space-y-2"
                              >
                                {day.order > 1 && previousStep?.id && (
                                  <TransportIcon
                                    fromStep={previousStep}
                                    itineraryId={itinerary.id}
                                  />
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
                                className={`rounded-lg border transition-colors ${
                                  isRangeSelected
                                    ? 'border-blue-300 bg-blue-50/60'
                                    : 'border-gray-200 bg-white'
                                }`}
                              >
                                <button
                                  type="button"
                                  className="flex w-full items-start justify-between gap-3 p-3 text-left transition-colors hover:bg-white/50"
                                  onClick={() => onSelectStep(days[0])}
                                >
                                  <div className="space-y-1">
                                    <h4 className="font-semibold text-sm text-gray-900">
                                      {destination.name}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                      {formatDate(startDate)}
                                      {startDate.getTime() !== endDate.getTime() &&
                                        ` • ${formatDate(endDate)}`}
                                    </p>
                                    <p className="text-[11px] text-gray-400">
                                      {days.length > 1
                                        ? `${days.length} jours sur place`
                                        : '1 jour sur place'}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                                      Séjour
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                  </div>
                                </button>
                                <div className="px-3 pb-3 space-y-2">
                                  {days.map((day) => {
                                    const dayDate = parseISO(day.date);
                                    dayDate.setHours(0, 0, 0, 0);
                                    const isPastStep = isBefore(dayDate, clientCurrentDate);
                                    const isTodayStep =
                                      dayDate.getTime() === clientCurrentDate.getTime();

                                    return (
                                      <RangeSubStepItem
                                        key={`${getStepKey(day)}-range-line`}
                                        day={day}
                                        isSelected={selectedStep?.order === day.order}
                                        isPastStep={isPastStep}
                                        isTodayStep={isTodayStep}
                                        onSelectStep={onSelectStep}
                                        onEditStep={onEditStep}
                                        disableDrag={isSavingOrder}
                                      />
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
