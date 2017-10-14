import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormElement from './FormElement';
import { uuid } from './util';


const FieldSet = ({ className, label, children, ...props }) => {
  const fsClassNames = classnames(className, 'slds-form--compound');
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
};

FieldSet.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};

FieldSet.isFormElement = true;


class Row extends Component {
  renderChild(totalCols, child) {
    if (child && !child.type.isFormElement) {
      const { id = `form-element-${uuid()}` } = child.props;
      const formElemProps = { id, totalCols, cols: 1 };
      return (
        <FormElement { ...formElemProps }>
          { React.cloneElement(child, { id }) }
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

Row.isFormElement = true;

FieldSet.Row = Row;

export default FieldSet;
