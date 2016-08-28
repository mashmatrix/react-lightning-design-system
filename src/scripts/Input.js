import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';


export default class Input extends Component {
  onChange(e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const { id = `input-${uuid()}`, label, required, error, readonly, ...props } = this.props;
    if (label || required || error) {
      const formElemProps = { id, label, required, error };
      return (
        <FormElement { ...formElemProps }>
          <Input readOnly={readonly} { ...{ ...props, id } } />
        </FormElement>
      );
    }
    const { className, type, bare, ...pprops } = props;
    delete pprops.initialValue;
    delete pprops.onUpdate;
    delete pprops.valid;
    delete pprops.invalid;
    delete pprops.dirty;
    delete pprops.pristine;
    delete pprops.active;
    delete pprops.touched;
    delete pprops.visited;
    delete pprops.onSearchTextChange;
    delete pprops.targetScope;
    delete pprops.onScopeMenuClick;
    delete pprops.onScopeChange;
    delete pprops.onPressDown;
    delete pprops.onComplete;
    delete pprops.defaultValue;
    const inputClassNames = classnames(className, bare ? 'slds-input--bare' : 'slds-input');
    return (
      <input
        readOnly={readonly}
        className={ inputClassNames }
        type={ type }
        onChange={ this.onChange.bind(this) }
        { ...pprops }
      />
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  readonly: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  bare: PropTypes.bool,
  onChange: PropTypes.func,
};
