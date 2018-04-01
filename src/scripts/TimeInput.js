import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';
import Input from './Input';
import Icon from './Icon';
import DropdownMenu, { DropdownMenuItem } from './DropdownMenu';
import { registerStyle } from './util';
import PropTypes from 'prop-types';

export default class TimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: `form-element-${uuid()}`,
      opened: (props.defaultOpened || false),
    };
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.inputRef = this.inputRef.bind(this);
    this.dropdownRef = this.dropdownRef.bind(this);

    this.timeepoch = {
      10: 600,
      15: 900,
      20: 1200,
      25: 1500,
      30: 1800,
      DAY: 86400,
    };
    registerStyle('no-hover-popup', [
      [
        '.slds-dropdown-trigger:hover .slds-dropdown--menu.react-slds-no-hover-popup',
        '{ visibility: hidden; opacity: 0; }',
      ],
      [
        '.slds-dropdown-trigger.react-slds-dropdown-opened .slds-dropdown--menu',
        '{ visibility: visible !important; opacity: 1 !important; }',
      ],
    ]);
  }

  componentWillMount() {
    this.options = this.buildTimeOptions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onValueChange && prevState.value !== this.state.value) {
      this.props.onValueChange(this.state.value, prevState.value);
    }
  }

  onMenuItemClick(event) {
    const value = event.target.textContent;
    this.closeTimePopUp();
    this.setState({ value, inputValue: value });
  }

  onInputKeyDown(e) {
    if (e.keyCode === 13) { // return key
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onComplete) {
        setTimeout(() => {
          this.props.onComplete();
        }, 10);
      }
    } else if (e.keyCode === 27) { // esc
      this.closeTimePopUp();
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  onInputChange(e) {
    const inputValue = e.target.value;
    this.setState({ inputValue, value: inputValue });
    if (this.props.onChange) {
      this.props.onChange(e, inputValue);
    }
  }

  onInputBlur() {
    this.closeTimePopUp();
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        if (this.props.onBlur) {
          this.props.onBlur();
        }
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
    }, 10);
  }

  isFocusedInComponent() {
    const rootEl = ReactDOM.findDOMNode(this);
    let targetEl = document.activeElement;
    while (targetEl && targetEl !== rootEl) {
      targetEl = targetEl.parentNode;
    }
    return !!targetEl;
  }

  focusToTargetItemEl() {
    if (this.state.opened) {
      const inputEl = ReactDOM.findDOMNode(this.input);
      setTimeout(() => {
        inputEl.focus();
      }, 20);
    }
  }

  toggleTimemenu() {
    setTimeout(() => {
      this.setState({ opened: !this.state.opened });
      this.focusToTargetItemEl();
    }, 10);
  }

  closeTimePopUp() {
    setTimeout(() => {
      this.setState({ opened: false });
    }, 10);
  }

  buildTimeOptions() {
    const [resolution, format, inputValue] = [this.props.resolution,
      this.props.format, this.props.inputValue];
    // min 10 - max 30 || default 30 min || format 12||24
    const step = (resolution in this.timeepoch) ? (resolution) : (30);
    let loops = (this.timeepoch.DAY / this.timeepoch[step]) + 1;
    let [hour, min, AMPM] = [0, 0, 'AM'];
    let [minToDisplay, hour12format, hour24format, finalOption] = [0, 0, 0, 0];
    let isSelected = 'none';
    const options = [];

    while (loops) {
      minToDisplay = (min === 0) ? ('00') : (min);
      hour12format = (hour > 12) ? (hour - 12) : (hour);
      hour12format = (hour === 0) ? (12) : (hour12format);
      hour12format = (hour12format < 10) ? (`0${hour12format}`) : (hour12format); // optional
      hour24format = (hour < 10) ? (`0${hour}`) : (hour); // optional
      finalOption = (format === 12)
        ? (`${hour12format}:${minToDisplay} ${AMPM}`)
        : (`${hour24format}:${minToDisplay}`);
      isSelected = (finalOption === inputValue) ? ('check') : ('none');
      options.push(
        <DropdownMenuItem
          key={loops}
          onClick={this.onMenuItemClick}
          icon={isSelected}
          value={finalOption}
        >
        {finalOption}
        </DropdownMenuItem>);
      min += step;
      if (min === 60) {
        hour += 1;
        min = 0;
      }
      if (hour === 12 && min === 0) {
        AMPM = (AMPM === 'AM') ? ('PM') : ('AM');
      }
      loops--;
    }
    return options;
  }

  inputRef(ref) {
    this.input = ref;
  }

  dropdownRef(ref) {
    this.dropdown = ref;
  }

  renderInput({ inputValue, openMenuOnInputClick, dontUseDefaultValue, ...props }) {
    const internalInputValue = dontUseDefaultValue
      ? this.state.inputValue
      : this.state.inputValue || inputValue;
    return (
      <div className='slds-input-has-icon slds-input-has-icon--right'>
        <Input
          ref={this.inputRef}
          { ...props }
          value={ internalInputValue }
          onKeyDown={ this.onInputKeyDown.bind(this) }
          onChange={ this.onInputChange.bind(this) }
          onBlur={ this.onInputBlur.bind(this) }
          onClick={ openMenuOnInputClick ? this.toggleTimemenu.bind(this) : undefined }
        />
        <Icon
          icon='clock'
          className='slds-input__icon'
          style={ { cursor: 'pointer' } }
          onClick={ this.toggleTimemenu.bind(this) }
        />
      </div>
    );
  }

  render() {
    const id = this.props.id || this.state.id;
    const {
      className,
      totalCols, cols, label, required, error,
      maxHeight, ...props } = this.props;

    const dropdownClassNames = classnames(
      className,
      'slds-dropdown-trigger',
      {
        'react-slds-dropdown-opened': this.state.opened,
      }
    );

    const formElemProps = { id, totalCols, cols, label, required, error };
    delete props.resolution;
    delete props.onValueChange;
    return (
      <FormElement key={id} { ...formElemProps }>
        <div className={ dropdownClassNames }>
        { this.renderInput({ id, ...props }) }
          <DropdownMenu
            align={ 'left' }
            size={ 'small' }
            autoFocus
            ref={this.dropdownRef}
            maxHeight={maxHeight}
            onKeyDown={this.onInputKeyDown.bind(this)}
          >
          {this.options}
          </DropdownMenu>
        </div>
      </FormElement>
    );
  }
}

TimeInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  format: PropTypes.number,
  resolution: PropTypes.number,
  inputValue: PropTypes.string,
  maxHeight: PropTypes.number,
  onMenuItemClick: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string,
  defaultOpened: PropTypes.bool,
  dateFormat: PropTypes.string,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onComplete: PropTypes.func,
  dontUseDefaultValue: PropTypes.bool,
  openMenuOnInputClick: PropTypes.bool,
};

TimeInput.isFormElement = true;
