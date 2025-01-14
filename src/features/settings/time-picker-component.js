import { Button, Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';

const noop = () => {};

export function TimePickerComponent({
  currentTime = '00:00',
  decreaseLabel = 'decrease time by one hour',
  decrementButtonEnabled = true,
  increaseLabel = 'increase time by one hour',
  incrementButtonEnabled = true,
  onDecrementPress = noop,
  onIncrementPress = noop,
  title = 'Pick a time:',
}) {
  return (
    <View style={styles.timePickerContainer}>
      <Text h3 h3Style={styles.currentTimeHeading}>
        {title}
      </Text>

      <View style={styles.timePickerButtonContainer}>
        <Text h4 h4Style={styles.currentTime}>
          {currentTime}
        </Text>

        <Button
          accessibilityLabel={decreaseLabel}
          disabled={!decrementButtonEnabled}
          icon={{ name: 'remove', color: 'white' }}
          onPress={onDecrementPress}
          size="sm"
        />

        <Button
          accessibilityLabel={increaseLabel}
          disabled={!incrementButtonEnabled}
          icon={{ name: 'add', color: 'white' }}
          onPress={onIncrementPress}
          size="sm"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timePickerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  currentTimeHeading: {
    fontSize: 20,
  },
  currentTime: {
    marginRight: 8,
  },
  timePickerButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
