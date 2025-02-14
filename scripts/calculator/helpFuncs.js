'use strict';

export const val = (e) => Number(e.target.value);

export function enforcePositiveNumber(val) {
  const value = Math.abs(val);
  this.value = value;
  return value;
}

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
