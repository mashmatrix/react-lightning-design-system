import React from 'react';
import { ComponentSettings } from '../src/scripts';

export default function wrapSLDS(options) {
  return story => (
    <ComponentSettings assetRoot={ options.assetRoot } portalClassName='slds'>
      {story()}
    </ComponentSettings>
  );
}
