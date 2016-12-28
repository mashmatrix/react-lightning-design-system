import 'babel-polyfill';
import svg4everybody from 'svg4everybody';
import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { setAssetRoot } from '../src/scripts/util';

setAddon(infoAddon);

if (/\.sbook\.io/.test(location.hostname)) {
  setAssetRoot('//mashmatrix.github.io/react-lightning-design-system/assets');
  svg4everybody({ polyfill: true });
}

configure(() => {
  require('../stories/index.js');
}, module);
