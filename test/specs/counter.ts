/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import CounterPage from '../pages/CounterPage';

describe('counter', () => {
  beforeEach(() => {
    CounterPage.navigateTo();
  });

  it('should default to count 1', () => {
    expect(CounterPage.count).to.equal(0);
  });

  it('should increment count when increment is clicked', () => {
    CounterPage.incrementCount();
    expect(CounterPage.count).to.equal(1);
  });

  it('should decrement count when decrement is clicked', () => {
    CounterPage.decrementCount();
    expect(CounterPage.count).to.equal(-1);
  });

  it('should delay increment when delayed increment is clicked', () => {
    CounterPage.delayIncrementCount();

    expect(CounterPage.count).to.equal(0);
    expect(CounterPage.delayedIncrementPending).to.be.true;

    CounterPage.waitUntilDelayedIncrementComplete();
    expect(CounterPage.count).to.equal(1);
  });
});
