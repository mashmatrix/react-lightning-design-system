import React, { FC } from 'react';
import classNames from 'classnames';
import { TextProps } from './Text';

/**
 *
 */
export type PageHeaderDetailBodyProps = TextProps;

export const PageHeaderDetailBody: FC<PageHeaderDetailBodyProps> = ({
  children,
  ...props
}) =>
  typeof children === 'string' ? (
    <div className='slds-truncate' title={children} {...props}>
      {children}
    </div>
  ) : (
    <>{children}</>
  );

/**
 *
 */
export type PageHeaderDetailLabelProps = TextProps;

export const PageHeaderDetailLabel: FC<PageHeaderDetailLabelProps> = ({
  children,
  ...props
}) =>
  typeof children === 'string' ? (
    <div className='slds-text-title slds-truncate' title={children} {...props}>
      {children}
    </div>
  ) : (
    <>{children}</>
  );

/**
 *
 */
export type PageHeaderDetailItemProps = {
  label?: string;
} & React.LiHTMLAttributes<HTMLLIElement>;

export const PageHeaderDetailItem: FC<PageHeaderDetailItemProps> = (props) => {
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
export type PageHeaderDetailProps = React.HTMLAttributes<HTMLDivElement>;

export const PageHeaderDetail: FC<PageHeaderDetailProps> = ({
  children,
  ...props
}) => (
  <div
    className='slds-page-header__row slds-page-header__row_gutters'
    {...props}
  >
    <div className='slds-page-header__col-details'>
      <ul className='slds-page-header__detail-row'>{children}</ul>
    </div>
  </div>
);

/**
 *
 */
export type PageHeaderHeadingTitleProps = {
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export const PageHeaderHeadingTitle: FC<PageHeaderHeadingTitleProps> = (
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
    <p className='slds-page-header__name-meta'>{info}</p>
  ) : null;

  const titlePart =
    typeof title === 'string' ? (
      <div className='slds-page-header__name-title'>
        <h1>
          {legend && <span>{legend}</span>}
          <span className='slds-page-header__title slds-truncate' title={title}>
            {title}
          </span>
        </h1>
      </div>
    ) : (
      <div className='slds-page-header__name-title'>
        <h1>{title}</h1>
      </div>
    );

  let breadCrumbsPart = null;
  if (breadCrumbs) {
    breadCrumbsPart = (
      <nav role='navigation' aria-label='Breadcrumbs'>
        <ol className='slds-breadcrumb slds-list_horizontal slds-wrap'>
          {breadCrumbs}
        </ol>
      </nav>
    );
  }

  const mediaContent = (
    <div className='slds-media__body'>
      <div className='slds-page-header__name'>
        {titlePart}
        {leftActions && (
          <div className='slds-page-header__name-switcher slds-is-relative'>
            {leftActions}
          </div>
        )}
      </div>
      {!breadCrumbs && infoPart}
    </div>
  );

  const mediaObject = figure ? (
    <div className='slds-media'>
      <div className='slds-media__figure'>
        {React.cloneElement(figure, {
          className: classNames(
            (() => {
              const props: unknown = figure.props;
              const isPropsObject = typeof props === 'object' && props !== null;

              if (
                isPropsObject &&
                'className' in props &&
                typeof props.className === 'string'
              ) {
                return props.className;
              } else {
                return null;
              }
            })(),
            'slds-page-header__icon'
          ),
          'aria-hidden': 'true',
        })}
      </div>
      {mediaContent}
    </div>
  ) : (
    <div className='slds-media'>{mediaContent}</div>
  );

  return (
    <div className='slds-page-header__row'>
      <div className='slds-page-header__col-title'>
        {breadCrumbsPart}
        {mediaObject}
      </div>
      {rightActions && (
        <div className='slds-page-header__col-actions'>
          <div className='slds-page-header__controls'>
            {Array.isArray(rightActions) ? (
              rightActions.map((action, index) => (
                <div key={index} className='slds-page-header__control'>
                  {action}
                </div>
              ))
            ) : (
              <div className='slds-page-header__control'>{rightActions}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 *
 */
export type PageHeaderMetaProps = {
  info?: string;
  rightActions?: JSX.Element | Array<JSX.Element>;
} & React.HTMLAttributes<HTMLDivElement>;

export const PageHeaderMeta: FC<PageHeaderMetaProps> = ({
  info,
  rightActions,
  ...props
}) => (
  <div className='slds-page-header__row' {...props}>
    <div className='slds-page-header__col-meta'>
      {info && <p className='slds-page-header__meta-text'>{info}</p>}
    </div>
    {rightActions && (
      <div className='slds-page-header__col-controls'>
        <div className='slds-page-header__controls'>
          {Array.isArray(rightActions) ? (
            rightActions.map((action, index) => (
              <div key={index} className='slds-page-header__control'>
                {action}
              </div>
            ))
          ) : (
            <div className='slds-page-header__control'>{rightActions}</div>
          )}
        </div>
      </div>
    )}
  </div>
);

/**
 *
 */
export type PageHeaderProps = {
  variant?: 'record-home' | 'related-list';
} & React.HTMLAttributes<HTMLDivElement>;

export const PageHeader: FC<PageHeaderProps> = ({
  variant,
  className,
  ...props
}) => {
  const pageHeaderClassNames = classNames(
    'slds-page-header',
    variant ? `slds-page-header_${variant}` : null,
    className
  );

  return (
    <div className={pageHeaderClassNames} role='banner' {...props}>
      {props.children}
    </div>
  );
};
