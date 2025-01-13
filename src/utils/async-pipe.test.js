import { asyncPipe } from './async-pipe';

const asyncInc = async x => x + 1;
const asyncDouble = async x => x * 2;

describe('asyncPipe()', () => {
  test('given two promises: composes them in reverse mathematical order', async () => {
    const asyncIncDouble = asyncPipe(asyncInc, asyncDouble);

    const actual = await asyncIncDouble(20);
    const expected = 42;

    expect(actual).toEqual(expected);
  });
});
