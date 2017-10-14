import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class MediaObject extends Component {
  renderFigure(figure, className) {
    if (!figure) return null;
    return (
      <div className={classNames('slds-media__figure', className)}>
        {figure}
      </div>
    );
  }

  render() {
    const { figureLeft, figureRight, figureCenter, children } = this.props;
    const className = 'slds-media';
    return (
      <div className={className}>
        {this.renderFigure(figureCenter, 'slds-media__figure--stacked')}
        {this.renderFigure(figureLeft)}
        <div className={'slds-media__body'}>
          {children}
        </div>
        {this.renderFigure(figureRight, 'slds-media__figure--reverse')}
      </div>
    );
  }
}

MediaObject.propTypes = {
  figureLeft: PropTypes.node,
  figureRight: PropTypes.node,
  figureCenter: PropTypes.node,
  children: PropTypes.node,
};
