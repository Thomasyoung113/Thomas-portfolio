import '@testing-library/jest-dom';

// Mock IntersectionObserver for jsdom (not available in test environment)
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: ReadonlyArray<number> = [0];

  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(_target: Element): void {
    // Immediately trigger as intersecting so elements render
    this.callback(
      [{ isIntersecting: true, boundingClientRect: {} as DOMRectReadOnly, intersectionRatio: 1, intersectionRect: {} as DOMRectReadOnly, rootBounds: null, target: _target, time: Date.now() }],
      this
    );
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});