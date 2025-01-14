import { fireEvent, render, screen } from '@testing-library/react-native';

import { createPopulatedReminder } from '../reminders/reminders-factories';
import { ReminderItemComponent } from './reminder-item-component';

const createProps = ({
  id = createPopulatedReminder().id,
  message = createPopulatedReminder().message,
  onDeletePressed = jest.fn(),
  onPress = jest.fn(),
} = {}) => ({ id, message, onDeletePressed, onPress });

describe('ReminderItemComponent', () => {
  test('given a message: displays the message', () => {
    const props = createProps();

    render(<ReminderItemComponent {...props} />);

    expect(screen.getByText(props.message)).toBeOnTheScreen();
  });

  test('given an on press handler: clicking the item triggers the listener', () => {
    const props = createProps();

    render(<ReminderItemComponent {...props} />);

    const button = screen.getByRole('button', { name: props.message });
    fireEvent.press(button);

    expect(props.onDeletePressed).toHaveBeenCalledTimes(0);
    expect(props.onPress).toHaveBeenCalledWith({ id: props.id });
  });

  test('given an on delete pressed handler: clicking the delete button triggers the listener', () => {
    const props = createProps();

    render(<ReminderItemComponent {...props} />);

    const button = screen.getByLabelText(/delete/i);
    fireEvent.press(button);

    expect(props.onPress).toHaveBeenCalledTimes(0);
    expect(props.onDeletePressed).toHaveBeenCalledWith({ id: props.id });
  });
});
