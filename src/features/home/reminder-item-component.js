import { Button, Text } from '@rneui/themed';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { darkColors } from '../../styles/colors';

export function ReminderItemComponent({
  id,
  message,
  onDeletePressed,
  onPress,
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      onPress={() => onPress({ id })}
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{message}</Text>
      </View>

      <Button
        accessibilityLabel="delete"
        icon={{
          color: darkColors.textSecondary,
          name: 'trash-outline',
          size: 20,
          type: 'ionicon',
        }}
        onPress={() => onDeletePressed({ id })}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: darkColors.backgroundColorSecondary,
    borderBottomColor: darkColors.borderColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: '100%',
  },
  textContainer: {
    flex: 3,
  },
  text: {
    color: darkColors.textPrimary,
    fontSize: 20,
  },
});
