# CountEverest

![Version 3.1.0](https://img.shields.io/badge/version-3.1.0-blue.svg)
![License: GPL v2](https://img.shields.io/badge/license-GPL%20v2-green.svg)
![Vanilla JS](https://img.shields.io/badge/vanilla-js-yellow.svg)
![Size: 9.7 KiB](https://img.shields.io/badge/size-9.7%20KiB-brightgreen.svg)

![counteverest-plain](https://github.com/user-attachments/assets/eb4ee579-eac9-4ecf-96f2-f98bf116606e)

CountEverest is a lightweight, customizable, and dependency-free countdown script. It's designed
for ease of use, automatically generating all necessary HTML and initializing timers when they
scroll into view. It's the perfect zero-config solution for developers who want a flexible
countdown without writing any JavaScript.

## Check out our [demo page](https://dxpr.github.io/CountEverest/)

## Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Auto-Initialization (New in 3.1.0)](#auto-initialization-new-in-310)
- [Customization](#customization)
- [Options](#options)
- [Callback Functions](#callback-functions)
- [API Methods](#api-methods)
- [Examples](#examples)

## Quick Start

1. Clone the repository or download the latest release:

    ```bash
    git clone git@github.com:dxpr/CountEverest.git
    ```

2. Include the CSS and JS files in your HTML:

    ```html
    <link rel="stylesheet" href="../dist/counteverest.min.css" />
    <script src="../dist/counteverest.min.js"></script>
    ```

3. Add the countdown HTML:

    ```html
    <div class="ce-countdown" data-ce-datetime="2027-12-31"></div>
    ```

That's it! The script will automatically detect the element, generate the required HTML for the
countdown, and start the timer when it becomes visible on the page.

To use a specific theme, just add the theme class:

```html
<div class="ce-countdown ce-countdown--theme-6" data-ce-datetime="2027-12-31"></div>
```

## Installation

While auto-initialization is recommended, you can still initialize the plugin manually if you need
more control.

1. Include the CSS and JS files in your HTML (see Quick Start).
2. Add an empty `div` where you want the countdown to appear.

    ```html
    <div class="my-countdown"></div>
    ```

3. Initialize CountEverest with your desired options:

    ```javascript
    document.addEventListener('DOMContentLoaded', () => {
      const countdownElement = document.querySelector('.my-countdown');
      if (countdownElement) {
        new CountEverest(countdownElement, {
          year: 2027,
          month: 12,
          day: 31,
        });
      }
    });
    ```

## Auto-Initialization (New in 3.1.0)

CountEverest automatically detects countdown timers when they scroll into view, eliminating the
need for custom JavaScript. This feature uses the Intersection Observer API for optimal performance
and automatically generates the countdown's HTML structure.

### Basic Auto-Initialization

Simply add the `data-ce-datetime` attribute to your countdown element:

```html
<div class="ce-countdown" data-ce-datetime="2027-12-31"></div>
```

The countdown will automatically start when the element scrolls into view (10% visible by default).

### Available Data Attributes

Configure your countdown using data attributes:

#### Date/Time Configuration

- `data-ce-datetime="2027-12-31 14:30:45"` - Set target date and time in one attribute

  Supported formats:

  - `"2027"` - Year only (defaults: month=1, day=1, hour=0, minute=0, second=0)
  - `"2027-12"` - Year and month (defaults: day=1, hour=0, minute=0, second=0)
  - `"2027-12-31"` - Year, month, and day (defaults: hour=0, minute=0, second=0)
  - `"2027-12-31 14:30"` - Date and time (hour:minute, defaults: second=0)
  - `"2027-12-31 14:30:45"` - Complete date and time

#### Layout Configuration

- `data-ce-units="days,hours,minutes,seconds"` - A comma-separated list of units to display.
  Available units are `years`, `months`, `days`, `hours`, `minutes`, and `seconds`. Defaults to
  `days,hours,minutes,seconds`.

#### Behavior Configuration

- `data-ce-count-up="true"` - Count up from target date instead of down
- `data-ce-singular-labels="false"` - Disable singular labels (e.g., "1 Day" vs "1 Days")
- `data-ce-left-hand-zeros="false"` - Disable leading zeros (e.g., "1" vs "01")

#### Label Customization

- `data-ce-days-label="Days"` - Plural label for days
- `data-ce-day-label="Day"` - Singular label for day
- `data-ce-hours-label="Hours"` - Plural label for hours
- `data-ce-hour-label="Hour"` - Singular label for hour
- `data-ce-minutes-label="Minutes"` - Plural label for minutes
- `data-ce-minute-label="Minute"` - Singular label for minute
- `data-ce-seconds-label="Seconds"` - Plural label for seconds
- `data-ce-second-label="Second"` - Singular label for second
- `data-ce-accent-color="#E91E63"` - Custom color for themes that support it (Theme 6, 9, 12).

### Advanced Auto-Initialization

You can manually control auto-initialization with custom options:

```javascript
// Initialize all elements with custom selector and options
CountEverest.autoInit({
  selector: '.my-countdown', // Custom selector (default: '[data-ce-datetime]')
  rootMargin: '50px', // Start initialization 50px before element is visible
  threshold: 0.5, // Element must be 50% visible before initializing
});
```

### Manual Control

Auto-initialization happens automatically when the DOM loads if elements with `data-ce-datetime` are
found. You can disable this by calling methods manually:

```javascript
// Initialize a specific element from data attributes
CountEverest.initElement(document.querySelector('.my-countdown'));

// Initialize all elements immediately (no scroll detection)
CountEverest.initAllVisible('[data-ce-datetime]');
```

### Browser Compatibility

Auto-initialization uses the Intersection Observer API, which is supported in all modern browsers.
For older browsers (IE11 and below), CountEverest automatically falls back to immediate
initialization.

## Customization

CountEverest offers extensive customization options with several built-in themes to match
different design needs.

### Available Themes

CountEverest includes multiple pre-designed themes that you can use by adding the
appropriate CSS class to your countdown element. Each theme has its own unique visual style and
behavior.

#### Default Theme (No class needed)

The most basic theme with simple text styling. Numbers and labels are displayed inline with
minimal formatting. Perfect for subtle integrations where you want the countdown to blend
seamlessly with your existing content.

**Usage:** Simply don't add any theme class to your countdown element.

```html
<div class="ce-countdown" data-ce-datetime="2027"></div>
```

#### Theme 1: Simple Grid Layout (`ce-countdown--theme-1`)

![counteverest-grid](https://github.com/user-attachments/assets/da2b7b42-9402-4e1b-8bfe-8a6a36c44cc5)

A clean, organized layout where each time unit (days, hours, minutes, seconds) is displayed
in its own column. Numbers appear above their corresponding labels with clear separation between
units. This theme works well for professional websites and landing pages where clarity is
important.

**Best for:** Landing pages, event announcements, professional websites
**Features:** Grid-based layout, clear visual separation, responsive design

```html
<div class="ce-countdown ce-countdown--theme-1" data-ce-datetime="2027"></div>
```

#### Theme 6: Animated Color Blocks (`ce-countdown--theme-6`)

![counteverest-colorblocks](https://github.com/user-attachments/assets/f98eb165-fa1b-4098-b607-5dda5759ec95)

Eye-catching colored blocks with smooth flip animations when numbers change. Each time unit is
displayed in a colorful rectangular block with the number prominently featured. The blocks
animate with a satisfying flip effect every time the countdown updates.

**Best for:** Product launches, sales countdowns, marketing campaigns
**Features:** Flip animations, customizable accent colors, high visual impact
**Supports accentColor:** Yes - changes the background color of the blocks

```html
<div
  class="ce-countdown ce-countdown--theme-6"
  data-ce-datetime="2027-12-31"
  data-ce-accent-color="#E91E63"
></div>
```

#### Theme 9: Minimalist Circles (`ce-countdown--theme-9`)

![counteverest-circles](https://github.com/user-attachments/assets/9154a576-2b98-47b6-a82a-8cf7d9973e6c)

Elegant circular progress indicators that visually represent the remaining time. Each time
unit is displayed inside a circle with a progress arc that shows how much time is left in that
unit. The circles animate smoothly as time progresses.

**Best for:** Modern websites, dashboards, mobile apps, minimalist designs
**Features:** Circular progress visualization, smooth animations, space-efficient
**Supports accentColor:** Yes - changes the color of the progress arcs and text

```html
<div
  class="ce-countdown ce-countdown--theme-9"
  data-ce-datetime="2027-12-31"
  data-ce-accent-color="#2196F3"
></div>
```

#### Theme 10: Retro Flip Clock (`ce-countdown--theme-10`)

![counteverest-flip-down](https://github.com/user-attachments/assets/50697427-7fd7-42b1-9be7-a94ba03d8a17)

A nostalgic flip clock design reminiscent of classic airport departure boards and vintage
alarm clocks. Individual digits flip with realistic 3D animations, creating a satisfying
mechanical feel. Each digit rotates through a complete flip animation when changing.

**Best for:** Retro themes, creative portfolios, event websites, nostalgic designs
**Features:** 3D flip animations, realistic physics, individual digit control
**Note:** Does not support custom accent colors (uses theme-specific styling)

```html
<div class="ce-countdown ce-countdown--theme-10" data-ce-datetime="2027-12-31"></div>
```

#### Theme 12: Overlay Style for Media Backgrounds (`ce-countdown--theme-12`)

![counteverest-bgvideo](https://github.com/user-attachments/assets/eca809f7-09bc-4e0e-b43b-83afc05f41ce)

Designed specifically for overlaying on background videos or images. Features large, bold
digits with subtle styling that stands out against media backgrounds without being overwhelming.
The text is optimized for readability over various background types.

**Best for:** Video backgrounds, hero sections, image overlays, full-screen designs
**Features:** High contrast text, media-optimized styling, large readable digits
**Supports accentColor:** Yes - changes text color and digit border color

```html
<div
  class="ce-countdown ce-countdown--theme-12"
  data-ce-datetime="2027-12-31"
  data-ce-accent-color="#FFFFFF"
></div>
```

### Choosing the Right Theme

- **Default/Theme 1**: Use for subtle, professional presentations
- **Theme 6**: Perfect for marketing and sales with high visual impact
- **Theme 9**: Ideal for modern, clean designs and dashboards
- **Theme 10**: Great for creative and retro-themed projects
- **Theme 12**: Essential for video backgrounds and media-rich designs

### Custom Styling

All themes can be further customized with CSS. The `accentColor` option provides easy color
customization for supported themes, but you can also override any styling with custom CSS rules.

### Custom Labels

You can set custom labels for your countdown units:

```javascript
new CountEverest(element, {
  // ... other options ...
  daysLabel: 'Days',
  dayLabel: 'Day',
  hoursLabel: 'Hours',
  hourLabel: 'Hour',
  // ... and so on
});
```

## Options

Here's a comprehensive list of options you can use to customize CountEverest:

| Option         | Type    | Default                        | Description                  |
| -------------- | ------- | ------------------------------ | ---------------------------- |
| day            | Number  | 1                              | Target day (1-31)            |
| month          | Number  | 1                              | Target month (1-12)          |
| year           | Number  | 2050                           | Target year                  |
| hour           | Number  | 0                              | Target hour (0-23)           |
| minute         | Number  | 0                              | Target minute (0-59)         |
| second         | Number  | 0                              | Target second (0-59)         |
| accentColor    | String  | `'#284ED8'`                    | Color for themes 6, 9, 12    |
| units          | Array   | `[days,hours,minutes,seconds]` | Time units to show           |
| countUp        | Boolean | false                          | Count up instead of down     |
| singularLabels | Boolean | true                           | Use singular when value is 1 |
| leftHandZeros  | Boolean | true                           | Add leading zeros to numbers |
| yearsLabel     | String  | 'Years'                        | Plural label for years       |
| yearLabel      | String  | 'Year'                         | Singular label for years     |
| daysLabel      | String  | 'Days'                         | Plural label for days        |
| dayLabel       | String  | 'Day'                          | Singular label for days      |
| hoursLabel     | String  | 'Hours'                        | Plural label for hours       |
| hourLabel      | String  | 'Hour'                         | Singular label for hours     |
| minutesLabel   | String  | 'Minutes'                      | Plural label for minutes     |
| minuteLabel    | String  | 'Minute'                       | Singular label for minutes   |
| secondsLabel   | String  | 'Seconds'                      | Plural label for seconds     |
| secondLabel    | String  | 'Second'                       | Singular label for seconds   |

## Callback Functions

- `onInit()`: Called when the countdown is initialized
- `afterCalculation()`: Called after time calculations are complete
- `onChange()`: Called every second after the time has been recalculated.

## API Methods

CountEverest instances provide the following methods:

- `setTargetDate(date)`: Set a new target date

  ```javascript
  countdown.setTargetDate(new Date(2024, 0, 1));
  ```

- `getTargetDate()`: Get the current target date

  ```javascript
  const targetDate = countdown.getTargetDate();
  ```

- `destroy()`: Stop the countdown and clean up

  ```javascript
  countdown.destroy();
  ```

## Examples

Here are some common use cases for CountEverest:

### Basic Countdown

```javascript
new CountEverest(document.querySelector('.countdown'), {
  day: 1,
  month: 1,
  year: 2024,
});
```

### Countdown with Custom Initialization

```javascript
new CountEverest(document.querySelector('.countdown'), {
  day: 25,
  month: 12,
  year: 2023,
  onInit: function () {
    console.log('Holiday countdown started!');
  },
});
```
