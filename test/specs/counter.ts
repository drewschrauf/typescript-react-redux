import assert from 'assert';

import CounterPage from '../pages/CounterPage';

describe('counter', () => {
  beforeEach(() => {
    CounterPage.navigateTo();
  });

  it('should default to count 1', () => {
    assert.equal(CounterPage.count, 0);
  });

  it('should increment count when increment is clicked', () => {
    CounterPage.incrementCount();
    assert.equal(CounterPage.count, 1);
  });

  it('should decrement count when decrement is clicked', () => {
    CounterPage.decrementCount();
    assert.equal(CounterPage.count, -1);
  });

  it('should delay increment when delayed increment is clicked', () => {
    CounterPage.delayIncrementCount();

    assert.equal(CounterPage.count, 0);
    assert.ok(CounterPage.delayedIncrementPending);

    CounterPage.waitUntilDelayedIncrementComplete();
    assert.equal(CounterPage.count, 1);
  });
});
