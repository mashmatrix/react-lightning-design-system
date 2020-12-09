import React, { Component, HTMLAttributes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { Button } from './Button';
import { Select, Option } from './Select';
import { getToday, isElInChildren } from './util';

type Date = {
  year: number;
  month: number;
  date: number;
  value: string;
};

type Calendar = {
  year: number;
  month: number;
  weeks: Date[][];
  minDate?: Date;
  maxDate?: Date;
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
  const first = moment(d)
    .startOf('month')
    .startOf('week');
  const last = moment(d)
    .endOf('month')
    .endOf('week');
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

export type DatepickerProps = {
  selectedDate?: string;
  autoFocus?: boolean;
  minDate?: string;
  maxDate?: string;
  extensionRenderer?: (...props: any[]) => JSX.Element;
  elementRef?: (node: HTMLDivElement) => void;
  onSelect?: (date: string) => void;
  onClose?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>;

export type DatepickerState = {
  focusDate?: boolean;
  targetDate?: string;
};

export class Datepicker extends Component<DatepickerProps, DatepickerState> {
  node: HTMLDivElement | null = null;

  month: HTMLTableElement | null = null;

  constructor(props: Readonly<DatepickerProps>) {
    super(props);
    this.state = {};

    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      const targetDate = this.props.selectedDate || getToday();
      setTimeout(() => {
        this.focusDate(targetDate);
      }, 10);
    }
  }

  componentDidUpdate() {
    if (
      this.state.focusDate &&
      (this.state.targetDate || this.props.selectedDate)
    ) {
      this.focusDate(this.state.targetDate || this.props.selectedDate);
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ focusDate: false });
    }
  }

  onDateKeyDown(date: string, e: React.KeyboardEvent<HTMLSpanElement>) {
    let targetDate: any = this.state.targetDate || this.props.selectedDate;
    if (e.keyCode === 13 || e.keyCode === 32) {
      // return / space
      this.onDateClick(date);
      e.preventDefault();
      e.stopPropagation();
    } else if (e.keyCode >= 37 && e.keyCode <= 40) {
      // cursor key
      if (e.keyCode === 37) {
        targetDate = moment(targetDate).add(-1, e.shiftKey ? 'months' : 'days');
      } else if (e.keyCode === 39) {
        // right arrow key
        targetDate = moment(targetDate).add(1, e.shiftKey ? 'months' : 'days');
      } else if (e.keyCode === 38) {
        // up arrow key
        targetDate = moment(targetDate).add(-1, e.shiftKey ? 'years' : 'weeks');
      } else if (e.keyCode === 40) {
        // down arrow key
        targetDate = moment(targetDate).add(1, e.shiftKey ? 'years' : 'weeks');
      }
      targetDate = targetDate.format('YYYY-MM-DD');
      this.setState({ targetDate, focusDate: true });
      e.preventDefault();
      e.stopPropagation();
    }
  }

  onDateClick(date: string) {
    if (this.props.onSelect) {
      this.props.onSelect(date);
    }
  }

  onDateFocus(date: string) {
    if (this.state.targetDate !== date) {
      setTimeout(() => {
        this.setState({ targetDate: date });
      }, 10);
    }
  }

  onYearChange(e: React.ChangeEvent<HTMLSelectElement>) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    let targetDate = this.state.targetDate || this.props.selectedDate;
    targetDate = moment(targetDate)
      .year(Number(e.target.value))
      .format('YYYY-MM-DD');
    this.setState({ targetDate });
  }

  onMonthChange(month: number) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    let targetDate = this.state.targetDate || this.props.selectedDate;
    targetDate = moment(targetDate)
      .add(month, 'months')
      .format('YYYY-MM-DD');
    this.setState({ targetDate });
  }

  onBlur(e: React.FocusEvent<HTMLDivElement>) {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        if (this.props.onBlur) {
          this.props.onBlur(e);
        }
      }
    }, 10);
  }

  onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.keyCode === 27) {
      // ESC
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  focusDate(date: string | undefined) {
    const el = this.month;
    if (!el) {
      return;
    }
    const dateEl: HTMLSpanElement | null = el.querySelector(
      `.slds-day[data-date-value="${date}"]`
    );
    if (dateEl) {
      dateEl.focus();
    }
  }

  isFocusedInComponent() {
    return isElInChildren(this.node, document.activeElement);
  }

  renderFilter(cal: Calendar) {
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
              onClick={this.onMonthChange.bind(this, -1)}
            />
          </div>
          <h2 className='slds-align-middle'>
            {moment.monthsShort()[cal.month]}
          </h2>
          <div className='slds-align-middle'>
            <Button
              className='slds-align-middle'
              type='icon-container'
              icon='right'
              size='small'
              alt='Next Month'
              onClick={this.onMonthChange.bind(this, 1)}
            />
          </div>
        </div>
        <div className='slds-size_1-of-3'>
          <Select value={cal.year} onChange={this.onYearChange.bind(this)}>
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
  }

  renderMonth(cal: Calendar, selectedDate: string | undefined, today: string) {
    return (
      <table
        className='datepicker__month'
        role='grid'
        aria-labelledby='month'
        ref={(node) => (this.month = node)}
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
              {days.map(this.renderDate.bind(this, cal, selectedDate, today))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderDate(
    cal: Calendar,
    selectedDate: string | undefined,
    today: string,
    d: Date,
    i: number
  ) {
    let selectable = true;
    let enabled = d.year === cal.year && d.month === cal.month;
    if (cal.minDate) {
      const min = moment(d.value, 'YYYY-MM-DD').isAfter(
        moment(cal.minDate.value, 'YYYY-MM-DD')
      );
      selectable = selectable && min;
      enabled = enabled && min;
    }
    if (cal.maxDate) {
      const max = moment(d.value, 'YYYY-MM-DD').isBefore(
        moment(cal.maxDate.value, 'YYYY-MM-DD')
      );
      selectable = selectable && max;
      enabled = enabled && max;
    }
    const selected = d.value === selectedDate;
    const isToday = d.value === today;
    const dateClassName = classnames({
      'slds-disabled-text': !enabled,
      'slds-is-selected': selected,
      'slds-is-today': isToday,
    });
    return (
      <td
        className={dateClassName}
        key={i}
        headers={moment.weekdays(i)}
        role='gridcell'
        aria-disabled={!enabled}
        aria-selected={selected}
      >
        <span
          className='slds-day'
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={selectable ? 0 : -1}
          onClick={
            selectable ? this.onDateClick.bind(this, d.value) : undefined
          }
          onKeyDown={
            selectable ? this.onDateKeyDown.bind(this, d.value) : undefined
          }
          onFocus={enabled ? this.onDateFocus.bind(this, d.value) : cancelEvent}
          data-date-value={d.value}
        >
          {d.date}
        </span>
      </td>
    );
  }

  render() {
    const {
      className,
      selectedDate,
      minDate,
      maxDate,
      elementRef,
      extensionRenderer: ExtensionRenderer,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      autoFocus,
      onSelect,
      onClose,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...props
    } = this.props;
    const today = getToday();
    const targetDate = this.state.targetDate || selectedDate;
    const cal = createCalendarObject(targetDate, minDate, maxDate);
    const datepickerClassNames = classnames('slds-datepicker', className);
    const handleDOMRef = (node: HTMLDivElement) => {
      this.node = node;
      if (elementRef) {
        elementRef(node);
      }
    };
    return (
      <div
        {...props}
        className={datepickerClassNames}
        ref={handleDOMRef}
        tabIndex={-1}
        aria-hidden={false}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
      >
        {this.renderFilter(cal)}
        {this.renderMonth(cal, selectedDate, today)}
        {ExtensionRenderer ? <ExtensionRenderer {...this.props} /> : undefined}
      </div>
    );
  }
}
