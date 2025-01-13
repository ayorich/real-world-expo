import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { equals, prop } from 'ramda';
import { Platform } from 'react-native';

import { asyncPipe } from '../../utils/async-pipe';
/**
 * Checks if the given permission status is 'granted'.
 *
 * @param {string} status - The permission status to check.
 * @returns {boolean} True if the status is 'granted', false otherwise.
 *
 * @example
 * isGranted('granted') // returns true
 * isGranted('denied') // returns false
 * isGranted('undetermined') // returns false
 */
export const isGranted = equals('granted');

/**
 * Checks if the app has permission to send local notifications.
 *
 * @async
 * @returns {Promise<boolean>} A promise that resolves to `true` if the app has
 * permission to send local notifications. Otherwise it resolves with `false`.
 *
 * @example
 * const hasPermission = await getHasLocalNotificationsPermissions();
 * if (hasPermission) {
 *   console.log('App has permission to send notifications');
 * } else {
 *   console.log('App does not have permission to send notifications');
 * }
 */
export async function getHasLocalNotificationsPermissions() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    return isGranted(existingStatus);
  }

  return false;
}
/**
 * Requests local notifications permissions and checks if they are granted.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if permissions
 * are granted, `false` otherwise.
 *
 * @example
 * const permissionsGranted = await requestLocalNotificationsPermissions();
 * if (permissionsGranted) {
 *   console.log('Local notifications permissions granted');
 * } else {
 *   console.log('Local notifications permissions not granted');
 * }
 */
export const requestLocalNotificationsPermissions = asyncPipe(
  Notifications.requestPermissionsAsync,
  prop('status'),
  isGranted,
);
