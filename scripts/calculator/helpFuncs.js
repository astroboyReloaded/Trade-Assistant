'use strict';

import { UIState } from './UIState.js';

export const val = (e) => Number(e.target.value);

export const autoUpdateLockedStack = () => {
  UIState.lockedStack.length === 4 &&
    UIState.updateLockedState(UIState.shiftFromLockedStack(), false, true);
};

export const isPositive = (v) => {
  return v > 0 ? v : 0;
};

export const formatValue = (v, format) => {
  if (v === null) return null;
  return Number.isInteger(v) ? v : v.toFixed(format);
};

export const formatPercentage = (v) => {
  return Number.isInteger(v) ? v : v.toFixed(2);
};
