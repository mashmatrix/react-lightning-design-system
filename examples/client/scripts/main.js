import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { util } from 'react-lightning-design-system';
import { hot } from 'react-hot-loader'
import Root from './components/Root';

util.setAssetRoot(path.join(location.pathname, 'assets'));

const HotApp = hot(module)(Root);
ReactDOM.render(<HotApp />, document.getElementById('root'));
