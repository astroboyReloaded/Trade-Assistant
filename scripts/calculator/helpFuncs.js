'use strict';

export const val = (e) => Number(e.target.value);

export const isPositive = (v) => {
  return v > 0 ? true : false;
};
