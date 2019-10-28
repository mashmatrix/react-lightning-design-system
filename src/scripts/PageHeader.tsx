import React, { Component } from 'react';
import classNames from 'classnames';

import { MediaObject } from './MediaObject';
import { Text, TextProps } from './Text';
import { Grid, Row, Col, GridProps } from './Grid';
import { BreadCrumbs, Crumb } from './BreadCrumbs';

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

export type PageHeaderDetailLabelProps = TextProps;

export const PageHeaderDetailLabel: React.FC<PageHeaderDetailLabelProps> = ({
  children,
  ...props
}) =>
  typeof children === 'string' ? (
    <Text
      category='title'
      truncate
      className='slds-m-bottom--xx-small'
      {...props}
    >
      {children}
    </Text>
  ) : (
    <>{children}</>
  );

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

export type PageHeaderHeadingProps = {
  info?: string;
  legend?: string;
  title?: string | JSX.Element;
  breadCrumbs?: Array<JSX.Element>;
  leftActions?: JSX.Element;
  figure?: JSX.Element;
  rightActions?: JSX.Element | Array<JSX.Element>;
};

export class PageHeaderHeading extends Component<PageHeaderHeadingProps> {
  renderInfo(info: string) {
    return info ? (
      <Text category='body' type='small'>
        {info}
      </Text>
    ) : null;
  }

  renderWithMedia(figure: JSX.Element | undefined) {
    const content = this.renderContent();
    return figure ? (
      <MediaObject figureLeft={figure}>{content}</MediaObject>
    ) : (
      content
    );
  }

  renderContent() {
    const {
      rightActions,
      info,
      legend,
      title,
      breadCrumbs,
      leftActions,
    } = this.props;
    const infoPart =
      info && !breadCrumbs && !legend && !rightActions
        ? this.renderInfo(info)
        : null;
    const titlePart =
      typeof title === 'string' ? (
        <PageHeaderHeadingTitle className='slds-m-right--small'>
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

    return (
      <div>
        {breadCrumbsPart}
        {legend ? (
          <Text
            category='title'
            type='caps'
            className='slds-line-height--reset'
          >
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
        {infoPart}
      </div>
    );
  }

  render() {
    const { rightActions, info, breadCrumbs, figure, legend } = this.props;
    const content = this.renderWithMedia(figure);
    const infoPart =
      info && (breadCrumbs || legend || rightActions)
        ? this.renderInfo(info)
        : null;

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

export type PageHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const PageHeader: React.FC<PageHeaderProps> = (props) => (
  <div className='slds-page-header' role='banner' {...props}>
    {props.children}
  </div>
);
