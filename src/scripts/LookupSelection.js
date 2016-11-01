import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Icon from './Icon';
import Button from './Button';

export class LookupSelection extends Component {

  componentDidMount() {
    if (this.props.autoFocus) ReactDOM.findDOMNode(this.refs.pill).focus();
  }
  onKeyDown(e) {
    if (e.keyCode === 8 || e.keyCode === 46) { // Bacspace / DEL
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onResetSelection) {
        this.props.onResetSelection();
      }
    }
  }

  renderPill(selected) {
    const onPillClick = (e) => {
      e.target.focus();
      e.preventDefault();
      e.stopPropagation();
    };
    const styles = { height: '28px' };
    return (
      <a
        style={ styles }
        className='slds-pill slds-truncate'
        id={ this.props.id }
        ref='pill'
        onKeyDown={ this.onKeyDown.bind(this) }
        onClick={ onPillClick }
        tabIndex={ 0 }
      >
        {
          selected.icon ?
            <Icon
              className='slds-pill__icon'
              category={ selected.category }
              icon={ selected.icon }
            /> :
            undefined
        }
        <span className='slds-pill__label'>{ selected.label }</span>
        <Button
          className='slds-pill__remove'
          type='icon-bare'
          icon='close'
          alt='Remove'
          tabIndex={ -1 }
          onClick={ this.props.onResetSelection }
        />
      </a>
    );
  }

  render() {
    const { hidden, selected } = this.props;
    const lookupClassNames = classnames(
      { 'slds-hide': hidden }
    );
    return (
      <div className={ lookupClassNames }>
        <div className='slds-pill__container'>
          { selected ? this.renderPill(selected) : undefined }
        </div>
      </div>
    );
  }

}

const LookupEntryType = PropTypes.shape({
  category: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  context: PropTypes.object,
});

LookupSelection.propTypes = {
  id: PropTypes.string,
  selected: LookupEntryType,
  hidden: PropTypes.bool,
  onResetSelection: PropTypes.func,
  autoFocus: PropTypes.bool,
};
