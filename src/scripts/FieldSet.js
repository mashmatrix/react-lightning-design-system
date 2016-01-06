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
  children: PropTypes.node,
};

FieldSet.isFormElement = true;


class Row extends React.Component {
  renderChild(totalCols, child) {
    const klass = child.type;
    if (!klass.isFormElement) {
      const { label, ...props } = child.props;
      return (
        <FormElement label={ label } totalCols={ totalCols } { ...props }>
          { React.cloneElement(child, { label: null }) }
        </FormElement>
      );
    }

    return React.cloneElement(child, { totalCols });
  }

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
}

Row.propTypes = {
  className: PropTypes.string,
  cols: PropTypes.number,
  children: PropTypes.node,
};

FieldSet.Row = Row;

export default FieldSet;
