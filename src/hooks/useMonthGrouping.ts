import { useMemo } from 'react';
import { parseISO, isBefore } from 'date-fns';
import type { DayItinerary } from '@/types/travel';

// Type pour représenter une étape ou un groupe d'étapes consécutives
export type StepGroup = {
  type: 'single';
  day: DayItinerary;
} | {
  type: 'range';
  days: DayItinerary[];
  startDate: Date;
  endDate: Date;
  destination: { id: string; name: string };
};

interface UseMonthGroupingProps {
  dayItineraries: DayItinerary[];
  clientCurrentDate: Date;
}

export function useMonthGrouping({ dayItineraries, clientCurrentDate }: UseMonthGroupingProps) {
  // Fonction pour grouper les étapes consécutives dans la même destination
  const groupConsecutiveSteps = useMemo(() =>
    (days: DayItinerary[]): StepGroup[] => {
      const groups: StepGroup[] = [];
      let currentGroup: DayItinerary[] = [];

      for (let i = 0; i < days.length; i++) {
        const day = days[i];

        if (currentGroup.length === 0) {
          // Démarrer un nouveau groupe
          currentGroup = [day];
        } else {
          const lastDay = currentGroup[currentGroup.length - 1];

          // Vérifier si cette étape est consécutive et dans la même destination
          if (lastDay.destination.id === day.destination.id &&
              lastDay.order + 1 === day.order) {
            // Ajouter au groupe existant
            currentGroup.push(day);
          } else {
            // Fermer le groupe actuel et en démarrer un nouveau
            if (currentGroup.length === 1) {
              groups.push({ type: 'single', day: currentGroup[0] });
            } else {
              groups.push({
                type: 'range',
                days: currentGroup,
                startDate: new Date(currentGroup[0].date),
                endDate: new Date(currentGroup[currentGroup.length - 1].date),
                destination: currentGroup[0].destination
              });
            }
            currentGroup = [day];
          }
        }
      }

      // Fermer le dernier groupe
      if (currentGroup.length === 1) {
        groups.push({ type: 'single', day: currentGroup[0] });
      } else if (currentGroup.length > 1) {
        groups.push({
          type: 'range',
          days: currentGroup,
          startDate: new Date(currentGroup[0].date),
          endDate: new Date(currentGroup[currentGroup.length - 1].date),
          destination: currentGroup[0].destination
        });
      }

      return groups;
    },
    []
  );

  // Grouper les étapes par mois avec regroupement des séjours consécutifs
  const groupedByMonth = useMemo(() => {
    // D'abord grouper par mois les étapes individuelles
    const monthGroups = dayItineraries.reduce((acc, day) => {
      const date = new Date(day.date);
      const monthKey = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toLowerCase().replace(' ', '-');
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(day);
      return acc;
    }, {} as Record<string, DayItinerary[]>);

    // Ensuite regrouper les étapes consécutives dans chaque mois
    const finalGroups: Record<string, StepGroup[]> = {};
    Object.entries(monthGroups).forEach(([monthKey, days]) => {
      // Trier les jours par ordre
      const orderedDays = [...days].sort((a, b) => a.order - b.order);
      finalGroups[monthKey] = groupConsecutiveSteps(orderedDays);
    });

    return finalGroups;
  }, [dayItineraries, groupConsecutiveSteps]);

  // Calculer des statistiques
  const stats = useMemo(() => {
    const totalSteps = Object.values(groupedByMonth).flat().length;
    const singleSteps = Object.values(groupedByMonth).flat().filter(group => group.type === 'single').length;
    const rangeGroups = Object.values(groupedByMonth).flat().filter(group => group.type === 'range').length;

    return {
      totalSteps,
      singleSteps,
      rangeGroups,
      totalMonths: Object.keys(groupedByMonth).length,
    };
  }, [groupedByMonth]);

  return {
    groupedByMonth,
    groupConsecutiveSteps,
    stats,
  };
}
