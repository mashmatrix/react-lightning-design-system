import 'babel-polyfill';
import svg4everybody from 'svg4everybody';
import { configure, setAddon, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import infoAddon, { setDefaults } from '@storybook/addon-info';
import wrapContent from './wrapContent';
import infoAddonDefaults from './infoAddonDefaults';

let assetRoot;
if (typeof location !== 'undefined') {
  if (/\.sbook\.io/.test(location.hostname)) {
    // As storybook hub cannot host the static files, use the externally hosted SLDS assets (CORS enabled)
    assetRoot = '//mashmatrix.github.io/react-lightning-design-system/assets';
    // As SVG doesn't allow the use of cross-domain external resources (even CORS header is set in resource server)
    // forcedly use svg4everybody polyfill
    svg4everybody({ polyfill: true });
  } else if (location.hostname === 'mashmatrix.github.io') {
    assetRoot = '//mashmatrix.github.io/react-lightning-design-system/assets';
  }
}

setDefaults(infoAddonDefaults);
setAddon(infoAddon);
addDecorator(withKnobs);
addDecorator(wrapContent({ assetRoot }));

configure(() => {
  require('../stories/index.js');
}, module);
