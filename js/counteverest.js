/*!
 * CountEverest - Vanilla JS Plugin
 * @version   3.1.0
 * @author    Patrick Baber (original jQuery plugin)
 * @author    Jurriaan Roelofs
 * @see       http://counteverest.anacoda.de
 */

// eslint-disable-next-line no-unused-vars
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
      monthsWrapper: '.ce-months',
      daysWrapper: '.ce-days',
      hoursWrapper: '.ce-hours',
      minutesWrapper: '.ce-minutes',
      secondsWrapper: '.ce-seconds',
      decisecondsWrapper: '.ce-dseconds',
      millisecondsWrapper: '.ce-mseconds',
      yearsLabelWrapper: '.ce-years-label',
      monthsLabelWrapper: '.ce-months-label',
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
      onInit: null,
      afterCalculation: null,
      onChange: null,
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
    this.#intervalId = setInterval(() => this.calculate(), 1000);
    this.#settings.onInit?.call(this);
  }

  calculate() {
    const currentDate = new Date();
    const targetDate = this.#targetDate;
    let timeDiff = targetDate - currentDate;
    const originalDiff = Math.abs(timeDiff); // keep full difference for total-days calc

    if (this.#settings.countUp) {
      timeDiff = currentDate - targetDate;
    } else {
      timeDiff = Math.max(0, timeDiff);
    }

    // Hard-coded time constants (removed from settings)
    const YEAR_MS = 31536000000;
    const DAY_MS = 86400000;
    const HOUR_MS = 3600000;
    const MINUTE_MS = 60000;
    const SECOND_MS = 1000;

    const values = {};

    // Calculate years
    values.years = Math.floor(timeDiff / YEAR_MS);
    timeDiff %= YEAR_MS;

    // Calculate days
    values.days = Math.floor(timeDiff / DAY_MS);
    timeDiff %= DAY_MS;

    // Calculate hours
    values.hours = Math.floor(timeDiff / HOUR_MS);
    timeDiff %= HOUR_MS;

    // Calculate minutes
    values.minutes = Math.floor(timeDiff / MINUTE_MS);
    timeDiff %= MINUTE_MS;

    // Calculate seconds
    values.seconds = Math.floor(timeDiff / SECOND_MS);

    // If the countdown markup does NOT include a years wrapper but *does* include a days wrapper,
    // show the total days remaining instead of the remaining days after years.
    if (
      !this.#element.querySelector(this.#settings.yearsWrapper) &&
      this.#element.querySelector(this.#settings.daysWrapper)
    ) {
      values.days = Math.floor(originalDiff / DAY_MS);
    }

    Object.assign(this, values);

    if (typeof this.#settings.afterCalculation === 'function') {
      this.#settings.afterCalculation.call(this);
    }

    this.output();

    if (timeDiff <= 0 && !this.#settings.countUp) {
      clearInterval(this.#intervalId);
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

  /**
   * Static method to enable automatic initialization of countdown timers
   * when they scroll into view. Elements should have data-ce-auto attribute
   * and date/time configuration via data attributes.
   */
  static autoInit(options = {}) {
    const defaultOptions = {
      selector: '[data-ce-auto]',
      rootMargin: '0px',
      threshold: 0.1,
    };

    const settings = { ...defaultOptions, ...options };

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      console.warn(
        'CountEverest auto-init: IntersectionObserver not supported. Falling back to immediate initialization.'
      );
      CountEverest.initAllVisible(settings.selector);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.ceInitialized) {
            CountEverest.initElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: settings.rootMargin,
        threshold: settings.threshold,
      }
    );

    // Observe all auto-init elements
    const elements = document.querySelectorAll(settings.selector);
    elements.forEach((element) => {
      if (!element.dataset.ceInitialized) {
        observer.observe(element);
      }
    });
  }

  /**
   * Initialize all visible elements immediately (fallback for older browsers)
   */
  static initAllVisible(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (!element.dataset.ceInitialized) {
        CountEverest.initElement(element);
      }
    });
  }

  /**
   * Initialize a single countdown element from data attributes
   */
  static initElement(element) {
    const options = CountEverest.parseDataAttributes(element);

    // Mark as initialized to prevent double initialization
    element.dataset.ceInitialized = 'true';

    // Create new CountEverest instance
    new CountEverest(element, options);
  }

  /**
   * Parse configuration from data attributes
   */
  static parseDataAttributes(element) {
    const options = {};

    // Parse date/time attributes
    const dateAttrs = ['day', 'month', 'year', 'hour', 'minute', 'second'];
    dateAttrs.forEach((attr) => {
      const value = element.dataset[`ce${attr.charAt(0).toUpperCase() + attr.slice(1)}`];
      if (value !== undefined) {
        options[attr] = parseInt(value, 10);
      }
    });

    // Parse boolean attributes
    const boolAttrs = ['countUp', 'singularLabels'];
    boolAttrs.forEach((attr) => {
      const value = element.dataset[`ce${attr.charAt(0).toUpperCase() + attr.slice(1)}`];
      if (value !== undefined) {
        options[attr] = value === 'true' || value === '';
      }
    });

    // Parse string attributes
    const stringAttrs = [
      'yearsLabel',
      'yearLabel',
      'daysLabel',
      'dayLabel',
      'hoursLabel',
      'hourLabel',
      'minutesLabel',
      'minuteLabel',
      'secondsLabel',
      'secondLabel',
    ];
    stringAttrs.forEach((attr) => {
      const value = element.dataset[`ce${attr.charAt(0).toUpperCase() + attr.slice(1)}`];
      if (value !== undefined) {
        options[attr] = value;
      }
    });

    // Parse numeric attributes
    const numericAttrs = ['timeZone'];
    numericAttrs.forEach((attr) => {
      const value = element.dataset[`ce${attr.charAt(0).toUpperCase() + attr.slice(1)}`];
      if (value !== undefined) {
        options[attr] = parseFloat(value);
      }
    });

    return options;
  }

  /**
   * Auto-initialize all countdown elements when DOM is ready
   */
  static initOnDOMReady() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => CountEverest.autoInit());
    } else {
      CountEverest.autoInit();
    }
  }
}

// Auto-initialize when DOM is ready if elements with data-ce-auto exist
if (document.querySelector && document.querySelector('[data-ce-auto]')) {
  CountEverest.initOnDOMReady();
}

window.CountEverest = CountEverest;
