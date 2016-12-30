import React, { PropTypes } from 'react';

import { Toast } from './Notification';

const ModalToast = ({ text, ...props }) =>
  <div className='slds-notify_container'>
    <Toast { ...props }>{ text }</Toast>
  </div>;

ModalToast.propTypes = {
  text: PropTypes.string,
};

export default ModalToast;
