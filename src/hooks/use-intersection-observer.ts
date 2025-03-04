
import { useState, useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

/**
 * Hook that tracks whether an element is visible in the viewport
 * using the Intersection Observer API
 */
export function useIntersectionObserver<T extends Element>({
  threshold = 0,
  root = null,
  rootMargin = '0px',
}: UseIntersectionObserverOptions = {}): [RefObject<T>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, root, rootMargin]);

  return [ref, isIntersecting];
}
