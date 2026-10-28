import 'core-js/stable';
import { createElement, StrictMode } from 'react';
import { withScreenshot } from 'storycap';
import wrapSLDS from './wrapSLDS';

let assetRoot;
if (typeof location !== 'undefined' && location.hostname === 'mashmatrix.github.io') {
  assetRoot = '//mashmatrix.github.io/react-lightning-design-system/assets';
}

const withSLDS = wrapSLDS({ assetRoot });

// Run every story under StrictMode so effect replays and leaked DOM props show up.
const withStrictMode = (story) => createElement(StrictMode, null, story());

export const decorators = [
  withScreenshot,
  withSLDS,
  withStrictMode,
];

export const parameters = {
  // Global parameter is optional.
  screenshot: {
    // Put global screenshot parameters(e.g. viewport)
  },
};