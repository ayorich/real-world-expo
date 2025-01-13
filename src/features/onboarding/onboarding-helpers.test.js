import { isGranted } from './onboarding-helpers';

describe('isGranted()', () => {
  test.each([
    { status: 'granted', expected: true },
    { status: 'denied', expected: false },
    { status: 'undetermined', expected: false },
  ])('given a status of $status: returns $expected', ({ status, expected }) => {
    const actual = isGranted(status);

    expect(actual).toEqual(expected);
  });
});
