# Change log

## 2021-02-27

- Now supports a different view for following stocks (that you don't own yet but are monitoring for e.g. the right time to purchase).
- Improved debugging (`consoleOutput`, make `mockData` updating manually more convenient).
- Refactor data and calculations concerning realisations and totals.

## 2021-02-23

- Added `var refreshDuring = [16, 23];` for hours of day between which to auto-refresh every n hours (`var refreshInterval = 4;`).
- Improved with webworker.
- Support for a few CSS attributes via URL, in case your FinnStonks is in an iframe. Attributes are `?background=<color value>&zoom=<zoom value>&brightness=<css filter: brightness value>`

## 2021-02-16

- Calculate total investment and cashouts from input data.
- Remove cashed out stocks from API call if `showCashouts = false;` for much faster API response/pageload.
- Convert chart ticks to EUR for accurate comparison to purchase price.

## 2021-02-07

- Better debugging and data mocking.
- Option to change default chart.
- Options to chart coloring logic and tick interval.
- Fixes to calculations.
- Reorder settings.

## 2021-01-0218 

- Charts.

## 2020-12-20

- Support for Dropbox-hosted trade events txt.

## 2020-12-13

- Fixes to calculations.
