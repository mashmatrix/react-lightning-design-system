import 'babel-polyfill';
import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { setAssetRoot } from '../src/scripts/util';

setAddon(infoAddon);

if (/\.sbook\.io/.test(location.hostname)) {
  setAssetRoot('http://mashmatrix.github.io/react-lightning-design-system/assets');
}

configure(() => {
  require('../stories/index.js');
}, module);
