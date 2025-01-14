import { addHours, format, parse, subHours } from 'date-fns';

/**
 * Parses a time string into a Date object.
 *
 * @param {string} timeStr - The time string in 'HH:mm' format.
 * @returns {Date} - The Date object.
 */
const parseTime = timeString => parse(timeString, 'HH:mm', new Date());

/**
 * Increments the hour in a given time string.
 *
 * @param {string} timeStr - The time string in 'HH:mm' format.
 * @returns {string} - The incremented time string.
 */
export const incrementTime = timeString =>
  format(addHours(parseTime(timeString), 1), 'HH:mm');

/**
 * Decrements the hour in a given time string.
 *
 * @param {string} timeStr - The time string in 'HH:mm' format.
 * @returns {string} - The decremented time string.
 */
export const decrementTime = timeString =>
  format(subHours(parseTime(timeString), 1), 'HH:mm');
