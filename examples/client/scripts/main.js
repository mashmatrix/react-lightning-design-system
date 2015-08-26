import path from 'path';
import React from 'react';
import { util } from 'react-lightning-design-system';

import Root from './components/Root';

util.setAssetRoot(path.join(path.dirname(location.pathname), 'assets') + '/');

React.render(<Root />, document.getElementById('root'));
