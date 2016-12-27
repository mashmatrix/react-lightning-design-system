import 'babel-polyfill';
import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

setAddon(infoAddon);

configure(() => {
  require('../stories/index.js');
}, module);
