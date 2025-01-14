import { render, screen } from '@testing-library/react-native';

import { createPopulatedReminder } from '../reminders/reminders-factories';
import { HomeScreenComponent } from './home-screen-component';

const createProps = ({
  onDeleteReminder = jest.fn(),
  reminders = [createPopulatedReminder(), createPopulatedReminder()],
} = {}) => ({ onDeleteReminder, reminders });

describe('HomeScreenComponent', () => {
  test('given any props: renders the create reminder button', () => {
    const props = createProps();

    render(<HomeScreenComponent {...props} />);

    expect(
      screen.getByRole('button', { name: /create reminder/i }),
    ).toBeOnTheScreen();
  });

  test('given an empty list of reminders: renders the empty state message', () => {
    const props = createProps({ reminders: [] });

    render(<HomeScreenComponent {...props} />);

    expect(screen.queryByRole('list')).not.toBeOnTheScreen();
    expect(screen.getByText(/you have no reminders yet/i)).toBeOnTheScreen();
  });

  test('given some reminders: renders a list of reminders', () => {
    const props = createProps();

    render(<HomeScreenComponent {...props} />);

    expect(
      screen.queryByText(/you have no reminders yet/i),
    ).not.toBeOnTheScreen();

    for (const reminder of props.reminders) {
      expect(screen.getByText(reminder.message)).toBeOnTheScreen();
    }
  });
});
