import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Textarea extends React.Component {

  render() {
    const { label, ...props } = this.props;
    if (label) {
      return (
        <FormElement>
          <Textarea { ...props } />
        </FormElement>
      );
    }
    const { className, id, ...pprops } = props;
    const taClassNames = classnames(className, 'slds-input');
    return (
      <textarea className={ taClassNames } id={ id } { ...pprops } />
    );
  }

}

Textarea.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
};
