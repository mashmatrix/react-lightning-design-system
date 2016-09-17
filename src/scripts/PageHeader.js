import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import MediaObject from './MediaObject';
import Text from './Text';
import Grid, { Row, Col } from './Grid';
import BreadCrumbs, { Crumb } from './BreadCrumbs';

export const PageHeaderDetailBody = props => (
  <dd {...props}>{props.children}</dd>
);

PageHeaderDetailBody.propTypes = {
  children: PropTypes.node,
};

export const PageHeaderDetailLabel = props => (
  <dt {...props}>{props.children}</dt>
);

PageHeaderDetailLabel.propTypes = {
  children: PropTypes.node,
};

export const PageHeaderDetailItem = (props) => {
  const { children, label, ...pprops } = props;
  const manuallyAssembled = !label;
  return (
    <dl {...pprops}>
      {!manuallyAssembled ? [
        <PageHeaderDetailLabel key={0}>
          <Text trancate category='heading' type='label'>{label}</Text>
        </PageHeaderDetailLabel>,
        <PageHeaderDetailBody key={1}>
          {children}
        </PageHeaderDetailBody>,
      ] : [children]}
    </dl>
  );
};

PageHeaderDetailItem.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export const PageHeaderDetail = ({ children, ...props }) => {
  const cnt = React.Children.count(children);
  const cchildren = cnt === 1 ? [children] : children;
  return (
    <Grid className='slds-page-header__detail-row' {...props}>
      <Row cols={cnt}>
        {cchildren ? cchildren.map((child, index) => (
          <Col key={index} padded totalCols={cnt} cols={1}>
            {child}
          </Col>
        )) : null}
      </Row>
    </Grid>
  );
};

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
  renderInfo() {
    const { info } = this.props;
    return (
      <Text
        category='body'
        type='small'
        className='slds-page-header__info'
      >
        {info}
      </Text> || null
    );
  }
  renderWithMedia() {
    const { figure } = this.props;
    const content = this.renderContent();
    return figure ? (
      <MediaObject
        figureLeft={figure}
      >
        {content}
      </MediaObject>
    ) : content;
  }
  renderContent() {
    const { rightActions, info, legend, title, breadCrumbs, leftActions } = this.props;
    const infoPart = (info && !breadCrumbs && !legend && !rightActions) ? this.renderInfo() : null;
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
          <Text category='heading' type='label'>{legend}</Text> : null}
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
    const { rightActions, info, breadCrumbs, legend } = this.props;
    const content = this.renderWithMedia();
    const infoPart = info && (breadCrumbs || legend || rightActions) ? this.renderInfo() : null;

    return rightActions ? (
      <div>
        <Grid>
          <Row cols={1}>
            <Col className='slds-has-flexi-truncate'>
              {content}
            </Col>
            <Col align='bottom' noFlex>
              <Grid>
                <Row cols={1}>
                  {rightActions}
                </Row>
              </Grid>
            </Col>
          </Row>
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
