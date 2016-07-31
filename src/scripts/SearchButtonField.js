import React, { PropTypes } from 'react';
import Button from './Button';
import Input from './Input';
import Icon from './Icon';
import { registerStyle } from './util';
import classnames from 'classnames';

export default class SearchButtonField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      collapsing: false,
      value: '',
    };
    this.expandField = this.expandField.bind(this);
    this.collapseField = this.collapseField.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    registerStyle('search-button-field', [
      [
        '.search-button-field-container',
        '{ position: relative; display: flex; justify-content: flex-end; width: 100%; }',
      ],
      [
        '.search-button-field-input',
        '{ position: absolute; top:0; right: 0; opacity: 0; ' +
        'max-width: 0; transition: max-width 500ms ease-in-out 300ms,' +
        ' opacity 300ms ease-in-out 300ms; }',
      ],
      [
        '.search-button-field-input.expanded',
        '{ max-width: 100%; opacity: 1; }',
      ],
      [
        '.search-button-field-input.expanded.collapsing',
        '{ max-width: 0; opacity: 0;' +
        'transition: max-width 500ms ease-in-out, opacity 200ms ease-in-out 300ms;}',
      ],
      [
        '.search-button-field-btn',
        '{ background-color: white; opacity: 1; transition: opacity 300ms ease-in-out; }',
      ],
      [
        '.search-button-field-btn.expanded',
        '{ background-color: white; opacity: 0; cursor: default; }',
      ],
      [
        '.search-button-field-btn.expanded.collapsing',
        '{ opacity: 1; transition: opacity 300ms ease-in-out 700ms; }',
      ],
      [
        '.search-button-field-cancel',
        '{ background-color: #4F6A92; border-radius: 50%;' +
        'width: 13px; height: 13px; padding: 2px;' +
        'position: absolute; top: 27%; right: -14px; z-index: 1;' +
        'opacity: 0; transition: opacity 300ms ease-in-out 300ms; }',
      ],
      [
        '.search-button-field-cancel.expanded',
        '{ opacity: 1; right: 8px; }',
      ],
      [
        '.search-button-field-cancel.expanded:hover',
        '{ background-color: #1589ee; cursor: pointer; }',
      ],
      [
        '.search-button-field-cancel.expanded:hover:active',
        '{ background-color: #0070d2; cursor: pointer; }',
      ],
      [
        '.search-button-field-cancel.expanded.collapsing',
        '{ opacity: 0; transition: opacity 300ms ease-in-out; }',
      ],
    ]);
  }

  onCancelClick() {
    this.collapseField();
    if (this.props.onCancel) this.props.onCancel();
  }

  onChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.onChange) this.props.onChange(event);
  }

  onKeyDown(event) {
    if (event.keyCode === 13 && this.props.onEnter) {
      this.props.onEnter(event);
    }
  }

  expandField() {
    this.setState({ expanded: true });
  }

  collapseField() {
    this.setState({ collapsing: true, value: '' });
    setTimeout(() => {
      this.setState({ collapsing: false, expanded: false });
    }, 500);
  }

  render() {
    return (
      <div className='search-button-field-container'>
        <Input
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          value={this.state.value}
          onKeyDown={this.onKeyDown}
          className={
            classnames(
              'search-button-field-input',
              this.state.expanded ? 'expanded' : '',
              this.state.collapsing ? 'collapsing' : ''
            )
          }
        />
        <Icon
          category='action'
          icon='reject'
          size='x-small'
          className={
            classnames(
              'search-button-field-cancel',
              this.state.expanded ? 'expanded' : '',
              this.state.collapsing ? 'collapsing' : ''
            )
          }
          onClick={this.onCancelClick}
        />
        <Button
          type='icon-border'
          icon='search'
          className={
            classnames(
              'search-button-field-btn',
              this.state.expanded ? 'expanded' : '',
              this.state.collapsing ? 'collapsing' : ''
            )
          }
          onClick={this.expandField}
        />
      </div>
    );
  }
}

SearchButtonField.propTypes = {
  placeholder: PropTypes.string,
  onCancel: PropTypes.func,
  onClosed: PropTypes.func,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
};

SearchButtonField.defaultProps = {
  placeholder: 'Search this feed',
};
