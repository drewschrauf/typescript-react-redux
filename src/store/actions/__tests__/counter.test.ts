import { delayedIncrementBy } from '../counter';
import ActionType from '../ActionType';

jest.useFakeTimers();

describe('counter', () => {
  describe('delayedIncrement', () => {
    it('should emit a begin and complete event', async () => {
      const dispatch = jest.fn();
      const promise = delayedIncrementBy({ amount: 1 })(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.BEGIN_DELAYED_INCREMENT,
        payload: {},
      });

      jest.runAllTimers();
      await promise;

      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.COMPLETE_DELAYED_INCREMENT,
        payload: { amount: 1 },
      });
    });
  });
});
