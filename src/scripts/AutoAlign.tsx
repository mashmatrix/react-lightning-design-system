import React, {
  FC,
  ReactElement,
  Ref,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import RelativePortal from 'react-relative-portal';
import { ComponentSettingsContext } from './ComponentSettings';
import { useControlledValue, useEventCallback } from './hooks';

type Offset = {
  top: number;
  left: number;
};

type Rect = Offset & {
  width: number;
  height: number;
};

type VertAlign = 'top' | 'bottom' | 'top-absolute' | 'bottom-absolute';
type HorizAlign = 'left' | 'right' | 'left-absolute' | 'right-absolute';
type Align = VertAlign | HorizAlign;

export type RectangleAlignment = Readonly<[Align] | [Align, Align]>;

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getViewportRect(): Rect {
  const { innerHeight: height = Infinity, innerWidth: width = Infinity } =
    window || {};
  return { top: 0, left: 0, width, height };
}

function calcAlignmentRect(
  target: Rect,
  rect: { width: number; height: number },
  alignment: RectangleAlignment
) {
  const [firstAlign, secondAlign] = alignment;
  return {
    ...rect,
    top:
      firstAlign === 'top-absolute' || secondAlign === 'top-absolute'
        ? 0
        : firstAlign === 'bottom-absolute' || secondAlign === 'bottom-absolute'
        ? getViewportRect().height - rect.height
        : firstAlign === 'top'
        ? target.top + target.height
        : firstAlign === 'bottom'
        ? target.top - rect.height
        : secondAlign === 'top'
        ? target.top
        : secondAlign === 'bottom'
        ? target.top + target.height - rect.height
        : // valign middle
          target.top + (target.height - rect.height) * 0.5,
    left:
      firstAlign === 'left-absolute' || secondAlign === 'left-absolute'
        ? 0
        : firstAlign === 'right-absolute' || secondAlign === 'right-absolute'
        ? getViewportRect().width - rect.width
        : firstAlign === 'left'
        ? target.left + target.width
        : firstAlign === 'right'
        ? target.left - rect.width
        : secondAlign === 'left'
        ? target.left
        : secondAlign === 'right'
        ? target.left + target.width - rect.width
        : // halign center
          target.left + (target.width - rect.width) * 0.5,
  };
}

function hasViewportIntersection({ top, left, width, height }: Rect) {
  const { width: viewportWidth, height: viewportHeight } = getViewportRect();
  return (
    top < 0 ||
    top + height > viewportHeight ||
    left < 0 ||
    left + width > viewportWidth
  );
}

function isEqualRect(
  aRect: Rect | null | undefined,
  bRect: Rect | null | undefined
) {
  if (aRect === bRect) {
    return true;
  }
  if (!aRect || !bRect) {
    return false;
  }
  return (
    aRect.top === bRect.top &&
    aRect.left === bRect.left &&
    aRect.width === bRect.width &&
    aRect.height === bRect.height
  );
}

function getCenterPoint(rect: Rect) {
  return {
    x: rect.left + 0.5 * rect.width,
    y: rect.top + 0.5 * rect.height,
  };
}

function getPreferAlignment(rect?: Rect) {
  if (!rect) {
    return { v: 'top', h: 'left' };
  }
  const { x: rx, y: ry } = getCenterPoint(rect);
  const { x: vx, y: vy } = getCenterPoint(getViewportRect());
  return {
    h: rx < vx ? 'left' : 'right',
    v: ry < vy ? 'top' : 'bottom',
  };
}

function throttle(func: (...args: unknown[]) => unknown, ms: number) {
  let last = 0;
  return (...args: unknown[]) => {
    const now = Date.now();
    if (last + ms < now) {
      func(...args);
      last = now;
    }
  };
}

function ignoreFirstCall(func: (...args: unknown[]) => unknown) {
  let called = false;
  return (...args: unknown[]) => {
    if (called) {
      func(...args);
    }
    called = true;
  };
}

function removeAbsoluteAlign(
  alignment: RectangleAlignment
): RectangleAlignment {
  return alignment.map(
    (a) => a.replace(/-absolute$/, '') as Align
  ) as unknown as RectangleAlignment;
}

export type AutoAlignProps = {
  triggerSelector: string;
  alignmentStyle: 'menu' | 'popover';
  portalClassName?: string;
  portalStyle?: object;
  size?: 'small' | 'medium' | 'large';
  preventPortalize?: boolean;
  align?: Align;
  alignment?: RectangleAlignment;
  children: (props: AutoAlignInjectedProps) => ReactElement;
};

export type AutoAlignInjectedProps = {
  alignment: RectangleAlignment;
  autoAlignContentRef: Ref<HTMLElement | null>;
};

function getPossibleAlignments(
  alignmentStyle: AutoAlignProps['alignmentStyle'],
  align?: Align,
  target?: Rect
): RectangleAlignment[] {
  const { h, v } = getPreferAlignment(target);
  const alignments: RectangleAlignment[] = [
    ['top', 'left'],
    ['top', 'right'],
    ['top'],
    ['bottom', 'left'],
    ['bottom', 'right'],
    ['bottom'],
    ['left', 'top'],
    ['left', 'bottom'],
    ['left'],
    ['right', 'top'],
    ['right', 'bottom'],
    ['right'],
    ['top', `${h}-absolute` as Align],
    ['bottom', `${h}-absolute` as Align],
    ['left', `${v}-absolute` as Align],
    ['right', `${v}-absolute` as Align],
    [`${v}-absolute` as Align, 'left'],
    [`${v}-absolute` as Align, 'right'],
    [`${h}-absolute` as Align, 'top'],
    [`${h}-absolute` as Align, 'bottom'],
    [`${v}-absolute` as Align],
    [`${h}-absolute` as Align],
    [`${v}-absolute` as Align, `${h}-absolute` as Align],
  ];
  return alignments
    .filter(
      ([firstAlign, secondAlign]) =>
        !align || firstAlign === align || secondAlign === align
    )
    .filter(([firstAlign, secondAlign]) =>
      alignmentStyle === 'menu'
        ? secondAlign && /^(top|bottom)/.test(firstAlign)
        : true
    );
}

const EMPTY_RECT = { top: 0, left: 0, width: 0, height: 0 };

/**
 *
 */
function useAutoAlign(props: AutoAlignProps) {
  const {
    triggerSelector,
    alignmentStyle,
    align,
    alignment: alignment_,
  } = props;

  const pidRef = useRef<number | null>(null);

  const elRef = useRef<HTMLDivElement | null>(null);

  const autoAlignContentRef = useRef<HTMLElement | null>(null);

  const [alignment, setAlignment] = useControlledValue(
    alignment_,
    getPossibleAlignments(alignmentStyle, align)[0]
  );
  const [rootNodeRect, setRootNodeRect] = useState<Rect>();
  const [triggerNodeRect, setTriggerNodeRect] = useState<Rect>();

  const updateAlignment = useEventCallback(
    (newTriggerNodeRect: Rect = EMPTY_RECT) => {
      const newRootNodeRect =
        elRef.current?.getBoundingClientRect() ?? EMPTY_RECT;
      const { width: contentRectWidth, height: contentRectHeight } =
        autoAlignContentRef.current?.getBoundingClientRect() ?? EMPTY_RECT;
      let newAlignment = null;
      const possibleAlignments = getPossibleAlignments(
        alignmentStyle,
        align,
        newTriggerNodeRect
      );
      for (const possibleAlignment of possibleAlignments) {
        const aRect = calcAlignmentRect(
          newTriggerNodeRect,
          { width: contentRectWidth, height: contentRectHeight },
          possibleAlignment
        );
        if (!hasViewportIntersection(aRect)) {
          newAlignment = possibleAlignment;
          break;
        }
      }
      if (!newAlignment) {
        newAlignment = possibleAlignments[possibleAlignments.length - 1];
      }
      if (
        newAlignment[0] !== alignment[0] ||
        newAlignment[1] !== alignment[1]
      ) {
        setAlignment(newAlignment);
        setTriggerNodeRect(newTriggerNodeRect);
        setRootNodeRect(newRootNodeRect);
      } else if (
        !triggerNodeRect ||
        newTriggerNodeRect.width !== triggerNodeRect.width ||
        newTriggerNodeRect.height !== triggerNodeRect.height ||
        /absolute$/.test(alignment[0]) ||
        /absolute$/.test(alignment[1] || '')
      ) {
        setTriggerNodeRect(newTriggerNodeRect);
        setRootNodeRect(newRootNodeRect);
      }
    }
  );

  const recalcAlignment = useEventCallback(() => {
    const el = elRef.current;
    if (el) {
      const matches =
        // eslint-disable-next-line @typescript-eslint/unbound-method
        el.matches ??
        (el as unknown as { matchesSelector?: typeof el.matches })
          .matchesSelector ??
        (el as unknown as { msMatchesSelector?: typeof el.matches })
          .msMatchesSelector;
      let triggerEl: HTMLElement | null = el;
      try {
        while (triggerEl) {
          if (matches.call(triggerEl, triggerSelector)) {
            break;
          }
          triggerEl = triggerEl.parentElement;
        }
      } catch (e) {
        triggerEl = null;
      }
      if (triggerEl) {
        const { top, left, width, height } = triggerEl.getBoundingClientRect();
        if (!isEqualRect(triggerNodeRect, { top, left, width, height })) {
          updateAlignment({ top, left, width, height });
        } else {
          updateAlignment(triggerNodeRect);
        }
      } else {
        updateAlignment(triggerNodeRect);
      }
    }
  });

  const requestRecalcAlignment = useMemo(
    () =>
      throttle(async () => {
        const pid = (pidRef.current ?? 0) + 1;
        pidRef.current = pid;
        for (const ms of [0, 300, 400, 300, 200]) {
          await delay(ms);
          if (pidRef.current !== pid) {
            return;
          }
          recalcAlignment();
        }
        pidRef.current = 0;
      }, 100),
    [recalcAlignment]
  );

  const onScroll = useMemo(
    () => ignoreFirstCall(requestRecalcAlignment),
    [requestRecalcAlignment]
  );

  const elRefCallback = useEventCallback((el: HTMLDivElement | null) => {
    if (el) {
      elRef.current = el;
      requestRecalcAlignment();
    }
  });

  useEffect(() => {
    return () => {
      pidRef.current = null;
    };
  }, []);

  const { top, left: left_ } = calcAlignmentRect(
    triggerNodeRect ?? EMPTY_RECT,
    rootNodeRect ?? EMPTY_RECT,
    alignment
  );
  let left = left_;
  if ((alignment[0] === 'top' || alignment[0] === 'bottom') && !alignment[1]) {
    left = (triggerNodeRect?.left ?? 0) + (triggerNodeRect?.width ?? 0) * 0.5;
  }
  const offsetTop = top - (rootNodeRect?.top ?? 0);
  const offsetLeft = left - (rootNodeRect?.left ?? 0);
  const returnAlignment = useMemo(
    () => removeAbsoluteAlign(alignment),
    [alignment]
  );

  return {
    initialized: triggerNodeRect != null,
    alignment: returnAlignment,
    offsetTop,
    offsetLeft,
    onScroll,
    elRef: elRefCallback,
    autoAlignContentRef,
  };
}

/**
 *
 */
export const AutoAlign: FC<AutoAlignProps> = (props) => {
  const {
    preventPortalize,
    portalClassName: additionalPortalClassName,
    portalStyle: additionalPortalStyle = {},
    children,
  } = props;
  const {
    initialized,
    alignment,
    offsetLeft,
    offsetTop,
    onScroll,
    elRef,
    autoAlignContentRef,
  } = useAutoAlign(props);
  const compSettings = useContext(ComponentSettingsContext);
  const {
    portalClassName = 'slds-scope',
    portalStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
  } = compSettings;
  if (typeof children !== 'function') {
    return React.isValidElement(children) ? children : <>{children}</>;
  }
  const content = children({ alignment, autoAlignContentRef });
  return preventPortalize || process.env.NODE_ENV === 'test' ? (
    content
  ) : (
    <div ref={elRef}>
      <RelativePortal
        fullWidth
        left={offsetLeft}
        right={-offsetLeft}
        top={offsetTop}
        onScroll={onScroll}
        component='div'
        className={classnames(portalClassName, additionalPortalClassName)}
        style={{ ...portalStyle, ...additionalPortalStyle }}
      >
        <ComponentSettingsContext.Provider value={compSettings}>
          {initialized ? content : <div className='slds-hidden'>{content}</div>}
        </ComponentSettingsContext.Provider>
      </RelativePortal>
    </div>
  );
};
