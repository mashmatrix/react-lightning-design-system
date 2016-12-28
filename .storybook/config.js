import 'babel-polyfill';
import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { setAssetRoot } from '../src/scripts/util';

setAddon(infoAddon);

if (/\.sbook\.io/.test(location.hostname)) {
  setAssetRoot('https://unpkg.com/@salesforce-ux/design-system@2.1.4/assets');
}

configure(() => {
  require('../stories/index.js');
}, module);
