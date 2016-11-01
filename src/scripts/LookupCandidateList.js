import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Icon from './Icon';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-container';

const LookupEntryType = PropTypes.shape({
  category: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  context: PropTypes.object,
});

class LookupCandidateList extends Component {

  componentDidMount() {
    if (this.props.focus) {
      this.focusToTargetItemEl(0);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.focus && !prevProps.focus) {
      this.focusToTargetItemEl(0);
    }
  }

  onSelect(entry) {
    if (this.props.onSelect) {
      this.props.onSelect(entry);
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 38 || e.keyCode === 40) { // UP/DOWN
      e.preventDefault();
      e.stopPropagation();
      const currentEl = e.target.parentElement;
      let itemEl = e.keyCode === 40 ? currentEl.nextSibling : currentEl.previousSibling;
      while (itemEl) {
        const anchorEl = itemEl.querySelector('.react-slds-candidate[tabIndex]');
        if (anchorEl && !anchorEl.disabled) {
          anchorEl.focus();
          return;
        }
        itemEl = e.keyCode === 40 ? itemEl.nextSibling : itemEl.previousSibling;
      }
    } else if (e.keyCode === 27) { // ESC
      e.preventDefault();
      e.stopPropagation();
      this.onSelect(null);
    }
  }

  focusToTargetItemEl(index) {
    const el = ReactDOM.findDOMNode(this);
    const anchors = el.querySelectorAll('.react-slds-candidate[tabIndex]');
    if (anchors[index]) {
      anchors[index].focus();
    }
  }

  renderCandidate(entry) {
    const icon = entry.context ?
      this.renderCustomIcon(entry) :
      <Icon category={ entry.category } icon={ entry.icon } size='small' />;
    return (
      <li className='slds-lookup__item' key={ `${entry.value}_${entry.label}` }>
        <a
          className='slds-truncate react-slds-candidate'
          tabIndex={ -1 }
          role='option'
          onKeyDown={ (e) => e.keyCode === 13 && this.onSelect(entry) }
          onBlur={ this.props.onBlur }
          onClick={ () => this.onSelect(entry) }
        >
        { icon }
        { !this.props.hideLabel ? entry.label : null }
        </a>
      </li>
    );
  }
  renderCustomIcon(entry) {
    const customClasses = classnames(
      'slds-avatar',
      { 'slds-avatar--circle': entry.context.img },
      'slds-avatar--small'
    );
    return (
      <div key={ entry.label } className={'custom_icon'}>
        <div className={'slds-show--inline-block'}>
          <span className={customClasses} >
            {
              (entry.context.img)
              ? (<img src={ entry.context.img } alt='entry.context.title' />)
              : (<Icon category={ entry.category } icon={ entry.icon } size='small' />)
            }
          </span>
        </div>
        <div
          className={classnames('slds-text-body--regular',
            'slds-show--inline-block',
            'slds-p-left--x-small')}
          style={ { verticalAlign: 'top' } }
        >
          <div >{ entry.context.title }</div>
          <div className='slds-text-body--small'>{entry.context.sub_title}</div>
        </div>
      </div>);
  }

  loadMoreData(page) {
    console.log('candid', this.props.searchText);
    if (this.props.onSearchTextChange) this.props.onSearchTextChange(this.props.searchText, page);
  }

  render() {
    const { data = [], hidden, loading, header, footer, filter = () => true } = this.props;
    const lookupMenuClassNames = classnames(
      'slds-lookup__menu',
      { 'slds-hide': hidden, 'slds-show': !hidden }
    );
    return (
      <div
        className={ lookupMenuClassNames }
        role='listbox'
        onKeyDown={ this.onKeyDown.bind(this) }
      >
        {
          header ?
            <div className='slds-lookup__item'>{ header }</div> :
            undefined
        }
        <ul className='slds-lookup__list' role='presentation'>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMoreData}
            hasMore={this.props.hasMore}
            useWindow={false}
            element='div'
            initialLoad={false}
            threshold={20}
            loader={<li className='slds-lookup__item' key='loading'>
              <Spinner size='small' style={ { margin: '0 auto' } } />
            </li>}
          >
          {
            data.filter(filter).map(this.renderCandidate.bind(this))
          }
          </InfiniteScroll>
          {
            loading ?
              <li className='slds-lookup__item' key='loading'>
                <Spinner size='small' style={ { margin: '0 auto' } } />
              </li> :
              undefined
          }
        </ul>
        {
          footer ?
            <div className='slds-lookup__item'>{ footer }</div> :
            undefined
        }
      </div>
    );
  }

}

LookupCandidateList.propTypes = {
  data: PropTypes.arrayOf(LookupEntryType),
  focus: PropTypes.bool,
  loading: PropTypes.bool,
  hidden: PropTypes.bool,
  hideLabel: PropTypes.bool,
  filter: PropTypes.func,
  onSelect: PropTypes.func,
  onBlur: PropTypes.func,
  header: PropTypes.node,
  footer: PropTypes.node,
  hasMore: PropTypes.bool,
  searchText: PropTypes.string,
  onSearchTextChange: PropTypes.func,
};
