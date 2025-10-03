import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  } = options;

  const elementRef = useRef<Element>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) {
      return;
    }

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen]);

  return { elementRef, entry };
}

// Hook spécialisé pour le lazy loading d'images
export function useLazyImage() {
  const { elementRef, entry } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true,
  });

  const isVisible = !!entry?.isIntersecting;

  return { elementRef, isVisible };
}

// Hook pour déclencher des actions quand un élément devient visible
export function useInView(callback: () => void, options?: UseIntersectionObserverOptions) {
  const { entry } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
    ...options,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      callback();
    }
  }, [entry?.isIntersecting, callback]);
}
