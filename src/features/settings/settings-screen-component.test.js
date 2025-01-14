import { render, screen } from '@testing-library/react-native';

import { SettingsScreenComponent } from './settings-screen-component';

const createProps = ({
  allDaysAreActive = false,
  canDecrementDayEndTime = true,
  canDecrementDayStartTime = true,
  canIncrementDayEndTime = true,
  canIncrementDayStartTime = true,
  dayEndTime = '22:00',
  dayStartTime = '08:00',
  onDayEndTimeDecrementPress = jest.fn(),
  onDayEndTimeIncrementPress = jest.fn(),
  onDayStartTimeDecrementPress = jest.fn(),
  onDayStartTimeIncrementPress = jest.fn(),
  mondayIsActive = false,
  tuesdayIsActive = false,
  wednesdayIsActive = false,
  thursdayIsActive = false,
  fridayIsActive = false,
  saturdayIsActive = false,
  sundayIsActive = false,
} = {}) => ({
  allDaysAreActive,
  canDecrementDayEndTime,
  canDecrementDayStartTime,
  canIncrementDayEndTime,
  canIncrementDayStartTime,
  dayEndTime,
  dayStartTime,
  onDayEndTimeDecrementPress,
  onDayEndTimeIncrementPress,
  onDayStartTimeDecrementPress,
  onDayStartTimeIncrementPress,
  mondayIsActive,
  tuesdayIsActive,
  wednesdayIsActive,
  thursdayIsActive,
  fridayIsActive,
  saturdayIsActive,
  sundayIsActive,
});

describe('SettingsScreenComponent', () => {
  test('given a day start time and a day end time: renders buttons to increment and decrement the day start and end times', () => {
    const props = createProps();

    render(<SettingsScreenComponent {...props} />);

    // It renders a time picker for the day start time.
    expect(screen.getByText(/starting at/i)).toBeOnTheScreen();
    expect(screen.getByText(props.dayStartTime)).toBeOnTheScreen();
    expect(
      screen.getByRole('button', { name: /decrease day start time/i }),
    ).toBeOnTheScreen();
    expect(
      screen.getByRole('button', { name: /increase day start time/i }),
    ).toBeOnTheScreen();

    // It renders a time picker for the day end time.
    expect(screen.getByText(/ending at/i)).toBeOnTheScreen();
    expect(screen.getByText(props.dayEndTime)).toBeOnTheScreen();
    expect(
      screen.getByRole('button', { name: /decrease day end time/i }),
    ).toBeOnTheScreen();
    expect(
      screen.getByRole('button', { name: /increase day end time/i }),
    ).toBeOnTheScreen();
  });

  test('given any props: renders a button to activate each day of the week', () => {
    const props = createProps();

    render(<SettingsScreenComponent {...props} />);

    expect(screen.getByRole('button', { name: /mon/i })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /tue/i })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /wed/i })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /thu/i })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /fri/i })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /sat/i })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /sun/i })).toBeOnTheScreen();
  });

  test('given all days are active: shows a message to the user letting them know that currently all days are active', () => {
    const props = createProps({
      allDaysAreActive: true,
      mondayIsActive: true,
      tuesdayIsActive: true,
      wednesdayIsActive: true,
      thursdayIsActive: true,
      fridayIsActive: true,
      saturdayIsActive: true,
      sundayIsActive: true,
    });

    render(<SettingsScreenComponent {...props} />);

    expect(
      screen.getByText(/all days are currently active/i),
    ).toBeOnTheScreen();
  });

  test('given not all days are currently active: hides the message to the user letting them know that currently all days are active', () => {
    const props = createProps({
      allDaysAreActive: false,
      mondayIsActive: false,
      tuesdayIsActive: true,
      wednesdayIsActive: true,
      thursdayIsActive: true,
      fridayIsActive: true,
      saturdayIsActive: true,
      sundayIsActive: true,
    });

    render(<SettingsScreenComponent {...props} />);

    expect(
      screen.queryByText(/all days are currently active/i),
    ).not.toBeOnTheScreen();
  });
});
