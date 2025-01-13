import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';

export const createReminder = ({
  id = '',
  message = '',
  dateCreated = new Date().toISOString(),
} = {}) => ({ message, id, dateCreated });

export const createPopulatedReminder = ({
  id = createId(),
  message = faker.word.words(),
  dateCreated = faker.date.recent().toISOString(),
} = {}) => createReminder({ id, message, dateCreated });
