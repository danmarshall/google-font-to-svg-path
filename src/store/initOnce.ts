let initialized = false;

export function ensureInitOnce(callback: () => void) {
  if (!initialized) {
    initialized = true;
    callback();
  }
}
