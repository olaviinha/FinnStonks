# Change log

## 2021-07-08
- Fixed calculations regarding price changes of followed stocks.

## 2021-07-05
- Stock purchase price per pc now displays average price per pc of all purchases instead of first purchase price per pc.
- Purchase price in chart (of owned stock) now displays average purchase price instead of first purchase price.
- Fixed total calculations.

## 2021-06-17

- Ticker search feature to find correct (Bloomberg) tickers when adding new stocks to your `stocks.txt`. Press key `Q` on your keyboard to access ticker search.
- Option to easily change layout direction. Display owned and followed stocks stacked, side by side, or side by side reversed.
- Generated charts, price histories and their options have been optimized to a more momentum based monitoring, rather than daily based. By default setting this also reduces one API call per pageload/refresh per 10 stocks.
- API calls have been optimized accordingly to use day ticks by default: consume least API calls by setting all displayed price histories from 1 week to 1 year.
- Minute ticks (3 day price histories) are currently unavailable due to above changes, but I aim to bring them back in the not so distant future.

## 2021-04-17

- Error handling for lack of chart data, for when e.g. company listing is so new it does not have any/required number of ticks to produce requested chart.

## 2021-04-01

- Changed exchange rates API to exchangerate.host, as old one turned from free service to paid service with an API key requirement and request limitations.

## 2021-03-04

- Auto-convert everything to EUR, despite currency (previously only USD was converted).

## 2021-02-27

- Support to following stocks that you don't own separately from stocks that you already own. For monitoring the right time to purchase, or whatevs.
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

## 2021-01-02

- Charts.

## 2020-12-20

- Support for Dropbox-hosted trade events txt.

## 2020-12-13

- Fixes to calculations.
