# react-lightning-design-system

Salesforce Lightning Design System components built with React http://www.lightningdesignsystem.com/

# Install

```
$ npm install react-lightning-design-system
```

# Usage

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
