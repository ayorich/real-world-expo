import { render, screen } from '@testing-library/react-native';

import { OnboardingScreenComponent } from './onboarding-screen-component';

const createProps = ({
  hasAllowedPermissions = false,
  onGetStartedPress = jest.fn(),
  onRequestPermissionPress = jest.fn(),
  onSendTestNotificationPress = jest.fn(),
  wasAskedForPermissions = false,
} = {}) => ({
  hasAllowedPermissions,
  onGetStartedPress,
  onRequestPermissionPress,
  onSendTestNotificationPress,
  wasAskedForPermissions,
});

describe('OnboardingScreen component', () => {
  test('given the user was not asked for permission: shows a message that they will be asked for permission and a button to trigger the permission asking flow', () => {
    const props = createProps();

    render(<OnboardingScreenComponent {...props} />);

    expect(screen.getByText(/allow push notifications/i)).toBeOnTheScreen();
    expect(
      screen.getByRole('button', { name: /request permission now/i }),
    ).toBeOnTheScreen();
  });

  test('given the user was asked for permission, but declined: shows a message that they need to go into their settings to allow push notifications manually', () => {
    const props = createProps({
      wasAskedForPermissions: true,
      hasAllowedPermissions: false,
    });

    render(<OnboardingScreenComponent {...props} />);

    expect(screen.getByText(/go to your settings/i)).toBeOnTheScreen();
  });

  test('given the user was asked for permission and allowed: shows a message that they can now use the app, a button to send a test notification, and a button to navigate to the home screen', () => {
    const props = createProps({
      wasAskedForPermissions: true,
      hasAllowedPermissions: true,
    });

    render(<OnboardingScreenComponent {...props} />);

    expect(screen.getByText(/you can now use the app/i)).toBeOnTheScreen();
    expect(
      screen.getByRole('button', { name: /send test notification/i }),
    ).toBeOnTheScreen();
    expect(
      screen.getByRole('button', { name: /get started/i }),
    ).toBeOnTheScreen();
  });
});
