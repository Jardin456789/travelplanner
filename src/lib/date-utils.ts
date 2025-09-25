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
  const [currentDate, setCurrentDate] = useState(() => getCurrentDate());

  useEffect(() => {
    // Mettre à jour la date toutes les heures pour gérer les changements de jour
    const interval = setInterval(() => {
      const newDate = getCurrentDate();
      if (newDate.getTime() !== currentDate.getTime()) {
        setCurrentDate(newDate);
      }
    }, 3600000); // 1 heure

    return () => clearInterval(interval);
  }, [currentDate]);

  return currentDate;
};
