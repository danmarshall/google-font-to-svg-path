import { useState, useEffect, useRef } from 'react';
import { appStore } from './appStore';

export function useAppStore() {
  const [state, setState] = useState(appStore.getState());
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const unsubscribe = appStore.subscribe(() => {
      const newState = appStore.getState();
      // Only update if state actually changed
      if (newState !== stateRef.current) {
        setState(newState);
      }
    });
    return unsubscribe;
  }, []);

  return state;
}

export function setAppState(updates: Partial<ReturnType<typeof appStore.getState>>) {
  appStore.setState(updates);
}
