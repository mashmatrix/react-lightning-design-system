import React, { PropTypes } from 'react';
import Button from './Button';
import Input from './Input';
// import classnames from 'classnames';

export default class SearchButtonField extends React.Component {
  expandField() {

  }

  render() {
    return (
      <div>
        <Input placeholder={this.props.placeholder} />
        <Button type='icon-border' icon='search' />
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
