# CountEverest

![Version 3.0.0](https://img.shields.io/badge/version-3.0.0-blue.svg)
![License: GPL v2](https://img.shields.io/badge/license-GPL%20v2-green.svg)
![Vanilla JS](https://img.shields.io/badge/vanilla-js-yellow.svg)
![Size: 10 KB](https://img.shields.io/badge/size-1%20KB-brightgreen.svg)

![counteverest-plain](https://github.com/user-attachments/assets/eb4ee579-eac9-4ecf-96f2-f98bf116606e)


CountEverest is a lightweight, customizable countdown script that's easy to integrate into your
projects. It offers a range of features including callback functions, left-hand zeros, and easy
localization. Perfect for developers who want a flexible countdown solution without the need for
extensive JavaScript knowledge.

## Check out our [demo page](https://dxpr.github.io/CountEverest/)

## Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Options](#options)
- [Callback Functions](#callback-functions)
- [API Methods](#api-methods)
- [Migrate from jQuery CountEverest](#migrate-from-jquery-counteverest)
- [Examples](#examples)
- [Projects Using CountEverest](#projects-using-counteverest)
- [Comparison with Other Libraries](#comparison-with-other-libraries)
- [Frequently Asked Quegistions](#frequently-asked-questions)
- [License](#license)

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
   <div class="ce-countdown">
     <span class="ce-days"></span> <span class="ce-days-label"></span>
     <span class="ce-hours"></span> <span class="ce-hours-label"></span>
     <span class="ce-minutes"></span> <span class="ce-minutes-label"></span>
     <span class="ce-seconds"></span> <span class="ce-seconds-label"></span>
   </div>
   ```

4. Initialize CountEverest:

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     const countdownElement = document.querySelector('.ce-countdown');
     if (countdownElement) {
       new CountEverest(countdownElement, {
         day: 1,
         month: 1,
         year: 2026,
       });
     }
   });
   ```

## Installation

### Direct Download

Download the `counteverest.js` and `counteverest.min.css` files from the
[releases page](https://github.com/dxpr/CountEverest/releases) and include them in your project.

### Git Clone

```bash
git clone git@github.com:dxpr/CountEverest.git
```

## Usage

After including the necessary files, you can create a countdown by following these steps:

1. Create the HTML structure for your countdown (see Quick Start for an example).
2. Initialize CountEverest with your desired options:

   ```javascript
   const countdown = new CountEverest(document.querySelector('.ce-countdown'), {
     day: 25,
     month: 12,
     year: 2023,
     hour: 0,
     minute: 0,
     second: 0,
   });
   ```

## Customization

CountEverest offers extensive customization options. Here are some examples:

### Included styles

#### Simple Grid Style (Theme 1)

![counteverest-grid](https://github.com/user-attachments/assets/da2b7b42-9402-4e1b-8bfe-8a6a36c44cc5)

#### Simple Color Blocks Style (Theme 6)

![counteverest-colorblocks](https://github.com/user-attachments/assets/f98eb165-fa1b-4098-b607-5dda5759ec95)

#### Circles Style (Theme 9)

![counteverest-circles](https://github.com/user-attachments/assets/9154a576-2b98-47b6-a82a-8cf7d9973e6c)

#### Flip Clock Style (Theme 10)

![counteverest-flip-down](https://github.com/user-attachments/assets/50697427-7fd7-42b1-9be7-a94ba03d8a17)

#### Minimal Style For Background Video/Image (Theme 12)

![counteverest-bgvideo](https://github.com/user-attachments/assets/eca809f7-09bc-4e0e-b43b-83afc05f41ce)


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

| Option   | Type    | Default | Description                             |
| -------- | ------- | ------- | --------------------------------------- |
| day      | Number  | 1       | The target day of the month (1-31)      |
| month    | Number  | 1       | The target month (1-12)                 |
| year     | Number  | 2050    | The target year                         |
| hour     | Number  | 0       | The target hour (0-23)                  |
| minute   | Number  | 0       | The target minute (0-59)                |
| second   | Number  | 0       | The target second (0-59)                |
| timeZone | Number  | null    | The timezone offset (-12 to 14)         |
| countUp  | Boolean | false   | If true, counts up from the target date |

## Callback Functions

CountEverest provides several callback functions that you can use to add custom behavior:

- `onInit()`: Called when the countdown is initialized
- `beforeCalculation()`: Called before each calculation cycle
- `afterCalculation()`: Called after each calculation cycle
- `onChange(values)`: Called when the countdown values change. Receives an object with the current
  values.
- `onComplete()`: Called when the countdown reaches zero

Example usage:

```javascript
new CountEverest(element, {
  // ... other options ...
  onChange: function (values) {
    console.log('Countdown updated:', values);
  },
  onComplete: function () {
    console.log('Countdown finished!');
  },
});
```

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

### Countdown with Callback

```javascript
new CountEverest(document.querySelector('.countdown'), {
  day: 25,
  month: 12,
  year: 2023,
  onComplete: function () {
    alert('Merry Christmas!');
  },
});
```

### Count Up from a Past Date

```javascript
new CountEverest(document.querySelector('.count-up'), {
  day: 1,
  month: 1,
  year: 2000,
  countUp: true,
});
```

For more examples, check out our [demo page](https://dxpr.github.io/CountEverest/).

## Projects Using CountEverest

- [DXPR Builder](https://www.drupal.org/project/dxpr_builder): A Drupal website builder that uses
  CountEverest for countdown functionality.

## Comparison with Other Libraries

| Feature             | CountEverest | Countdown.js | TimeCircles | SimpleTimer.js |
| ------------------- | ------------ | ------------ | ----------- | -------------- |
| File Size           | 1 KB         | 4 KB         | 10 KB       | 3 KB           |
| Dependency-free     | ✅           | ✅           | ❌ (jQuery) | ✅             |
| Customizable Labels | ✅           | ❌           | ✅          | ✅             |
| Count Up Feature    | ✅           | ❌           | ❌          | ❌             |
| Timezone Support    | ✅           | ❌           | ✅          | ❌             |

## Frequently Asked Questions

### Q: How can I change the countdown's target date dynamically?

A: Use the `setTargetDate()` method:

```javascript
const countdown = new CountEverest(element, options);
countdown.setTargetDate(new Date(2025, 0, 1));
```

### Q: Can I display the countdown in a specific timezone?

A: Yes, use the `timeZone` option:

```javascript
new CountEverest(element, {
  // ... other options ...
  timeZone: -5, // for EST (UTC-5)
});
```

## Migrate from jQuery CountEverest

If you're migrating from the jQuery version to the new vanilla JavaScript version, here are the key
changes you need to make:

1. Update your script inclusion:

   ```html
   <!-- Old -->
   <script src="js/jquery.counteverest.js"></script>

   <!-- New -->
   <script src="../dist/counteverest.min.js"></script>
   ```

2. Update your initialization code:

   ```javascript
   // Old
   $('.countdown').countEverest({
     day: 1,
     month: 1,
     year: 2026,
   });

   // New
   const countdown = new CountEverest(document.querySelector('.countdown'), {
     day: 1,
     month: 1,
     year: 2026,
   });
   ```

3. Update any custom code that interacts with the countdown:

   ```javascript
   // Old
   var countdown = $('.countdown').data('countEverest');
   countdown.setTargetDate(new Date(2024, 0, 1));

   // New
   countdown.setTargetDate(new Date(2024, 0, 1));
   ```

## License

CountEverest is licensed under the GPL v2 License.
