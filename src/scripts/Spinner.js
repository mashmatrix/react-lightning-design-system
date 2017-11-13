import React from 'react';
import classnames from 'classnames';
import util from './util';
import PropTypes from './propTypesImport';


const Spinner = ({ className, size, type, alt, ...props }) => {
  const spinnerClassNames = classnames(className, `slds-spinner--${size}`);
  const spinnerImgName =
    type === 'brand' ? 'slds_spinner_brand' :
    type === 'inverse' ? 'slds_spinner_inverse' :
    'slds_spinner';
  return (
    <div className={ spinnerClassNames } { ...props }>
      <img src={ `${util.getAssetRoot()}/images/spinners/${spinnerImgName}.gif` } alt={ alt } />
    </div>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string,
};

export default Spinner;
