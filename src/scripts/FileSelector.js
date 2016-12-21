import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import uuid from 'uuid';
import FormElement from './FormElement';
import Button from './Button';

export default class FileSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: null,
    };
    this.onDrop = this.onDrop.bind(this);
    this.onDropError = this.onDropError.bind(this);
  }

  onDrop(file) {
    if (this.props.isSlave) {
      this.props.onError(file[0] ? null : this.props.errorMessage);
      return;
    }
    this.setState({
      errorMsg: !file[0] ? this.props.errorMessage : null,
    });
  }

  onDropError(error) {
    this.setState({
      errorMsg: error,
    });
  }

  render() {
    const {
      id = `input-${uuid()}`, label, accept, multiple, buttonText, errorMessage, ...props
    } = this.props;

    const error = this.state.errorMsg;

    if (label || error) {
      const formElemProps = {
        id,
        label,
        error,
      };

      return (
        <FormElement { ...formElemProps }>
          <FileSelector
            id={ id }
            accept={ accept }
            multiple={ multiple }
            buttonText={ buttonText }
            errorMessage={ errorMessage }
            isSlave
            onError={ this.onDropError }
            { ...props }
          />
        </FormElement>
      );
    }

    return (
      <div className='slds-file-selector slds-file-selector--files'>
        <Dropzone
          multiple={ multiple }
          accept={ accept }
          onDrop={this.onDrop}
          className='slds-file-selector__dropzone'
          activeClassName='slds-has-drag-over'
          rejectClassName='slds-has-drag-over'
          inputProps={ { className: 'slds-file-selector__input' } }
        >
          <label className='slds-file-selector__body' htmlFor={ id }>
            <Button className='slds-file-selector__button' type='neutral' icon='upload' iconAlign='left'>{ buttonText }</Button>
            <span className='slds-file-selector__text slds-medium-show'>or Drop Files</span>
          </label>
        </Dropzone>
      </div>
    );
  }
}

FileSelector.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: FormElement.propTypes.error,
  errorMessage: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  buttonText: PropTypes.string,
  isSlave: PropTypes.bool,
  onError: PropTypes.func,
};
