import { decrementTime, incrementTime } from './settings-helpers';

describe('decrementTime()', () => {
  test.each([
    { time: '00:00', expected: '23:00' },
    { time: '09:00', expected: '08:00' },
    { time: '12:00', expected: '11:00' },
    { time: '14:21', expected: '13:21' },
    { time: '23:00', expected: '22:00' },
  ])('given a time $time: decrements it by one hour', ({ time, expected }) => {
    const actual = decrementTime(time);

    expect(actual).toEqual(expected);
  });
});

describe('incrementTime()', () => {
  test.each([
    { time: '00:00', expected: '01:00' },
    { time: '09:00', expected: '10:00' },
    { time: '12:00', expected: '13:00' },
    { time: '14:21', expected: '15:21' },
    { time: '23:00', expected: '00:00' },
  ])('given a time $time: increments it by one hour', ({ time, expected }) => {
    const actual = incrementTime(time);

    expect(actual).toEqual(expected);
  });
});
