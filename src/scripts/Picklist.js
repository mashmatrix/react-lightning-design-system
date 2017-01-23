import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';
import Icon from './Icon';
import { default as DropdownMenu, DropdownMenuItem } from './DropdownMenu';


export default class Picklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: `form-element-${uuid()}`,
      opened: props.defaultOpened,
      value: props.defaultValue,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onValueChange && prevState.value !== this.state.value) {
      this.props.onValueChange(this.state.value, prevState.value);
    }
  }

  onClick() {
    this.setState({ opened: !this.state.opened });
    if (this.state.opened) {
      setTimeout(() => {
        this.focusToTargetItemEl();
      }, 10);
    }
  }

  onPicklistItemClick(item, e) {
    this.setState({ value: item.value });
    if (this.props.onChange) {
      this.props.onChange(e, item.value);
    }
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
    setTimeout(() => {
      this.setState({ opened: false });
      if (this.props.onComplete) {
        this.props.onComplete();
      }
      const picklistButtonEl = ReactDOM.findDOMNode(this.refs.picklistButton);
      if (picklistButtonEl) {
        picklistButtonEl.focus();
      }
    }, 200);
    e.preventDefault();
    e.stopPropagation();
  }

  onPicklistClose() {
    const picklistButtonEl = ReactDOM.findDOMNode(this.refs.picklistButton);
    picklistButtonEl.focus();
    this.setState({ opened: false });
  }

  onBlur() {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        this.setState({ opened: false });
        if (this.props.onBlur) {
          this.props.onBlur();
        }
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
    }, 10);
  }

  onKeydown(e) {
    if (e.keyCode === 40) { // down
      e.preventDefault();
      e.stopPropagation();
      if (!this.state.opened) {
        this.setState({ opened: true });
        setTimeout(() => {
          this.focusToTargetItemEl();
        }, 10);
      } else {
        this.focusToTargetItemEl();
      }
    } else if (e.keyCode === 27) { // ESC
      e.preventDefault();
      e.stopPropagation();
      this.setState({ opened: false });
      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  getSelectedValue() {
    const { defaultValue, value } = this.props;
    return (
      typeof value !== 'undefined' ? value :
      typeof this.state.value !== 'undefined' ? this.state.value :
      defaultValue
    );
  }

  getSelectedItemLabel() {
    const selectedValue = this.getSelectedValue();
    let selected = null;
    React.Children.forEach(this.props.children, (item) => {
      if (item.props.value === selectedValue) {
        selected = item.props.label || item.props.children;
      }
    });
    return (selected || this.props.selectedText);
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
    const dropdownEl = ReactDOM.findDOMNode(this.refs.dropdown);
    const firstItemEl =
      dropdownEl.querySelector('.slds-is-selected > .react-slds-menuitem[tabIndex]') ||
      dropdownEl.querySelector('.react-slds-menuitem[tabIndex]');
    if (firstItemEl) {
      firstItemEl.focus();
    }
  }

  renderPicklist(props) {
    const { className, id, ...pprops } = props;
    delete pprops.initialValue;
    delete pprops.onUpdate;
    delete pprops.valid;
    delete pprops.invalid;
    delete pprops.dirty;
    delete pprops.pristine;
    delete pprops.active;
    delete pprops.touched;
    delete pprops.visited;
    delete pprops.maxHeight;
    delete pprops.onValueChange;
    delete pprops.defaultOpened;
    delete pprops.menuSize;
    delete pprops.selectedText;
    delete pprops.onBlur;
    const picklistClassNames = classnames(className, 'slds-picklist');
    return (
      <div className={ picklistClassNames } aria-expanded={ this.state.opened }>
        <button
          id={ id }
          ref='picklistButton'
          className='slds-picklist__label slds-button slds-button--neutral'
          type='button' aria-haspopup
          onClick={ this.onClick.bind(this) }
          onBlur={ this.onBlur.bind(this) }
          onKeyDown={ this.onKeydown.bind(this) }
          { ...pprops }
        >
          <span className='slds-truncate'>
            { this.getSelectedItemLabel() || <span>&nbsp;</span> }
          </span>
          <Icon icon='down' />
        </button>
      </div>
    );
  }

  renderDropdown() {
    const { menuSize, children, maxHeight } = this.props;
    return (
      this.state.opened ?
        <DropdownMenu
          ref='dropdown'
          maxHeight={ maxHeight }
          size={ menuSize }
          onMenuItemClick={ this.onPicklistItemClick.bind(this) }
          onMenuClose={ this.onPicklistClose.bind(this) }
        >
          { React.Children.map(children, this.renderPicklistItem.bind(this)) }
        </DropdownMenu> :
        <div ref='dropdown' />
    );
  }

  renderPicklistItem(item) {
    const selected = item.props.value === this.getSelectedValue();
    const onBlur = this.onBlur.bind(this);
    return React.cloneElement(item, { selected, onBlur });
  }

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, totalCols, cols, ...props } = this.props;
    const dropdown = this.renderDropdown();
    const formElemProps = { id, label, required, error, totalCols, cols, dropdown };
    return (
      <FormElement { ...formElemProps }>
        { this.renderPicklist({ ...props, id }) }
      </FormElement>
    );
  }

}

Picklist.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  selectedText: PropTypes.string,
  defaultOpened: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onSelect: PropTypes.func,
  onComplete: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  menuSize: PropTypes.string,
  children: PropTypes.node,
  maxHeight: PropTypes.number,
};


Picklist.isFormElement = true;


export const PicklistItem = ({ label, selected, children, ...props }) => (
  <DropdownMenuItem
    icon={ selected ? 'check' : 'none' }
    role='menuitemradio'
    selected={ selected }
    { ...props }
  >
    { label || children }
  </DropdownMenuItem>
);

PicklistItem.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  selected: PropTypes.bool,
  value: PropTypes.any,
  children: PropTypes.node,
};
