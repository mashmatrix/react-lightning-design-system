import React, {
  FC,
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import { Icon } from './Icon';
import { useControlledValue, useEventCallback } from './hooks';
import { createFC } from './common';
import { Bivariant } from './typeUtils';

/**
 *
 */
type SalesPathItemType = 'complete' | 'current' | 'incomplete';

type SalesPathKey = string | number;

/**
 *
 */
const SalesPathTypeContext = createContext<SalesPathItemType>('incomplete');

const SalesPathContext = createContext<{
  onSelect?: Bivariant<(eventKey: SalesPathKey) => void>;
  activeKey?: SalesPathKey | null;
}>({});

/**
 *
 */
export type SalesPathItemProps = {
  className?: string;
  eventKey?: SalesPathKey;
  type?: SalesPathItemType;
  title?: string;
  completedTitle?: string;
};

/**
 *
 */
export const SalesPathItem: FC<SalesPathItemProps> = (props) => {
  const { className, eventKey, type: type_, title, completedTitle } = props;
  const evaluatedType = useContext(SalesPathTypeContext);
  const { onSelect, activeKey } = useContext(SalesPathContext);
  const type = type_ ?? evaluatedType;

  const onItemClick = useEventCallback(() => {
    if (eventKey != null) {
      onSelect?.(eventKey);
    }
  });

  const isSelected = activeKey === eventKey;
  const isCurrent = type === 'current';
  const isActive = isSelected || (isCurrent && activeKey == null);

  const pathItemClassName = classnames(
    'slds-path__item',
    {
      'slds-is-complete': type === 'complete',
      'slds-is-current': isCurrent,
      'slds-is-incomplete': type === 'incomplete',
      'slds-is-active': isActive,
    },
    className
  );

  const tabIndex = isActive ? 0 : -1;
  const completedText = completedTitle || 'Stage Complete';

  return (
    <li className={pathItemClassName} role='presentation'>
      <a
        className='slds-path__link'
        aria-selected={isActive}
        tabIndex={tabIndex}
        role='option'
        onClick={onItemClick}
      >
        <span className='slds-path__stage'>
          <Icon category='utility' icon='check' size='x-small' />
          {type === 'complete' ? (
            <span className='slds-assistive-text'>{completedText}</span>
          ) : null}
          {isCurrent ? (
            <span className='slds-assistive-text'>Current Stage:</span>
          ) : null}
        </span>
        <span className='slds-path__title'>{title}</span>
      </a>
    </li>
  );
};

/**
 *
 */
export type SalesPathProps = {
  className?: string;
  activeKey?: SalesPathKey;
  defaultActiveKey?: SalesPathKey;
  onSelect?: Bivariant<(itemKey: SalesPathKey) => void>;
  children?: ReactNode;
};

/**
 *
 */
export const SalesPath = createFC<
  SalesPathProps,
  { PathItem: typeof SalesPathItem }
>(
  (props) => {
    const {
      activeKey: activeKey_,
      defaultActiveKey,
      className,
      children,
      onSelect: onSelect_,
    } = props;
    const [activeKey, setActiveKey] = useControlledValue(
      activeKey_,
      defaultActiveKey ?? null
    );
    const salesPathClassNames = classnames(className, 'slds-path');

    const onSelect = useEventCallback((itemKey: SalesPathKey) => {
      onSelect_?.(itemKey);
      setActiveKey(itemKey);
    });

    let activeIdx = -1;
    React.Children.forEach(children, (child, idx) => {
      if (React.isValidElement(child)) {
        const { eventKey } = child.props as {
          eventKey?: SalesPathKey;
        };
        if (eventKey != null && eventKey === activeKey) {
          activeIdx = idx;
        }
      }
    });

    const ctx = useMemo(() => ({ onSelect, activeKey }), [onSelect, activeKey]);

    return (
      <div className={salesPathClassNames}>
        <div className={classnames('slds-grid', 'slds-path__track')}>
          <div
            className={classnames('slds-grid', 'slds-path__scroller-container')}
          >
            <div className='slds-path__scroller'>
              <div className='slds-path__scroller_inner'>
                <ul
                  className='slds-path__nav'
                  role='listbox'
                  aria-orientation='horizontal'
                >
                  <SalesPathContext.Provider value={ctx}>
                    {React.Children.map(children, (child, idx) => {
                      const evaluatedType =
                        idx === activeIdx
                          ? 'current'
                          : idx < activeIdx
                            ? 'complete'
                            : 'incomplete';
                      return (
                        <SalesPathTypeContext.Provider value={evaluatedType}>
                          {child}
                        </SalesPathTypeContext.Provider>
                      );
                    })}
                  </SalesPathContext.Provider>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  { PathItem: SalesPathItem }
);
