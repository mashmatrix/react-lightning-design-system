import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import MediaObject from './MediaObject';
import Text from './Text';
import Grid, { Row, Col } from './Grid';
import BreadCrumbs, { Crumb } from './BreadCrumbs';

import Icon from './Icon';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import DropdownButton from './DropdownButton';
import { MenuItem } from './DropdownMenu';

export const PageHeaderDetailBody = (props) => (
  <dd {...props}>{props.children}</dd>
);

PageHeaderDetailBody.propTypes = {
  children: PropTypes.node,
};

export const PageHeaderDetailLabel = (props) => (
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

const PageHeader = (props) => {
  const { oneline } = props;
  if (oneline) return <PageHeaderWrapper {...props} />;

  return (
    <div
      className='slds-page-header'
      role='banner'
      {...props}
    >
      {props.children}
    </div>
  );
};

PageHeader.propTypes = {
  children: PropTypes.node,
  oneline: PropTypes.bool,
};

export default PageHeader;

class PageHeaderWrapper extends Component {
  renderActions(actions) {
    if (!actions) return null;

    const result = [];

    function pushItem(item, index) {
      switch (item.component) {
        case 'Button':
          return <Button key={index} {...item} />;
        case 'DropdownButton':
          return (
            <DropdownButton key={index} {...item}>
              {item.items.map((childItem, childIndex) => (
                <MenuItem key={childIndex} {...childItem}>{childItem.label}</MenuItem>
              ))}
            </DropdownButton>
          );
        default:
      }

      return null;
    }

    actions.forEach((item, index) => {
      if (item.component === 'ButtonGroup') {
        result.push(
          <ButtonGroup key={index} {...item}>
            {item.items.map(pushItem)}
          </ButtonGroup>
        );
      } else {
        result.push(pushItem(item, index));
      }
    });

    return result;
  }
  render() {
    const {
      legend, title, info, breadCrumbs, figure,
      leftActions, rightActions,
      detailRows,
    } = this.props;

    const breadCrumbsPart = breadCrumbs ? breadCrumbs.map((item, index) => (
      <Crumb href={item.href} key={index}>{item.label}</Crumb>
    )) : null;
    const figurePart = figure ? <Icon size='large' {...figure} /> : null;
    const detailRowsPart = detailRows ? detailRows.map((item, index) =>
      <PageHeaderDetailItem key={index} label={item.label}>
        <Text
          category='body'
          type='regular'
          truncate
          title={item.text}
        >
          {item.text}
        </Text>
      </PageHeaderDetailItem>
    ) : null;

    return (
      <PageHeader>
        <PageHeaderHeading
          legend={legend}
          title={title}
          info={info}
          breadCrumbs={breadCrumbsPart}
          figure={figurePart}
          leftActions={this.renderActions(leftActions)}
          rightActions={this.renderActions(rightActions)}
        />
        {detailRowsPart ?
          <PageHeaderDetail>
            {detailRowsPart}
          </PageHeaderDetail> : null}
      </PageHeader>
    );
  }
}

PageHeaderWrapper.propTypes = {
  info: PropTypes.string,
  legend: PropTypes.string,
  title: PropTypes.string,
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    href: PropTypes.string,
  })),
  figure: PropTypes.shape({
    category: PropTypes.string,
    icon: PropTypes.string,
  }),
  leftActions: PropTypes.array,
  rightActions: PropTypes.array,
  detailRows: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    text: PropTypes.string,
  })),
};
