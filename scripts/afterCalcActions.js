'use strict';

import { Base } from './calculator/calcObjects/Base.js';
import { Profit } from './calculator/calcObjects/Profit.js';
import { Risk } from './calculator/calcObjects/Risk.js';

const [, clearAllBtn, clearBtn] = document.querySelectorAll('.after-calcBtn');

clearAllBtn.addEventListener('click', () => {
  Base.clearAll();
  Risk.clearAll();
  Profit.clearAll();
});

clearBtn.addEventListener('click', () => {
  Base.clear();
  Risk.clear();
  Profit.clear();
});
