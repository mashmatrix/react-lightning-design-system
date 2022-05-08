import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import classnames from 'classnames';
import { Icon } from './Icon';
import { useControlledValue } from './hooks';
import { createFC } from './common';

/**
 *
 */
type SalesPathItemType = 'complete' | 'current' | 'incomplete';

type SalesPathKey = string | number;

/**
 *
 */
const SalesPathTypeContext = createContext<SalesPathItemType>('incomplete');

const SalesPathHandlersContext = createContext<{
  onSelect?: (eventKey: SalesPathKey) => void;
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
  const { onSelect } = useContext(SalesPathHandlersContext);
  const type = type_ ?? evaluatedType;

  const onItemClick = useCallback(() => {
    if (eventKey != null) {
      onSelect?.(eventKey);
    }
  }, [onSelect, eventKey]);

  const pathItemClassName = classnames(
    'slds-tabs_path__item',
    type ? `slds-is-${type}` : undefined,
    className
  );

  const tabIndex = type === 'current' ? 0 : -1;
  const completedText = completedTitle || 'Stage Complete';

  return (
    <li className={pathItemClassName} role='presentation'>
      <a
        className='slds-tabs_path__link'
        aria-selected='false'
        tabIndex={tabIndex}
        role='tab'
        aria-live='assertive'
        onClick={onItemClick}
      >
        <span className='slds-tabs_path__stage'>
          <Icon category='utility' icon='check' size='x-small' />
          {type === 'complete' ? (
            <span className='slds-assistive-text'>{completedText}</span>
          ) : null}
        </span>
        <span className='slds-tabs_path__title'>{title}</span>
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
  onSelect?: (itemKey: SalesPathKey) => void;
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
    const salesPathClassNames = classnames(className, 'slds-tabs_path');

    const onSelect = useCallback(
      (itemKey: SalesPathKey) => {
        onSelect_?.(itemKey);
        setActiveKey(itemKey);
      },
      [onSelect_, setActiveKey]
    );

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

    const handlers = useMemo(() => ({ onSelect }), [onSelect]);

    return (
      <div className={salesPathClassNames} role='application tablist'>
        <ul className='slds-tabs_path__nav' role='presentation'>
          <SalesPathHandlersContext.Provider value={handlers}>
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
          </SalesPathHandlersContext.Provider>
        </ul>
      </div>
    );
  },
  { PathItem: SalesPathItem }
);
