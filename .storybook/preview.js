import 'core-js/stable';
import { withScreenshot } from 'storycap';
import wrapSLDS from './wrapSLDS';

let assetRoot;
if (typeof location !== 'undefined' && location.hostname === 'mashmatrix.github.io') {
  assetRoot = '//mashmatrix.github.io/react-lightning-design-system/assets';
}

const withSLDS = wrapSLDS({ assetRoot });

export const decorators = [
  withScreenshot,
  withSLDS,
];

export const parameters = {
  // Global parameter is optional.
  screenshot: {
    // Put global screenshot parameters(e.g. viewport)
  },
};