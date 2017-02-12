import test from "ava";

import {
  beginDelayedIncrement,
  completeDelayedIncrement,
  decrementBy,
  incrementBy,
} from "../../../src/store/actions/counter";
import counter from "../../../src/store/reducers/counter";

const exampleState = { count: 0, pending: false };

test("incrementBy increases count by amount", (t) => {
  const result = counter(exampleState, incrementBy({ amount: 1 }));
  t.is(result.count, 1);
});

test("decrementBy decreases count by amount", (t) => {
  const result = counter({ ...exampleState, count: 3 }, decrementBy({ amount: 1 }));
  t.is(result.count, 2);
});

test("beginDelayedIncrement sets pending to true", (t) => {
  const result = counter(exampleState, beginDelayedIncrement({}));
  t.is(result.pending, true);
});

test("completeDelayedIncrement sets pending to true", (t) => {
  const result = counter({ ...exampleState, pending: true }, completeDelayedIncrement({ amount: 1 }));
  t.is(result.pending, false);
});
