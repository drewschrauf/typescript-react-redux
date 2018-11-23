import { delayedIncrement } from '../counter';
import ActionType from '../ActionType';

jest.useFakeTimers();

describe('counter', () => {
  describe('delayedIncrement', () => {
    it('should emit a begin and complete event', () => {
      const dispatch = jest.fn();
      delayedIncrement({ amount: 1 })(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.BEGIN_DELAYED_INCREMENT,
        payload: {},
      });

      jest.runAllTimers();

      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.COMPLETE_DELAYED_INCREMENT,
        payload: { amount: 1 },
      });
    });
  });
});
