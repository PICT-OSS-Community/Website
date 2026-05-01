export async function register() {
  // Node.js 25 ships a partial localStorage global (requires --localstorage-file to work).
  // Without a valid file path, getItem/setItem are not callable functions, which crashes
  // next-themes during SSR. Replace it with a safe in-memory implementation.
  if (
    typeof window === 'undefined' &&
    typeof localStorage !== 'undefined' &&
    typeof (localStorage as Storage).getItem !== 'function'
  ) {
    const store: Record<string, string> = {};
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, val: string) => { store[key] = String(val); },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { for (const k in store) delete store[k]; },
        get length() { return Object.keys(store).length; },
        key: (n: number) => Object.keys(store)[n] ?? null,
      },
      writable: true,
      configurable: true,
    });
  }
}
