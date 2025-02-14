'use strict';

import { Base } from './calculator/calcObjects/Base.js';
import { Profit } from './calculator/calcObjects/Profit.js';
import { Risk } from './calculator/calcObjects/Risk.js';
import { Size } from './calculator/calcObjects/Size.js';
import { Calc } from './calculator/Calculator.js';
import { UIState } from './calculator/UIState.js';

const [, clearAllBtn, clearBtn] = document.querySelectorAll('.after-calcBtn');

clearAllBtn.addEventListener('click', () => {
  Base.clearAll();
  Risk.clearAll();
  Profit.clearAll();
  Size.clear();
  UIState.clear();
  Base.balanceInput.focus();
});

clearBtn.addEventListener('click', () => {
  Base.clear();
  Risk.clear();
  Profit.clear();
  Size.clear();
  UIState.clear();
  Calc.RiskAmount();
  Base.entryInput.focus();
});
