import * as _ from "lodash";
import { createAction } from "../util";
import { DECREMENT, INCREMENT } from "./constants";

export interface IncrementAmount {
  readonly amount: number;
}

export const incrementBy = createAction<IncrementAmount>(INCREMENT);
export const decrementBy = createAction<IncrementAmount>(DECREMENT);
