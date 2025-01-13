import { useState } from 'react';

import { ReminderFormComponent } from './reminder-form-component';

export const ReminderFormContainer = ({ message, ...props }) => {
  const [currentMessage, setCurrentMessage] = useState(message);

  return (
    <ReminderFormComponent
      {...props}
      message={currentMessage}
      onChangeText={setCurrentMessage}
    />
  );
};
