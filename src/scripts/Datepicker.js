import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import Button from './Button';
import Select, { Option } from './Select';
import { getToday, isElInChildren } from './util';

function createCalendarObject(date, mnDate, mxDate) {
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
  const cal = { year, month, weeks };
  if (minDate) {
    cal.minDate = minDate;
  }
  if (maxDate) {
    cal.maxDate = maxDate;
  }
  return cal;
}

function cancelEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}

export default class Datepicker extends Component {
  constructor() {
    super();
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
    if (this.state.focusDate && (this.state.targetDate || this.props.selectedDate)) {
      this.focusDate(this.state.targetDate || this.props.selectedDate);
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ focusDate: false });
    }
  }

  onDateKeyDown(date, e) {
    let targetDate = this.state.targetDate || this.props.selectedDate;
    if (e.keyCode === 13 || e.keyCode === 32) { // return / space
      this.onDateClick(date);
      e.preventDefault();
      e.stopPropagation();
    } else if (e.keyCode >= 37 && e.keyCode <= 40) { // cursor key
      if (e.keyCode === 37) {
        targetDate = moment(targetDate).add(-1, e.shiftKey ? 'months' : 'days');
      } else if (e.keyCode === 39) { // right arrow key
        targetDate = moment(targetDate).add(1, e.shiftKey ? 'months' : 'days');
      } else if (e.keyCode === 38) { // up arrow key
        targetDate = moment(targetDate).add(-1, e.shiftKey ? 'years' : 'weeks');
      } else if (e.keyCode === 40) { // down arrow key
        targetDate = moment(targetDate).add(1, e.shiftKey ? 'years' : 'weeks');
      }
      targetDate = targetDate.format('YYYY-MM-DD');
      this.setState({ targetDate, focusDate: true });
      e.preventDefault();
      e.stopPropagation();
    }
  }

  onDateClick(date) {
    if (this.props.onSelect) {
      this.props.onSelect(date);
    }
  }

  onDateFocus(date) {
    if (this.state.targetDate !== date) {
      setTimeout(() => {
        this.setState({ targetDate: date });
      }, 10);
    }
  }

  onYearChange(e, item) {
    let targetDate = this.state.targetDate || this.props.selectedDate;
    targetDate = moment(targetDate).year(item).format('YYYY-MM-DD');
    this.setState({ targetDate });
  }

  onMonthChange(month) {
    let targetDate = this.state.targetDate || this.props.selectedDate;
    targetDate = moment(targetDate).add(month, 'months').format('YYYY-MM-DD');
    this.setState({ targetDate });
  }

  onBlur(e) {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        if (this.props.onBlur) {
          this.props.onBlur(e);
        }
      }
    }, 10);
  }

  onKeyDown(e) {
    if (e.keyCode === 27) { // ESC
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  focusDate(date) {
    const el = this.month;
    if (!el) { return; }
    const dateEl = el.querySelector(`.slds-day[data-date-value="${date}"]`);
    if (dateEl) {
      dateEl.focus();
    }
  }

  isFocusedInComponent() {
    return isElInChildren(this.node, document.activeElement);
  }

  renderFilter(cal) {
    /* eslint-disable max-len */
    return (
      <div className='slds-datepicker__filter slds-grid'>
        <div className='slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--2-of-3'>
          <div className='slds-align-middle'>
            <Button
              className='slds-align-middle'
              type='icon-container'
              icon='left'
              size='small'
              alt='Previous Month'
              onClick={ this.onMonthChange.bind(this, -1) }
            />
          </div>
          <h2 className='slds-align-middle'>{ moment.monthsShort()[cal.month] }</h2>
          <div className='slds-align-middle'>
            <Button
              className='slds-align-middle'
              type='icon-container'
              icon='right'
              size='small'
              alt='Next Month'
              onClick={ this.onMonthChange.bind(this, 1) }
            />
          </div>
        </div>
        <div className='slds-size--1-of-3'>
          <Select
            value={ cal.year }
            onChange={ this.onYearChange.bind(this) }
          >
            {
              new Array(11).join('_').split('_')
                .map((a, i) => {
                  const year = (cal.year + i) - 5;
                  return <Option key={ year } label={ year } value={ year } />;
                })
            }
          </Select>
        </div>
      </div>
    );
  }

  renderMonth(cal, selectedDate, today) {
    return (
      <table
        className='datepicker__month'
        role='grid'
        aria-labelledby='month'
        ref={node => (this.month = node)}
      >
        <thead>
          <tr>
            {
              moment.weekdaysMin(true).map((wd, i) => (
                <th key={ i }>
                  <abbr title={ moment.weekdays(true, i) }>{ wd }</abbr>
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            cal.weeks.map((days, i) => (
              <tr key={ i }>{ days.map(this.renderDate.bind(this, cal, selectedDate, today)) }</tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  renderDate(cal, selectedDate, today, d, i) {
    let selectable = true;
    let enabled = d.year === cal.year && d.month === cal.month;
    if (cal.minDate) {
      const min = moment(d.value, 'YYYY-MM-DD')
        .isAfter(moment(cal.minDate.value, 'YYYY-MM-DD'));
      selectable = selectable && min;
      enabled = enabled && min;
    }
    if (cal.maxDate) {
      const max = moment(d.value, 'YYYY-MM-DD')
        .isBefore(moment(cal.maxDate.value, 'YYYY-MM-DD'));
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
        className={ dateClassName }
        key={ i }
        headers={ moment.weekdays(i) }
        role='gridcell'
        aria-disabled={ !enabled }
        aria-selected={ selected }
      >
        <span
          className='slds-day'
          tabIndex={ selectable ? 0 : -1 }
          onClick={ selectable ? this.onDateClick.bind(this, d.value) : null }
          onKeyDown={ selectable ? this.onDateKeyDown.bind(this, d.value) : null }
          onFocus={ enabled ? this.onDateFocus.bind(this, d.value) : cancelEvent }
          data-date-value={ d.value }
        >{ d.date }</span>
      </td>
    );
  }

  render() {
    const {
      className, selectedDate, minDate, maxDate,
      elementRef,
      extensionRenderer: ExtensionRenderer,
    } = this.props;
    const today = getToday();
    const targetDate = this.state.targetDate || selectedDate;
    const cal = createCalendarObject(targetDate, minDate, maxDate);
    const datepickerClassNames = classnames('slds-datepicker', className);
    const handleDOMRef = (node) => {
      this.node = node;
      if (elementRef) { elementRef(node); }
    };
    return (
      <div
        className={ datepickerClassNames }
        ref={ handleDOMRef }
        tabIndex={ -1 }
        aria-hidden={ false }
        onBlur={ this.onBlur }
        onKeyDown={ this.onKeyDown }
      >
        { this.renderFilter(cal) }
        { this.renderMonth(cal, selectedDate, today) }
        {
          ExtensionRenderer ?
            <ExtensionRenderer { ...this.props } /> :
            undefined
        }
      </div>
    );
  }
}


Datepicker.propTypes = {
  className: PropTypes.string,
  selectedDate: PropTypes.string,
  autoFocus: PropTypes.bool,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  extensionRenderer: PropTypes.func,
  elementRef: PropTypes.func,
  onSelect: PropTypes.func,
  onBlur: PropTypes.func,
  onClose: PropTypes.func,
};
