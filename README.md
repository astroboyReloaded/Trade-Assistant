# Trade-Assistant
A position size calculator to manage risk on financial market trades.

Development Documentation.

- The Balance Plays a different rol in the locked inputs interactivity. It does not form part of the locked stack, therefore it does not get unlocked automatically, nor it interferes with the calculations order. The only difference the lock of this input makes is weather the amounts get calculated or not wen other fields are changed. When the Balance is not locked, the 'amount' inputs calculate the Balance on change.

## Future Features:
- UI will know when the SL or TP are in the wrong side of the Entry Price, or when any of these values are negative. It will prevent the user from entering a SL or TP with less than 10 pips from the Entry Price. The UI will Change color in some places to indicate that the position is being registered as long or short.
- Tab into the History button. Open it with enter.