import React from 'react';

import { MediaObject } from 'react-lightning-design-system';

export default () => {
  const image1 = (
    <img
      src={'../../assets/images/avatar3.jpg'}
      style={{ height: 100 }}
      alt='Placeholder'
    />
  );

  return (
    <div>
      <h2 className='slds-m-vertical--medium'>Media Object 1</h2>
      <div>
        <MediaObject figureLeft={image1} />
      </div>
      <h2 className='slds-m-vertical--medium'>Media Object 1</h2>
      <div>
        <MediaObject figureLeft={image1}>
          <p>
            Sit nulla est ex deserunt exercitation anim occaecat.
            Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.
            Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.
          </p>
        </MediaObject>
      </div>
    </div>
  );
};
