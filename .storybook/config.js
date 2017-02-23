import 'babel-polyfill';
import svg4everybody from 'svg4everybody';
import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { setAssetRoot } from '../src/scripts/util';

setAddon(infoAddon);

if (/\.sbook\.io/.test(location.hostname)) {
  // As storybook hub cannot host the static files, use the externally hosted SLDS assets (CORS enabled)
  setAssetRoot('//mashmatrix.github.io/react-lightning-design-system/assets');
  // As SVG doesn't allow the use of cross-domain external resources (even CORS header is set in resource server)
  // forcedly use svg4everybody polyfill
  svg4everybody({ polyfill: true });
} else if (location.hostname === 'mashmatrix.github.io') {
  setAssetRoot('/react-lightning-design-system/assets');
}

configure(() => {
  require('../stories/index.js');
}, module);
