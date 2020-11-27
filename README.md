# FINNSTONKS Personal Equity Portfolio Monitor

Finnstonks PEPM provides a web-based, customizable, simple, compact, clean textual overview of the current situation 
of your equity portfolio for monitoring on a daily basis.

Made for my own purposes, so it is quite literally a _personal_ equity portfolio monitor. Probably best suited for other _European sunday micro-investors_, who don't 
do daily/weekly trading, but are still interested in monitoring their assets on a daily/weekly basis. 

![PEPM](https://storage.googleapis.com/olaviinha/github/pepm/pepm1.jpg)

Finnstonks PEPM uses two APIs:
- European Central Bank's [Foreign exchange rates API](https://exchangeratesapi.io) for up-to-date real-time
USD to EUR conversion.
- Bloomberg's
[Market and Financial News API](https://rapidapi.com/apidojo/api/bloomberg-market-and-financial-news) 
for up-to-date real-time stock prices. 

Bloomberg's API was chosen for stock data for two reasons probably worth mentioning:
- It contains multiple exchanges worldwide, most importantly Nasdaq Helsinki and Nasdaq First North.
- It supports fetching market information of multiple companies with a single call, which is pretty neat when your usage is limited to 500 monthly API calls.

Finnstonks PEPM also includes a simple alarm feature: if any of your stocks drops below a set percentage limit (e.g. `-4`) for 3 consecutive days (now being 12 % lower than 3 days ago, even if still positive), it is highlighted on page with an alarm.

## API access

**The API used to fetch stock prices requires an API key.**

Register for a [RapidAPI](https://rapidapi.com) account
and subscribe to [Bloomberg Market and Financial News API](https://rapidapi.com/apidojo/api/bloomberg-market-and-financial-news) to 
obtain required API key.

Copy and paste API key to the beginning of `pepm.js`:
```
// rapidapi.com API key
rapidApiKey = 'PASTE YOUR RAPIDAPI.COM API KEY HERE';
```

#### API limitations

At the time of writing this, the API is available for a freemium plan allowing 500 monthly API calls free of charge. 
Each refresh or pageload of PEPM consumes 2 API calls to fetch the current market information and 3 day price histories.

**This means you can refresh PEPM about 8 times a day, or, about once every 3 hours, providing that your copy of PEPM is 
open on a single device 24/7.** If your copy of PEPM is open on multiple devices (e.g. more than one person has access to it), it
will naturally reflect on the number of consumed API calls.

TODO: fetch price history only when day has changed since last pageload to save API calls.

## Your trading data

Finnstonks PEPM uses a simple `stocks.txt` file that should contain all your purchase and liquidation events in a simple delimiter-separated format.
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

## User interface / HOWTO

### Prerequisites

- jQuery

Although Bootstrap and LESS are used for styling in `index.html`, they are not in any way required for `pepm.js` to run.

### Styling

All styling is freely customizable in `pepm.less`. You may use regular CSS or any styling you like,
modifying it should be pretty straight-forward.

### Settings

`pepm.js` contains a number of settings at the beginning of the file. Most should be pretty self-explanatory.

- `var effectiveDate = 'first'|'last'`: which date is used when you have purchased shares of the same company multiple time.
- `var alarmLimit = -1;`: Alarm styling is triggered if any of the stocks has dropped this much for 3 consecutive days.
- `var includeLiquidations = true|false;`: Include or exclude any profits or losses through previous liquidations of stocks in the _change_ and _total_ values. If set to `false`, liquidation events (lines under `# SELLS` in `stocks.txt`) will only correct the numbers and values of your holdings.
- **Below** settings, you can find `var mockData = falsee;`. Set it to `true` when you do any development, such as styling or modify the Javascript. 
When `mockData` is `true`, data is mocked instead of fetched from Bloomberg's APIs. This way no API calls are consumed during development.

### User interactions

1. Click on _change_ value on top center to toggle between EUR and percentage values.
2. Click on the _portfolio value_ on top right corner to toggle between liquidations included and liquidations excluded.
3. Click on the third column to toggle between change in EUR value and change in percentage value.
4. Click on the fourth column to toggle between current market value and change in percentage value.

![PEPM](https://storage.googleapis.com/olaviinha/github/pepm/pepm3.gif)

## Motivation
There are countless stock market monitors out there that enable you to follow stock prices of your choosing. However, apart from the
platform you've used to purchase your shares, very few seem to provide any ability to follow the change easily from
a specific _starting point_. Even fewer an entire equity portfolio containing multiple companies, not to even mention taking into
account any further trading events or doing any calculations.

Excel spreadsheet is a good friend of many stock investors. The purpose of PEPM is to replace all that hassle with an automated,
clean, browser-accessible screen. All you do is add the event to the bottom of the list when you've purchased or sold some stocks.
