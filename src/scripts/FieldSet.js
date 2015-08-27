import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


class FieldSet extends React.Component {
  render() {
    const { className, label, children, ...props } = this.props;
    const fsClassNames = classnames(className, `slds-form--compound`);
    return (
      <fieldset className={ fsClassNames } { ...props }>
        {
          label ?
          <legend className='slds-form-element__label'>{ label }</legend> :
          null
        }
        <div className='form-element__group'>
          { children }
        </div>
      </fieldset>
    );
  }
}

FieldSet.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};

FieldSet.isFormElement = true;


class Row extends React.Component {
  render() {
    const { className, cols, children } = this.props;
    const totalCols = cols || React.Children.count(children);
    const rowClassNames = classnames(className, 'slds-form-element__row');
    return (
      <div className={ rowClassNames }>
        { React.Children.map(children, this.renderChild.bind(this, totalCols)) }
      </div>
    );
  }

  renderChild(totalCols, child) {
    const klass = child.type;
    if (!klass.isFormElement) {
      const { label, ...props } = child.props;
      return (
        <FormElement label={ label } totalCols={ totalCols } { ...props }>
          { React.cloneElement(child, { label: null }) }
        </FormElement>
      );
    } else {
      return React.cloneElement(child, { totalCols });
    }
  }
}

Row.propTypes = {
  className: PropTypes.string,
  cols: PropTypes.number,
};

FieldSet.Row = Row;

export default FieldSet;
