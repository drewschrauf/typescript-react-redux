import {
  beginDelayedIncrement,
  completeDelayedIncrement,
  decrementBy,
  incrementBy,
} from '../actions/counter';
import counter from '../reducers/counter';

const exampleState = { count: 0, pending: false };

describe('counter', () => {
  it('should increase count by amount with incrementBy', () => {
    const result = counter(exampleState, incrementBy({ amount: 1 }));
    expect(result.count).toBe(1);
  });

  it('should decrease count by amount with decrementBy', () => {
    const result = counter({ ...exampleState, count: 3 }, decrementBy({ amount: 1 }));
    expect(result.count).toBe(2);
  });

  it('should set pending to true with beginDelayedIncrement', () => {
    const result = counter(exampleState, beginDelayedIncrement({}));
    expect(result.pending).toBe(true);
  });

  it('should set pending to false with completeDelayedIncrement', () => {
    const result = counter(
      { ...exampleState, pending: true },
      completeDelayedIncrement({ amount: 1 }),
    );
    expect(result.pending).toBe(false);
  });
});
