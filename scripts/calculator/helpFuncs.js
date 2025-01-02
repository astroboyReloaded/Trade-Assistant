'use strict';

export const val = (e) => Number(e.target.value);

export const isPositive = (v) => {
  return v > 0 ? v : 0;
};

export const formatValue = (v, numOfDecimals) => {
  if (v === null) return null;
  return Number.isInteger(v) ? v : v.toFixed(numOfDecimals);
};

export const formatPercentage = (v) => {
  return Number.isInteger(v) ? v : parseFloat(v.toFixed(2).toString());
};
