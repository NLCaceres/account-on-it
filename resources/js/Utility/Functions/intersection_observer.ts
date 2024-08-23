export default function InitIntersectionObserver(
  intersectionCallback: () => void, intersectOptions: IntersectionObserverInit = {}
) {
  return ("IntersectionObserver" in window)
    ? new IntersectionObserver(intersectionCallback, intersectOptions)
    : undefined;
}

export function StopIntersectionObservation(observer: IntersectionObserver, elem: Element) {
  if ("IntersectionObserver" in window) {
    observer.unobserve(elem);
  }
}

export function FinishIntersectionObservation(observer: IntersectionObserver) {
  if ("IntersectionObserver" in window) {
    observer.disconnect(); // ?: This kills ALL observations so careful!
  } // - Probably best called from `<App />`
}

export function DidIntersect(entry: IntersectionObserverEntry) {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}