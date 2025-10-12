'use client';

import { ChevronDown, ChevronUp, Calendar, Plus } from 'lucide-react';
import { parseISO, isBefore } from 'date-fns';
import { formatDate, useCurrentDate } from '@/lib/date-utils';
import ItineraryCard from '@/components/ItineraryCard';
import TransportIcon from '@/components/TransportIcon';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/design-system/components';
import type { DayItinerary, Itinerary } from '@/types/travel';
import type { StepGroup } from '@/hooks/useMonthGrouping';

interface SidebarPanelProps {
  itinerary: Itinerary;
  groupedByMonth: Record<string, StepGroup[]>;
  expandedMonths: Set<string>;
  selectedStep: DayItinerary | null;
  onToggleMonth: (monthKey: string) => void;
  onSelectStep: (step: DayItinerary) => void;
  onEditStep: (step: DayItinerary) => void;
  onOpenAddStep: () => void;
}

export default function SidebarPanel({
  itinerary,
  groupedByMonth,
  expandedMonths,
  selectedStep,
  onToggleMonth,
  onSelectStep,
  onEditStep,
  onOpenAddStep,
}: SidebarPanelProps) {
  const clientCurrentDate = useCurrentDate();

  return (
    <div className="hidden lg:flex lg:w-80 bg-white lg:border-r border-gray-200 flex-col order-2 lg:order-1 lg:h-full">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Titre de l'itinéraire */}
        <AppHeader
          title={itinerary.title}
          description={itinerary.description}
          startDate={formatDate(itinerary.startDate)}
          endDate={formatDate(itinerary.endDate)}
        />

        {/* Étapes de l'itinéraire */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              🗺️ Étapes ({Object.values(groupedByMonth).flat().length})
            </h3>
          </div>

          {Object.entries(groupedByMonth).map(([monthKey, monthDays]) => {
              const isExpanded = expandedMonths.has(monthKey);
              const monthName = monthKey.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');

              return (
                <div key={monthKey} className="space-y-2">
                  {/* Header du mois cliquable */}
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

                  {/* Étapes du mois */}
                  {isExpanded && (
                    <div className="space-y-2 ml-3 border-l border-gray-300 pl-3">
                      {monthDays.map((stepGroup, groupIndex) => {
                        if (stepGroup.type === 'single') {
                          // Étape unique
                          const day = stepGroup.day;
                          const rawDayKey = day.id
                            ? `day-${day.id}`
                            : `day-${day.date}-${day.order ?? `idx-${groupIndex}`}`;
                          const wrapperKey = `${rawDayKey}-group-${groupIndex}`;
                          const previousStep = itinerary.days.find(candidate => candidate.order === day.order - 1);
                          const dayDate = parseISO(day.date);
                          dayDate.setHours(0, 0, 0, 0);
                          const isPastStep = isBefore(dayDate, clientCurrentDate);
                          return (
                            <div key={wrapperKey}>
                              {/* Icône de transport avant l'étape (sauf pour la première) */}
                              {day.order > 1 && previousStep?.id && (
                                <TransportIcon
                                  fromStep={previousStep}
                                  itineraryId={itinerary.id}
                                />
                              )}
                              <div data-step-order={day.order}>
                                <ItineraryCard
                                  dayItinerary={day}
                                  itineraryId={itinerary.id}
                                  isSelected={selectedStep?.order === day.order}
                                  isPast={isPastStep}
                                  onSelect={() => onSelectStep(day)}
                                  onEdit={() => onEditStep(day)}
                                />
                              </div>
                            </div>
                          );
                        } else {
                          // Plage d'étapes consécutives
                          const { days, startDate, endDate, destination } = stepGroup;
                          const isRangeSelected = selectedStep && days.some(day => day.order === selectedStep.order);
                          const isRangeCurrent = selectedStep && days.some(day => day.order === selectedStep.order);
                          const rangeIdentifier = days
                            .map((rangeDay) => rangeDay.id ?? `${rangeDay.date}-${rangeDay.order ?? `idx-${groupIndex}`}`)
                            .join('|');
                          const lastOrdinal = days[days.length - 1]?.order ?? `idx-${groupIndex}`;
                          const firstOrdinal = days[0]?.order ?? `idx-${groupIndex}`;
                          const firstDayOrder = days[0]?.order;
                          const rangeKey = `range-${monthKey}-${
                            rangeIdentifier || `${firstOrdinal}-${lastOrdinal}`
                          }-${groupIndex}`;
                          const previousStep = typeof firstDayOrder === 'number'
                            ? itinerary.days.find(candidate => candidate.order === firstDayOrder - 1)
                            : undefined;

                          return (
                            <div key={rangeKey}>
                              {/* Icône de transport avant la plage (sauf pour la première) */}
                              {days[0].order > 1 && previousStep?.id && (
                                <TransportIcon
                                  fromStep={previousStep}
                                  itineraryId={itinerary.id}
                                />
                              )}
                              <div className={`border rounded-md overflow-hidden transition-colors ${
                                isRangeSelected
                                  ? 'bg-blue-50 border-blue-300'
                                  : 'bg-white border-gray-200'
                              }`}>
                                {/* En-tête de la plage */}
                                <button
                                  onClick={() => {
                                    // Sélectionner la première étape de la plage
                                    onSelectStep(days[0]);
                                  }}
                                  className={`w-full p-3 text-left transition-colors ${
                                    isRangeSelected
                                      ? 'hover:bg-blue-100'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                                        {days.length}
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-gray-900 text-sm">{destination.name}</h4>
                                        <p className="text-xs text-gray-500">
                                          {formatDate(startDate)}
                                          {startDate.getTime() !== endDate.getTime() &&
                                            ` - ${formatDate(endDate)}`
                                          }
                                          {isRangeCurrent && (
                                            <span className="ml-2 inline-block px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded font-medium">
                                              ACTUEL
                                            </span>
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <ChevronDown className="w-4 h-4 text-gray-500" />
                                    </div>
                                  </div>
                                </button>

                                {/* Détails des étapes individuelles */}
                                <div className="border-t border-white/30">
                                  {days.map((day, dayIndex) => {
                                    const baseDayKey = day.id
                                      ? `day-${day.id}`
                                      : `day-${day.date}-${day.order ?? `idx-${dayIndex}`}`;
                                    const nestedKey = `${baseDayKey}-range-${groupIndex}-${dayIndex}`;
                                    return (
                                      <div
                                        key={nestedKey}
                                        className="px-3 py-2 border-b border-gray-100 last:border-b-0"
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <div
                                              className={`w-2 h-2 rounded-full ${
                                                selectedStep && selectedStep.order === day.order
                                                  ? 'bg-blue-500'
                                                  : isBefore(parseISO(day.date), clientCurrentDate)
                                                  ? 'bg-green-500'
                                                  : 'bg-gray-300'
                                              }`}
                                            ></div>
                                            <span className="text-xs text-gray-600">
                                              Jour {day.order}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                              {formatDate(day.date)}
                                            </span>
                                            {selectedStep && selectedStep.order === day.order && (
                                              <span className="text-[10px] px-1 py-0.5 bg-blue-100 text-blue-800 rounded font-medium">
                                                Today
                                              </span>
                                            )}
                                          </div>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              onSelectStep(day);
                                            }}
                                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                                          >
                                            Voir détails
                                          </button>
                                        </div>
                                        {selectedStep && selectedStep.order === day.order && (
                                          <div className="mt-2 pt-2 border-t border-gray-100">
                                            <ItineraryCard
                                              dayItinerary={day}
                                              itineraryId={itinerary.id}
                                              isSelected={true}
                                              isPast={isBefore(parseISO(day.date), clientCurrentDate)}
                                              onSelect={() => {}}
                                              onEdit={() => onEditStep(day)}
                                            />
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Bouton d'action en bas */}
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
