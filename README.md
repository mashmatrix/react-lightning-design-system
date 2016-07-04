#[React Lightning Design System](https://mashmatrix.github.io/react-lightning-design-system/)
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
import { Button } from 'react-lightning-design-system';

function click() { alert('Clicked'); }

React.render(
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

See more examples in [examples](https://github.com/mashmatrix/react-lightning-design-system/tree/master/examples) directory.


## Running examples locally

This repo ships with a simple Express app which serves up examples of the components on ```http://localhost:3000```.  To get that running follow these steps:

1. run ```npm install``` and ```npm run build``` in this repo's root directory.
2. ```cd examples```
3. In the examples directory run:
   * ```npm install```
   * ```npm start```
4. Find the examples running on [localhost:3000](http://localhost:3000).
