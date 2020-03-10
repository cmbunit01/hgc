/*

  Init file used to manage imports and initialisation of apps.

*/

import { stringsBase, stringsFullscreenMenu, stringsHamburger, stringsNavCards } from './cfg/DOMStrings.js';
import { fullscreenMenu } from './fullscreenMenu/app.js';
import { navCards } from './nav/cards/app.js';

fullscreenMenu.init([[], stringsFullscreenMenu, stringsHamburger]);
navCards.init(["highlights-cards", [stringsBase, stringsNavCards]]);
