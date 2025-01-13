/* eslint-disable unicorn/consistent-function-scoping */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useState } from 'react';

import { onboardingStorageKeys } from './onboarding-constants';
import {
  getHasLocalNotificationsPermissions,
  requestLocalNotificationsPermissions,
} from './onboarding-helpers';
import { OnboardingScreenComponent } from './onboarding-screen-component';
import { useEffectOnce } from './use-effect-once';
import { withNotificationPermissions } from './with-notification-permissions';

function OnboardingScreenContainer({ hasNotificationPermissions }) {
  const [hasAllowedPermissions, setHasAllowedPermissions] = useState(
    hasNotificationPermissions,
  );
  const [wasAskedForPermissions, setWasAskedForPermissions] = useState(false);

  useEffectOnce(() => {
    async function init() {
      const currentPermissions = await getHasLocalNotificationsPermissions();
      setHasAllowedPermissions(currentPermissions);

      const [wasAsked, gotStarted] = await Promise.all([
        AsyncStorage.getItem(onboardingStorageKeys.WAS_ASKED_FOR_PERMISSIONS),
        AsyncStorage.getItem(onboardingStorageKeys.GOT_STARTED),
      ]);

      if (wasAsked !== null) {
        setWasAskedForPermissions(true);
      }

      if (
        (currentPermissions || hasNotificationPermissions) &&
        gotStarted !== null
      ) {
        router.replace('/home');
      }
    }

    init();
  });

  async function handleRequestPermissionPress() {
    await requestLocalNotificationsPermissions().then(setHasAllowedPermissions);

    setWasAskedForPermissions(true);

    await AsyncStorage.setItem(
      onboardingStorageKeys.WAS_ASKED_FOR_PERMISSIONS,
      JSON.stringify(true),
    );
  }

  async function handleSendTestNotificationPress() {
    await Notifications.scheduleNotificationAsync({
      content: {
        body: 'This is a test notification.',
        title: 'Random Reminder App',
      },
      trigger: null,
    });
  }

  async function handleGetStartedPress() {
    await AsyncStorage.setItem(
      onboardingStorageKeys.GOT_STARTED,
      JSON.stringify(true),
    );

    router.replace('/home');
  }

  return (
    <OnboardingScreenComponent
      hasAllowedPermissions={
        // This order is important because hasAllowedPermissions only updates
        // when the user is on this screen whereas hasNotificationPermissions
        // updates when the app switches between foreground and background.
        hasAllowedPermissions || hasNotificationPermissions
      }
      onGetStartedPress={handleGetStartedPress}
      onRequestPermissionPress={handleRequestPermissionPress}
      onSendTestNotificationPress={handleSendTestNotificationPress}
      wasAskedForPermissions={wasAskedForPermissions}
    />
  );
}

export default withNotificationPermissions(OnboardingScreenContainer);
