Freebird
========

## Packaged for Booster Media

### Description
Run dev.html in your browser to view game.
All javascript is in sf/ directory
Assets are in a/ directory
Do not edit index.html directly. Rather make changes in dev.html
and run the build script to generate new index.html

See `booster.js` in document root to start the game after BoosterMedia's 
splash intro is completed and to handle the 'More Games' button on the
main screen

### Build script
Runing min.py will

1. Concatenate all javascript in dev.html
2. Save to temporary all.js file
3. Send all.js to Google closure compiler
4. Save minified code to g.js
5. Create updated index.html which references g.js

**note** requires Python and Beautiful Soup module


For further info contact: eoin.mcg@gmail.com
