# FINNSTONKS Personal Equity Portfolio Monitor

FINNSTONKS Personal Equity Portfolio Monitor (**FPEPM**) provides a web-based, customizable, simple, compact, clean textual overview of the current state
of your equity portfolio for monitoring on a daily basis.

Made for my own purposes, so it is quite literally a _personal_ equity portfolio monitor. Probably best suited for _European sunday micro-investor hobbyists_ alike, who don't 
do daily/weekly trading, but are still interested in keeping an eye on their assets on a daily/weekly basis. 

In short, it turns a simple `stocks.txt` containing your asset purchases and sales into this:

![PEPM](https://storage.googleapis.com/olaviinha/github/pepm/pepm1.jpg)
FINNSTONKS PEPM. Columns: owned shares, EUR invested, EUR changed since purchase, percent changed since purchase, daily change history for the previous 3 days in percent.

## Used APIs and how to obtain required API key

FPEPM uses two APIs:
1. European Central Bank's [Foreign exchange rates API](https://exchangeratesapi.io) for up-to-date real-time
USD to EUR conversion.
2. Bloomberg's
[Market and Financial News API](https://rapidapi.com/apidojo/api/bloomberg-market-and-financial-news) 
for up-to-date real-time stock prices.

Bloomberg's API was chosen for stock data for a few reasons probably worth mentioning:
- It contains multiple exchanges worldwide, most importantly Nasdaq Helsinki and Nasdaq First North.
- It supports fetching market information of multiple companies with a single call, which is pretty neat when your usage is limited to 500 monthly API calls.

### Obtain API key

Bloomberg's Market and Financial News API requires an API key.

Register for a [RapidAPI](https://rapidapi.com) account
and subscribe to [Bloomberg Market and Financial News API](https://rapidapi.com/apidojo/api/bloomberg-market-and-financial-news) to 
obtain required API key.

Copy and paste API key to the beginning of `pepm.js`:
```
// rapidapi.com API key
rapidApiKey = 'PASTE YOUR RAPIDAPI.COM API KEY HERE';
```

### API limitations

At the time of writing this, Bloomberg's API is available for a Freemium plan, allowing 500 monthly API calls free of charge. 
Each refresh or pageload of FPEPM consumes 2 API calls to fetch the current market information and 3 day price histories.

**This means you can refresh FPEPM about 8 times a day, or, about once every 3 hours, providing that your copy of FPEPM is 
open on a single device 24/7.** If your copy of FPEPM is open on multiple devices (e.g. more than one person has access to it), it
will naturally reflect on the number of consumed API calls.

TODO: fetch price history only when day has changed since last pageload to save API calls.

## Your trading data

FPEPM uses a simple `stocks.txt` file that should contain all your purchase and liquidation events in a simple delimiter-separated format.
Each line should read `<symbol:exchange>;<date purchased/sold>;<number of shares purchased/sold>;<purchase/sale price of 1 stock>`.
All additional fees regarding purchase or liquidation events should be calculated in the price per stock value.

Purchases and sales are separated by one empty line. Lines beginning with character `#` will be ignored, in case you want to play around with the data or ignore certain events for whatever reasons.

Example:
```
# BUYS
MSFT:US;2019-10-11;1;139.68
MSFT:US;2020-03-23;2;135.98
OR:FP;2020-09-04;2;299.34
TSLA:US;2020-09-01;2;420.00
YEINT:FH;2020-06-15;40;14.92

# SELLS
MSFT:US;2020-04-30;1;179.21
```

## User interface and how to use it

### Prerequisites

- jQuery

Although Bootstrap and LESS are used for styling in `index.html`, they are not in any way required for `pepm.js` to run.

### Styling

All styling is freely customizable in `pepm.less`. You may use regular CSS or any styling you like,
modifying it should be pretty straight-forward.

### Settings

`pepm.js` contains a number of settings at the beginning of the file. Most should be pretty self-explanatory.

- `var effectiveDate = 'first'|'last'`: date to display if you have purchased shares of the same company on multiple occasions.
- `var alarmLimit = -1;`: limit used to determine how many percent a stock can drop every day for 3 consecutive days before alarm styling is triggered.
- `var includeLiquidations = true|false;`: Include or exclude any profits or losses through previous liquidations of stocks in the _change_ and _total_ values. If set to `false`, liquidation events (lines under `# SELLS` in `stocks.txt`) will only correct the numbers and values of your holdings.
- **Below** settings, you can find `var mockData = false;`. Set it to `true` when you do any development, such as styling or modify the Javascript. 
When `mockData` is `true`, data is mocked instead of fetched from Bloomberg's APIs. This way no API calls are consumed during development.

### User interactions

1. Click on _change_ value on top center to toggle between a) EUR value, b) percentage value.
2. Click on the _portfolio value_ on top right corner to toggle between a) liquidations included, b) liquidations excluded.
3. Click on the third column to toggle between a) change in EUR, b) change in percentage.
4. Click on the fourth column to toggle between a) current market value in total, b) change in percentage.

![PEPM](https://storage.googleapis.com/olaviinha/github/pepm/pepm3.gif)

## Motivation
There are countless stock market monitors out there that enable you to follow stock prices of your choosing. However, apart from the
platform you've used to purchase your assets, very few seem to provide any ability to follow stock prices even _as if_ existing assets
(_number of stocks_, _starting point_). Even fewer an entire equity portfolio containing multiple companies, not to mention taking into 
account any further trading events or doing any calculations.

Hence an Excel spreadsheet is a good friend of any stock investor. The purpose of FPEPM is to replace all that hassle with an automated,
clean, browser-accessible screen. All you do is add the event to the bottom of the list when you've purchased or sold some stocks.
