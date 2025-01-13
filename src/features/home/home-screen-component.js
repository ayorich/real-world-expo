import { Button, Icon } from '@rneui/themed';
import { router } from 'expo-router';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { darkColors } from '../../styles/colors';
import { ReminderItemComponent } from './reminder-item-component';

export function HomeScreenComponent({ onDeleteReminder, reminders = [] }) {
  return (
    <>
      <SafeAreaProvider>
        <View style={styles.container}>
          <SafeAreaView>
            {reminders.length > 0 ? (
              <FlatList
                accessibilityRole="list"
                data={reminders}
                renderItem={({ item }) => (
                  <ReminderItemComponent
                    id={item.id}
                    key={item.id}
                    message={item.message}
                    onDeletePressed={() =>
                      Alert.alert(
                        'Delete Alert',
                        'Do you want to delete this reminder',
                        [
                          {
                            text: 'Yes',
                            onPress: () => onDeleteReminder(item.id),
                          },
                          { text: 'No' },
                        ],
                      )
                    }
                    onPress={value =>
                      value.id && router.push(`/reminders/${value.id}`)
                    }
                  />
                )}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyContainerText}>
                  You have no reminders yet. Click the button below to add a new
                  reminder.
                </Text>
              </View>
            )}

            <Button
              containerStyle={styles.reminderButtonContainer}
              onPress={() => router.push('/reminders/create')}
              style={styles.reminderButton}
            >
              <Icon size={25} type="ionicon" name="add-outline" color="white" />
              <Text style={styles.reminderButtonText}>Create Reminder</Text>
            </Button>
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: darkColors.backgroundColorSecondary,
    borderTopColor: darkColors.borderColor,
    borderTopWidth: 1,
    flex: 1,
  },
  reminderButton: {
    color: '#fff',
  },
  reminderButtonContainer: {
    backgroundColor: darkColors.backgroundColorTertiary,
    borderTopColor: darkColors.borderColor,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  reminderButtonText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainerText: {
    color: '#919090',
    fontSize: 20,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
});
