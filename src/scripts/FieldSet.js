import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';


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
    const klass = child.type;
    if (!klass.isFormElement) {
      const {
        id = `form-element-${uuid()}`, label, required, error, readOnly, cols,
      } = child.props;
      const formElemProps = { id, label, required, error, readOnly, totalCols, cols };
      return (
        <FormElement { ...formElemProps }>
          { React.cloneElement(child, {
            id, label: undefined, required: undefined, error: undefined,
          }) }
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
