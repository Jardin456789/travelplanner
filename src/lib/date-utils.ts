/**
 * Utilitaires pour gérer les dates côté client
 */

import { useState, useEffect } from 'react';

// Fonction pour obtenir la date actuelle côté client
export const getCurrentDate = (): Date => {
  const now = new Date();
  // Reset l'heure à minuit pour les comparaisons de dates
  now.setHours(0, 0, 0, 0);
  return now;
};

// Fonction pour formater les dates en JJ/MM/AAAA
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Hook personnalisé pour la date actuelle
export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    // Initialiser la date côté client uniquement (évite les hydration mismatches)
    setCurrentDate(getCurrentDate());

    // Mettre à jour la date toutes les minutes pour détecter rapidement les changements
    const interval = setInterval(() => {
      const newDate = getCurrentDate();
      setCurrentDate(prevDate => {
        if (!prevDate || newDate.getTime() !== prevDate.getTime()) {
          console.log('📅 Date actuelle mise à jour:', newDate.toLocaleDateString('fr-FR'));
          return newDate;
        }
        return prevDate;
      });
    }, 60000); // 1 minute (plus réactif)

    return () => clearInterval(interval);
  }, []);

  return currentDate || getCurrentDate();
};
