/**
 * Configuration centralisée pour React Query
 * 
 * Définit les temps de cache cohérents à travers l'application
 * selon le type de données et leur volatilité.
 */

/**
 * Temps de cache pour les différents types de données
 */
export const CACHE_TIMES = {
  /**
   * Données statiques ou quasi-statiques (10 minutes)
   * Ex: Destinations, qui changent rarement
   */
  STATIC: 10 * 60 * 1000,

  /**
   * Données semi-dynamiques (2 minutes)
   * Ex: Itinéraires, liste des steps
   */
  DYNAMIC: 2 * 60 * 1000,

  /**
   * Données en temps réel ou très volatiles (30 secondes)
   * Ex: Step actuelle, données en cours de modification
   */
  REALTIME: 30 * 1000,
} as const;

/**
 * Configuration par défaut pour React Query
 */
export const defaultQueryConfig = {
  queries: {
    staleTime: CACHE_TIMES.DYNAMIC,
    refetchOnWindowFocus: false,
    retry: 1,
  },
  mutations: {
    retry: 0,
  },
} as const;

/**
 * Délais de debounce pour les inputs
 */
export const DEBOUNCE_TIMES = {
  SEARCH: 300,
  AUTOCOMPLETE: 250,
  FILTER: 200,
} as const;

