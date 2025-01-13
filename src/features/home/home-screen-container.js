import { compose } from '@reduxjs/toolkit';
import { router } from 'expo-router';
import { connect } from 'react-redux';

import { HeaderButton } from '../../components/header-button';
import { withHeader } from '../navigation/with-header';
import { withNotificationPermissions } from '../onboarding/with-notification-permission';
import {
  reminderDeleted,
  selectRemindersArray,
} from '../reminders/reminders-reducer';
import { HomeScreenComponent } from './home-screen-component';

const mapStateToProps = state => ({
  reminders: selectRemindersArray(state),
});

const mapDispatchToProps = {
  onDeleteReminder: reminderDeleted,
};

export const HomeScreenContainer = compose(
  withHeader({
    title: 'Reminders',
    headerLeft: () => (
      <HeaderButton
        iconName="cog-outline"
        onPress={() => router.push('/settings')}
      />
    ),
  }),
  withNotificationPermissions,
  connect(mapStateToProps, mapDispatchToProps),
)(HomeScreenComponent);
