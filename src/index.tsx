import { JSX, ReactNode, useCallback, useRef } from 'react';

interface InfiniteScrollProps {
  endReached: (
    entries: IntersectionObserverEntry[],
    node: HTMLDivElement | null
  ) => void;
  children: (ref: (node: HTMLDivElement | null) => void) => ReactNode;
  deps: unknown[];
}

export type InfiniteScrollRef = (node: HTMLDivElement | null) => void;

export const InfiniteScroll = ({
  children,
  deps = [],
  endReached,
}: InfiniteScrollProps): JSX.Element => {
  const lastElementObserver = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (lastElementObserver.current) {
      lastElementObserver.current.disconnect();
    }

    if (node) {
      lastElementObserver.current = new IntersectionObserver(entries => {
        endReached(entries, node);
      });

      lastElementObserver.current.observe(node);
    }
  }, deps);

  return <>{children(lastElementRef)}</>;
};
