/*!
 * CountEverest - Vanilla JS Plugin
 * @version   3.0.0
 * @author    Patrick Baber (original jQuery plugin)
 * @author    Jurriaan Roelofs
 * @see       http://counteverest.anacoda.de
 */

class CountEverest {
  static DEFAULT_SETTINGS;

  constructor(element, options) {
    CountEverest.DEFAULT_SETTINGS = {
      day: 1,
      month: 1,
      year: 2050,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      timeZone: null,
      countUp: false,
      currentDateTime: null,
      yearsWrapper: '.ce-years',
      daysWrapper: '.ce-days',
      hoursWrapper: '.ce-hours',
      minutesWrapper: '.ce-minutes',
      secondsWrapper: '.ce-seconds',
      decisecondsWrapper: '.ce-dseconds',
      millisecondsWrapper: '.ce-mseconds',
      yearsLabelWrapper: '.ce-years-label',
      daysLabelWrapper: '.ce-days-label',
      hoursLabelWrapper: '.ce-hours-label',
      minutesLabelWrapper: '.ce-minutes-label',
      secondsLabelWrapper: '.ce-seconds-label',
      decisecondsLabelWrapper: '.ce-dseconds-label',
      millisecondsLabelWrapper: '.ce-mseconds-label',
      singularLabels: true,
      yearsLabel: 'Years',
      yearLabel: 'Year',
      daysLabel: 'Days',
      dayLabel: 'Day',
      hoursLabel: 'Hours',
      hourLabel: 'Hour',
      minutesLabel: 'Minutes',
      minuteLabel: 'Minute',
      secondsLabel: 'Seconds',
      secondLabel: 'Second',
      decisecondsLabel: 'Deciseconds',
      decisecondLabel: 'Decisecond',
      millisecondsLabel: 'Milliseconds',
      millisecondLabel: 'Millisecond',
      timeout: 1000,
      highspeedTimeout: 4,
      yearInMilliseconds: 31536000000,
      dayInMilliseconds: 86400000,
      hourInMilliseconds: 3600000,
      minuteInMilliseconds: 60000,
      secondInMilliseconds: 1000,
      decisecondInMilliseconds: 100,
      onInit: null,
      beforeCalculation: null,
      afterCalculation: null,
      onChange: null,
      onComplete: null,
    };
    this.#element = element;
    this.#settings = { ...CountEverest.DEFAULT_SETTINGS, ...options };
    this.#intervalId = null;
    this.init();
  }

  #element;
  #settings;
  #intervalId;
  #targetDate;

  init() {
    this.setTargetDate(
      new Date(
        this.#settings.year,
        this.#settings.month - 1,
        this.#settings.day,
        this.#settings.hour,
        this.#settings.minute,
        this.#settings.second
      )
    );
    this.calculate();
    this.#intervalId = setInterval(() => this.calculate(), this.#settings.timeout);
    this.#settings.onInit?.call(this);
  }

  calculate() {
    if (typeof this.#settings.beforeCalculation === 'function') {
      this.#settings.beforeCalculation.call(this);
    }

    const currentDate = new Date();
    const targetDate = this.#targetDate;
    let timeDiff = targetDate - currentDate;

    if (this.#settings.countUp) {
      timeDiff = currentDate - targetDate;
    } else {
      timeDiff = Math.max(0, timeDiff);
    }

    const units = ['years', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];
    const values = units.reduce((acc, unit) => {
      acc[unit] = Math.floor(timeDiff / this.#settings[`${unit.slice(0, -1)}InMilliseconds`]);
      timeDiff %= this.#settings[`${unit.slice(0, -1)}InMilliseconds`];
      return acc;
    }, {});

    Object.assign(this, values);

    if (typeof this.#settings.afterCalculation === 'function') {
      this.#settings.afterCalculation.call(this);
    }

    this.output();

    if (timeDiff <= 0 && !this.#settings.countUp) {
      clearInterval(this.#intervalId);
      if (typeof this.#settings.onComplete === 'function') {
        this.#settings.onComplete.call(this);
      }
    }

    if (typeof this.#settings.onChange === 'function') {
      this.#settings.onChange.call(this, values);
    }
  }

  output() {
    ['years', 'days', 'hours', 'minutes', 'seconds'].forEach((unit) => {
      const value = this[unit];
      const wrapper = this.#settings[`${unit}Wrapper`];
      const labelWrapper = this.#settings[`${unit}LabelWrapper`];

      const element = this.#element.querySelector(wrapper);
      if (element) {
        element.innerHTML = this.wrapDigits(value);
      }

      this.writeLabelToDom(labelWrapper, this.getLabel(unit, value));
    });
  }

  wrapDigits(value) {
    return value
      .toString()
      .padStart(2, '0')
      .split('')
      .map((digit) => `<span class="ce-digit">${digit}</span>`)
      .join('');
  }

  writeToDom(wrapper, value) {
    const element = this.#element.querySelector(wrapper);
    if (element) element.textContent = value;
  }

  writeLabelToDom(wrapper, value) {
    const element = this.#element.querySelector(wrapper);
    if (element) element.textContent = value;
  }

  getLabel(unit, value) {
    const singular = `${unit.slice(0, -1)}Label`;
    const plural = `${unit}Label`;
    return value === 1 && this.#settings.singularLabels
      ? this.#settings[singular]
      : this.#settings[plural];
  }

  setTargetDate(date) {
    this.#targetDate = date;
  }

  getTargetDate() {
    return this.#targetDate;
  }

  destroy() {
    clearInterval(this.#intervalId);
  }

  strPad(str, len, pad = '0') {
    return String(str).padStart(len, pad);
  }
}

window.CountEverest = CountEverest;
