'use strict';

import { Base } from './calculator/calcObjects/Base.js';
import { Profit } from './calculator/calcObjects/Profit.js';
import { Risk } from './calculator/calcObjects/Risk.js';
import { Size } from './calculator/calcObjects/Size.js';

const [, clearAllBtn, clearBtn] = document.querySelectorAll('.after-calcBtn');

clearAllBtn.addEventListener('click', () => {
  Base.clearAll();
  Risk.clearAll();
  Profit.clear();
  Size.clear();
  Base.balanceInput.focus();
});

clearBtn.addEventListener('click', () => {
  Base.clear();
  Risk.clear();
  Profit.clear();
  Size.clear();
  Base.entryInput.focus();
});
