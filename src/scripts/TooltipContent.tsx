import React, {
  ReactNode,
  useRef,
  useState,
  FocusEvent,
  useCallback,
} from 'react';
import { Button } from './Button';
import { Popover } from './Popover';

/**
 *
 */
export const TooltipContent = (props: {
  children: ReactNode;
  icon?: string;
}) => {
  const { children, icon = 'info' } = props;
  const [isHideTooltip, setIsHideTooltip] = useState(true);
  const popoverRef = useRef<HTMLDivElement>(null);
  const tooltipToggle = useCallback(() => {
    setIsHideTooltip((hidden) => !hidden);
  }, []);
  const onBlur = useCallback((e: FocusEvent<HTMLElement>) => {
    if (!popoverRef.current?.contains(e.relatedTarget)) {
      setIsHideTooltip(true);
    }
  }, []);
  return (
    <span className='slds-dropdown-trigger react-slds-tooltip-content'>
      <Button type='icon' icon={icon} onClick={tooltipToggle} onBlur={onBlur} />
      <Popover
        ref={popoverRef}
        hidden={isHideTooltip}
        tabIndex={-1}
        onBlur={onBlur}
        offsetX={-15}
        tooltip
      >
        {children}
      </Popover>
    </span>
  );
};
