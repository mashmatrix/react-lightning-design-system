import React, {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

const canUseDOM =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof document.createElement === 'function';

function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  ms: number,
  immediate = false
): (...args: A) => void {
  let pid: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    const callNow = immediate && pid === undefined;
    if (pid !== undefined) {
      clearTimeout(pid);
    }
    pid = setTimeout(() => {
      pid = undefined;
      if (!immediate) {
        fn(...args);
      }
    }, ms);
    if (callNow) {
      fn(...args);
    }
  };
}

let nextListenerId = 0;
const listeners = new Map<number, () => void>();

function fireListeners() {
  for (const fn of listeners.values()) {
    fn();
  }
}

function subscribe(fn: () => void): () => void {
  nextListenerId += 1;
  const id = nextListenerId;
  listeners.set(id, fn);
  return () => {
    listeners.delete(id);
  };
}

function installDOMListeners() {
  document.addEventListener('wheel', debounce(fireListeners, 100, true));
  window.addEventListener('resize', debounce(fireListeners, 50, true));
}

if (canUseDOM) {
  if (document.body) {
    installDOMListeners();
  } else {
    document.addEventListener('DOMContentLoaded', installDOMListeners);
  }
}

/**
 * Triggers re-measurement of every mounted `RelativePortal` instance.
 * Consumers can call this to notify portals about scroll events on
 * inner scroll containers that the global `wheel` listener cannot
 * observe.
 */
export function updateScroll() {
  fireListeners();
}

function getPageOffset() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset,
  };
}

type MarkerPosition = {
  top: number;
  left: number;
  right: number;
};

type RelativePortalProps = {
  /** Marker element type rendered at the original tree position. */
  component?: 'div' | 'span';
  /** Vertical offset added to the measured marker top. */
  top?: number;
  /** Horizontal offset added to the measured marker left. */
  left?: number;
  /** Horizontal offset added to the measured marker right. */
  right?: number;
  /** When set, the portal stretches between the marker's left and right edges. */
  fullWidth?: boolean;
  /** Invoked after every re-measurement. */
  onScroll?: () => void;
  /** Applied to the outer portal wrapper element. */
  className?: string;
  /** Applied to the outer portal wrapper element. */
  style?: CSSProperties;
  children?: ReactNode;
};

const RelativePortal: FC<RelativePortalProps> = (props) => {
  const {
    component = 'span',
    top = 0,
    left = 0,
    right,
    fullWidth,
    onScroll,
    className,
    style,
    children,
  } = props;

  const markerRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState<MarkerPosition>({
    top: 0,
    left: 0,
    right: 0,
  });
  const onScrollRef = useRef(onScroll);
  onScrollRef.current = onScroll;

  const measure = useCallback(() => {
    const el = markerRef.current;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const offset = getPageOffset();
    const next: MarkerPosition = {
      top: offset.y + rect.top,
      left: offset.x + rect.left,
      right: window.innerWidth - rect.right - offset.x,
    };
    setPosition((current) =>
      current.top === next.top &&
      current.left === next.left &&
      current.right === next.right
        ? current
        : next
    );
    onScrollRef.current?.();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(measure);
    measure();
    return unsubscribe;
  }, [measure]);

  useEffect(() => {
    measure();
  });

  const setMarkerRef = useCallback(
    (el: HTMLDivElement | HTMLSpanElement | null) => {
      markerRef.current = el;
    },
    []
  );

  const horizontal: CSSProperties = fullWidth
    ? { left: position.left + left, right: position.right + (right ?? 0) }
    : right !== undefined
    ? { right: position.right + right }
    : { left: position.left + left };

  const portalContent = (
    <div className={className} style={style}>
      <div
        style={{
          position: 'absolute',
          top: position.top + top,
          ...horizontal,
        }}
      >
        {children}
      </div>
    </div>
  );

  if (component === 'div') {
    return (
      <div ref={setMarkerRef}>
        {canUseDOM ? createPortal(portalContent, document.body) : null}
      </div>
    );
  }
  return (
    <span ref={setMarkerRef}>
      {canUseDOM ? createPortal(portalContent, document.body) : null}
    </span>
  );
};

export default RelativePortal;
