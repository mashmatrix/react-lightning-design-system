import React, {
  ChangeEvent,
  ComponentType,
  FC,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  Ref,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { Button } from './Button';
import { Select, Option } from './Select';
import { getToday, isElInChildren } from './util';
import { ComponentSettingsContext } from './ComponentSettings';
import { useEventCallback, useMergeRefs } from './hooks';

/**
 *
 */
type CalendarDate = {
  year: number;
  month: number;
  date: number;
  value: string;
};

type Calendar = {
  year: number;
  month: number;
  weeks: CalendarDate[][];
  minDate?: CalendarDate;
  maxDate?: CalendarDate;
};

function createCalendarObject(date?: string, mnDate?: string, mxDate?: string) {
  let minDate;
  let maxDate;
  let d = moment(date, 'YYYY-MM-DD');
  if (!d.isValid()) {
    d = moment(getToday(), 'YYYY-MM-DD');
  }
  if (mnDate) {
    const minD = moment(mnDate, 'YYYY-MM-DD');
    if (minD.isValid()) {
      minDate = {
        year: minD.year(),
        month: minD.month(),
        date: minD.date(),
        value: minD.format('YYYY-MM-DD'),
      };
    }
  }
  if (mxDate) {
    const maxD = moment(mxDate, 'YYYY-MM-DD');
    if (maxD.isValid()) {
      maxDate = {
        year: maxD.year(),
        month: maxD.month(),
        date: maxD.date(),
        value: maxD.format('YYYY-MM-DD'),
      };
    }
  }
  const year = d.year();
  const month = d.month();
  const first = moment(d).startOf('month').startOf('week');
  const last = moment(d).endOf('month').endOf('week');
  const weeks = [];
  let days = [];
  for (let dd = first; dd.isBefore(last); dd = dd.add(1, 'd')) {
    days.push({
      year: dd.year(),
      month: dd.month(),
      date: dd.date(),
      value: dd.format('YYYY-MM-DD'),
    });
    if (days.length === 7) {
      weeks.push(days);
      days = [];
    }
  }
  const cal: Calendar = { year, month, weeks };
  if (minDate) {
    cal.minDate = minDate;
  }
  if (maxDate) {
    cal.maxDate = maxDate;
  }
  return cal;
}

function cancelEvent(e: React.FocusEvent<HTMLSpanElement>) {
  e.preventDefault();
  e.stopPropagation();
}

/**
 *
 */
export type DatepickerProps = {
  selectedDate?: string;
  autoFocus?: boolean;
  minDate?: string;
  maxDate?: string;
  extensionRenderer?: ComponentType<DatepickerProps>;
  elementRef?: Ref<HTMLDivElement | null>;
  onSelect?: (date: string) => void;
  onClose?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>;

/**
 *
 */
type DatepickerFilterProps = {
  cal: Calendar;
  onMonthChange: (dm: number) => void;
  onYearChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

/**
 *
 */
const DatepickerFilter: FC<DatepickerFilterProps> = (props) => {
  const { cal, onMonthChange, onYearChange } = props;
  const onPrevMonth = useEventCallback(() => onMonthChange(-1));
  const onNextMonth = useEventCallback(() => onMonthChange(1));
  return (
    <div className='slds-datepicker__filter slds-grid'>
      <div className='slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-size_2-of-3'>
        <div className='slds-align-middle'>
          <Button
            className='slds-align-middle'
            type='icon-container'
            icon='left'
            size='small'
            alt='Previous Month'
            onClick={onPrevMonth}
          />
        </div>
        <h2 className='slds-align-middle'>{moment.monthsShort()[cal.month]}</h2>
        <div className='slds-align-middle'>
          <Button
            className='slds-align-middle'
            type='icon-container'
            icon='right'
            size='small'
            alt='Next Month'
            onClick={onNextMonth}
          />
        </div>
      </div>
      <div className='slds-size_1-of-3'>
        <Select value={cal.year} onChange={onYearChange}>
          {new Array(11)
            .join('_')
            .split('_')
            .map((a, i) => {
              const year = cal.year + i - 5;
              return <Option key={year} label={String(year)} value={year} />;
            })}
        </Select>
      </div>
    </div>
  );
};

/**
 *
 */
type DatepickerHandlers = {
  onDateKeyDown: (
    date: string,
    e: React.KeyboardEvent<HTMLSpanElement>
  ) => void;
  onDateClick: (date: string) => void;
  onDateFocus: (date: string) => void;
};

type DatepickerDateProps = {
  cal: Calendar;
  selectedDate: string | undefined;
  today: string;
  date: CalendarDate;
  dayIndex: number;
} & DatepickerHandlers;

/**
 *
 */
const DatepickerDate: FC<DatepickerDateProps> = (props) => {
  const {
    cal,
    selectedDate,
    today,
    date,
    dayIndex,
    onDateKeyDown: onDateKeyDown_,
    onDateClick: onDateClick_,
    onDateFocus: onDateFocus_,
  } = props;
  const onDateKeyDown = useEventCallback((e: KeyboardEvent<HTMLDivElement>) => {
    onDateKeyDown_(date.value, e);
  });
  const onDateClick = useEventCallback(() => {
    onDateClick_(date.value);
  });
  const onDateFocus = useEventCallback(() => {
    onDateFocus_(date.value);
  });

  let selectable = true;
  let enabled = date.year === cal.year && date.month === cal.month;
  if (cal.minDate) {
    const min = moment(date.value, 'YYYY-MM-DD').isAfter(
      moment(cal.minDate.value, 'YYYY-MM-DD')
    );
    selectable = selectable && min;
    enabled = enabled && min;
  }
  if (cal.maxDate) {
    const max = moment(date.value, 'YYYY-MM-DD').isBefore(
      moment(cal.maxDate.value, 'YYYY-MM-DD')
    );
    selectable = selectable && max;
    enabled = enabled && max;
  }
  const selected = date.value === selectedDate;
  const isToday = date.value === today;
  const dateClassName = classnames({
    'slds-disabled-text': !enabled,
    'slds-is-selected': selected,
    'slds-is-today': isToday,
  });
  return (
    <td
      className={dateClassName}
      headers={moment.weekdays(dayIndex)}
      role='gridcell'
      aria-disabled={!enabled}
      aria-selected={selected}
    >
      <span
        className='slds-day'
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={selectable ? 0 : -1}
        onClick={selectable ? onDateClick : undefined}
        onKeyDown={selectable ? onDateKeyDown : undefined}
        onFocus={enabled ? onDateFocus : cancelEvent}
        data-date-value={date.value}
      >
        {date.date}
      </span>
    </td>
  );
};

/**
 *
 */
type DatepickerMonthProps = {
  cal: Calendar;
  selectedDate: string | undefined;
  today: string;
} & DatepickerHandlers;

/**
 *
 */
const DatepickerMonth = forwardRef(
  (props: DatepickerMonthProps, ref: ForwardedRef<HTMLTableElement>) => {
    const {
      cal,
      selectedDate,
      today,
      onDateClick,
      onDateFocus,
      onDateKeyDown,
    } = props;
    return (
      <table
        ref={ref}
        className='datepicker__month'
        role='grid'
        aria-labelledby='month'
      >
        <thead>
          <tr>
            {moment.weekdaysMin(true).map((wd, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <th key={i}>
                <abbr title={moment.weekdays(true, i)}>{wd}</abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cal.weeks.map((days, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={i}>
              {days.map((date, dayIndex) => (
                <DatepickerDate
                  key={date.value}
                  {...{
                    cal,
                    date,
                    selectedDate,
                    today,
                    dayIndex,
                    onDateClick,
                    onDateFocus,
                    onDateKeyDown,
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);

/**
 *
 */
export const Datepicker: FC<DatepickerProps> = (props) => {
  const {
    autoFocus,
    className,
    selectedDate,
    minDate,
    maxDate,
    extensionRenderer: ExtensionRenderer,
    elementRef: elementRef_,
    onSelect,
    onBlur: onBlur_,
    onClose,
    ...rprops
  } = props;
  const [focusDate, setFocusDate] = useState<boolean>();
  const [targetDate, setTargetDate] = useState<string | undefined>(
    selectedDate
  );
  const elRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useMergeRefs([elRef, elementRef_]);
  const monthElRef = useRef<HTMLTableElement | null>(null);

  const onFocusDate = useEventCallback((date: string | undefined) => {
    const el = monthElRef.current;
    if (!el || !date) {
      return;
    }
    const dateEl: HTMLSpanElement | null = el.querySelector(
      `.slds-day[data-date-value="${date}"]`
    );
    if (dateEl) {
      dateEl.focus();
    }
  });

  const { getActiveElement } = useContext(ComponentSettingsContext);

  const isFocusedInComponent = useEventCallback(() => {
    const nodeEl = elRef.current;
    const targetEl = getActiveElement();
    return isElInChildren(nodeEl, targetEl);
  });

  useEffect(() => {
    setTargetDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (autoFocus) {
      const targetDate = selectedDate || getToday();
      setTimeout(() => {
        onFocusDate(targetDate);
      }, 10);
    }
  }, [autoFocus, selectedDate, onFocusDate]);

  useEffect(() => {
    if (focusDate && targetDate) {
      onFocusDate(targetDate);
      setFocusDate(false);
    }
  }, [focusDate, targetDate, onFocusDate]);

  const onDateClick = useEventCallback((date: string) => {
    onSelect?.(date);
  });

  const onDateKeyDown = useEventCallback(
    (date: string, e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        // return / space
        onDateClick(date);
        e.preventDefault();
        e.stopPropagation();
      } else if (e.keyCode >= 37 && e.keyCode <= 40) {
        // cursor key
        let m;
        if (e.keyCode === 37) {
          m = moment(targetDate).add(-1, e.shiftKey ? 'months' : 'days');
        } else if (e.keyCode === 39) {
          // right arrow key
          m = moment(targetDate).add(1, e.shiftKey ? 'months' : 'days');
        } else if (e.keyCode === 38) {
          // up arrow key
          m = moment(targetDate).add(-1, e.shiftKey ? 'years' : 'weeks');
        } else if (e.keyCode === 40) {
          // down arrow key
          m = moment(targetDate).add(1, e.shiftKey ? 'years' : 'weeks');
        }
        const newTargetDate = m?.format('YYYY-MM-DD') ?? targetDate;
        setTargetDate(newTargetDate);
        setFocusDate(true);
        e.preventDefault();
        e.stopPropagation();
      }
    }
  );

  const onDateFocus = useEventCallback((date: string) => {
    if (targetDate !== date) {
      setTimeout(() => {
        setTargetDate(date);
      }, 10);
    }
  });

  const onYearChange = useEventCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newTargetDate = moment(targetDate)
        .year(Number(e.target.value))
        .format('YYYY-MM-DD');
      setTargetDate(newTargetDate);
    }
  );

  const onMonthChange = useEventCallback((month: number) => {
    const newTargetDate = moment(targetDate)
      .add(month, 'months')
      .format('YYYY-MM-DD');
    setTargetDate(newTargetDate);
  });

  const onBlur = useEventCallback((e: React.FocusEvent<HTMLDivElement>) => {
    setTimeout(() => {
      if (!isFocusedInComponent()) {
        onBlur_?.(e);
      }
    }, 10);
  });

  const onKeyDown = useEventCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.keyCode === 27) {
        // ESC
        onClose?.();
      }
    }
  );

  const today = getToday();
  const cal = useMemo(
    () => createCalendarObject(targetDate, minDate, maxDate),
    [targetDate, minDate, maxDate]
  );
  const datepickerClassNames = classnames('slds-datepicker', className);
  return (
    <div
      {...rprops}
      className={datepickerClassNames}
      ref={elementRef}
      tabIndex={-1}
      aria-hidden={false}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <DatepickerFilter
        cal={cal}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />
      <DatepickerMonth
        ref={monthElRef}
        {...{
          cal,
          selectedDate,
          today,
          onDateClick,
          onDateFocus,
          onDateKeyDown,
        }}
      />
      {ExtensionRenderer ? <ExtensionRenderer {...props} /> : undefined}
    </div>
  );
};
