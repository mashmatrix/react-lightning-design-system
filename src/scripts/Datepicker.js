import React, { Component } from 'react';
import PropTypes from './propTypesImport';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import moment from 'moment';
import Button from './Button';
import { default as Picklist, PicklistItem } from './Picklist';

function createCalendarObject(date) {
  let d = moment(date, 'YYYY-MM-DD');
  if (!d.isValid()) {
    d = moment();
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
  return { year, month, weeks };
}

function cancelEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}

export default class Datepicker extends Component {
  constructor(props) {
    super(props);
    const targetDate = this.props.selectedDate || moment().format('YYYY-MM-DD');
    this.state = { targetDate };
    this.blurTimer = this.isSafari() ? (200) : (20);
    this.monthRef = this.monthRef.bind(this);
    this.datepickerRef = this.datepickerRef.bind(this);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      const targetDate = this.props.selectedDate || moment().format('YYYY-MM-DD');
      this.focusDate(targetDate);
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
      this.setState({ targetDate: date });
    }
  }

  onYearChange(item) {
    let targetDate = this.state.targetDate || this.props.selectedDate;
    targetDate = moment(targetDate).year(item.value).format('YYYY-MM-DD');
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
    }, this.blurTimer);
  }

  onKeyDown(e) {
    if (e.keyCode === 27) { // ESC
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  setFocusSafari() {
    this.safariFocus = true;
  }

  focusDate(date) {
    const el = ReactDOM.findDOMNode(this.month);
    const dateEl = el.querySelector(`.slds-day[data-date-value="${date}"]`);
    if (dateEl) {
      dateEl.focus();
    }
  }

  isSafari() {
    return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  }

  isFocusedInComponent() {
    const rootEl = ReactDOM.findDOMNode(this);
    let targetEl = document.activeElement;
    let res = false;
    if (this.isSafari() && this.safariFocus && targetEl === document.body) {
      this.safariFocus = false;
      res = true;
      const el = rootEl.querySelector('.slds-day');
      if (el) { el.focus(); }
    } else {
      while (targetEl && targetEl !== rootEl) {
        targetEl = targetEl.parentNode;
      }
      res = !!targetEl;
    }
    return res;
  }

  monthRef(ref) {
    this.month = ref;
  }

  datepickerRef(ref) {
    this.datepicker = ref;
  }

  renderFilter(cal) {
    /* eslint-disable max-len */
    const startYear = this.props.userCurrentYear ? moment().year() : cal.year;
    const minYear = startYear - this.props.backRange;
    return (
      <div className='slds-datepicker__filter slds-grid' onClick={this.setFocusSafari.bind(this)}>
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
          <Picklist
            className='slds-picklist--fluid slds-shrink-none'
            value={ cal.year }
            maxHeight={this.props.pickListHeight}
            onSelect={ this.onYearChange.bind(this) }
          >
            {
              new Array((this.props.backRange + this.props.futureRange)).join('_').split('_')
                .map((a, i) => {
                  let year = minYear + i;
                  return <PicklistItem key={ year } label={ year } value={ year } />;
                })
            }
          </Picklist>
        </div>
      </div>
    );
  }

  renderMonth(cal, selectedDate, today) {
    return (
      <table className='datepicker__month' role='grid' aria-labelledby='month' ref={this.monthRef}>
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
    let enabled = d.year === cal.year && d.month === cal.month;
    if (this.props.disablePastDateSelection) enabled = d.value >= today;
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
          tabIndex={ enabled ? 0 : -1 }
          onClick={ enabled ? this.onDateClick.bind(this, d.value) : null }
          onKeyDown={ enabled ? this.onDateKeyDown.bind(this, d.value) : null }
          onFocus={ enabled ? this.onDateFocus.bind(this, d.value) : cancelEvent }
          data-date-value={ d.value }
        >{ d.date }</span>
      </td>
    );
  }

  render() {
    const { className, selectedDate } = this.props;
    const today = moment().format('YYYY-MM-DD');
    const targetDate = this.state.targetDate || selectedDate;
    const cal = createCalendarObject(targetDate);
    const datepickerClassNames = classnames('slds-datepicker', className);
    return (
      <div
        className={ datepickerClassNames }
        ref={this.datepickerRef}
        aria-hidden={ false }
        onClick={ this.setFocusSafari.bind(this) }
        onBlur={ this.onBlur.bind(this) }
        onKeyDown={ this.onKeyDown.bind(this) }
      >
        { this.renderFilter(cal) }
        { this.renderMonth(cal, selectedDate, today) }
      </div>
    );
  }
}

Datepicker.defaultProps = {
  backRange: 100,
  futureRange: 30,
  userCurrentYear: true,
  pickListHeight: 5,

};

Datepicker.propTypes = {
  className: PropTypes.string,
  selectedDate: PropTypes.string,
  autoFocus: PropTypes.bool,
  onSelect: PropTypes.func,
  onBlur: PropTypes.func,
  onClose: PropTypes.func,
  disablePastDateSelection: PropTypes.bool,
  userCurrentYear: PropTypes.bool,
  backRange: PropTypes.number,
  futureRange: PropTypes.number,
  pickListHeight: PropTypes.oneOf([5, 7, 10]),
};
