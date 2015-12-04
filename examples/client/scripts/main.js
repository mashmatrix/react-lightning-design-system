import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { util } from 'react-lightning-design-system';

import Root from './components/Root';

util.setAssetRoot(path.join(location.pathname, 'assets'));

ReactDOM.render(<Root />, document.getElementById('root'));
