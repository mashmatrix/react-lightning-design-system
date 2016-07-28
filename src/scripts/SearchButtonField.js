import React, { PropTypes } from 'react';
import Button from './Button';
import Input from './Input';
import { registerStyle } from './util';
import classnames from 'classnames';

export default class SearchButtonField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.expandField = this.expandField.bind(this);
    registerStyle('search-button-field', [
      [
        '.search-button-field-container',
        '{ position: relative; display: flex; justify-content: flex-end; }',
      ],
      [
        '.search-button-field-input.expanded',
        '{ max-width: 100%; }',
      ],
      [
        '.search-button-field-input',
        '{ position: absolute; top:0; right: 0;' +
        'max-width: 0; transition: max-width 500ms ease-in-out 100ms; }',
      ],
      [
        '.search-button-field-btn',
        '{ background-color: white; opacity: 1; transition: opacity 300ms ease-in-out; }',
      ],
      [
        '.search-button-field-btn.expanded',
        '{ background-color: white; opacity: 0; }',
      ],
    ]);
  }

  expandField() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <div className='search-button-field-container'>
        <Input
          placeholder={this.props.placeholder}
          className={
            classnames('search-button-field-input', this.state.expanded ? 'expanded' : '')
          }
        />
        <Button
          type='icon-border'
          icon='search'
          className={
            classnames('search-button-field-btn', this.state.expanded ? 'expanded' : '')
          }
          onClick={this.expandField}
        />
      </div>
    );
  }
}

SearchButtonField.propTypes = {
  placeholder: PropTypes.string,
};

SearchButtonField.defaultProps = {
  placeholder: 'Search this feed',
};
