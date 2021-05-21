export default function InitIntersectionObserver(intersectionCallback: () => void, intersectOptions: any = {}): IntersectionObserver | null {
  if ("IntersectionObserver" in window) {
    return new IntersectionObserver(intersectionCallback, intersectOptions);
  }
  return null;
}

export function StopIntersectionObservation(observer: IntersectionObserver | null, elem: Element) {
  if ("IntersectionObserver" in window) {
    observer?.unobserve(elem);
  }
}

export function FinishIntersectionObservation(observer: IntersectionObserver | null) {
  if ("IntersectionObserver" in window) {
    observer?.disconnect(); //? This kills all observations so careful!
    //* Probably best called from main app component
  }
}

export function DidIntersect(entry: IntersectionObserverEntry): boolean {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}