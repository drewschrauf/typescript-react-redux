import test from 'ava';
import * as enzyme from 'enzyme';
import * as sinon from 'sinon';

import * as React from 'react';

import { AppComponent } from '../src/Counter';

test.beforeEach(t => {
  t.context.defaultProps = {
    count: 1,
    decrement: sinon.spy(),
    delayedIncrement: sinon.spy(),
    increment: sinon.spy(),
    pending: false,
  };
});

test('renders current count', t => {
  const root = enzyme.shallow(<AppComponent {...t.context.defaultProps} />);
  t.is(root.find('h1').text(), 'Count 1');
});

test('increment button invokes increment', t => {
  const root = enzyme.shallow(<AppComponent {...t.context.defaultProps} />);
  const handler = root.find('.increment').prop('onClick');

  t.truthy(handler);
  (handler as any)();
  t.is((t.context.defaultProps.increment as sinon.SinonSpy).callCount, 1);
});

test('delayed increment is enabled by default', t => {
  const root = enzyme.shallow(<AppComponent {...t.context.defaultProps} />);
  t.falsy(root.find('.delayed-increment').prop('disabled'));
});

test('delayed increment is disabled if pending', t => {
  const root = enzyme.shallow(<AppComponent {...t.context.defaultProps} pending />);
  t.true(root.find('.delayed-increment').prop('disabled'));
});
