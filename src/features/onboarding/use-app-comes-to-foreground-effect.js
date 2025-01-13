import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

/**
 * A custom React hook that triggers a side effect function whenever the app
 * comes to the foreground.
 *
 * @param {Function} effect - The side effect function to run when the app comes
 * to the foreground.
 * @returns {string} - The current state of the app ('active', 'inactive', or
 * 'background').
 */
export function useAppComesToForegroundEffect(effect) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    // This variable is called subscription because it proactively listens for
    // changes in the app's state until ...
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        /inactive|background/.test(appState.current) &&
        nextAppState === 'active'
      ) {
        effect();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      // ... it's unsubscribed in the cleanup function of this useEffect hook.
      subscription.remove();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return appStateVisible;
}
