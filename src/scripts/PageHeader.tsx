import React, { FC } from 'react';
import classNames from 'classnames';

import { MediaObject } from './MediaObject';
import { Text, TextProps } from './Text';
import { Grid, Row, Col, GridProps } from './Grid';
import { BreadCrumbs, Crumb } from './BreadCrumbs';

/**
 *
 */
export type PageHeaderDetailBodyProps = TextProps;

export const PageHeaderDetailBody: React.FC<PageHeaderDetailBodyProps> = ({
  children,
  ...props
}) =>
  typeof children === 'string' ? (
    <Text category='body' type='regular' truncate {...props}>
      {children}
    </Text>
  ) : (
    <>{children}</>
  );

/**
 *
 */
export type PageHeaderDetailLabelProps = TextProps;

export const PageHeaderDetailLabel: React.FC<PageHeaderDetailLabelProps> = ({
  children,
  ...props
}) =>
  typeof children === 'string' ? (
    <Text
      category='title'
      truncate
      className='slds-m-bottom_xx-small'
      {...props}
    >
      {children}
    </Text>
  ) : (
    <>{children}</>
  );

/**
 *
 */
export type PageHeaderDetailItemProps = {
  label?: string;
} & React.LiHTMLAttributes<HTMLLIElement>;

export const PageHeaderDetailItem: React.FC<PageHeaderDetailItemProps> = (
  props
) => {
  const { children, label, ...pprops } = props;
  const manuallyAssembled = !label;
  return (
    <li className='slds-page-header__detail-block' {...pprops}>
      {!manuallyAssembled
        ? [
            <PageHeaderDetailLabel key={0}>{label}</PageHeaderDetailLabel>,
            <PageHeaderDetailBody key={1}>{children}</PageHeaderDetailBody>,
          ]
        : [children]}
    </li>
  );
};

/**
 *
 */
export type PageHeaderDetailProps = GridProps;

export const PageHeaderDetail: React.FC<GridProps> = ({
  children,
  ...props
}) => (
  <Grid
    tag='ul'
    vertical={false}
    className='slds-page-header__detail-row'
    {...props}
  >
    {children}
  </Grid>
);

/**
 *
 */
export type PageHeaderHeadingTitleProps = {
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export const PageHeaderHeadingTitle: React.FC<PageHeaderHeadingTitleProps> = (
  props
) => {
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

/**
 *
 */
export type PageHeaderHeadingProps = {
  info?: string;
  legend?: string;
  title?: string | JSX.Element;
  breadCrumbs?: Array<JSX.Element>;
  leftActions?: JSX.Element;
  figure?: JSX.Element;
  rightActions?: JSX.Element | Array<JSX.Element>;
};

/**
 *
 */
export const PageHeaderHeading: FC<PageHeaderHeadingProps> = (props) => {
  const {
    leftActions,
    rightActions,
    title,
    info,
    breadCrumbs,
    figure,
    legend,
  } = props;

  const infoPart = info ? (
    <Text category='body' type='small'>
      {info}
    </Text>
  ) : null;

  const titlePart =
    typeof title === 'string' ? (
      <PageHeaderHeadingTitle className='slds-m-right_small'>
        {title}
      </PageHeaderHeadingTitle>
    ) : (
      title
    );

  let breadCrumbsPart = null;
  if (breadCrumbs) {
    breadCrumbsPart =
      breadCrumbs.length && breadCrumbs[0].type === Crumb ? (
        <BreadCrumbs>{breadCrumbs}</BreadCrumbs>
      ) : (
        breadCrumbs
      );
  }

  const content_ = (
    <div>
      {breadCrumbsPart}
      {legend ? (
        <Text category='title' type='caps' className='slds-line-height_reset'>
          {legend}
        </Text>
      ) : null}
      {leftActions ? (
        <Grid vertical={false}>
          {titlePart}
          <Col className='slds-shrink-none'>{leftActions}</Col>
        </Grid>
      ) : (
        titlePart
      )}
      {breadCrumbs && !legend && !rightActions ? infoPart : null}
    </div>
  );
  const content = figure ? (
    <MediaObject figureLeft={figure}>{content_}</MediaObject>
  ) : (
    content_
  );

  return rightActions ? (
    <div>
      <Grid vertical={false}>
        <Col className='slds-has-flexi-truncate'>{content}</Col>
        <Col align='top' noFlex>
          <Grid>
            <Row cols={1}>{rightActions}</Row>
          </Grid>
        </Col>
      </Grid>
      {breadCrumbs || legend || rightActions ? infoPart : null}
    </div>
  ) : (
    <div>
      {content}
      {breadCrumbs || legend || rightActions ? infoPart : null}
    </div>
  );
};

/**
 *
 */
export type PageHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const PageHeader: React.FC<PageHeaderProps> = (props) => (
  <div className='slds-page-header' role='banner' {...props}>
    {props.children}
  </div>
);
