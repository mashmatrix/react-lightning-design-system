import React, { PropTypes } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';

export default class FormElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = { id: props.id || 'form-element-' + uuid() };
  }

  render() {
    const { label, ...props } = this.props;
    const inputId = props.id || this.state.id;
    return (
      <div className='slds-form-element'>
        {
          label ?
          <label className='slds-form-element__label' htmlFor={ inputId }>
            { label }
          </label> :
          null
        }
        <div className='slds-form-element__control'>
          { this.renderControl(props) }
        </div>
      </div>
    );
  }

  renderControl() {
    return null;
  }

}
