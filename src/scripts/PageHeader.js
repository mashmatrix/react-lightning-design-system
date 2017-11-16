import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MediaObject from './MediaObject';
import Text from './Text';
import Grid, { Row, Col } from './Grid';
import BreadCrumbs, { Crumb } from './BreadCrumbs';

export const PageHeaderDetailBody = ({ children, ...props }) => (
  typeof children === 'string' ? (
    <Text
      category='body'
      type='regular'
      truncate
      {...props}
    >{children}</Text>
  ) : children
);

PageHeaderDetailBody.propTypes = {
  children: PropTypes.node,
};

export const PageHeaderDetailLabel = ({ children, ...props }) => (
  typeof children === 'string' ? (
    <Text
      category='title'
      truncate
      className='slds-m-bottom--xx-small'
      {...props}
    >{children}</Text>
  ) : children
);

PageHeaderDetailLabel.propTypes = {
  children: PropTypes.node,
};

export const PageHeaderDetailItem = (props) => {
  const { children, label, ...pprops } = props;
  const manuallyAssembled = !label;
  return (
    <li className='slds-page-header__detail-block' {...pprops}>
      {!manuallyAssembled ? [
        <PageHeaderDetailLabel key={0}>
          {label}
        </PageHeaderDetailLabel>,
        <PageHeaderDetailBody key={1}>
          {children}
        </PageHeaderDetailBody>,
      ] : [children]}
    </li>
  );
};

PageHeaderDetailItem.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export const PageHeaderDetail = ({ children, ...props }) => (
  <Grid
    tag='ul'
    vertical={false}
    className='slds-page-header__detail-row'
    {...props}
  >
    {children}
  </Grid>
);

PageHeaderDetail.propTypes = {
  children: PropTypes.node,
};

export const PageHeaderHeadingTitle = (props) => {
  const { className, children } = props;
  const titleClassNames = classNames(
    className,
    'slds-page-header__title slds-truncate slds-align-middle'
  );
  return (
    <h1 {...props} className={titleClassNames}>
      {children}
    </h1>
  );
};

PageHeaderHeadingTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export class PageHeaderHeading extends Component {
  renderInfo(info) {
    return info ? (
      <Text
        category='body'
        type='small'
      >
        {info}
      </Text>
    ) : null;
  }
  renderWithMedia(figure) {
    const content = this.renderContent();
    return figure ? (
      <MediaObject figureLeft={figure}>
        {content}
      </MediaObject>
    ) : content;
  }
  renderContent() {
    const { rightActions, info, legend, title, breadCrumbs, leftActions } = this.props;
    const infoPart = (info && !breadCrumbs && !legend && !rightActions) ?
      this.renderInfo(info) : null;
    const titlePart = typeof title === 'string' ? (
      <PageHeaderHeadingTitle className='slds-m-right--small'>
        {title}
      </PageHeaderHeadingTitle>
    ) : title;

    let breadCrumbsPart = null;
    if (breadCrumbs) {
      breadCrumbsPart = breadCrumbs.length && breadCrumbs[0].type === Crumb ? (
        <BreadCrumbs>
          {breadCrumbs}
        </BreadCrumbs>
      ) : breadCrumbs;
    }

    return (
      <div>
        {breadCrumbsPart}
        {legend ?
          <Text
            category='title'
            type='caps'
            className='slds-line-height--reset'
          >
            {legend}
          </Text> : null}
        {leftActions ? (
          <Grid vertical={false}>
            {titlePart}
            <Col className='slds-shrink-none'>
              {leftActions}
            </Col>
          </Grid>
        ) : titlePart}
        {infoPart}
      </div>
    );
  }
  render() {
    const { rightActions, info, breadCrumbs, figure, legend } = this.props;
    const content = this.renderWithMedia(figure);
    const infoPart = info && (breadCrumbs || legend || rightActions) ? this.renderInfo(info) : null;

    return rightActions ? (
      <div>
        <Grid vertical={false}>
          <Col className='slds-has-flexi-truncate'>
            {content}
          </Col>
          <Col align='top' noFlex>
            <Grid>
              <Row cols={1}>
                {rightActions}
              </Row>
            </Grid>
          </Col>
        </Grid>
        {infoPart}
      </div>
    ) : (
      <div>
        {content}
        {infoPart}
      </div>
    );
  }
}

PageHeaderHeading.propTypes = {
  info: PropTypes.string,
  legend: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  breadCrumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(Crumb),
    PropTypes.node,
  ]),
  leftActions: PropTypes.node,
  figure: PropTypes.node,
  rightActions: PropTypes.node,
};

const PageHeader = props =>
  <div
    className='slds-page-header'
    role='banner'
    {...props}
  >
    {props.children}
  </div>;

PageHeader.propTypes = {
  children: PropTypes.node,
};

export default PageHeader;
