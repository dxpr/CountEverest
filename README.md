# CountEverest

![Version 3.0.0](https://img.shields.io/badge/version-3.0.0-blue.svg) ![License: GPL v2](https://img.shields.io/badge/license-GPL%20v2-green.svg) ![Vanilla JS](https://img.shields.io/badge/vanilla-js-yellow.svg) ![Size: 10 KB](https://img.shields.io/badge/size-10%20KB-brightgreen.svg)

![CountEverest Demo](demo.gif)

CountEverest is a lightweight, customizable countdown script that's easy to integrate into your projects. It offers a range of features including callback functions, left-hand zeros, and easy localization. Perfect for developers who want a flexible countdown solution without the need for extensive JavaScript knowledge.

## Table of Contents

*   [Quick Start](#quick-start)
*   [Installation](#installation)
*   [Usage](#usage)
*   [Customization](#customization)
*   [Options](#options)
*   [Callback Functions](#callback-functions)
*   [API Methods](#api-methods)
*   [Migration Guide from jQuery Version](#migration-guide)
*   [Examples](#examples)
*   [Projects Using CountEverest](#projects-using-counteverest)
*   [Comparison with Other Libraries](#comparison)
*   [Contributing](#contributing)
*   [Troubleshooting](#troubleshooting)
*   [License](#license)

## Quick Start

1.  Clone the repository or download the latest release:
    
    ```
    git clone git@github.com:dxpr/CountEverest.git
    ```
    
2.  Include the CSS and JS files in your HTML:
    
    ```
    <link rel="stylesheet" href="css/counteverest.css">
    <script src="js/vendor/counteverest.js"></script>
    ```
    
3.  Add the countdown HTML:
    
    ```
    <div class="ce-countdown">
      <span class="ce-days"></span> <span class="ce-days-label"></span>
      <span class="ce-hours"></span> <span class="ce-hours-label"></span>
      <span class="ce-minutes"></span> <span class="ce-minutes-label"></span>
      <span class="ce-seconds"></span> <span class="ce-seconds-label"></span>
    </div>
    ```
    
4.  Initialize CountEverest:
    
    ```
    document.addEventListener('DOMContentLoaded', () => {
      const countdownElement = document.querySelector('.ce-countdown');
      if (countdownElement) {
        new CountEverest(countdownElement, {
          day: 1,
          month: 1,
          year: 2026
        });
      }
    });
    ```
    

## Installation

### Direct Download

Download the `counteverest.js` and `counteverest.css` files from the [releases page](https://github.com/dxpr/CountEverest/releases) and include them in your project.

### Git Clone

```
git clone git@github.com:dxpr/CountEverest.git
```

## Usage

After including the necessary files, you can create a countdown by following these steps:

1.  Create the HTML structure for your countdown (see Quick Start for an example).
2.  Initialize CountEverest with your desired options:
    
    ```
    const countdown = new CountEverest(document.querySelector('.ce-countdown'), {
      day: 25,
      month: 12,
      year: 2023,
      hour: 0,
      minute: 0,
      second: 0
    });
    ```
    

## Customization

CountEverest offers extensive customization options. Here are some examples:

### Styling

You can customize the appearance of your countdown by modifying the CSS. For example:

```
.ce-countdown {
  font-family: 'Arial', sans-serif;
  font-size: 2em;
  color: #333;
}

.ce-days, .ce-hours, .ce-minutes, .ce-seconds {
  font-weight: bold;
}
```

### Custom Labels

You can set custom labels for your countdown units:

```
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

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| day | Number | 1   | The target day of the month (1-31) |
| month | Number | 1   | The target month (1-12) |
| year | Number | 2050 | The target year |
| hour | Number | 0   | The target hour (0-23) |
| minute | Number | 0   | The target minute (0-59) |
| second | Number | 0   | The target second (0-59) |
| timeZone | Number | null | The timezone offset (-12 to 14) |
| countUp | Boolean | false | If true, counts up from the target date |

## Callback Functions

CountEverest provides several callback functions that you can use to add custom behavior:

*   `onInit()`: Called when the countdown is initialized
*   `beforeCalculation()`: Called before each calculation cycle
*   `afterCalculation()`: Called after each calculation cycle
*   `onChange(values)`: Called when the countdown values change. Receives an object with the current values.
*   `onComplete()`: Called when the countdown reaches zero

Example usage:

```
new CountEverest(element, {
  // ... other options ...
  onChange: function(values) {
    console.log('Countdown updated:', values);
  },
  onComplete: function() {
    console.log('Countdown finished!');
  }
});
```

## API Methods

CountEverest instances provide the following methods:

*   `setTargetDate(date)`: Set a new target date
    
    ```
    countdown.setTargetDate(new Date(2024, 0, 1));
    ```
    
*   `getTargetDate()`: Get the current target date
    
    ```
    const targetDate = countdown.getTargetDate();
    ```
    
*   `destroy()`: Stop the countdown and clean up
    
    ```
    countdown.destroy();
    ```
    

## Migration Guide from jQuery Version

If you're migrating from the jQuery version to the new vanilla JavaScript version, here are the key changes you need to make:

1.  Update your script inclusion:
    
    ```
    <!-- Old -->
    <script src="js/vendor/jquery.counteverest.js"></script>
    
    <!-- New -->
    <script src="js/vendor/counteverest.js"></script>
    ```
    
2.  Update your initialization code:
    
    ```
    // Old
    $('.countdown').countEverest({
      day: 1,
      month: 1,
      year: 2026
    });
    
    // New
    const countdown = new CountEverest(document.querySelector('.countdown'), {
      day: 1,
      month: 1,
      year: 2026
    });
    ```
    
3.  Update any custom code that interacts with the countdown:
    
    ```
    // Old
    var countdown = $('.countdown').data('countEverest');
    countdown.setTargetDate(new Date(2024, 0, 1));
    
    // New
    countdown.setTargetDate(new Date(2024, 0, 1));
    ```
    

## Examples

Here are some common use cases for CountEverest:

### Basic Countdown

```
new CountEverest(document.querySelector('.countdown'), {
  day: 1,
  month: 1,
  year: 2024
});
```

### Countdown with Callback

```
new CountEverest(document.querySelector('.countdown'), {
  day: 25,
  month: 12,
  year: 2023,
  onComplete: function() {
    alert('Merry Christmas!');
  }
});
```

### Count Up from a Past Date

```
new CountEverest(document.querySelector('.count-up'), {
  day: 1,
  month: 1,
  year: 2000,
  countUp: true
});
```

For more examples, check out our [demo page](https://dxpr.github.io/CountEverest/).

## Projects Using CountEverest

*   [DXPR Builder](https://www.drupal.org/project/dxpr_builder): A Drupal website builder that uses CountEverest for countdown functionality.

## Comparison with Other Libraries

| Feature | CountEverest | Countdown.js | FlipClock.js |
| --- | --- | --- | --- |
| File Size | 10 KB | 4 KB | 76 KB |
| Dependency-free | ✅   | ✅   | ❌ (jQuery) |
| Customizable Labels | ✅   | ❌   | ✅   |
| Count Up Feature | ✅   | ❌   | ✅   |
| Timezone Support | ✅   | ❌   | ✅   |

## Contributing

We welcome contributions to CountEverest! Here's how you can help:

1.  Fork the repository
2.  Create a new branch (`git checkout -b feature/AmazingFeature`)
3.  Make your changes
4.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5.  Push to the branch (`git push origin feature/AmazingFeature`)
6.  Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## Troubleshooting

### Q: How can I change the countdown's target date dynamically?

A: Use the `setTargetDate()` method:

```
const countdown = new CountEverest(element, options);
countdown.setTargetDate(new Date(2025, 0, 1));
```

### Q: How do I implement a custom theme?

A: Create a new CSS file with your custom styles, targeting the CountEverest classes. Then include this file after the default CountEverest CSS.

### Q: Can I display the countdown in a specific timezone?

A: Yes, use the `timeZone` option:

```
new CountEverest(element, {
  // ... other options ...
  timeZone: -5 // for EST (UTC-5)
});
```

## License

CountEve