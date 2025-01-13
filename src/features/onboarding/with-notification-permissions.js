/* eslint-disable unicorn/consistent-function-scoping */
import { useNavigation } from 'expo-router';
import { useState } from 'react';

import { getHasLocalNotificationsPermissions } from './onboarding-helpers';
import { useAppComesToForegroundEffect } from './use-app-comes-to-foreground-effect';

export const withNotificationPermissions = Component =>
  function WithNotificationPermissions(properties) {
    const [hasNotificationPermissions, setHasNotificationPermissions] =
      useState(false);
    const navigation = useNavigation();

    async function ensureNotificationPermissions() {
      const hasPermissions = await getHasLocalNotificationsPermissions();
      const { routes } = navigation.getState();

      if (!hasPermissions && routes[0].name !== 'index') {
        navigation.reset({ index: 0, routes: [{ name: 'index' }] });
      }

      setHasNotificationPermissions(hasPermissions);
    }

    useAppComesToForegroundEffect(ensureNotificationPermissions);

    return (
      <Component
        hasNotificationPermissions={hasNotificationPermissions}
        {...properties}
      />
    );
  };
