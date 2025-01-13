import { fireEvent, render, screen } from '@testing-library/react-native';

import { ReminderFormComponent } from './reminder-form-component';
import { createPopulatedReminder } from './reminders-factories';

const createProps = ({
  onChangeText = jest.fn(),
  onSubmit = jest.fn(),
  ...rest
} = {}) => ({ onChangeText, onSubmit, ...rest });

describe('ReminderFormComponent', () => {
  test('given no props: renders a placeholder and a submit button', () => {
    render(<ReminderFormComponent />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeOnTheScreen();
    expect(
      screen.getByPlaceholderText('Write your reminder ...'),
    ).toBeOnTheScreen();
  });

  test('given an initial message: renders it in the input', () => {
    const { message } = createPopulatedReminder();
    const props = createProps({ message });

    render(<ReminderFormComponent {...props} />);

    expect(screen.getByDisplayValue(message)).toBeOnTheScreen();
  });

  test('given a submit label: renders the correct label for the button', () => {
    const submitLabel = 'Add Reminder';
    const props = createProps({ submitLabel });

    render(<ReminderFormComponent {...props} />);

    expect(screen.getByRole('button', { name: submitLabel })).toBeOnTheScreen();
  });

  test('given typing into the input: calls the onChangeText listener', () => {
    const props = createProps();

    render(<ReminderFormComponent {...props} />);

    const message = 'Some new reminder text.';
    fireEvent.changeText(
      screen.getByPlaceholderText('Write your reminder ...'),
      message,
    );

    expect(props.onChangeText).toHaveBeenCalled();
  });

  test('given pressing the submit button: calls the onSubmit listener and trims leading and trailing whitespace', () => {
    const expectedMessage = 'This is a test.';
    const message = `  ${expectedMessage}   `;
    const props = createProps({ message });

    render(<ReminderFormComponent {...props} />);

    fireEvent.press(screen.getByRole('button', { name: 'Submit' }));

    expect(props.onSubmit).toHaveBeenCalledWith(expectedMessage);
  });
});
