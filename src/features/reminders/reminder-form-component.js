import { Button } from '@rneui/themed';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { darkColors } from '../../styles/colors';

const noop = () => {};

export function ReminderFormComponent({
  message = '',
  onChangeText = noop,
  onSubmit = noop,
  submitLabel = 'Submit',
}) {
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={72}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <TextInput
            cursorColor={darkColors.primaryColor}
            multiline
            numberOfLines={4}
            onChangeText={onChangeText}
            placeholder="Write your reminder ..."
            placeholderTextColor={darkColors.textSecondary}
            style={styles.inputStyles}
            value={message}
          />

          <Button
            containerStyle={styles.reminderButtonContainer}
            disabled={!message.trim()}
            onPress={() => onSubmit(message.trim())}
          >
            {submitLabel}
          </Button>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkColors.backgroundColorSecondary,
    flex: 1,
  },
  safeArea: {
    borderTopColor: darkColors.borderColor,
    borderTopWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  reminderButtonContainer: {
    backgroundColor: darkColors.backgroundColorTertiary,
    borderTopColor: darkColors.borderColor,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginHorizontal: -16,
  },
  inputStyles: {
    color: 'white',
    flex: 1,
    flexDirection: 'column',
    fontSize: 20,
  },
});
