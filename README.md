# Trade-Assistant
A position size calculator to manage risk on financial market trades.

Developer Documentation:

- The number of decimals displayed in the inputs/outputs is determened by the currency-types. The hepler function recieves the value to clean de displayed number.

- The Balance Plays a different rol in the locked inputs interactivity. It does not form part of the locked stack, therefore it does not get unlocked automatically, nor it interferes with the calculations order. The only difference the lock of this input makes is weather the amounts get calculated or not wen other fields are changed. When the Balance is not locked, the 'amount' inputs calculate the Balance on change.

## Features:
- Allows for precise calculations from any other value for flexible management adjustment with strategy.

## Usage:
- The Position Size will allways represent the amount in the Balance-Currency. The Lot Size is meant to represent the amount in the Base-symbol.
- Selecting "Balance in Base currency" means there is no convertion needed, as the product is the currency itself.
- Selecting "Balance as Price currency" means the Position Size is converted to the Base currency to represent the number of units to purchase.
- Selecting "Convertion rate" means non the Base or the Price are the same as the Balance currency, and the Position Size must be converted to a different Forex value.

## Future Features:
- UI will know when the SL or TP are in the wrong side of the Entry Price, or when any of these values are negative. The UI will Change color in some places to indicate that the position is being registered as long or short.
- It will prevent the user from entering a SL or TP with less than 10 pips from the Entry Price.
- The las two values that get input dont get locked automatically, not only the take profi values. 
- Tab into the History button. Open it with enter.