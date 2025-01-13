import { Button, Text } from '@rneui/themed';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { darkColors } from '../../styles/colors';

const noop = () => {};

export function OnboardingScreenComponent({
  hasAllowedPermissions = false,
  onGetStartedPress = noop,
  onRequestPermissionPress = noop,
  onSendTestNotificationPress = noop,
  wasAskedForPermissions = false,
}) {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Image
            alt="Random Reminders"
            contentFit="cover"
            // eslint-disable-next-line unicorn/prefer-module
            source={require('../../../assets/images/icon.png')}
            style={styles.logo}
          />

          {wasAskedForPermissions ? (
            hasAllowedPermissions ? (
              <>
                <Text style={{ alignSelf: 'center' }} h4>
                  You can now use the app.
                </Text>

                <View style={styles.buttonContainer}>
                  <Button
                    buttonStyle={styles.secondaryButton}
                    onPress={onSendTestNotificationPress}
                    size="lg"
                  >
                    Send Test Notification
                  </Button>

                  <Button onPress={onGetStartedPress} size="lg">
                    Get Started
                  </Button>
                </View>
              </>
            ) : (
              <View style={styles.instructions}>
                <Text h4 style={styles.text}>
                  Push notification access has been denied.
                </Text>

                <Text h4 style={styles.text}>
                  Since we can't ask you again, please go to your settings to
                  allow push notifications.
                </Text>
              </View>
            )
          ) : (
            <>
              <View style={styles.instructions}>
                <Text h4 style={styles.text}>
                  You must allow push notifications to use this app, so you can
                  get notifications for your reminders.
                </Text>

                <Text h4 style={styles.text}>
                  Click the button below and then allow notifications in the
                  popup.
                </Text>
              </View>

              <Button onPress={onRequestPermissionPress} size="lg">
                Request permission now
              </Button>
            </>
          )}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkColors.backgroundColorPrimary,
    flex: 1,
  },
  safeArea: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  logo: {
    height: 256,
    width: 256,
  },
  text: {
    lineHeight: 32,
    textAlign: 'center',
  },
  instructions: {
    gap: 24,
    marginBottom: 48,
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: darkColors.secondary,
  },
  buttonContainer: {
    gap: 24,
    marginTop: 'auto',
    width: '100%',
  },
});
