import { renderHook } from '@testing-library/react-native';

import { useEffectOnce } from './use-effect-once';

describe('useEffectOnce()', () => {
  test('runs the effect exactly once per component mount', () => {
    const effect = jest.fn();

    expect(effect).not.toHaveBeenCalled();

    const { rerender } = renderHook(() => useEffectOnce(effect));

    expect(effect).toHaveBeenCalledTimes(1);

    rerender();

    expect(effect).toHaveBeenCalledTimes(1);
  });
});
