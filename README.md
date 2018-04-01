## Install

```
$ yarn add react-lightning-design-components
```

## Example

```javascript
import React from 'react';
import { Button } from 'react-lightning-design-components';

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

See more examples in [examples](https://github.com/stomita/react-lightning-design-system/tree/master/examples) directory.


## Running examples locally

This repo ships with a simple Express app which serves up examples of the components on ```http://localhost:3000```.  To get that running follow these steps:

1. run ```yarn``` in this repo's root directory.
2. ```cd examples```
3. In the examples directory run:
   * ```yarn --ignore-engines```
   * ```yarn start:dev```
4. Find the examples running on [localhost:3001](http://localhost:3001).
