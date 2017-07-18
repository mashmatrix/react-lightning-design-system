# [React Lightning Design System](https://mashmatrix.github.io/react-lightning-design-system/)
[![Build Status](https://travis-ci.org/mashmatrix/react-lightning-design-system.svg?branch=master)](https://travis-ci.org/mashmatrix/react-lightning-design-system)

[Salesforce Lightning Design System](http://www.lightningdesignsystem.com/) components built with React.

See the [demo](https://mashmatrix.github.io/react-lightning-design-system/).


## Install

```
$ npm install react-lightning-design-system
```

## Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-lightning-design-system';

function click() { alert('Clicked'); }

ReactDOM.render(
  <div>
    <Button onClick={ click }>Simple</Button>
    <Button type='neutral' onClick={ click }>Neutral</Button>
    <Button type='brand' onClick={ click }>Brand</Button>
    <Button type='neutral' icon='download' iconAlign='left' onClick={ click }>Icon #1</Button>
    <Button type='neutral' disabled>Disabled Neutral</Button>
    <Button type='brand' disabled>Disabled Brand</Button>
  </div>
, document.body);
```

See more examples in [examples](https://github.com/mashmatrix/react-lightning-design-system/tree/master/stories) directory.


## Running example stories locally

This repo ships with a react storybook based story scripts.
To run stories and get component examples, follow these steps:

1. run ```npm install```
2. run ```npm run storybook```
3. Find the stories running on [localhost:9001](http://localhost:9001).

## Snapshot testing in react storybook

This repo ships with story snapshots to examine differences in rendering as a result of changes to source code.

To identify render differences run ```npm run test:storyshots```.  If  all changes are intentional run ```npm run test:storyshots -- -u```.  To learn about other run options including *interactive mode*, read
[Snapshot Testing in React Storybook](https://voice.kadira.io/snapshot-testing-in-react-storybook-43b3b71cec4f)
