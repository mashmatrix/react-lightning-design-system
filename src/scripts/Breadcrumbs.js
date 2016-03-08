import React, { PropTypes } from 'react';

export default class Breadcrumbs extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <nav role='navigation'>
        <ol
          className='slds-breadcrumb slds-list--horizontal'
          aria-labelledby='bread-crumb-label'
        >
          {items.map((item, index) => {
            return (
              <li
                key={ index }
                className='slds-list__item slds-text-heading--label'
              >
                <a href={ item.href }>{ item.label }</a>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: React.PropTypes.string,
    href: React.PropTypes.string,
  })).isRequired,
};
