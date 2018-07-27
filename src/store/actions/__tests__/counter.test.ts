import { delayedIncrement } from '../counter';

jest.useFakeTimers();

describe('counter', () => {
  describe('delayedIncrement', () => {
    it('should emit a begin and complete event', () => {
      const dispatch = jest.fn();
      delayedIncrement({ amount: 1 })(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: 'BEGIN_DELAYED_INCREMENT', payload: {} });

      jest.runAllTimers();

      expect(dispatch).toHaveBeenCalledWith({
        type: 'COMPLETE_DELAYED_INCREMENT',
        payload: { amount: 1 },
      });
    });
  });
});
