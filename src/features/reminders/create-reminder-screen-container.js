import { compose } from '@reduxjs/toolkit';
import { router } from 'expo-router';
import { connect } from 'react-redux';

import { withHeader } from '../navigation/with-header';
import { ReminderFormContainer } from './reminder-form-container';
import { createReminder } from './reminders-factories';
import { reminderAdded } from './reminders-reducer';

const mapStateToProps = () => ({
  submitLabel: 'Add Reminder',
});

const mapDispatchToProps = dispatch => ({
  onSubmit: message => {
    dispatch(reminderAdded(createReminder({ message })));
    router.back();
  },
});

export default compose(
  withHeader({ title: 'Add Reminder' }),
  connect(mapStateToProps, mapDispatchToProps),
)(ReminderFormContainer);
