import { fireEvent, render, screen } from '@testing-library/react-native';

import { TimePickerComponent } from './time-picker-component';

const createProps = ({
  currentTime = '09:00',
  decreaseLabel = 'decrease day start time',
  decrementButtonEnabled = true,
  increaseLabel = 'increase day start time',
  incrementButtonEnabled = true,
  onDecrementPress = jest.fn(),
  onIncrementPress = jest.fn(),
  title = 'Your day starts at:',
} = {}) => ({
  currentTime,
  decreaseLabel,
  decrementButtonEnabled,
  increaseLabel,
  incrementButtonEnabled,
  onDecrementPress,
  onIncrementPress,
  title,
});

describe('TimePickerComponent', () => {
  test('given a title and a current time: renders the title and the current time', () => {
    const props = createProps();

    render(<TimePickerComponent {...props} />);

    expect(screen.getByText(props.title)).toBeOnTheScreen();
    expect(screen.getByText(props.currentTime)).toBeOnTheScreen();
  });

  test('given a pressing the button with the decrease label: triggers the onDecrementPress listener', () => {
    const props = createProps();

    render(<TimePickerComponent {...props} />);

    const button = screen.getByLabelText(props.decreaseLabel);
    fireEvent.press(button);

    expect(props.onDecrementPress).toHaveBeenCalledTimes(1);
  });

  test('given a pressing the button with the increase label: triggers the onIncrementPress listener', () => {
    const props = createProps();

    render(<TimePickerComponent {...props} />);

    const button = screen.getByLabelText(props.increaseLabel);
    fireEvent.press(button);

    expect(props.onIncrementPress).toHaveBeenCalledTimes(1);
  });

  test('given decrementButtonEnabled as false: disables the decrement button', () => {
    const props = createProps({ decrementButtonEnabled: false });

    render(<TimePickerComponent {...props} />);

    const button = screen.getByLabelText(props.decreaseLabel);
    expect(button).toBeDisabled();
  });

  test('given incrementButtonEnabled as false: disables the increment button', () => {
    const props = createProps({ incrementButtonEnabled: false });

    render(<TimePickerComponent {...props} />);

    const button = screen.getByLabelText(props.increaseLabel);
    expect(button).toBeDisabled();
  });
});
