import '@testing-library/jest-dom';

function mockMatchMedia(query: string) {
  return {
    matches: query.includes('min-width: 1024px'),
    media: query,
    onchange: null as MediaQueryList['onchange'],
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  } as MediaQueryList;
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});
