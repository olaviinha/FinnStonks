//---------------------------------------------------------------------------------------------
// - GENERAL ----------------------------------------------------------------------------------

// rapidapi.com API key
var rapidApiKey = 'PASTE RAPIDAPI.COM API KEY HERE';

// Url to your stocks.txt file, in case you want to host it in another location, e.g. Dropbox.
var tradeEventsTxt = 'mock-stocks.txt';

// Element in which to place the stock table
var container = '.stocks';

// When calculating sales returns, include all previously owned assets that you have already
// completely cashed out and no longer own.
var includeCashouts = true;

// Date to display in case you have purchased the same stock on multiple occasions. Either
// a) 'first' = first purchase.
// b) 'last' = last purchase date.
var effectiveDate = 'last';

// Truncate company name to this many characters. Set to 0 for no truncation.
var truncateTo = 10;

// Refresh every n hours.
var refreshInterval = 4;

// ...but only between these hours.
var refreshDuring = [16, 23];


//---------------------------------------------------------------------------------------------
// - CHARTS / PRICE DEVELOPMENT ---------------------------------------------------------------

// Generate charts. If false, only textual 3d history is shown instead.
var generateCharts = true;

// Default chart.
// a) '3d' = 3 day price history.
// b) 'sincePurchase' = price history since purchase.
var defaultChart = '3d';

// Highlight row with an alarm if the closing price has dropped at least this many percent
// per day, consecutively for three days.
var alarmLimit = -2;

// This option will color each chart ticks red, if lower than the previous tick,
// i.e. red point in chart whenever price has gone down instead of up. 
//  Otherwise only ticks that are lower than purchase price will be colored red.
var colorDownhillTicks = true;

// In graphic charts, include only every nth tick. This will produce a less detailed but 
// visually cleaner chart, handy especially if colorDownhillTicks above is true.
var nth = 4;

// In LOOKOUT section, left side chart displays prices this many years back:
var yearsBack = 3;

// In LOOKOUT section, sync scale of left and right chart (may be harder to read):
var syncScale = false;



//---------------------------------------------------------------------------------------------
// - LAYOUT -----------------------------------------------------------------------------------

// Color scheme, etc.
// a) 'light' = darker texts, for light backgrounds
// b) 'dark' = lighter texts, for dark backgrounds
var theme = 'dark';
var bgImage = false;        // Show 'stock-bg.jpg' as page background.
var bgBox = false;          // Show translucent box. May be useful with some background images.
var veryCompact = false;    // Force-hide all secondary information, despite later settings.

// What to show on page
var showFollows = true;     // Show followed stocks (LOOKOUT section).
var compactFollows = false; // Squeeze followed stocks to smaller space.
var showCashouts = false;   // Previously owned stocks that you now own 0 of.
var showSymbol = false;     // Symbol in front of company's long name.
var showName = true;        // Long name of the company.
var showExchange = true;    // Long name of the exchange.
var showDate = true;        // Date purchased.
var showQuantity = true;    // How many stocks owned.
var showPrice = true;       // Purchase price.
var showChangeEur = true;   // Show the third column: change in EUR or percent.
var showPercent = true;     // Show the fourth column: all-time change in percentage or current market price in EUR.
var show3dHistory = true;   // Show 3 day market price change history.
var showTotalsTop = true;   // Show totals at the top. Note that this is different than totals at bottom.
var showTotalsBottom = false;// Show totals at the bottom. Note that this is different than totals at top.

var spd = 300;
var clBs = '#888'; // Base color, ideally same as in CSS
var clPs = '#696'; // Positive color, ideally same as in CSS
var clNg = '#a66'; // Negative color, ideally same as in CSS



//---------------------------------------------------------------------------------------------
// - DEVELOPMENT & DEBUGGING  -----------------------------------------------------------------
var consoleOutput = false;  // Print stuff in browser console. This is always true for mockData.
var printToCopy = false;    // Print only what's necessary to update mock data (copy-paste from browser console).
var mockData = false;       // Use mocked stock trade data, 5y ticks and 3d ticks.
var mockAlarm = false;      // Simulate alarm.

// Note that 3d charts will not work correclty with the following mock data as it is outdated.
// You can copy-paste your own mock data from browser console. Set consoleOutput true and look 
// for PINK messages in browser console, marked (copy this to mock).
var mockEvents = '#BUYSeventdatepcsprice\nSAA1V:FH;2020-02-12;35;12.85\nMSFT:US;2020-04-20;4;147.49\nBOREO:FH;2020-06-15;100;14.92\nSSH1V:FH;2020-08-04;121;1.33\nTSLA:US;2020-09-01;5;420.00\n\n#SELLS\nTSLA:US;2020-01-28;4;682.21\n\n#LOOKOUT\nLI:US\nNIO:US';
var mockStocks = {"result":{"SAA1V:FH":{"securityType":"Common Stock","symbol":"SAA1V","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"saa1v:fh","tickerName":"SAA1V:FH","template":"Stock","tinyName":"Sanoma Oyj","name":"Sanoma Oyj","watchlist":true,"resourceId":"SAA1V:FH","last":"13.68","netChange":"-0.34","lastPriceTime":1614315600,"pctChange1M":"-12.98","yearHigh":"17.12","dayHigh":"14.18","volume":89972.0,"yearLow":"6.84","dayLow":"13.52","pctChangeYTD":"-0.44","pctChange":"-2.43"},"MSFT:US":{"securityType":"Common Stock","symbol":"MSFT","exchange":"NASDAQ GS","country":"United States","currency":"USD","resourceType":"Company","fundamentalDataCurrency":"USD","resourceSubtype":"Public","region":"AMERICAS","ticker":"msft:us","tickerName":"MSFT:US","template":"Stock","tinyName":"Microsoft Corp","name":"Microsoft Corp","watchlist":true,"resourceId":"MSFT:US","last":"232.38","netChange":"3.39","lastPriceTime":1614387600,"pctChange1M":"-0.22","yearHigh":"246.13","dayHigh":"235.37","volume":37819227,"yearLow":"132.52","dayLow":"229.54","pctChangeYTD":"4.48","pctChange":"1.48"},"BOREO:FH":{"securityType":"Common Stock","symbol":"BOREO","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"boreo:fh","tickerName":"BOREO:FH","template":"Stock","tinyName":"Boreo Oyj","name":"Boreo Oyj","watchlist":true,"resourceId":"BOREO:FH","last":"31.2","netChange":"0.0","lastPriceTime":1614315600,"pctChange1M":"9.9","yearHigh":"34.0","dayHigh":"31.2","volume":978.0,"yearLow":"10.3","dayLow":"30.2","pctChangeYTD":"6.1","pctChange":"0.00"},"SSH1V:FH":{"securityType":"Common Stock","symbol":"SSH1V","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"ssh1v:fh","tickerName":"SSH1V:FH","template":"Stock","tinyName":"SSH Communications Security Oyj","name":"SSH Communications Security Oyj","watchlist":true,"resourceId":"SSH1V:FH","last":"2.50","netChange":"-0.14","lastPriceTime":1614315600,"pctChange1M":"35.14","yearHigh":"3.26","dayHigh":"2.60","volume":34482.0,"yearLow":"0.65","dayLow":"2.50","pctChangeYTD":"47.49","lastPriceAllSessions":"2.50","pctChange":"-5.30"},"TSLA:US":{"securityType":"Common Stock","symbol":"TSLA","exchange":"NASDAQ GS","country":"United States","currency":"USD","resourceType":"Company","fundamentalDataCurrency":"USD","resourceSubtype":"Public","region":"AMERICAS","ticker":"tsla:us","tickerName":"TSLA:US","template":"Stock","tinyName":"Tesla Inc","name":"Tesla Inc","watchlist":true,"resourceId":"TSLA:US","last":"675.50","netChange":"-6.72","lastPriceTime":1614387600,"pctChange1M":"-21.83","yearHigh":"900.40","dayHigh":"706.70","volume":41089173,"yearLow":"70.10","dayLow":"659.51","pctChangeYTD":"-4.28","pctChange":"-0.99"},"LI:US":{"securityType":"ADR","symbol":"LI","exchange":"NASDAQ GS","country":"China","currency":"USD","resourceType":"Company","fundamentalDataCurrency":"CNY","resourceSubtype":"Public","region":"AMERICAS","ticker":"li:us","tickerName":"LI:US","template":"Stock","tinyName":"Li Auto Inc","name":"Li Auto Inc","watchlist":true,"resourceId":"LI:US","last":"25.37","netChange":"-0.50","lastPriceTime":1614387600,"pctChange1M":"-19.61","yearHigh":"47.70","dayHigh":"26.80","volume":39284537,"yearLow":"14.31","dayLow":"24.58","pctChangeYTD":"-12.00","pctChange":"-1.93"},"NIO:US":{"securityType":"ADR","symbol":"NIO","exchange":"New York","country":"China","currency":"USD","resourceType":"Company","fundamentalDataCurrency":"CNY","resourceSubtype":"Public","region":"AMERICAS","ticker":"nio:us","tickerName":"NIO:US","template":"Stock","tinyName":"NIO Inc","name":"NIO Inc","watchlist":true,"resourceId":"NIO:US","last":"45.78","netChange":"-1.03","lastPriceTime":1614387841,"pctChange1M":"-19.90","yearHigh":"66.99","dayHigh":"47.95","volume":100315494,"yearLow":"2.11","dayLow":"44.62","pctChangeYTD":"-6.07","pctChange":"-2.20"}}};
var mockTrends5y = {"result":{"SAA1V:FH":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1457100000,"close":4.25},{"time":1457704800,"close":4.128},{"time":1458306000,"close":4.25},{"time":1458910800,"close":4.178},{"time":1459515600,"close":4.286},{"time":1460120400,"close":4.142},{"time":1460725200,"close":4.144},{"time":1461330000,"close":4.2},{"time":1461934800,"close":4.28},{"time":1462539600,"close":4.98},{"time":1463144400,"close":5.02},{"time":1463749200,"close":5.0},{"time":1464354000,"close":5.26},{"time":1464958800,"close":5.25},{"time":1465563600,"close":5.45},{"time":1466168400,"close":5.1},{"time":1466773200,"close":5.205},{"time":1467378000,"close":5.345},{"time":1467982800,"close":5.545},{"time":1468587600,"close":6.8},{"time":1469192400,"close":7.095},{"time":1469797200,"close":7.175},{"time":1470402000,"close":7.67},{"time":1471006800,"close":7.97},{"time":1471611600,"close":8.205},{"time":1472216400,"close":8.29},{"time":1472821200,"close":8.84},{"time":1473426000,"close":8.615},{"time":1474030800,"close":8.585},{"time":1474635600,"close":8.38},{"time":1475240400,"close":8.48},{"time":1475845200,"close":8.59},{"time":1476450000,"close":8.575},{"time":1477054800,"close":8.965},{"time":1477659600,"close":9.17},{"time":1478264400,"close":7.7},{"time":1478872800,"close":7.42},{"time":1479477600,"close":7.83},{"time":1480082400,"close":7.725},{"time":1480687200,"close":8.2},{"time":1481292000,"close":8.62},{"time":1481896800,"close":8.3},{"time":1482501600,"close":8.365},{"time":1483106400,"close":8.245},{"time":1483711200,"close":8.075},{"time":1484316000,"close":8.45},{"time":1484920800,"close":8.36},{"time":1485525600,"close":8.5},{"time":1486130400,"close":8.695},{"time":1486735200,"close":7.975},{"time":1487340000,"close":8.025},{"time":1487944800,"close":8.2},{"time":1488549600,"close":8.365},{"time":1489154400,"close":8.195},{"time":1489755600,"close":8.22},{"time":1490360400,"close":8.2},{"time":1490965200,"close":7.845},{"time":1491570000,"close":7.98},{"time":1492174800,"close":8.25},{"time":1492779600,"close":8.07},{"time":1493384400,"close":8.1},{"time":1493989200,"close":8.05},{"time":1494594000,"close":8.08},{"time":1495198800,"close":8.195},{"time":1495803600,"close":8.52},{"time":1496408400,"close":8.34},{"time":1497013200,"close":8.065},{"time":1497618000,"close":8.315},{"time":1498222800,"close":8.25},{"time":1498827600,"close":8.18},{"time":1499432400,"close":8.16},{"time":1500037200,"close":8.24},{"time":1500642000,"close":8.305},{"time":1501246800,"close":7.84},{"time":1501851600,"close":7.965},{"time":1502456400,"close":7.73},{"time":1503061200,"close":7.695},{"time":1503666000,"close":7.885},{"time":1504270800,"close":7.96},{"time":1504875600,"close":8.87},{"time":1505480400,"close":8.715},{"time":1506085200,"close":8.69},{"time":1506690000,"close":9.23},{"time":1507294800,"close":9.45},{"time":1507899600,"close":9.5},{"time":1508504400,"close":9.39},{"time":1509109200,"close":10.09},{"time":1509714000,"close":10.28},{"time":1510322400,"close":10.51},{"time":1510927200,"close":10.34},{"time":1511532000,"close":10.14},{"time":1512136800,"close":10.61},{"time":1512741600,"close":11.19},{"time":1513346400,"close":11.77},{"time":1513951200,"close":11.1},{"time":1514556000,"close":10.87},{"time":1515160800,"close":11.28},{"time":1515765600,"close":11.34},{"time":1516370400,"close":11.22},{"time":1516975200,"close":10.58},{"time":1517580000,"close":10.51},{"time":1518184800,"close":9.635},{"time":1518789600,"close":9.8},{"time":1519394400,"close":9.91},{"time":1519999200,"close":9.835},{"time":1520604000,"close":10.1},{"time":1521205200,"close":10.07},{"time":1521810000,"close":9.69},{"time":1522414800,"close":9.525},{"time":1523019600,"close":9.515},{"time":1523624400,"close":9.62},{"time":1524229200,"close":9.62},{"time":1524834000,"close":9.0},{"time":1525438800,"close":9.0},{"time":1526043600,"close":9.185},{"time":1526648400,"close":9.3},{"time":1527253200,"close":9.15},{"time":1527858000,"close":9.015},{"time":1528462800,"close":9.02},{"time":1529067600,"close":9.09},{"time":1529672400,"close":8.67},{"time":1530277200,"close":8.69},{"time":1530882000,"close":8.775},{"time":1531486800,"close":9.1},{"time":1532091600,"close":9.02},{"time":1532696400,"close":8.53},{"time":1533301200,"close":8.575},{"time":1533906000,"close":8.635},{"time":1534510800,"close":8.415},{"time":1535115600,"close":8.77},{"time":1535720400,"close":8.935},{"time":1536325200,"close":8.4},{"time":1536930000,"close":8.67},{"time":1537534800,"close":8.555},{"time":1538139600,"close":8.475},{"time":1538744400,"close":8.34},{"time":1539349200,"close":8.87},{"time":1539954000,"close":8.94},{"time":1540558800,"close":9.42},{"time":1541163600,"close":9.82},{"time":1541772000,"close":9.84},{"time":1542376800,"close":9.695},{"time":1542981600,"close":9.205},{"time":1543586400,"close":9.115},{"time":1544191200,"close":9.07},{"time":1544796000,"close":8.66},{"time":1545400800,"close":8.365},{"time":1546005600,"close":8.485},{"time":1546610400,"close":8.58},{"time":1547215200,"close":8.72},{"time":1547820000,"close":8.66},{"time":1548424800,"close":8.49},{"time":1549029600,"close":8.475},{"time":1549634400,"close":8.865},{"time":1550239200,"close":8.845},{"time":1550844000,"close":8.74},{"time":1551448800,"close":8.815},{"time":1552053600,"close":8.595},{"time":1552654800,"close":9.095},{"time":1553259600,"close":8.965},{"time":1553864400,"close":8.735},{"time":1554469200,"close":9.16},{"time":1555074000,"close":9.135},{"time":1555678800,"close":9.245},{"time":1556283600,"close":9.28},{"time":1556888400,"close":8.58},{"time":1557493200,"close":8.56},{"time":1558098000,"close":8.515},{"time":1558702800,"close":8.335},{"time":1559307600,"close":8.085},{"time":1559912400,"close":8.02},{"time":1560517200,"close":8.14},{"time":1561122000,"close":8.44},{"time":1561726800,"close":8.485},{"time":1562331600,"close":8.925},{"time":1562936400,"close":8.87},{"time":1563541200,"close":8.66},{"time":1564146000,"close":8.91},{"time":1564750800,"close":8.91},{"time":1565355600,"close":8.775},{"time":1565960400,"close":8.53},{"time":1566565200,"close":8.99},{"time":1567170000,"close":9.33},{"time":1567774800,"close":9.51},{"time":1568379600,"close":9.52},{"time":1568984400,"close":10.17},{"time":1569589200,"close":10.2},{"time":1570194000,"close":10.06},{"time":1570798800,"close":9.75},{"time":1571403600,"close":9.96},{"time":1572008400,"close":10.16},{"time":1572613200,"close":9.31},{"time":1573221600,"close":9.73},{"time":1573826400,"close":9.44},{"time":1574431200,"close":9.35},{"time":1575036000,"close":9.35},{"time":1575640800,"close":9.435},{"time":1576245600,"close":9.205},{"time":1576850400,"close":9.8},{"time":1577455200,"close":9.46},{"time":1578060000,"close":9.68},{"time":1578664800,"close":10.67},{"time":1579269600,"close":11.1},{"time":1579874400,"close":10.52},{"time":1580479200,"close":10.83},{"time":1581084000,"close":10.64},{"time":1581688800,"close":11.27},{"time":1582293600,"close":11.04},{"time":1582898400,"close":10.28},{"time":1583503200,"close":10.75},{"time":1584104400,"close":8.705},{"time":1584709200,"close":7.65},{"time":1585314000,"close":7.68},{"time":1585918800,"close":7.95},{"time":1586523600,"close":8.56},{"time":1587128400,"close":8.39},{"time":1587733200,"close":8.14},{"time":1588338000,"close":8.26},{"time":1588942800,"close":8.31},{"time":1589547600,"close":7.96},{"time":1590152400,"close":8.16},{"time":1590757200,"close":8.72},{"time":1591362000,"close":9.17},{"time":1591966800,"close":8.7},{"time":1592571600,"close":8.94},{"time":1593176400,"close":9.03},{"time":1593781200,"close":8.99},{"time":1594386000,"close":8.88},{"time":1594990800,"close":9.1},{"time":1595595600,"close":9.3},{"time":1596200400,"close":9.55},{"time":1596805200,"close":9.9},{"time":1597410000,"close":10.02},{"time":1598014800,"close":10.24},{"time":1598619600,"close":10.76},{"time":1599224400,"close":10.68},{"time":1599829200,"close":11.02},{"time":1600434000,"close":10.76},{"time":1601038800,"close":10.64},{"time":1601643600,"close":11.26},{"time":1602248400,"close":11.9},{"time":1602853200,"close":11.84},{"time":1603458000,"close":12.42},{"time":1604062800,"close":12.64},{"time":1604671200,"close":12.28},{"time":1605276000,"close":12.1},{"time":1605880800,"close":11.96},{"time":1606485600,"close":12.46},{"time":1607090400,"close":13.08},{"time":1607695200,"close":13.44},{"time":1608300000,"close":13.72},{"time":1608904800,"close":13.88},{"time":1609509600,"close":13.74},{"time":1610114400,"close":13.74},{"time":1610719200,"close":14.46},{"time":1611324000,"close":15.54},{"time":1611928800,"close":15.8},{"time":1612533600,"close":16.5},{"time":1613138400,"close":14.94},{"time":1613743200,"close":14.14},{"time":1614348000,"close":13.68}],"low":"4.128","high":"16.5","first":1457100000,"last":1614348000,"security":{"ticker":"SAA1V:FH","open":"14.18","prevClose":"4.1"},"hasVolume":false},"MSFT:US":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1457100000,"close":52.03},{"time":1457704800,"close":53.07},{"time":1458306000,"close":53.49},{"time":1458910800,"close":54.21},{"time":1459515600,"close":55.57},{"time":1460120400,"close":54.42},{"time":1460725200,"close":55.65},{"time":1461330000,"close":51.78},{"time":1461934800,"close":49.87},{"time":1462539600,"close":50.39},{"time":1463144400,"close":51.08},{"time":1463749200,"close":50.62},{"time":1464354000,"close":52.32},{"time":1464958800,"close":51.79},{"time":1465563600,"close":51.48},{"time":1466168400,"close":50.13},{"time":1466773200,"close":49.83},{"time":1467378000,"close":51.16},{"time":1467982800,"close":52.3},{"time":1468587600,"close":53.7},{"time":1469192400,"close":56.57},{"time":1469797200,"close":56.68},{"time":1470402000,"close":57.96},{"time":1471006800,"close":57.94},{"time":1471611600,"close":57.62},{"time":1472216400,"close":58.03},{"time":1472821200,"close":57.67},{"time":1473426000,"close":56.21},{"time":1474030800,"close":57.25},{"time":1474635600,"close":57.43},{"time":1475240400,"close":57.6},{"time":1475845200,"close":57.8},{"time":1476450000,"close":57.42},{"time":1477054800,"close":59.66},{"time":1477659600,"close":59.87},{"time":1478264400,"close":58.71},{"time":1478872800,"close":59.02},{"time":1479477600,"close":60.35},{"time":1480082400,"close":60.53},{"time":1480687200,"close":59.25},{"time":1481292000,"close":61.97},{"time":1481896800,"close":62.3},{"time":1482501600,"close":63.24},{"time":1483106400,"close":62.14},{"time":1483711200,"close":62.84},{"time":1484316000,"close":62.7},{"time":1484920800,"close":62.74},{"time":1485525600,"close":65.78},{"time":1486130400,"close":63.68},{"time":1486735200,"close":64.0},{"time":1487340000,"close":64.62},{"time":1487944800,"close":64.62},{"time":1488549600,"close":64.25},{"time":1489154400,"close":64.93},{"time":1489755600,"close":64.87},{"time":1490360400,"close":64.98},{"time":1490965200,"close":65.86},{"time":1491570000,"close":65.68},{"time":1492174800,"close":64.95},{"time":1492779600,"close":66.4},{"time":1493384400,"close":68.46},{"time":1493989200,"close":69.0},{"time":1494594000,"close":68.38},{"time":1495198800,"close":67.69},{"time":1495803600,"close":69.96},{"time":1496408400,"close":71.76},{"time":1497013200,"close":70.32},{"time":1497618000,"close":70.0},{"time":1498222800,"close":71.21},{"time":1498827600,"close":68.93},{"time":1499432400,"close":69.46},{"time":1500037200,"close":72.78},{"time":1500642000,"close":73.79},{"time":1501246800,"close":73.04},{"time":1501851600,"close":72.68},{"time":1502456400,"close":72.5},{"time":1503061200,"close":72.49},{"time":1503666000,"close":72.82},{"time":1504270800,"close":73.94},{"time":1504875600,"close":73.98},{"time":1505480400,"close":75.31},{"time":1506085200,"close":74.41},{"time":1506690000,"close":74.49},{"time":1507294800,"close":76.0},{"time":1507899600,"close":77.49},{"time":1508504400,"close":78.81},{"time":1509109200,"close":83.81},{"time":1509714000,"close":84.14},{"time":1510322400,"close":83.87},{"time":1510927200,"close":82.4},{"time":1511532000,"close":83.26},{"time":1512136800,"close":84.26},{"time":1512741600,"close":84.16},{"time":1513346400,"close":86.85},{"time":1513951200,"close":85.51},{"time":1514556000,"close":85.54},{"time":1515160800,"close":88.19},{"time":1515765600,"close":89.6},{"time":1516370400,"close":90.0},{"time":1516975200,"close":94.06},{"time":1517580000,"close":91.78},{"time":1518184800,"close":88.18},{"time":1518789600,"close":92.0},{"time":1519394400,"close":94.06},{"time":1519999200,"close":93.05},{"time":1520604000,"close":96.54},{"time":1521205200,"close":94.6},{"time":1521810000,"close":87.18},{"time":1522414800,"close":91.27},{"time":1523019600,"close":90.23},{"time":1523624400,"close":93.08},{"time":1524229200,"close":95.0},{"time":1524834000,"close":95.82},{"time":1525438800,"close":95.16},{"time":1526043600,"close":97.7},{"time":1526648400,"close":96.36},{"time":1527253200,"close":98.36},{"time":1527858000,"close":100.79},{"time":1528462800,"close":101.63},{"time":1529067600,"close":100.13},{"time":1529672400,"close":100.41},{"time":1530277200,"close":98.61},{"time":1530882000,"close":101.16},{"time":1531486800,"close":105.43},{"time":1532091600,"close":106.27},{"time":1532696400,"close":107.68},{"time":1533301200,"close":108.04},{"time":1533906000,"close":109.0},{"time":1534510800,"close":107.58},{"time":1535115600,"close":108.4},{"time":1535720400,"close":112.33},{"time":1536325200,"close":108.21},{"time":1536930000,"close":113.37},{"time":1537534800,"close":114.26},{"time":1538139600,"close":114.37},{"time":1538744400,"close":112.13},{"time":1539349200,"close":109.57},{"time":1539954000,"close":108.66},{"time":1540558800,"close":106.96},{"time":1541163600,"close":106.16},{"time":1541772000,"close":109.57},{"time":1542376800,"close":108.29},{"time":1542981600,"close":103.07},{"time":1543586400,"close":110.89},{"time":1544191200,"close":104.82},{"time":1544796000,"close":106.03},{"time":1545400800,"close":98.23},{"time":1546005600,"close":100.39},{"time":1546610400,"close":101.93},{"time":1547215200,"close":102.8},{"time":1547820000,"close":107.71},{"time":1548424800,"close":107.17},{"time":1549029600,"close":102.78},{"time":1549634400,"close":105.67},{"time":1550239200,"close":108.22},{"time":1550844000,"close":110.97},{"time":1551448800,"close":112.53},{"time":1552053600,"close":110.51},{"time":1552654800,"close":115.91},{"time":1553259600,"close":117.05},{"time":1553864400,"close":117.94},{"time":1554469200,"close":119.89},{"time":1555074000,"close":120.95},{"time":1555678800,"close":123.37},{"time":1556283600,"close":129.89},{"time":1556888400,"close":128.9},{"time":1557493200,"close":127.13},{"time":1558098000,"close":128.07},{"time":1558702800,"close":126.24},{"time":1559307600,"close":123.68},{"time":1559912400,"close":131.4},{"time":1560517200,"close":132.45},{"time":1561122000,"close":136.97},{"time":1561726800,"close":133.96},{"time":1562331600,"close":137.06},{"time":1562936400,"close":138.9},{"time":1563541200,"close":136.62},{"time":1564146000,"close":141.34},{"time":1564750800,"close":136.9},{"time":1565355600,"close":137.71},{"time":1565960400,"close":136.13},{"time":1566565200,"close":133.39},{"time":1567170000,"close":137.86},{"time":1567774800,"close":139.1},{"time":1568379600,"close":137.32},{"time":1568984400,"close":139.44},{"time":1569589200,"close":137.73},{"time":1570194000,"close":138.12},{"time":1570798800,"close":139.68},{"time":1571403600,"close":137.41},{"time":1572008400,"close":140.73},{"time":1572613200,"close":143.72},{"time":1573221600,"close":145.96},{"time":1573826400,"close":149.97},{"time":1574431200,"close":149.59},{"time":1575036000,"close":151.38},{"time":1575640800,"close":151.75},{"time":1576245600,"close":154.53},{"time":1576850400,"close":157.41},{"time":1577455200,"close":158.96},{"time":1578060000,"close":158.62},{"time":1578664800,"close":161.34},{"time":1579269600,"close":167.1},{"time":1579874400,"close":165.04},{"time":1580479200,"close":170.23},{"time":1581084000,"close":183.89},{"time":1581688800,"close":185.35},{"time":1582293600,"close":178.59},{"time":1582898400,"close":162.01},{"time":1583503200,"close":161.57},{"time":1584104400,"close":158.83},{"time":1584709200,"close":137.35},{"time":1585314000,"close":149.7},{"time":1585918800,"close":153.83},{"time":1586523600,"close":165.14},{"time":1587128400,"close":178.6},{"time":1587733200,"close":174.55},{"time":1588338000,"close":174.57},{"time":1588942800,"close":184.68},{"time":1589547600,"close":183.16},{"time":1590152400,"close":183.51},{"time":1590757200,"close":183.25},{"time":1591362000,"close":187.2},{"time":1591966800,"close":187.74},{"time":1592571600,"close":195.15},{"time":1593176400,"close":196.33},{"time":1593781200,"close":206.26},{"time":1594386000,"close":213.67},{"time":1594990800,"close":202.88},{"time":1595595600,"close":201.3},{"time":1596200400,"close":205.01},{"time":1596805200,"close":212.48},{"time":1597410000,"close":208.9},{"time":1598014800,"close":213.02},{"time":1598619600,"close":228.91},{"time":1599224400,"close":214.25},{"time":1599829200,"close":204.03},{"time":1600434000,"close":200.39},{"time":1601038800,"close":207.82},{"time":1601643600,"close":206.19},{"time":1602248400,"close":215.81},{"time":1602853200,"close":219.66},{"time":1603458000,"close":216.23},{"time":1604062800,"close":202.47},{"time":1604671200,"close":223.72},{"time":1605276000,"close":216.51},{"time":1605880800,"close":210.39},{"time":1606485600,"close":215.23},{"time":1607090400,"close":214.36},{"time":1607695200,"close":213.26},{"time":1608300000,"close":218.59},{"time":1608904800,"close":222.75},{"time":1609509600,"close":222.42},{"time":1610114400,"close":219.62},{"time":1610719200,"close":212.65},{"time":1611324000,"close":225.95},{"time":1611928800,"close":231.96},{"time":1612533600,"close":242.2},{"time":1613138400,"close":244.99},{"time":1613743200,"close":240.97},{"time":1614348000,"close":232.38}],"low":"49.83","high":"244.99","first":1457100000,"last":1614348000,"security":{"ticker":"MSFT:US","open":"231.53","prevClose":"51.3"},"hasVolume":false},"BOREO:FH":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1457100000,"close":6.04},{"time":1457704800,"close":6.04},{"time":1458306000,"close":6.01},{"time":1458910800,"close":5.9399999999999995},{"time":1459515600,"close":6.05},{"time":1460120400,"close":6.14},{"time":1460725200,"close":5.58},{"time":1461330000,"close":5.84},{"time":1461934800,"close":5.78},{"time":1462539600,"close":5.75},{"time":1463144400,"close":5.51},{"time":1463749200,"close":5.65},{"time":1464354000,"close":5.5},{"time":1464958800,"close":5.29},{"time":1465563600,"close":5.28},{"time":1466168400,"close":5.7},{"time":1466773200,"close":5.48},{"time":1467378000,"close":5.41},{"time":1467982800,"close":5.43},{"time":1468587600,"close":5.8},{"time":1469192400,"close":5.7},{"time":1469797200,"close":5.7},{"time":1470402000,"close":5.8},{"time":1471006800,"close":5.55},{"time":1471611600,"close":5.66},{"time":1472216400,"close":5.75},{"time":1472821200,"close":5.7},{"time":1473426000,"close":5.6},{"time":1474030800,"close":5.7},{"time":1474635600,"close":5.7},{"time":1475240400,"close":5.61},{"time":1475845200,"close":5.6899999999999995},{"time":1476450000,"close":5.62},{"time":1477054800,"close":5.78},{"time":1477659600,"close":5.7},{"time":1478264400,"close":5.75},{"time":1478872800,"close":5.67},{"time":1479477600,"close":5.98},{"time":1480082400,"close":6.05},{"time":1480687200,"close":6.1},{"time":1481292000,"close":5.92},{"time":1481896800,"close":5.98},{"time":1482501600,"close":5.9399999999999995},{"time":1483106400,"close":6.17},{"time":1483711200,"close":6.29},{"time":1484316000,"close":6.05},{"time":1484920800,"close":6.26},{"time":1485525600,"close":6.27},{"time":1486130400,"close":6.4},{"time":1486735200,"close":6.48},{"time":1487340000,"close":6.39},{"time":1487944800,"close":6.2},{"time":1488549600,"close":6.45},{"time":1489154400,"close":6.64},{"time":1489755600,"close":6.75},{"time":1490360400,"close":6.4},{"time":1490965200,"close":6.65},{"time":1491570000,"close":6.8100000000000005},{"time":1492174800,"close":6.61},{"time":1492779600,"close":6.61},{"time":1493384400,"close":6.8100000000000005},{"time":1493989200,"close":6.95},{"time":1494594000,"close":8.08},{"time":1495198800,"close":7.8},{"time":1495803600,"close":7.96},{"time":1496408400,"close":8.55},{"time":1497013200,"close":8.85},{"time":1497618000,"close":8.7},{"time":1498222800,"close":9.0},{"time":1498827600,"close":8.63},{"time":1499432400,"close":8.74},{"time":1500037200,"close":9.09},{"time":1500642000,"close":8.9},{"time":1501246800,"close":8.91},{"time":1501851600,"close":9.5},{"time":1502456400,"close":9.8},{"time":1503061200,"close":9.51},{"time":1503666000,"close":9.27},{"time":1504270800,"close":9.15},{"time":1504875600,"close":8.71},{"time":1505480400,"close":8.9},{"time":1506085200,"close":8.95},{"time":1506690000,"close":8.84},{"time":1507294800,"close":8.58},{"time":1507899600,"close":8.6},{"time":1508504400,"close":8.71},{"time":1509109200,"close":8.75},{"time":1509714000,"close":8.91},{"time":1510322400,"close":8.76},{"time":1510927200,"close":8.2},{"time":1511532000,"close":8.36},{"time":1512136800,"close":8.41},{"time":1512741600,"close":8.42},{"time":1513346400,"close":8.45},{"time":1513951200,"close":8.46},{"time":1514556000,"close":8.6},{"time":1515160800,"close":9.25},{"time":1515765600,"close":9.25},{"time":1516370400,"close":9.25},{"time":1516975200,"close":9.5},{"time":1517580000,"close":9.55},{"time":1518184800,"close":9.15},{"time":1518789600,"close":9.05},{"time":1519394400,"close":8.65},{"time":1519999200,"close":8.55},{"time":1520604000,"close":8.5},{"time":1521205200,"close":8.65},{"time":1521810000,"close":8.65},{"time":1522414800,"close":8.5},{"time":1523019600,"close":8.6},{"time":1523624400,"close":8.3},{"time":1524229200,"close":8.25},{"time":1524834000,"close":8.2},{"time":1525438800,"close":8.15},{"time":1526043600,"close":8.15},{"time":1526648400,"close":8.2},{"time":1527253200,"close":8.2},{"time":1527858000,"close":8.25},{"time":1528462800,"close":8.15},{"time":1529067600,"close":8.0},{"time":1529672400,"close":7.95},{"time":1530277200,"close":8.0},{"time":1530882000,"close":7.8},{"time":1531486800,"close":8.25},{"time":1532091600,"close":8.3},{"time":1532696400,"close":8.25},{"time":1533301200,"close":8.3},{"time":1533906000,"close":8.4},{"time":1534510800,"close":8.05},{"time":1535115600,"close":8.05},{"time":1535720400,"close":8.05},{"time":1536325200,"close":8.0},{"time":1536930000,"close":8.2},{"time":1537534800,"close":8.05},{"time":1538139600,"close":8.25},{"time":1538744400,"close":8.25},{"time":1539349200,"close":8.0},{"time":1539954000,"close":8.2},{"time":1540558800,"close":7.85},{"time":1541163600,"close":8.0},{"time":1541772000,"close":8.25},{"time":1542376800,"close":8.0},{"time":1542981600,"close":7.9},{"time":1543586400,"close":7.9},{"time":1544191200,"close":7.9},{"time":1544796000,"close":8.0},{"time":1545400800,"close":7.8},{"time":1546005600,"close":7.35},{"time":1546610400,"close":7.25},{"time":1547215200,"close":7.5},{"time":1547820000,"close":7.8},{"time":1548424800,"close":7.8},{"time":1549029600,"close":7.8},{"time":1549634400,"close":7.6},{"time":1550239200,"close":8.1},{"time":1550844000,"close":8.0},{"time":1551448800,"close":8.0},{"time":1552053600,"close":8.0},{"time":1552654800,"close":7.95},{"time":1553259600,"close":7.95},{"time":1553864400,"close":7.8},{"time":1554469200,"close":8.1},{"time":1555074000,"close":7.7},{"time":1555678800,"close":7.65},{"time":1556283600,"close":7.75},{"time":1556888400,"close":7.75},{"time":1557493200,"close":7.7},{"time":1558098000,"close":7.75},{"time":1558702800,"close":7.6},{"time":1559307600,"close":7.7},{"time":1559912400,"close":7.6},{"time":1560517200,"close":7.65},{"time":1561122000,"close":8.65},{"time":1561726800,"close":8.7},{"time":1562331600,"close":8.7},{"time":1562936400,"close":8.65},{"time":1563541200,"close":8.65},{"time":1564146000,"close":8.7},{"time":1564750800,"close":8.7},{"time":1565355600,"close":8.7},{"time":1565960400,"close":8.8},{"time":1566565200,"close":8.85},{"time":1567170000,"close":8.7},{"time":1567774800,"close":8.65},{"time":1568379600,"close":8.8},{"time":1568984400,"close":8.7},{"time":1569589200,"close":8.9},{"time":1570194000,"close":9.6},{"time":1570798800,"close":10.0},{"time":1571403600,"close":10.2},{"time":1572008400,"close":10.5},{"time":1572613200,"close":10.0},{"time":1573221600,"close":10.3},{"time":1573826400,"close":12.0},{"time":1574431200,"close":11.2},{"time":1575036000,"close":11.4},{"time":1575640800,"close":10.6},{"time":1576245600,"close":10.7},{"time":1576850400,"close":10.5},{"time":1577455200,"close":10.6},{"time":1578060000,"close":10.6},{"time":1578664800,"close":10.9},{"time":1579269600,"close":10.6},{"time":1579874400,"close":11.3},{"time":1580479200,"close":10.9},{"time":1581084000,"close":14.1},{"time":1581688800,"close":15.4},{"time":1582293600,"close":17.6},{"time":1582898400,"close":14.8},{"time":1583503200,"close":15.5},{"time":1584104400,"close":13.3},{"time":1584709200,"close":11.8},{"time":1585314000,"close":11.7},{"time":1585918800,"close":11.7},{"time":1586523600,"close":14.8},{"time":1587128400,"close":13.2},{"time":1587733200,"close":14.2},{"time":1588338000,"close":15.3},{"time":1588942800,"close":14.8},{"time":1589547600,"close":14.1},{"time":1590152400,"close":14.4},{"time":1590757200,"close":15.3},{"time":1591362000,"close":15.2},{"time":1591966800,"close":15.3},{"time":1592571600,"close":14.9},{"time":1593176400,"close":14.7},{"time":1593781200,"close":14.0},{"time":1594386000,"close":14.6},{"time":1594990800,"close":13.9},{"time":1595595600,"close":14.5},{"time":1596200400,"close":14.7},{"time":1596805200,"close":14.7},{"time":1597410000,"close":14.3},{"time":1598014800,"close":14.5},{"time":1598619600,"close":14.9},{"time":1599224400,"close":17.9},{"time":1599829200,"close":17.3},{"time":1600434000,"close":17.3},{"time":1601038800,"close":16.6},{"time":1601643600,"close":16.8},{"time":1602248400,"close":17.0},{"time":1602853200,"close":17.2},{"time":1603458000,"close":17.3},{"time":1604062800,"close":17.4},{"time":1604671200,"close":18.5},{"time":1605276000,"close":20.4},{"time":1605880800,"close":25.6},{"time":1606485600,"close":33.6},{"time":1607090400,"close":26.4},{"time":1607695200,"close":26.2},{"time":1608300000,"close":28.4},{"time":1608904800,"close":28.6},{"time":1609509600,"close":29.4},{"time":1610114400,"close":28.4},{"time":1610719200,"close":29.0},{"time":1611324000,"close":30.6},{"time":1611928800,"close":29.4},{"time":1612533600,"close":31.0},{"time":1613138400,"close":31.2},{"time":1613743200,"close":31.8},{"time":1614348000,"close":31.2}],"low":"5.28","high":"33.6","first":1457100000,"last":1614348000,"security":{"ticker":"BOREO:FH","open":"31.0","prevClose":"5.64"},"hasVolume":false},"SSH1V:FH":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1457100000,"close":3.8},{"time":1457704800,"close":3.65},{"time":1458306000,"close":3.49},{"time":1458910800,"close":3.52},{"time":1459515600,"close":3.4},{"time":1460120400,"close":3.25},{"time":1460725200,"close":3.2},{"time":1461330000,"close":3.2},{"time":1461934800,"close":3.44},{"time":1462539600,"close":3.23},{"time":1463144400,"close":3.38},{"time":1463749200,"close":3.31},{"time":1464354000,"close":3.33},{"time":1464958800,"close":3.11},{"time":1465563600,"close":2.99},{"time":1466168400,"close":2.7199999999999998},{"time":1466773200,"close":2.92},{"time":1467378000,"close":2.89},{"time":1467982800,"close":3.27},{"time":1468587600,"close":3.13},{"time":1469192400,"close":3.1},{"time":1469797200,"close":3.13},{"time":1470402000,"close":2.99},{"time":1471006800,"close":3.13},{"time":1471611600,"close":3.6},{"time":1472216400,"close":3.74},{"time":1472821200,"close":4.19},{"time":1473426000,"close":4.0},{"time":1474030800,"close":3.82},{"time":1474635600,"close":3.68},{"time":1475240400,"close":3.73},{"time":1475845200,"close":3.55},{"time":1476450000,"close":2.82},{"time":1477054800,"close":2.74},{"time":1477659600,"close":2.36},{"time":1478264400,"close":2.06},{"time":1478872800,"close":2.16},{"time":1479477600,"close":2.07},{"time":1480082400,"close":2.02},{"time":1480687200,"close":2.0},{"time":1481292000,"close":1.92},{"time":1481896800,"close":1.9300000000000002},{"time":1482501600,"close":1.95},{"time":1483106400,"close":1.94},{"time":1483711200,"close":2.49},{"time":1484316000,"close":2.29},{"time":1484920800,"close":2.15},{"time":1485525600,"close":2.12},{"time":1486130400,"close":2.07},{"time":1486735200,"close":2.05},{"time":1487340000,"close":2.2},{"time":1487944800,"close":2.27},{"time":1488549600,"close":2.27},{"time":1489154400,"close":2.27},{"time":1489755600,"close":2.2800000000000002},{"time":1490360400,"close":2.19},{"time":1490965200,"close":2.11},{"time":1491570000,"close":2.1},{"time":1492174800,"close":2.15},{"time":1492779600,"close":1.98},{"time":1493384400,"close":2.02},{"time":1493989200,"close":1.99},{"time":1494594000,"close":2.02},{"time":1495198800,"close":2.26},{"time":1495803600,"close":2.2},{"time":1496408400,"close":2.3},{"time":1497013200,"close":2.21},{"time":1497618000,"close":2.24},{"time":1498222800,"close":2.23},{"time":1498827600,"close":2.2},{"time":1499432400,"close":2.2},{"time":1500037200,"close":2.13},{"time":1500642000,"close":1.98},{"time":1501246800,"close":1.97},{"time":1501851600,"close":1.98},{"time":1502456400,"close":1.99},{"time":1503061200,"close":1.92},{"time":1503666000,"close":1.92},{"time":1504270800,"close":1.95},{"time":1504875600,"close":1.92},{"time":1505480400,"close":1.9300000000000002},{"time":1506085200,"close":1.95},{"time":1506690000,"close":2.02},{"time":1507294800,"close":1.98},{"time":1507899600,"close":1.97},{"time":1508504400,"close":1.9300000000000002},{"time":1509109200,"close":1.87},{"time":1509714000,"close":1.85},{"time":1510322400,"close":1.9},{"time":1510927200,"close":1.85},{"time":1511532000,"close":1.8399999999999999},{"time":1512136800,"close":1.77},{"time":1512741600,"close":1.8599999999999999},{"time":1513346400,"close":1.8199999999999998},{"time":1513951200,"close":1.78},{"time":1514556000,"close":1.77},{"time":1515160800,"close":1.8599999999999999},{"time":1515765600,"close":1.8399999999999999},{"time":1516370400,"close":1.8050000000000002},{"time":1516975200,"close":1.8399999999999999},{"time":1517580000,"close":1.935},{"time":1518184800,"close":2.07},{"time":1518789600,"close":2.08},{"time":1519394400,"close":2.06},{"time":1519999200,"close":2.12},{"time":1520604000,"close":2.18},{"time":1521205200,"close":2.14},{"time":1521810000,"close":2.07},{"time":1522414800,"close":2.1},{"time":1523019600,"close":2.08},{"time":1523624400,"close":2.07},{"time":1524229200,"close":2.2},{"time":1524834000,"close":2.11},{"time":1525438800,"close":2.1},{"time":1526043600,"close":2.08},{"time":1526648400,"close":2.08},{"time":1527253200,"close":2.08},{"time":1527858000,"close":2.06},{"time":1528462800,"close":2.03},{"time":1529067600,"close":2.0},{"time":1529672400,"close":2.17},{"time":1530277200,"close":2.15},{"time":1530882000,"close":2.11},{"time":1531486800,"close":2.12},{"time":1532091600,"close":2.04},{"time":1532696400,"close":2.01},{"time":1533301200,"close":2.04},{"time":1533906000,"close":2.0},{"time":1534510800,"close":1.97},{"time":1535115600,"close":1.975},{"time":1535720400,"close":1.99},{"time":1536325200,"close":1.94},{"time":1536930000,"close":1.95},{"time":1537534800,"close":1.88},{"time":1538139600,"close":1.87},{"time":1538744400,"close":1.83},{"time":1539349200,"close":1.69},{"time":1539954000,"close":1.755},{"time":1540558800,"close":1.615},{"time":1541163600,"close":1.7},{"time":1541772000,"close":1.725},{"time":1542376800,"close":1.795},{"time":1542981600,"close":1.755},{"time":1543586400,"close":1.6800000000000002},{"time":1544191200,"close":1.8199999999999998},{"time":1544796000,"close":1.77},{"time":1545400800,"close":1.7},{"time":1546005600,"close":1.6800000000000002},{"time":1546610400,"close":1.815},{"time":1547215200,"close":1.78},{"time":1547820000,"close":1.7349999999999999},{"time":1548424800,"close":1.73},{"time":1549029600,"close":1.74},{"time":1549634400,"close":1.845},{"time":1550239200,"close":1.71},{"time":1550844000,"close":1.75},{"time":1551448800,"close":1.73},{"time":1552053600,"close":1.6800000000000002},{"time":1552654800,"close":1.3900000000000001},{"time":1553259600,"close":1.34},{"time":1553864400,"close":1.37},{"time":1554469200,"close":1.345},{"time":1555074000,"close":1.37},{"time":1555678800,"close":1.2650000000000001},{"time":1556283600,"close":1.185},{"time":1556888400,"close":1.2},{"time":1557493200,"close":1.17},{"time":1558098000,"close":1.135},{"time":1558702800,"close":1.125},{"time":1559307600,"close":1.1400000000000001},{"time":1559912400,"close":1.4},{"time":1560517200,"close":1.5150000000000001},{"time":1561122000,"close":1.5},{"time":1561726800,"close":1.455},{"time":1562331600,"close":1.46},{"time":1562936400,"close":1.47},{"time":1563541200,"close":1.495},{"time":1564146000,"close":1.45},{"time":1564750800,"close":1.405},{"time":1565355600,"close":1.45},{"time":1565960400,"close":1.3900000000000001},{"time":1566565200,"close":1.435},{"time":1567170000,"close":1.385},{"time":1567774800,"close":1.395},{"time":1568379600,"close":1.3599999999999999},{"time":1568984400,"close":1.37},{"time":1569589200,"close":1.325},{"time":1570194000,"close":1.4},{"time":1570798800,"close":1.375},{"time":1571403600,"close":1.41},{"time":1572008400,"close":1.34},{"time":1572613200,"close":1.28},{"time":1573221600,"close":1.295},{"time":1573826400,"close":1.15},{"time":1574431200,"close":1.13},{"time":1575036000,"close":1.09},{"time":1575640800,"close":1.06},{"time":1576245600,"close":1.0},{"time":1576850400,"close":0.994},{"time":1577455200,"close":0.992},{"time":1578060000,"close":1.18},{"time":1578664800,"close":1.1400000000000001},{"time":1579269600,"close":1.215},{"time":1579874400,"close":1.165},{"time":1580479200,"close":1.15},{"time":1581084000,"close":1.15},{"time":1581688800,"close":1.1},{"time":1582293600,"close":1.065},{"time":1582898400,"close":1.02},{"time":1583503200,"close":0.988},{"time":1584104400,"close":0.738},{"time":1584709200,"close":0.746},{"time":1585314000,"close":0.732},{"time":1585918800,"close":0.802},{"time":1586523600,"close":0.86},{"time":1587128400,"close":0.88},{"time":1587733200,"close":0.9},{"time":1588338000,"close":1.02},{"time":1588942800,"close":1.195},{"time":1589547600,"close":1.335},{"time":1590152400,"close":1.6949999999999998},{"time":1590757200,"close":1.6},{"time":1591362000,"close":1.625},{"time":1591966800,"close":1.55},{"time":1592571600,"close":1.6},{"time":1593176400,"close":1.62},{"time":1593781200,"close":1.51},{"time":1594386000,"close":1.5},{"time":1594990800,"close":1.5699999999999998},{"time":1595595600,"close":1.25},{"time":1596200400,"close":1.2650000000000001},{"time":1596805200,"close":1.22},{"time":1597410000,"close":1.37},{"time":1598014800,"close":1.41},{"time":1598619600,"close":1.4},{"time":1599224400,"close":1.385},{"time":1599829200,"close":1.4},{"time":1600434000,"close":1.475},{"time":1601038800,"close":1.3599999999999999},{"time":1601643600,"close":1.37},{"time":1602248400,"close":1.27},{"time":1602853200,"close":1.3},{"time":1603458000,"close":1.28},{"time":1604062800,"close":1.21},{"time":1604671200,"close":1.2349999999999999},{"time":1605276000,"close":1.26},{"time":1605880800,"close":1.26},{"time":1606485600,"close":1.27},{"time":1607090400,"close":1.275},{"time":1607695200,"close":1.77},{"time":1608300000,"close":1.6400000000000001},{"time":1608904800,"close":1.65},{"time":1609509600,"close":1.6949999999999998},{"time":1610114400,"close":1.7},{"time":1610719200,"close":1.6800000000000002},{"time":1611324000,"close":1.8},{"time":1611928800,"close":2.01},{"time":1612533600,"close":2.4699999999999998},{"time":1613138400,"close":2.7800000000000002},{"time":1613743200,"close":2.6},{"time":1614348000,"close":2.5}],"low":"0.732","high":"4.19","first":1457100000,"last":1614348000,"security":{"ticker":"SSH1V:FH","open":"2.60","prevClose":"3.65"},"hasVolume":false},"TSLA:US":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1457100000,"close":40.208},{"time":1457704800,"close":41.5},{"time":1458306000,"close":46.548},{"time":1458910800,"close":45.55},{"time":1459515600,"close":47.518},{"time":1460120400,"close":50.014},{"time":1460725200,"close":50.902},{"time":1461330000,"close":50.75},{"time":1461934800,"close":48.152},{"time":1462539600,"close":42.986},{"time":1463144400,"close":41.522},{"time":1463749200,"close":44.056},{"time":1464354000,"close":44.608},{"time":1464958800,"close":43.798},{"time":1465563600,"close":43.758},{"time":1466168400,"close":43.094},{"time":1466773200,"close":38.63},{"time":1467378000,"close":43.3},{"time":1467982800,"close":43.356},{"time":1468587600,"close":44.08},{"time":1469192400,"close":44.454},{"time":1469797200,"close":46.958},{"time":1470402000,"close":46.006},{"time":1471006800,"close":45.122},{"time":1471611600,"close":45.0},{"time":1472216400,"close":43.998},{"time":1472821200,"close":39.556},{"time":1473426000,"close":38.894},{"time":1474030800,"close":41.08},{"time":1474635600,"close":41.49},{"time":1475240400,"close":40.806},{"time":1475845200,"close":39.322},{"time":1476450000,"close":39.302},{"time":1477054800,"close":40.018},{"time":1477659600,"close":39.994},{"time":1478264400,"close":38.112},{"time":1478872800,"close":37.712},{"time":1479477600,"close":37.004},{"time":1480082400,"close":39.33},{"time":1480687200,"close":36.294},{"time":1481292000,"close":38.436},{"time":1481896800,"close":40.498},{"time":1482501600,"close":42.668},{"time":1483106400,"close":42.738},{"time":1483711200,"close":45.802},{"time":1484316000,"close":47.55},{"time":1484920800,"close":48.946},{"time":1485525600,"close":50.59},{"time":1486130400,"close":50.266},{"time":1486735200,"close":53.846},{"time":1487340000,"close":54.446},{"time":1487944800,"close":51.4},{"time":1488549600,"close":50.314},{"time":1489154400,"close":48.738},{"time":1489755600,"close":52.3},{"time":1490360400,"close":52.632},{"time":1490965200,"close":55.66},{"time":1491570000,"close":60.508},{"time":1492174800,"close":60.8},{"time":1492779600,"close":61.12},{"time":1493384400,"close":62.814},{"time":1493989200,"close":61.67},{"time":1494594000,"close":64.962},{"time":1495198800,"close":62.166},{"time":1495803600,"close":65.028},{"time":1496408400,"close":67.97},{"time":1497013200,"close":71.464},{"time":1497618000,"close":74.28},{"time":1498222800,"close":76.69},{"time":1498827600,"close":72.322},{"time":1499432400,"close":62.644},{"time":1500037200,"close":65.556},{"time":1500642000,"close":65.68},{"time":1501246800,"close":67.014},{"time":1501851600,"close":71.382},{"time":1502456400,"close":71.574},{"time":1503061200,"close":69.492},{"time":1503666000,"close":69.61},{"time":1504270800,"close":71.08},{"time":1504875600,"close":68.68},{"time":1505480400,"close":75.962},{"time":1506085200,"close":70.218},{"time":1506690000,"close":68.22},{"time":1507294800,"close":71.376},{"time":1507899600,"close":71.114},{"time":1508504400,"close":69.02},{"time":1509109200,"close":64.174},{"time":1509714000,"close":61.218},{"time":1510322400,"close":60.598},{"time":1510927200,"close":63.01},{"time":1511532000,"close":63.11},{"time":1512136800,"close":61.306},{"time":1512741600,"close":63.026},{"time":1513346400,"close":68.69},{"time":1513951200,"close":65.04},{"time":1514556000,"close":62.27},{"time":1515160800,"close":63.316},{"time":1515765600,"close":67.244},{"time":1516370400,"close":70.004},{"time":1516975200,"close":68.57},{"time":1517580000,"close":68.75},{"time":1518184800,"close":62.084},{"time":1518789600,"close":67.098},{"time":1519394400,"close":70.41},{"time":1519999200,"close":67.024},{"time":1520604000,"close":65.434},{"time":1521205200,"close":64.27},{"time":1521810000,"close":60.308},{"time":1522414800,"close":53.226},{"time":1523019600,"close":59.86},{"time":1523624400,"close":60.068},{"time":1524229200,"close":58.048},{"time":1524834000,"close":58.815},{"time":1525438800,"close":58.818},{"time":1526043600,"close":60.212},{"time":1526648400,"close":55.364},{"time":1527253200,"close":55.77},{"time":1527858000,"close":58.364},{"time":1528462800,"close":63.532},{"time":1529067600,"close":71.634},{"time":1529672400,"close":66.726},{"time":1530277200,"close":68.59},{"time":1530882000,"close":61.78},{"time":1531486800,"close":63.774},{"time":1532091600,"close":62.716},{"time":1532696400,"close":59.436},{"time":1533301200,"close":69.634},{"time":1533906000,"close":71.098},{"time":1534510800,"close":61.1},{"time":1535115600,"close":64.564},{"time":1535720400,"close":60.332},{"time":1536325200,"close":52.648},{"time":1536930000,"close":59.04},{"time":1537534800,"close":59.82},{"time":1538139600,"close":52.954},{"time":1538744400,"close":52.39},{"time":1539349200,"close":51.756},{"time":1539954000,"close":52.0},{"time":1540558800,"close":66.18},{"time":1541163600,"close":69.282},{"time":1541772000,"close":70.102},{"time":1542376800,"close":70.862},{"time":1542981600,"close":65.166},{"time":1543586400,"close":70.096},{"time":1544191200,"close":71.593},{"time":1544796000,"close":73.142},{"time":1545400800,"close":63.954},{"time":1546005600,"close":66.774},{"time":1546610400,"close":63.538},{"time":1547215200,"close":69.452},{"time":1547820000,"close":60.452},{"time":1548424800,"close":59.408},{"time":1549029600,"close":62.442},{"time":1549634400,"close":61.16},{"time":1550239200,"close":61.576},{"time":1550844000,"close":58.942},{"time":1551448800,"close":58.958},{"time":1552053600,"close":56.828},{"time":1552654800,"close":55.086},{"time":1553259600,"close":52.906},{"time":1553864400,"close":55.972},{"time":1554469200,"close":54.992},{"time":1555074000,"close":53.54},{"time":1555678800,"close":54.652},{"time":1556283600,"close":47.028},{"time":1556888400,"close":51.006},{"time":1557493200,"close":47.904},{"time":1558098000,"close":42.206},{"time":1558702800,"close":38.126},{"time":1559307600,"close":37.032},{"time":1559912400,"close":40.9},{"time":1560517200,"close":42.984},{"time":1561122000,"close":44.372},{"time":1561726800,"close":44.692},{"time":1562331600,"close":46.62},{"time":1562936400,"close":49.016},{"time":1563541200,"close":51.636},{"time":1564146000,"close":45.608},{"time":1564750800,"close":46.868},{"time":1565355600,"close":47.002},{"time":1565960400,"close":43.988},{"time":1566565200,"close":42.28},{"time":1567170000,"close":45.122},{"time":1567774800,"close":45.49},{"time":1568379600,"close":49.04},{"time":1568984400,"close":48.124},{"time":1569589200,"close":48.426},{"time":1570194000,"close":46.286},{"time":1570798800,"close":49.578},{"time":1571403600,"close":51.39},{"time":1572008400,"close":65.626},{"time":1572613200,"close":62.662},{"time":1573221600,"close":67.428},{"time":1573826400,"close":70.434},{"time":1574431200,"close":66.608},{"time":1575036000,"close":65.988},{"time":1575640800,"close":67.178},{"time":1576245600,"close":71.678},{"time":1576850400,"close":81.118},{"time":1577455200,"close":86.076},{"time":1578060000,"close":88.602},{"time":1578664800,"close":95.63},{"time":1579269600,"close":102.1},{"time":1579874400,"close":112.964},{"time":1580479200,"close":130.114},{"time":1581084000,"close":149.614},{"time":1581688800,"close":160.006},{"time":1582293600,"close":180.2},{"time":1582898400,"close":133.598},{"time":1583503200,"close":140.696},{"time":1584104400,"close":109.324},{"time":1584709200,"close":85.506},{"time":1585314000,"close":102.872},{"time":1585918800,"close":96.002},{"time":1586523600,"close":114.6},{"time":1587128400,"close":150.778},{"time":1587733200,"close":145.03},{"time":1588338000,"close":140.264},{"time":1588942800,"close":163.884},{"time":1589547600,"close":159.834},{"time":1590152400,"close":163.376},{"time":1590757200,"close":167.0},{"time":1591362000,"close":177.132},{"time":1591966800,"close":187.056},{"time":1592571600,"close":200.18},{"time":1593176400,"close":191.948},{"time":1593781200,"close":241.732},{"time":1594386000,"close":308.93},{"time":1594990800,"close":300.168},{"time":1595595600,"close":283.4},{"time":1596200400,"close":286.152},{"time":1596805200,"close":290.542},{"time":1597410000,"close":330.142},{"time":1598014800,"close":409.996},{"time":1598619600,"close":442.68},{"time":1599224400,"close":418.32},{"time":1599829200,"close":372.72},{"time":1600434000,"close":442.15},{"time":1601038800,"close":407.34},{"time":1601643600,"close":415.09},{"time":1602248400,"close":434.0},{"time":1602853200,"close":439.67},{"time":1603458000,"close":420.63},{"time":1604062800,"close":388.04},{"time":1604671200,"close":429.95},{"time":1605276000,"close":408.5},{"time":1605880800,"close":489.61},{"time":1606485600,"close":585.76},{"time":1607090400,"close":599.04},{"time":1607695200,"close":609.99},{"time":1608300000,"close":695.0},{"time":1608904800,"close":661.77},{"time":1609509600,"close":705.67},{"time":1610114400,"close":880.02},{"time":1610719200,"close":826.16},{"time":1611324000,"close":846.64},{"time":1611928800,"close":793.53},{"time":1612533600,"close":852.23},{"time":1613138400,"close":816.12},{"time":1613743200,"close":781.3},{"time":1614348000,"close":675.5}],"low":"36.294","high":"880.02","first":1457100000,"last":1614348000,"security":{"ticker":"TSLA:US","open":"700.00","prevClose":"38.068"},"hasVolume":false},"LI:US":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1596805200,"close":16.89},{"time":1597410000,"close":14.6},{"time":1598014800,"close":15.02},{"time":1598619600,"close":17.6},{"time":1599224400,"close":16.83},{"time":1599829200,"close":16.21},{"time":1600434000,"close":17.03},{"time":1601038800,"close":15.8},{"time":1601643600,"close":16.92},{"time":1602248400,"close":17.6},{"time":1602853200,"close":19.77},{"time":1603458000,"close":18.4},{"time":1604062800,"close":20.17},{"time":1604671200,"close":26.46},{"time":1605276000,"close":31.2},{"time":1605880800,"close":38.12},{"time":1606485600,"close":39.48},{"time":1607090400,"close":30.53},{"time":1607695200,"close":31.36},{"time":1608300000,"close":31.77},{"time":1608904800,"close":29.32},{"time":1609509600,"close":28.83},{"time":1610114400,"close":34.3},{"time":1610719200,"close":32.6},{"time":1611324000,"close":34.44},{"time":1611928800,"close":32.25},{"time":1612533600,"close":30.4},{"time":1613138400,"close":31.85},{"time":1613743200,"close":29.84},{"time":1614348000,"close":25.37}],"low":"14.6","high":"39.48","first":1596805200,"last":1614348000,"security":{"ticker":"LI:US","open":"26.34","prevClose":"16"},"hasVolume":false},"NIO:US":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1537534800,"close":8.59},{"time":1538139600,"close":6.98},{"time":1538744400,"close":6.26},{"time":1539349200,"close":7.46},{"time":1539954000,"close":7.32},{"time":1540558800,"close":6.35},{"time":1541163600,"close":6.49},{"time":1541772000,"close":6.77},{"time":1542376800,"close":7.19},{"time":1542981600,"close":7.46},{"time":1543586400,"close":7.71},{"time":1544191200,"close":6.99},{"time":1544796000,"close":7.7},{"time":1545400800,"close":6.07},{"time":1546005600,"close":6.47},{"time":1546610400,"close":6.36},{"time":1547215200,"close":6.59},{"time":1547820000,"close":6.71},{"time":1548424800,"close":6.65},{"time":1549029600,"close":7.9},{"time":1549634400,"close":7.67},{"time":1550239200,"close":7.41},{"time":1550844000,"close":8.17},{"time":1551448800,"close":10.06},{"time":1552053600,"close":7.06},{"time":1552654800,"close":5.71},{"time":1553259600,"close":5.62},{"time":1553864400,"close":5.1},{"time":1554469200,"close":5.36},{"time":1555074000,"close":4.99},{"time":1555678800,"close":4.79},{"time":1556283600,"close":4.92},{"time":1556888400,"close":5.02},{"time":1557493200,"close":4.5600000000000005},{"time":1558098000,"close":4.42},{"time":1558702800,"close":3.86},{"time":1559307600,"close":3.05},{"time":1559912400,"close":2.76},{"time":1560517200,"close":2.42},{"time":1561122000,"close":2.64},{"time":1561726800,"close":2.55},{"time":1562331600,"close":3.26},{"time":1562936400,"close":3.45},{"time":1563541200,"close":3.37},{"time":1564146000,"close":3.51},{"time":1564750800,"close":3.27},{"time":1565355600,"close":3.13},{"time":1565960400,"close":2.95},{"time":1566565200,"close":2.92},{"time":1567170000,"close":2.86},{"time":1567774800,"close":2.98},{"time":1568379600,"close":3.21},{"time":1568984400,"close":3.04},{"time":1569589200,"close":1.75},{"time":1570194000,"close":1.62},{"time":1570798800,"close":1.56},{"time":1571403600,"close":1.52},{"time":1572008400,"close":1.51},{"time":1572613200,"close":1.52},{"time":1573221600,"close":1.98},{"time":1573826400,"close":1.8},{"time":1574431200,"close":1.94},{"time":1575036000,"close":2.27},{"time":1575640800,"close":2.26},{"time":1576245600,"close":2.39},{"time":1576850400,"close":2.69},{"time":1577455200,"close":2.42},{"time":1578060000,"close":3.83},{"time":1578664800,"close":3.51},{"time":1579269600,"close":4.67},{"time":1579874400,"close":4.66},{"time":1580479200,"close":3.7800000000000002},{"time":1581084000,"close":3.81},{"time":1581688800,"close":3.77},{"time":1582293600,"close":4.08},{"time":1582898400,"close":4.13},{"time":1583503200,"close":3.55},{"time":1584104400,"close":3.11},{"time":1584709200,"close":2.4},{"time":1585314000,"close":2.84},{"time":1585918800,"close":2.4},{"time":1586523600,"close":2.67},{"time":1587128400,"close":3.21},{"time":1587733200,"close":2.94},{"time":1588338000,"close":3.18},{"time":1588942800,"close":3.77},{"time":1589547600,"close":3.37},{"time":1590152400,"close":3.27},{"time":1590757200,"close":3.98},{"time":1591362000,"close":5.59},{"time":1591966800,"close":6.1},{"time":1592571600,"close":7.34},{"time":1593176400,"close":6.9},{"time":1593781200,"close":9.38},{"time":1594386000,"close":14.98},{"time":1594990800,"close":11.09},{"time":1595595600,"close":11.82},{"time":1596200400,"close":11.94},{"time":1596805200,"close":13.42},{"time":1597410000,"close":13.1},{"time":1598014800,"close":14.12},{"time":1598619600,"close":18.5},{"time":1599224400,"close":17.98},{"time":1599829200,"close":17.97},{"time":1600434000,"close":19.41},{"time":1601038800,"close":18.32},{"time":1601643600,"close":21.18},{"time":1602248400,"close":21.47},{"time":1602853200,"close":28.48},{"time":1603458000,"close":27.16},{"time":1604062800,"close":30.58},{"time":1604671200,"close":41.63},{"time":1605276000,"close":44.56},{"time":1605880800,"close":49.25},{"time":1606485600,"close":54.0},{"time":1607090400,"close":43.04},{"time":1607695200,"close":41.98},{"time":1608300000,"close":46.72},{"time":1608904800,"close":45.77},{"time":1609509600,"close":48.74},{"time":1610114400,"close":58.92},{"time":1610719200,"close":56.27},{"time":1611324000,"close":61.95},{"time":1611928800,"close":57.0},{"time":1612533600,"close":56.67},{"time":1613138400,"close":59.85},{"time":1613743200,"close":55.04},{"time":1614348000,"close":45.78}],"low":"1.51","high":"61.95","first":1537534800,"last":1614348000,"security":{"ticker":"NIO:US","open":"47.00","prevClose":"9.9"},"hasVolume":false}}};
var mockTrends3d = {"result":{"SAA1V:FH":{"first":1614153600,"last":1614357300,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1614153600,"close":13.84},{"time":1614153900,"close":14.02},{"time":1614154500,"close":14.1},{"time":1614154800,"close":14.04},{"time":1614155400,"close":14.04},{"time":1614155700,"close":13.96},{"time":1614156000,"close":13.96},{"time":1614156300,"close":13.92},{"time":1614156600,"close":13.98},{"time":1614156900,"close":14.0},{"time":1614157200,"close":14.0},{"time":1614157500,"close":14.0},{"time":1614157800,"close":13.96},{"time":1614158700,"close":13.96},{"time":1614159600,"close":13.98},{"time":1614159900,"close":13.96},{"time":1614160200,"close":13.94},{"time":1614160500,"close":13.96},{"time":1614161100,"close":13.92},{"time":1614161700,"close":13.9},{"time":1614162000,"close":13.94},{"time":1614162300,"close":13.9},{"time":1614162900,"close":13.92},{"time":1614163500,"close":13.94},{"time":1614165000,"close":13.9},{"time":1614165300,"close":13.88},{"time":1614165600,"close":13.9},{"time":1614166200,"close":13.9},{"time":1614166500,"close":13.88},{"time":1614166800,"close":13.88},{"time":1614167100,"close":13.9},{"time":1614168600,"close":13.92},{"time":1614168900,"close":13.92},{"time":1614170400,"close":13.94},{"time":1614171000,"close":13.94},{"time":1614171300,"close":13.9},{"time":1614171900,"close":13.92},{"time":1614172200,"close":13.92},{"time":1614172800,"close":13.94},{"time":1614173100,"close":13.9},{"time":1614173400,"close":13.9},{"time":1614173700,"close":13.88},{"time":1614174300,"close":13.84},{"time":1614174900,"close":13.82},{"time":1614175200,"close":13.76},{"time":1614175500,"close":13.82},{"time":1614176100,"close":13.82},{"time":1614176400,"close":13.84},{"time":1614176700,"close":13.82},{"time":1614177000,"close":13.8},{"time":1614177300,"close":13.78},{"time":1614177600,"close":13.82},{"time":1614178200,"close":13.78},{"time":1614178500,"close":13.74},{"time":1614178800,"close":13.72},{"time":1614179100,"close":13.72},{"time":1614179400,"close":13.68},{"time":1614179700,"close":13.74},{"time":1614180000,"close":13.74},{"time":1614180300,"close":13.72},{"time":1614180600,"close":13.78},{"time":1614180900,"close":13.74},{"time":1614181200,"close":13.72},{"time":1614181800,"close":13.68},{"time":1614182100,"close":13.7},{"time":1614182700,"close":13.72},{"time":1614183000,"close":13.68},{"time":1614183300,"close":13.6},{"time":1614183600,"close":13.58},{"time":1614183900,"close":13.54},{"time":1614240000,"close":13.68},{"time":1614240300,"close":13.66},{"time":1614240900,"close":13.7},{"time":1614241200,"close":13.78},{"time":1614241500,"close":13.8},{"time":1614241800,"close":13.8},{"time":1614242100,"close":13.8},{"time":1614242400,"close":13.84},{"time":1614242700,"close":13.82},{"time":1614243300,"close":13.84},{"time":1614243600,"close":13.86},{"time":1614243900,"close":13.92},{"time":1614244200,"close":13.9},{"time":1614244500,"close":13.92},{"time":1614244800,"close":13.86},{"time":1614245100,"close":13.84},{"time":1614245400,"close":13.82},{"time":1614246000,"close":13.9},{"time":1614246300,"close":13.88},{"time":1614246600,"close":13.86},{"time":1614246900,"close":13.84},{"time":1614247200,"close":13.9},{"time":1614247500,"close":13.88},{"time":1614247800,"close":13.84},{"time":1614248400,"close":13.9},{"time":1614248700,"close":13.92},{"time":1614249300,"close":13.96},{"time":1614249600,"close":13.96},{"time":1614249900,"close":14.02},{"time":1614251700,"close":14.04},{"time":1614252000,"close":14.1},{"time":1614252300,"close":14.1},{"time":1614252600,"close":14.12},{"time":1614252900,"close":14.08},{"time":1614253500,"close":14.02},{"time":1614254100,"close":14.0},{"time":1614254400,"close":13.98},{"time":1614254700,"close":14.02},{"time":1614255000,"close":14.04},{"time":1614255600,"close":14.04},{"time":1614255900,"close":14.06},{"time":1614256500,"close":14.08},{"time":1614256800,"close":14.08},{"time":1614257700,"close":14.04},{"time":1614258000,"close":14.08},{"time":1614258600,"close":14.0},{"time":1614258900,"close":14.04},{"time":1614259500,"close":14.0},{"time":1614259800,"close":14.02},{"time":1614260400,"close":14.04},{"time":1614260700,"close":14.0},{"time":1614261300,"close":14.0},{"time":1614261900,"close":14.02},{"time":1614262800,"close":14.0},{"time":1614263100,"close":14.02},{"time":1614264000,"close":14.02},{"time":1614264300,"close":14.0},{"time":1614264900,"close":13.98},{"time":1614265200,"close":13.96},{"time":1614265500,"close":13.94},{"time":1614265800,"close":13.92},{"time":1614266100,"close":13.94},{"time":1614266400,"close":13.94},{"time":1614266700,"close":13.98},{"time":1614267000,"close":13.96},{"time":1614267300,"close":13.92},{"time":1614267600,"close":14.02},{"time":1614267900,"close":13.98},{"time":1614268200,"close":14.02},{"time":1614268500,"close":14.04},{"time":1614268800,"close":14.0},{"time":1614269100,"close":14.04},{"time":1614269400,"close":14.02},{"time":1614269700,"close":14.06},{"time":1614270000,"close":14.04},{"time":1614270300,"close":14.02},{"time":1614326400,"close":13.86},{"time":1614326700,"close":13.78},{"time":1614327000,"close":13.82},{"time":1614327300,"close":13.78},{"time":1614327600,"close":13.82},{"time":1614327900,"close":13.84},{"time":1614328200,"close":13.82},{"time":1614328500,"close":13.86},{"time":1614329100,"close":13.9},{"time":1614329400,"close":13.88},{"time":1614329700,"close":13.84},{"time":1614330000,"close":13.84},{"time":1614330300,"close":13.82},{"time":1614330600,"close":13.84},{"time":1614330900,"close":13.82},{"time":1614331500,"close":13.88},{"time":1614331800,"close":13.84},{"time":1614332100,"close":13.84},{"time":1614332400,"close":13.84},{"time":1614333000,"close":13.8},{"time":1614333300,"close":13.8},{"time":1614333600,"close":13.8},{"time":1614333900,"close":13.78},{"time":1614334200,"close":13.76},{"time":1614334500,"close":13.76},{"time":1614335700,"close":13.8},{"time":1614336000,"close":13.82},{"time":1614336300,"close":13.8},{"time":1614336900,"close":13.76},{"time":1614337500,"close":13.76},{"time":1614337800,"close":13.74},{"time":1614338400,"close":13.66},{"time":1614338700,"close":13.66},{"time":1614339000,"close":13.64},{"time":1614340200,"close":13.64},{"time":1614340500,"close":13.66},{"time":1614341100,"close":13.64},{"time":1614341400,"close":13.68},{"time":1614342300,"close":13.64},{"time":1614343200,"close":13.68},{"time":1614343500,"close":13.62},{"time":1614343800,"close":13.62},{"time":1614344100,"close":13.62},{"time":1614345000,"close":13.58},{"time":1614345600,"close":13.64},{"time":1614345900,"close":13.62},{"time":1614346200,"close":13.64},{"time":1614346500,"close":13.68},{"time":1614346800,"close":13.64},{"time":1614347400,"close":13.64},{"time":1614348000,"close":13.68},{"time":1614348300,"close":13.66},{"time":1614348600,"close":13.68},{"time":1614348900,"close":13.66},{"time":1614349200,"close":13.68},{"time":1614349500,"close":13.66},{"time":1614349800,"close":13.66},{"time":1614350100,"close":13.62},{"time":1614351000,"close":13.6},{"time":1614351300,"close":13.52},{"time":1614351600,"close":13.54},{"time":1614351900,"close":13.58},{"time":1614352200,"close":13.62},{"time":1614352800,"close":13.64},{"time":1614353100,"close":13.62},{"time":1614353700,"close":13.64},{"time":1614354600,"close":13.68},{"time":1614354900,"close":13.72},{"time":1614355200,"close":13.72},{"time":1614355500,"close":13.7},{"time":1614355800,"close":13.72},{"time":1614356100,"close":13.7},{"time":1614356400,"close":13.68},{"time":1614356700,"close":13.68}],"low":"13.52","high":"14.12","hasVolume":false,"security":{"ticker":"SAA1V:FH","open":"14.18","prevClose":"13.92"}},"MSFT:US":{"first":1614177000,"last":1614373200,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1614177000,"close":231.3},{"time":1614177300,"close":230.95},{"time":1614177600,"close":230.38},{"time":1614177900,"close":231.04},{"time":1614178200,"close":230.83},{"time":1614178500,"close":229.75},{"time":1614178800,"close":229.447},{"time":1614179100,"close":229.3},{"time":1614179400,"close":229.26},{"time":1614179700,"close":230.052},{"time":1614180000,"close":231.045},{"time":1614180300,"close":231.25},{"time":1614180600,"close":231.33},{"time":1614180900,"close":230.42},{"time":1614181200,"close":230.36},{"time":1614181500,"close":230.45},{"time":1614181800,"close":230.41},{"time":1614182100,"close":231.06},{"time":1614182400,"close":231.47},{"time":1614182700,"close":231.456},{"time":1614183000,"close":231.31},{"time":1614183300,"close":231.58},{"time":1614183600,"close":231.96},{"time":1614183900,"close":232.03},{"time":1614184200,"close":232.01},{"time":1614184500,"close":232.05},{"time":1614184800,"close":231.85},{"time":1614185100,"close":231.82},{"time":1614185400,"close":232.13},{"time":1614185700,"close":231.973},{"time":1614186000,"close":232.15},{"time":1614186300,"close":232.34},{"time":1614186600,"close":232.36},{"time":1614186900,"close":232.53},{"time":1614187200,"close":232.28},{"time":1614187500,"close":232.34},{"time":1614187800,"close":232.55},{"time":1614188100,"close":232.79},{"time":1614188400,"close":232.79},{"time":1614188700,"close":232.58},{"time":1614189000,"close":232.453},{"time":1614189300,"close":233.05},{"time":1614189600,"close":232.44},{"time":1614189900,"close":232.825},{"time":1614190200,"close":233.3},{"time":1614190500,"close":233.2},{"time":1614190800,"close":233.2},{"time":1614191100,"close":233.265},{"time":1614191400,"close":233.67},{"time":1614191700,"close":233.7},{"time":1614192000,"close":233.87},{"time":1614192300,"close":233.94},{"time":1614192600,"close":233.7},{"time":1614192900,"close":234.13},{"time":1614193200,"close":233.93},{"time":1614193500,"close":233.82},{"time":1614193800,"close":233.725},{"time":1614194100,"close":233.63},{"time":1614194400,"close":233.77},{"time":1614194700,"close":233.74},{"time":1614195000,"close":233.756},{"time":1614195300,"close":233.89},{"time":1614195600,"close":234.16},{"time":1614195900,"close":233.77},{"time":1614196200,"close":233.77},{"time":1614196500,"close":233.72},{"time":1614196800,"close":233.85},{"time":1614197100,"close":234.0},{"time":1614197400,"close":234.32},{"time":1614197700,"close":233.985},{"time":1614198000,"close":234.34},{"time":1614198300,"close":234.79},{"time":1614198600,"close":235.16},{"time":1614198900,"close":234.96},{"time":1614199200,"close":234.429},{"time":1614199500,"close":234.42},{"time":1614199800,"close":234.85},{"time":1614200100,"close":234.54},{"time":1614200400,"close":234.55},{"time":1614201900,"close":234.55},{"time":1614263400,"close":233.43},{"time":1614263700,"close":233.545},{"time":1614264000,"close":233.87},{"time":1614264300,"close":233.79},{"time":1614264600,"close":234.11},{"time":1614264900,"close":234.195},{"time":1614265200,"close":233.76},{"time":1614265500,"close":232.83},{"time":1614265800,"close":232.77},{"time":1614266100,"close":233.08},{"time":1614266400,"close":233.24},{"time":1614266700,"close":232.7},{"time":1614267000,"close":232.57},{"time":1614267300,"close":232.18},{"time":1614267600,"close":232.06},{"time":1614267900,"close":232.27},{"time":1614268200,"close":232.74},{"time":1614268500,"close":233.07},{"time":1614268800,"close":233.01},{"time":1614269100,"close":233.78},{"time":1614269400,"close":233.71},{"time":1614269700,"close":233.71},{"time":1614270000,"close":232.78},{"time":1614270300,"close":232.24},{"time":1614270600,"close":232.3},{"time":1614270900,"close":232.03},{"time":1614271200,"close":231.75},{"time":1614271500,"close":231.36},{"time":1614271800,"close":231.25},{"time":1614272100,"close":230.57},{"time":1614272400,"close":230.62},{"time":1614272700,"close":230.74},{"time":1614273000,"close":231.06},{"time":1614273300,"close":230.48},{"time":1614273600,"close":230.27},{"time":1614273900,"close":230.01},{"time":1614274200,"close":229.96},{"time":1614274500,"close":230.39},{"time":1614274800,"close":230.03},{"time":1614275100,"close":229.71},{"time":1614275400,"close":229.58},{"time":1614275700,"close":229.49},{"time":1614276000,"close":229.95},{"time":1614276300,"close":230.61},{"time":1614276600,"close":230.44},{"time":1614276900,"close":230.62},{"time":1614277200,"close":230.31},{"time":1614277500,"close":230.37},{"time":1614277800,"close":230.135},{"time":1614278100,"close":230.41},{"time":1614278400,"close":230.26},{"time":1614278700,"close":230.24},{"time":1614279000,"close":230.2},{"time":1614279300,"close":230.58},{"time":1614279600,"close":231.19},{"time":1614279900,"close":231.56},{"time":1614280200,"close":231.7},{"time":1614280500,"close":231.695},{"time":1614280800,"close":232.04},{"time":1614281100,"close":232.01},{"time":1614281400,"close":231.55},{"time":1614281700,"close":231.04},{"time":1614282000,"close":230.95},{"time":1614282300,"close":230.75},{"time":1614282600,"close":230.325},{"time":1614282900,"close":230.1},{"time":1614283200,"close":229.993},{"time":1614283500,"close":229.52},{"time":1614283800,"close":229.24},{"time":1614284100,"close":229.07},{"time":1614284400,"close":228.86},{"time":1614284700,"close":228.9},{"time":1614285000,"close":228.61},{"time":1614285300,"close":228.38},{"time":1614285600,"close":229.13},{"time":1614285900,"close":230.18},{"time":1614286200,"close":229.66},{"time":1614286500,"close":228.99},{"time":1614288300,"close":228.99},{"time":1614349800,"close":232.02},{"time":1614350100,"close":232.67},{"time":1614350400,"close":231.98},{"time":1614350700,"close":231.25},{"time":1614351000,"close":230.53},{"time":1614351300,"close":231.16},{"time":1614351600,"close":231.54},{"time":1614351900,"close":230.855},{"time":1614352200,"close":231.38},{"time":1614352500,"close":231.49},{"time":1614352800,"close":231.2},{"time":1614353100,"close":229.955},{"time":1614353400,"close":229.84},{"time":1614353700,"close":231.315},{"time":1614354000,"close":232.2},{"time":1614354300,"close":232.815},{"time":1614354600,"close":233.06},{"time":1614354900,"close":233.13},{"time":1614355200,"close":233.34},{"time":1614355500,"close":232.97},{"time":1614355800,"close":232.31},{"time":1614356100,"close":232.09},{"time":1614356400,"close":231.67},{"time":1614356700,"close":231.73},{"time":1614357000,"close":232.77},{"time":1614357300,"close":233.31},{"time":1614357600,"close":233.39},{"time":1614357900,"close":233.54},{"time":1614358200,"close":233.53},{"time":1614358500,"close":233.47},{"time":1614358800,"close":233.17},{"time":1614359100,"close":234.18},{"time":1614359400,"close":234.58},{"time":1614359700,"close":235.16},{"time":1614360000,"close":235.03},{"time":1614360300,"close":234.719},{"time":1614360600,"close":234.66},{"time":1614360900,"close":234.17},{"time":1614361200,"close":234.3},{"time":1614361500,"close":234.06},{"time":1614361800,"close":234.35},{"time":1614362100,"close":233.97},{"time":1614362400,"close":233.52},{"time":1614362700,"close":234.05},{"time":1614363000,"close":234.0},{"time":1614363300,"close":234.14},{"time":1614363600,"close":234.86},{"time":1614363900,"close":235.131},{"time":1614364200,"close":234.68},{"time":1614364500,"close":234.11},{"time":1614364800,"close":234.17},{"time":1614365100,"close":233.59},{"time":1614365400,"close":233.15},{"time":1614365700,"close":233.24},{"time":1614366000,"close":232.94},{"time":1614366300,"close":233.02},{"time":1614366600,"close":233.36},{"time":1614366900,"close":232.93},{"time":1614367200,"close":233.13},{"time":1614367500,"close":233.41},{"time":1614367800,"close":234.02},{"time":1614368100,"close":233.86},{"time":1614368400,"close":233.7},{"time":1614368700,"close":234.15},{"time":1614369000,"close":234.07},{"time":1614369300,"close":233.98},{"time":1614369600,"close":234.52},{"time":1614369900,"close":235.03},{"time":1614370200,"close":234.75},{"time":1614370500,"close":234.77},{"time":1614370800,"close":234.27},{"time":1614371100,"close":233.38},{"time":1614371400,"close":233.28},{"time":1614371700,"close":233.4},{"time":1614372000,"close":234.18},{"time":1614372300,"close":235.05},{"time":1614372600,"close":233.17},{"time":1614372900,"close":232.38}],"low":"228.38","high":"235.16","hasVolume":false,"security":{"ticker":"MSFT:US","open":"231.53","prevClose":"233.27"}},"BOREO:FH":{"first":1614153600,"last":1614357300,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1614154200,"close":31.4},{"time":1614154500,"close":31.4},{"time":1614155400,"close":30.4},{"time":1614157500,"close":30.4},{"time":1614159900,"close":30.4},{"time":1614160200,"close":31.4},{"time":1614160500,"close":30.6},{"time":1614166200,"close":31.0},{"time":1614169200,"close":31.4},{"time":1614171600,"close":31.0},{"time":1614173100,"close":31.6},{"time":1614174300,"close":31.4},{"time":1614175500,"close":31.4},{"time":1614179400,"close":30.6},{"time":1614180000,"close":30.6},{"time":1614180300,"close":30.6},{"time":1614183000,"close":31.2},{"time":1614183900,"close":30.4},{"time":1614240000,"close":31.2},{"time":1614244500,"close":31.2},{"time":1614263700,"close":31.0},{"time":1614268800,"close":30.2},{"time":1614269700,"close":30.2},{"time":1614270000,"close":31.2},{"time":1614270300,"close":31.2},{"time":1614326400,"close":31.0},{"time":1614327900,"close":30.4},{"time":1614330000,"close":31.0},{"time":1614330600,"close":30.8},{"time":1614331200,"close":30.8},{"time":1614336300,"close":30.6},{"time":1614337200,"close":30.6},{"time":1614340200,"close":30.2},{"time":1614343800,"close":30.6},{"time":1614346500,"close":30.2},{"time":1614353400,"close":30.4},{"time":1614354300,"close":30.2},{"time":1614355200,"close":31.2},{"time":1614356700,"close":31.2}],"low":"30.2","high":"31.6","hasVolume":false,"security":{"ticker":"BOREO:FH","open":"31.0","prevClose":"31.4"}},"SSH1V:FH":{"first":1614153600,"last":1614357300,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1614153600,"close":2.6},{"time":1614153900,"close":2.62},{"time":1614154500,"close":2.64},{"time":1614154800,"close":2.64},{"time":1614155100,"close":2.65},{"time":1614155400,"close":2.65},{"time":1614156000,"close":2.65},{"time":1614156600,"close":2.65},{"time":1614157200,"close":2.65},{"time":1614157500,"close":2.7},{"time":1614158100,"close":2.65},{"time":1614158700,"close":2.65},{"time":1614159000,"close":2.61},{"time":1614159600,"close":2.61},{"time":1614160200,"close":2.61},{"time":1614161400,"close":2.64},{"time":1614161700,"close":2.61},{"time":1614163800,"close":2.61},{"time":1614164700,"close":2.64},{"time":1614165900,"close":2.65},{"time":1614166500,"close":2.69},{"time":1614166800,"close":2.67},{"time":1614168000,"close":2.68},{"time":1614168600,"close":2.68},{"time":1614169200,"close":2.64},{"time":1614169500,"close":2.61},{"time":1614170700,"close":2.67},{"time":1614171300,"close":2.67},{"time":1614171900,"close":2.69},{"time":1614172800,"close":2.69},{"time":1614173400,"close":2.69},{"time":1614173700,"close":2.69},{"time":1614174300,"close":2.69},{"time":1614174600,"close":2.7},{"time":1614175200,"close":2.7},{"time":1614175500,"close":2.69},{"time":1614175800,"close":2.68},{"time":1614176400,"close":2.68},{"time":1614177000,"close":2.68},{"time":1614177300,"close":2.68},{"time":1614178200,"close":2.68},{"time":1614178500,"close":2.67},{"time":1614178800,"close":2.7},{"time":1614180300,"close":2.61},{"time":1614181800,"close":2.7},{"time":1614182100,"close":2.64},{"time":1614182400,"close":2.7},{"time":1614183000,"close":2.64},{"time":1614183900,"close":2.69},{"time":1614240000,"close":2.7},{"time":1614240600,"close":2.7},{"time":1614240900,"close":2.69},{"time":1614242400,"close":2.67},{"time":1614243300,"close":2.7},{"time":1614243600,"close":2.75},{"time":1614244200,"close":2.75},{"time":1614244500,"close":2.77},{"time":1614244800,"close":2.75},{"time":1614245400,"close":2.75},{"time":1614245700,"close":2.75},{"time":1614246300,"close":2.71},{"time":1614248400,"close":2.75},{"time":1614249300,"close":2.75},{"time":1614251400,"close":2.71},{"time":1614252000,"close":2.7},{"time":1614253500,"close":2.7},{"time":1614253800,"close":2.68},{"time":1614254100,"close":2.73},{"time":1614255000,"close":2.68},{"time":1614256500,"close":2.7},{"time":1614257700,"close":2.68},{"time":1614258900,"close":2.67},{"time":1614259200,"close":2.7},{"time":1614260700,"close":2.68},{"time":1614261000,"close":2.7},{"time":1614261600,"close":2.7},{"time":1614261900,"close":2.67},{"time":1614262200,"close":2.65},{"time":1614264300,"close":2.65},{"time":1614264900,"close":2.68},{"time":1614266100,"close":2.68},{"time":1614266400,"close":2.65},{"time":1614269700,"close":2.65},{"time":1614270000,"close":2.64},{"time":1614270300,"close":2.64},{"time":1614326400,"close":2.6},{"time":1614326700,"close":2.55},{"time":1614327000,"close":2.55},{"time":1614327900,"close":2.6},{"time":1614328200,"close":2.57},{"time":1614329700,"close":2.51},{"time":1614330000,"close":2.52},{"time":1614330300,"close":2.56},{"time":1614331500,"close":2.56},{"time":1614332100,"close":2.53},{"time":1614332400,"close":2.57},{"time":1614332700,"close":2.57},{"time":1614333000,"close":2.56},{"time":1614334800,"close":2.56},{"time":1614335400,"close":2.56},{"time":1614335700,"close":2.56},{"time":1614337200,"close":2.56},{"time":1614337500,"close":2.56},{"time":1614339900,"close":2.55},{"time":1614340200,"close":2.53},{"time":1614340500,"close":2.52},{"time":1614341100,"close":2.54},{"time":1614341400,"close":2.54},{"time":1614341700,"close":2.53},{"time":1614342300,"close":2.52},{"time":1614342600,"close":2.52},{"time":1614342900,"close":2.52},{"time":1614343500,"close":2.52},{"time":1614343800,"close":2.53},{"time":1614345000,"close":2.53},{"time":1614346200,"close":2.53},{"time":1614346800,"close":2.53},{"time":1614347100,"close":2.52},{"time":1614347400,"close":2.52},{"time":1614348300,"close":2.54},{"time":1614348900,"close":2.54},{"time":1614349800,"close":2.54},{"time":1614350700,"close":2.54},{"time":1614353700,"close":2.55},{"time":1614354600,"close":2.55},{"time":1614354900,"close":2.54},{"time":1614356100,"close":2.52},{"time":1614356400,"close":2.52},{"time":1614356700,"close":2.5}],"low":"2.5","high":"2.77","hasVolume":false,"security":{"ticker":"SSH1V:FH","open":"2.60","prevClose":"2.60"}},"TSLA:US":{"first":1614177000,"last":1614373200,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1614177000,"close":719.4},{"time":1614177300,"close":712.54},{"time":1614177600,"close":705.22},{"time":1614177900,"close":715.605},{"time":1614178200,"close":711.25},{"time":1614178500,"close":709.61},{"time":1614178800,"close":701.0},{"time":1614179100,"close":699.89},{"time":1614179400,"close":700.71},{"time":1614179700,"close":706.13},{"time":1614180000,"close":711.81},{"time":1614180300,"close":710.885},{"time":1614180600,"close":713.75},{"time":1614180900,"close":711.835},{"time":1614181200,"close":712.87},{"time":1614181500,"close":709.5},{"time":1614181800,"close":712.72},{"time":1614182100,"close":717.91},{"time":1614182400,"close":725.185},{"time":1614182700,"close":726.609},{"time":1614183000,"close":730.51},{"time":1614183300,"close":731.78},{"time":1614183600,"close":728.8},{"time":1614183900,"close":727.0},{"time":1614184200,"close":729.158},{"time":1614184500,"close":729.43},{"time":1614184800,"close":725.62},{"time":1614185100,"close":729.614},{"time":1614185400,"close":726.88},{"time":1614185700,"close":727.665},{"time":1614186000,"close":731.788},{"time":1614186300,"close":732.82},{"time":1614186600,"close":734.71},{"time":1614186900,"close":731.98},{"time":1614187200,"close":733.241},{"time":1614187500,"close":736.79},{"time":1614187800,"close":736.19},{"time":1614188100,"close":736.4},{"time":1614188400,"close":733.72},{"time":1614188700,"close":732.535},{"time":1614189000,"close":731.1},{"time":1614189300,"close":730.06},{"time":1614189600,"close":727.4},{"time":1614189900,"close":728.15},{"time":1614190200,"close":728.93},{"time":1614190500,"close":729.989},{"time":1614190800,"close":728.29},{"time":1614191100,"close":731.792},{"time":1614191400,"close":732.96},{"time":1614191700,"close":731.755},{"time":1614192000,"close":733.5},{"time":1614192300,"close":729.415},{"time":1614192600,"close":727.81},{"time":1614192900,"close":725.52},{"time":1614193200,"close":725.74},{"time":1614193500,"close":723.59},{"time":1614193800,"close":722.826},{"time":1614194100,"close":726.705},{"time":1614194400,"close":724.278},{"time":1614194700,"close":727.205},{"time":1614195000,"close":728.29},{"time":1614195300,"close":728.628},{"time":1614195600,"close":728.801},{"time":1614195900,"close":726.05},{"time":1614196200,"close":725.96},{"time":1614196500,"close":725.666},{"time":1614196800,"close":726.6},{"time":1614197100,"close":727.88},{"time":1614197400,"close":731.69},{"time":1614197700,"close":731.5},{"time":1614198000,"close":733.2},{"time":1614198300,"close":736.4},{"time":1614198600,"close":738.48},{"time":1614198900,"close":738.185},{"time":1614199200,"close":736.67},{"time":1614199500,"close":736.82},{"time":1614199800,"close":743.39},{"time":1614200100,"close":742.02},{"time":1614201900,"close":742.02},{"time":1614263400,"close":727.483},{"time":1614263700,"close":732.86},{"time":1614264000,"close":729.99},{"time":1614264300,"close":729.8},{"time":1614264600,"close":728.4},{"time":1614264900,"close":723.112},{"time":1614265200,"close":721.948},{"time":1614265500,"close":722.91},{"time":1614265800,"close":721.12},{"time":1614266100,"close":724.589},{"time":1614266400,"close":725.68},{"time":1614266700,"close":720.0},{"time":1614267000,"close":719.505},{"time":1614267300,"close":716.67},{"time":1614267600,"close":715.97},{"time":1614267900,"close":712.963},{"time":1614268200,"close":711.85},{"time":1614268500,"close":714.745},{"time":1614268800,"close":715.07},{"time":1614269100,"close":717.76},{"time":1614269400,"close":715.95},{"time":1614269700,"close":717.24},{"time":1614270000,"close":715.35},{"time":1614270300,"close":714.6},{"time":1614270600,"close":714.401},{"time":1614270900,"close":710.97},{"time":1614271200,"close":707.128},{"time":1614271500,"close":702.477},{"time":1614271800,"close":707.12},{"time":1614272100,"close":701.0},{"time":1614272400,"close":702.961},{"time":1614272700,"close":703.125},{"time":1614273000,"close":703.7},{"time":1614273300,"close":702.525},{"time":1614273600,"close":703.36},{"time":1614273900,"close":690.235},{"time":1614274200,"close":693.075},{"time":1614274500,"close":697.04},{"time":1614274800,"close":693.85},{"time":1614275100,"close":692.21},{"time":1614275400,"close":686.29},{"time":1614275700,"close":685.738},{"time":1614276000,"close":691.43},{"time":1614276300,"close":697.695},{"time":1614276600,"close":701.27},{"time":1614276900,"close":702.04},{"time":1614277200,"close":703.195},{"time":1614277500,"close":701.87},{"time":1614277800,"close":696.43},{"time":1614278100,"close":702.083},{"time":1614278400,"close":703.38},{"time":1614278700,"close":702.51},{"time":1614279000,"close":698.32},{"time":1614279300,"close":699.55},{"time":1614279600,"close":703.45},{"time":1614279900,"close":703.096},{"time":1614280200,"close":702.768},{"time":1614280500,"close":702.45},{"time":1614280800,"close":701.81},{"time":1614281100,"close":701.88},{"time":1614281400,"close":699.22},{"time":1614281700,"close":696.89},{"time":1614282000,"close":695.64},{"time":1614282300,"close":695.875},{"time":1614282600,"close":694.34},{"time":1614282900,"close":690.91},{"time":1614283200,"close":689.06},{"time":1614283500,"close":683.18},{"time":1614283800,"close":682.45},{"time":1614284100,"close":685.0},{"time":1614284400,"close":681.99},{"time":1614284700,"close":683.455},{"time":1614285000,"close":678.13},{"time":1614285300,"close":674.63},{"time":1614285600,"close":682.5},{"time":1614285900,"close":686.645},{"time":1614286200,"close":683.06},{"time":1614286500,"close":682.22},{"time":1614288300,"close":682.22},{"time":1614349800,"close":698.795},{"time":1614350100,"close":697.283},{"time":1614350400,"close":694.35},{"time":1614350700,"close":688.64},{"time":1614351000,"close":679.24},{"time":1614351300,"close":671.995},{"time":1614351600,"close":673.971},{"time":1614351900,"close":661.87},{"time":1614352200,"close":668.77},{"time":1614352500,"close":672.645},{"time":1614352800,"close":669.89},{"time":1614353100,"close":660.76},{"time":1614353400,"close":664.26},{"time":1614353700,"close":674.56},{"time":1614354000,"close":676.435},{"time":1614354300,"close":678.39},{"time":1614354600,"close":681.175},{"time":1614354900,"close":683.808},{"time":1614355200,"close":686.51},{"time":1614355500,"close":687.66},{"time":1614355800,"close":683.22},{"time":1614356100,"close":681.11},{"time":1614356400,"close":679.25},{"time":1614356700,"close":682.735},{"time":1614357000,"close":690.85},{"time":1614357300,"close":692.42},{"time":1614357600,"close":689.27},{"time":1614357900,"close":690.59},{"time":1614358200,"close":686.685},{"time":1614358500,"close":689.57},{"time":1614358800,"close":690.565},{"time":1614359100,"close":693.675},{"time":1614359400,"close":694.39},{"time":1614359700,"close":693.218},{"time":1614360000,"close":691.9},{"time":1614360300,"close":688.68},{"time":1614360600,"close":688.25},{"time":1614360900,"close":685.99},{"time":1614361200,"close":683.141},{"time":1614361500,"close":684.0},{"time":1614361800,"close":683.648},{"time":1614362100,"close":679.77},{"time":1614362400,"close":678.51},{"time":1614362700,"close":680.69},{"time":1614363000,"close":678.2},{"time":1614363300,"close":680.985},{"time":1614363600,"close":682.97},{"time":1614363900,"close":683.0},{"time":1614364200,"close":678.52},{"time":1614364500,"close":676.199},{"time":1614364800,"close":679.5},{"time":1614365100,"close":676.51},{"time":1614365400,"close":674.76},{"time":1614365700,"close":675.14},{"time":1614366000,"close":675.05},{"time":1614366300,"close":672.79},{"time":1614366600,"close":675.85},{"time":1614366900,"close":672.54},{"time":1614367200,"close":673.13},{"time":1614367500,"close":678.07},{"time":1614367800,"close":682.1},{"time":1614368100,"close":680.85},{"time":1614368400,"close":679.02},{"time":1614368700,"close":681.51},{"time":1614369000,"close":681.0},{"time":1614369300,"close":681.0},{"time":1614369600,"close":683.76},{"time":1614369900,"close":686.65},{"time":1614370200,"close":683.68},{"time":1614370500,"close":685.25},{"time":1614370800,"close":681.12},{"time":1614371100,"close":678.44},{"time":1614371400,"close":679.78},{"time":1614371700,"close":680.701},{"time":1614372000,"close":683.83},{"time":1614372300,"close":687.12},{"time":1614372600,"close":678.9},{"time":1614372900,"close":675.5}],"low":"660.76","high":"743.39","hasVolume":false,"security":{"ticker":"TSLA:US","open":"700.00","prevClose":"698.84"}},"LI:US":{"first":1614177000,"last":1614373200,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1614177000,"close":27.0},{"time":1614177300,"close":26.89},{"time":1614177600,"close":27.0154},{"time":1614177900,"close":27.18},{"time":1614178200,"close":26.83},{"time":1614178500,"close":26.8},{"time":1614178800,"close":26.44},{"time":1614179100,"close":26.2478},{"time":1614179400,"close":26.315},{"time":1614179700,"close":26.42},{"time":1614180000,"close":26.6},{"time":1614180300,"close":26.7},{"time":1614180600,"close":26.9099},{"time":1614180900,"close":26.95},{"time":1614181200,"close":26.9942},{"time":1614181500,"close":26.99},{"time":1614181800,"close":27.19},{"time":1614182100,"close":27.4589},{"time":1614182400,"close":27.75},{"time":1614182700,"close":27.685},{"time":1614183000,"close":28.085},{"time":1614183300,"close":27.9958},{"time":1614183600,"close":27.97},{"time":1614183900,"close":27.9601},{"time":1614184200,"close":28.0},{"time":1614184500,"close":27.985},{"time":1614184800,"close":27.74},{"time":1614185100,"close":27.985},{"time":1614185400,"close":27.985},{"time":1614185700,"close":28.0},{"time":1614186000,"close":27.98},{"time":1614186300,"close":27.89},{"time":1614186600,"close":27.9189},{"time":1614186900,"close":27.817},{"time":1614187200,"close":27.83},{"time":1614187500,"close":27.9},{"time":1614187800,"close":27.87},{"time":1614188100,"close":27.9056},{"time":1614188400,"close":27.88},{"time":1614188700,"close":27.975},{"time":1614189000,"close":28.1689},{"time":1614189300,"close":28.0111},{"time":1614189600,"close":27.83},{"time":1614189900,"close":27.855},{"time":1614190200,"close":28.0},{"time":1614190500,"close":27.99},{"time":1614190800,"close":27.88},{"time":1614191100,"close":27.78},{"time":1614191400,"close":27.76},{"time":1614191700,"close":27.6501},{"time":1614192000,"close":27.69},{"time":1614192300,"close":27.75},{"time":1614192600,"close":27.9},{"time":1614192900,"close":27.77},{"time":1614193200,"close":27.865},{"time":1614193500,"close":27.86},{"time":1614193800,"close":27.7056},{"time":1614194100,"close":27.9401},{"time":1614194400,"close":27.9111},{"time":1614194700,"close":27.94},{"time":1614195000,"close":27.83},{"time":1614195300,"close":27.88},{"time":1614195600,"close":27.857},{"time":1614195900,"close":27.935},{"time":1614196200,"close":28.03},{"time":1614196500,"close":27.96},{"time":1614196800,"close":28.01},{"time":1614197100,"close":28.01},{"time":1614197400,"close":28.09},{"time":1614197700,"close":28.185},{"time":1614198000,"close":28.32},{"time":1614198300,"close":28.555},{"time":1614198600,"close":28.81},{"time":1614198900,"close":28.705},{"time":1614199200,"close":28.59},{"time":1614199500,"close":28.73},{"time":1614199800,"close":28.805},{"time":1614200100,"close":28.68},{"time":1614201900,"close":28.68},{"time":1614263400,"close":28.29},{"time":1614263700,"close":28.76},{"time":1614264000,"close":28.41},{"time":1614264300,"close":27.9465},{"time":1614264600,"close":27.8277},{"time":1614264900,"close":27.75},{"time":1614265200,"close":27.8},{"time":1614265500,"close":27.845},{"time":1614265800,"close":27.71},{"time":1614266100,"close":27.98},{"time":1614266400,"close":27.8901},{"time":1614266700,"close":27.965},{"time":1614267000,"close":27.72},{"time":1614267300,"close":27.1442},{"time":1614267600,"close":26.87},{"time":1614267900,"close":26.75},{"time":1614268200,"close":26.75},{"time":1614268500,"close":26.93},{"time":1614268800,"close":26.92},{"time":1614269100,"close":26.9},{"time":1614269400,"close":26.6799},{"time":1614269700,"close":26.73},{"time":1614270000,"close":26.6},{"time":1614270300,"close":26.6126},{"time":1614270600,"close":26.49},{"time":1614270900,"close":26.3422},{"time":1614271200,"close":26.46},{"time":1614271500,"close":26.25},{"time":1614271800,"close":26.47},{"time":1614272100,"close":26.21},{"time":1614272400,"close":26.15},{"time":1614272700,"close":26.22},{"time":1614273000,"close":26.16},{"time":1614273300,"close":26.22},{"time":1614273600,"close":26.275},{"time":1614273900,"close":25.87},{"time":1614274200,"close":25.8501},{"time":1614274500,"close":25.9025},{"time":1614274800,"close":25.84},{"time":1614275100,"close":25.6546},{"time":1614275400,"close":25.39},{"time":1614275700,"close":25.18},{"time":1614276000,"close":25.485},{"time":1614276300,"close":25.625},{"time":1614276600,"close":25.7047},{"time":1614276900,"close":25.6692},{"time":1614277200,"close":25.69},{"time":1614277500,"close":25.54},{"time":1614277800,"close":25.419},{"time":1614278100,"close":25.53},{"time":1614278400,"close":25.74},{"time":1614278700,"close":25.65},{"time":1614279000,"close":25.5901},{"time":1614279300,"close":25.65},{"time":1614279600,"close":25.995},{"time":1614279900,"close":26.15},{"time":1614280200,"close":26.18},{"time":1614280500,"close":26.28},{"time":1614280800,"close":26.5862},{"time":1614281100,"close":26.77},{"time":1614281400,"close":26.75},{"time":1614281700,"close":26.548},{"time":1614282000,"close":26.68},{"time":1614282300,"close":26.4999},{"time":1614282600,"close":26.41},{"time":1614282900,"close":26.2211},{"time":1614283200,"close":25.97},{"time":1614283500,"close":26.02},{"time":1614283800,"close":25.91},{"time":1614284100,"close":25.87},{"time":1614284400,"close":25.79},{"time":1614284700,"close":25.72},{"time":1614285000,"close":25.77},{"time":1614285300,"close":25.53},{"time":1614285600,"close":25.6501},{"time":1614285900,"close":25.9701},{"time":1614286200,"close":25.84},{"time":1614286500,"close":25.87},{"time":1614288300,"close":25.87},{"time":1614349800,"close":26.26},{"time":1614350100,"close":26.06},{"time":1614350400,"close":26.17},{"time":1614350700,"close":25.83},{"time":1614351000,"close":25.5889},{"time":1614351300,"close":25.4567},{"time":1614351600,"close":25.15},{"time":1614351900,"close":24.98},{"time":1614352200,"close":25.03},{"time":1614352500,"close":24.92},{"time":1614352800,"close":24.89},{"time":1614353100,"close":24.63},{"time":1614353400,"close":24.675},{"time":1614353700,"close":24.93},{"time":1614354000,"close":25.03},{"time":1614354300,"close":25.18},{"time":1614354600,"close":25.34},{"time":1614354900,"close":25.38},{"time":1614355200,"close":25.69},{"time":1614355500,"close":25.71},{"time":1614355800,"close":25.39},{"time":1614356100,"close":25.32},{"time":1614356400,"close":25.49},{"time":1614356700,"close":25.68},{"time":1614357000,"close":26.0},{"time":1614357300,"close":25.955},{"time":1614357600,"close":25.98},{"time":1614357900,"close":25.945},{"time":1614358200,"close":25.865},{"time":1614358500,"close":25.9599},{"time":1614358800,"close":25.96},{"time":1614359100,"close":26.0},{"time":1614359400,"close":25.94},{"time":1614359700,"close":25.98},{"time":1614360000,"close":25.86},{"time":1614360300,"close":25.75},{"time":1614360600,"close":25.7922},{"time":1614360900,"close":25.74},{"time":1614361200,"close":25.73},{"time":1614361500,"close":25.72},{"time":1614361800,"close":25.8},{"time":1614362100,"close":25.61},{"time":1614362400,"close":25.54},{"time":1614362700,"close":25.62},{"time":1614363000,"close":25.48},{"time":1614363300,"close":25.59},{"time":1614363600,"close":25.61},{"time":1614363900,"close":25.61},{"time":1614364200,"close":25.5001},{"time":1614364500,"close":25.5},{"time":1614364800,"close":25.56},{"time":1614365100,"close":25.494},{"time":1614365400,"close":25.33},{"time":1614365700,"close":25.3708},{"time":1614366000,"close":25.35},{"time":1614366300,"close":25.315},{"time":1614366600,"close":25.36},{"time":1614366900,"close":25.21},{"time":1614367200,"close":25.17},{"time":1614367500,"close":25.23},{"time":1614367800,"close":25.48},{"time":1614368100,"close":25.53},{"time":1614368400,"close":25.48},{"time":1614368700,"close":25.5611},{"time":1614369000,"close":25.49},{"time":1614369300,"close":25.44},{"time":1614369600,"close":25.55},{"time":1614369900,"close":25.6},{"time":1614370200,"close":25.55},{"time":1614370500,"close":25.52},{"time":1614370800,"close":25.42},{"time":1614371100,"close":25.415},{"time":1614371400,"close":25.5111},{"time":1614371700,"close":25.57},{"time":1614372000,"close":25.625},{"time":1614372300,"close":25.71},{"time":1614372600,"close":25.47},{"time":1614372900,"close":25.37}],"low":"24.63","high":"28.81","hasVolume":false,"security":{"ticker":"LI:US","open":"26.34","prevClose":"26.99"}},"NIO:US":{"first":1614177000,"last":1614373200,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1614177000,"close":50.5},{"time":1614177300,"close":49.96},{"time":1614177600,"close":48.874},{"time":1614177900,"close":50.09},{"time":1614178200,"close":49.44},{"time":1614178500,"close":49.42},{"time":1614178800,"close":48.71},{"time":1614179100,"close":48.4339},{"time":1614179400,"close":48.24},{"time":1614179700,"close":48.7068},{"time":1614180000,"close":49.0301},{"time":1614180300,"close":49.3899},{"time":1614180600,"close":49.42},{"time":1614180900,"close":49.2399},{"time":1614181200,"close":49.11},{"time":1614181500,"close":48.97},{"time":1614181800,"close":49.21},{"time":1614182100,"close":49.675},{"time":1614182400,"close":50.18},{"time":1614182700,"close":50.4392},{"time":1614183000,"close":50.56},{"time":1614183300,"close":50.613},{"time":1614183600,"close":50.65},{"time":1614183900,"close":50.61},{"time":1614184200,"close":50.875},{"time":1614184500,"close":50.8516},{"time":1614184800,"close":50.55},{"time":1614185100,"close":51.3},{"time":1614185400,"close":51.2},{"time":1614185700,"close":51.23},{"time":1614186000,"close":51.66},{"time":1614186300,"close":51.6112},{"time":1614186600,"close":51.67},{"time":1614186900,"close":51.43},{"time":1614187200,"close":51.4799},{"time":1614187500,"close":51.8301},{"time":1614187800,"close":51.69},{"time":1614188100,"close":51.745},{"time":1614188400,"close":51.5372},{"time":1614188700,"close":51.38},{"time":1614189000,"close":51.33},{"time":1614189300,"close":50.99},{"time":1614189600,"close":50.7101},{"time":1614189900,"close":51.0496},{"time":1614190200,"close":51.32},{"time":1614190500,"close":51.4},{"time":1614190800,"close":51.2898},{"time":1614191100,"close":51.236},{"time":1614191400,"close":51.11},{"time":1614191700,"close":51.1099},{"time":1614192000,"close":51.08},{"time":1614192300,"close":50.86},{"time":1614192600,"close":50.9201},{"time":1614192900,"close":50.77},{"time":1614193200,"close":50.5896},{"time":1614193500,"close":50.43},{"time":1614193800,"close":50.37},{"time":1614194100,"close":50.83},{"time":1614194400,"close":50.7216},{"time":1614194700,"close":50.76},{"time":1614195000,"close":50.8401},{"time":1614195300,"close":50.9031},{"time":1614195600,"close":50.7985},{"time":1614195900,"close":50.57},{"time":1614196200,"close":50.8316},{"time":1614196500,"close":50.845},{"time":1614196800,"close":50.845},{"time":1614197100,"close":50.81},{"time":1614197400,"close":51.1132},{"time":1614197700,"close":51.005},{"time":1614198000,"close":51.02},{"time":1614198300,"close":51.3},{"time":1614198600,"close":51.4279},{"time":1614198900,"close":51.595},{"time":1614199200,"close":51.4},{"time":1614199500,"close":51.535},{"time":1614199800,"close":51.995},{"time":1614200100,"close":51.8501},{"time":1614200400,"close":51.86},{"time":1614200700,"close":51.86},{"time":1614201300,"close":51.86},{"time":1614263400,"close":51.0299},{"time":1614263700,"close":50.96},{"time":1614264000,"close":50.95},{"time":1614264300,"close":50.29},{"time":1614264600,"close":50.15},{"time":1614264900,"close":49.934},{"time":1614265200,"close":50.055},{"time":1614265500,"close":50.095},{"time":1614265800,"close":49.89},{"time":1614266100,"close":50.26},{"time":1614266400,"close":50.0099},{"time":1614266700,"close":49.7531},{"time":1614267000,"close":49.71},{"time":1614267300,"close":49.33},{"time":1614267600,"close":49.34},{"time":1614267900,"close":49.0},{"time":1614268200,"close":49.0599},{"time":1614268500,"close":49.275},{"time":1614268800,"close":49.535},{"time":1614269100,"close":49.69},{"time":1614269400,"close":49.48},{"time":1614269700,"close":49.61},{"time":1614270000,"close":49.59},{"time":1614270300,"close":49.56},{"time":1614270600,"close":49.3},{"time":1614270900,"close":48.99},{"time":1614271200,"close":48.83},{"time":1614271500,"close":48.67},{"time":1614271800,"close":49.065},{"time":1614272100,"close":48.735},{"time":1614272400,"close":48.83},{"time":1614272700,"close":48.69},{"time":1614273000,"close":48.77},{"time":1614273300,"close":48.83},{"time":1614273600,"close":48.929},{"time":1614273900,"close":48.2896},{"time":1614274200,"close":48.239},{"time":1614274500,"close":48.33},{"time":1614274800,"close":48.13},{"time":1614275100,"close":47.9999},{"time":1614275400,"close":47.52},{"time":1614275700,"close":46.8797},{"time":1614276000,"close":47.64},{"time":1614276300,"close":48.09},{"time":1614276600,"close":48.255},{"time":1614276900,"close":48.2656},{"time":1614277200,"close":48.24},{"time":1614277500,"close":48.06},{"time":1614277800,"close":47.73},{"time":1614278100,"close":48.09},{"time":1614278400,"close":48.08},{"time":1614278700,"close":47.98},{"time":1614279000,"close":47.48},{"time":1614279300,"close":47.5},{"time":1614279600,"close":47.81},{"time":1614279900,"close":48.06},{"time":1614280200,"close":48.0361},{"time":1614280500,"close":48.2469},{"time":1614280800,"close":48.245},{"time":1614281100,"close":48.3044},{"time":1614281400,"close":47.95},{"time":1614281700,"close":47.8},{"time":1614282000,"close":47.86},{"time":1614282300,"close":47.9},{"time":1614282600,"close":47.6769},{"time":1614282900,"close":47.49},{"time":1614283200,"close":47.095},{"time":1614283500,"close":47.0201},{"time":1614283800,"close":47.03},{"time":1614284100,"close":46.9899},{"time":1614284400,"close":46.93},{"time":1614284700,"close":46.65},{"time":1614285000,"close":46.5001},{"time":1614285300,"close":46.43},{"time":1614285600,"close":46.6322},{"time":1614285900,"close":46.9},{"time":1614286200,"close":46.77},{"time":1614286500,"close":46.81},{"time":1614286800,"close":46.81},{"time":1614287100,"close":46.81},{"time":1614287700,"close":46.81},{"time":1614349800,"close":47.1073},{"time":1614350100,"close":46.91},{"time":1614350400,"close":47.6541},{"time":1614350700,"close":46.97},{"time":1614351000,"close":45.87},{"time":1614351300,"close":45.62},{"time":1614351600,"close":45.32},{"time":1614351900,"close":44.64},{"time":1614352200,"close":45.2},{"time":1614352500,"close":45.19},{"time":1614352800,"close":45.23},{"time":1614353100,"close":44.8101},{"time":1614353400,"close":45.0831},{"time":1614353700,"close":45.66},{"time":1614354000,"close":45.95},{"time":1614354300,"close":46.09},{"time":1614354600,"close":46.43},{"time":1614354900,"close":46.54},{"time":1614355200,"close":46.68},{"time":1614355500,"close":47.04},{"time":1614355800,"close":46.79},{"time":1614356100,"close":46.5124},{"time":1614356400,"close":46.59},{"time":1614356700,"close":47.15},{"time":1614357000,"close":47.765},{"time":1614357300,"close":47.601},{"time":1614357600,"close":47.24},{"time":1614357900,"close":47.4},{"time":1614358200,"close":47.22},{"time":1614358500,"close":47.5314},{"time":1614358800,"close":47.65},{"time":1614359100,"close":47.84},{"time":1614359400,"close":47.78},{"time":1614359700,"close":47.76},{"time":1614360000,"close":47.545},{"time":1614360300,"close":47.38},{"time":1614360600,"close":47.2},{"time":1614360900,"close":47.06},{"time":1614361200,"close":46.7362},{"time":1614361500,"close":46.5},{"time":1614361800,"close":46.81},{"time":1614362100,"close":46.575},{"time":1614362400,"close":46.35},{"time":1614362700,"close":46.75},{"time":1614363000,"close":46.56},{"time":1614363300,"close":46.84},{"time":1614363600,"close":47.1},{"time":1614363900,"close":46.8201},{"time":1614364200,"close":46.49},{"time":1614364500,"close":46.47},{"time":1614364800,"close":46.66},{"time":1614365100,"close":46.4199},{"time":1614365400,"close":46.201},{"time":1614365700,"close":46.12},{"time":1614366000,"close":46.2601},{"time":1614366300,"close":46.27},{"time":1614366600,"close":46.45},{"time":1614366900,"close":46.13},{"time":1614367200,"close":46.1198},{"time":1614367500,"close":46.4},{"time":1614367800,"close":46.769},{"time":1614368100,"close":46.52},{"time":1614368400,"close":46.47},{"time":1614368700,"close":46.56},{"time":1614369000,"close":46.56},{"time":1614369300,"close":46.67},{"time":1614369600,"close":46.94},{"time":1614369900,"close":47.14},{"time":1614370200,"close":46.84},{"time":1614370500,"close":46.975},{"time":1614370800,"close":46.696},{"time":1614371100,"close":46.566},{"time":1614371400,"close":46.7186},{"time":1614371700,"close":46.925},{"time":1614372000,"close":47.015},{"time":1614372300,"close":47.06},{"time":1614372600,"close":46.79},{"time":1614372900,"close":46.705}],"low":"44.64","high":"51.995","hasVolume":false,"security":{"ticker":"NIO:US","open":"47.00","prevClose":"49.11"}}}};

var api_currency = 'https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,EUR';
var api_stock = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-compact?id=';
var api_history5y = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart?&interval=y5&id='
var api_history3d = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart?&interval=d3&id='

var rate, usd, eur;
var buys = [];
var sells = [];
var includeSales = true;
var currency = {
    async: false,
    url: api_currency,
    method: 'GET'
};

var totalLiquid = 0;
var totalInvested = 0;
var totalReturns = 0;

var interestsContainer = '.interests';
refreshInterval = 1000 * 60 * 60 * refreshInterval;


if(mockData == true) refreshInterval = 15000;
if(mockData && consoleOutput) console.log('Using refresh interval of 15 seconds.')
if(mockData) consoleOutput = true;
if(mockData && consoleOutput){ console.log('!!! USING MOCK DATA !!!'); console.log('MOCKED STOCK TRADE EVENTS:', mockStocks); console.log('MOCKED 5 YEAR TICKS', mockTrends5y); console.log('MOCKED 3 DAY TICKS', mockTrends3d); }

if(veryCompact) compactFollows = true;

// Work around Dropbox CORS headers
if(tradeEventsTxt.indexOf('www.dropbox.com') > -1){
    tradeEventsTxt = tradeEventsTxt.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('dl=0', 'raw=1').replace('dl=1', 'raw=1');
}

$.ajax(currency).done(function (response) {
    if(consoleOutput) console.log('Currency rate:', response);
    eur = response.rates.EUR
});

function toEur(usdAmount) {
    return usdAmount * eur;
}

function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
}

function addRows(detailsList, element=container){
    if(consoleOutput) console.log('ADD ROWS', element, detailsList);
    detailsList.forEach(function(details, i){
        var symbol = details.symbol.split(':')[0];
        var id = symbol;
        var tpl = element==container ? $('.template').html() : $('.interests-template').html();
        tpl = tpl.replace('STOCK', symbol);
        $(container).append(tpl);
        if(details.price){

            var withReturns = details.currentTotal + (details.salesTotal - details.purchasesTotal);
            if(withReturns==0) withReturns = details.currentTotal;
            var salesReturn = details.salesTotal - details.purchasesTotal;
            if(salesReturn < 0) salesReturn = 0;

            $('#'+id).attr('data-first-price', details.price); 
            $('#'+id).attr('data-type', 'trade');
            $('#'+id).addClass('trade');
            $('#'+id).attr('data-date', details.date);
            $('#'+id).attr('data-pcs', details.pcs);
            $('#'+id).attr('data-purchases-total', details.purchasesTotal.toFixed(2));
            $('#'+id).attr('data-purchases-pcs', details.purchasesPcs);
            $('#'+id).attr('data-sales-total', details.salesTotal.toFixed(2));
            $('#'+id).attr('data-sales-pcs', details.salesPcs);
            $('#'+id).attr('data-current-total', details.currentTotal.toFixed(2));

            $('#'+id).attr('data-balance', details.balance.toFixed(2));
            $('#'+id).attr('data-return', salesReturn.toFixed(2));

            $('#'+id).find('.date').html(details.date);
            $('#'+id).find('.pcs').html(details.price +' &times; <span class="highlight pcnr">'+details.pcs)+'</span>';
            $('#'+id).find('.invested').html(details.currentTotal.toFixed(2));
            $('#'+id).find('.invested-after-sales').html(details.balance.toFixed(2));
            paintReverse($('#'+id).find('.invested-after-sales'));
        }

        if(!details.price)          $('#'+id).attr('data-type', 'interest');
    });
}

function filterList(arr){

    var arrDetails = [];
    arr.forEach(function(line, i){
        var itm = line.split(';');
        if(itm.length > 1){
            var market = itm[0].trim().split(':')[1];
            var details = {
                symbol: itm[0].trim(),
                type: 'trade',
                date: itm[1].trim(),
                pcs: Number(itm[2].trim()),
                price: Number(itm[3].trim()),
                currency: 'EUR',
                purchasesTotal: Number(itm[2]) * Number(itm[3].trim()),
                purchasesPcs: Number(itm[2].trim()),
                salesTotal: 0,
                salesPcs: 0,
                salesReturn: 0,
                currentTotal: Number(itm[2]) * Number(itm[3].trim()),
                balance: Number(itm[2]) * Number(itm[3].trim()),
            };
            var addIt = true;
            arrDetails.forEach(function(bw, i){
                if(bw.symbol == details.symbol){
                    arrDetails[i].pcs += details.pcs;
                    arrDetails[i].purchasesPcs += details.purchasesPcs;
                    arrDetails[i].purchasesTotal += details.purchasesTotal;
                    arrDetails[i].currentTotal += details.currentTotal;
                    arrDetails[i].balance += details.balance;
                    if(effectiveDate=='last'){
                        arrDetails[i].date = details.date;
                    }
                    addIt = false;
                }
            });
            if(addIt){
                arrDetails.push(details);
            }
        }
    });
    return arrDetails;
}

function parseStocks(data){
    totalLiquid = 0;
    totalInvested = 0;
    var events = data.split(/\n\s*\n/);

    var buys = events[0].split('\n').filter(function(line){return line.indexOf('#') != 0});
    if(consoleOutput) console.log('BUYS', buys);

    var sells = [];
    if(events[1]) sells = events[1].split('\n').filter(function(line){return line.indexOf('#') != 0});
    if(consoleOutput) console.log('SELLS', sells);

    var buyDetails = filterList(buys);
    var sellDetails = filterList(sells);

    var finalList = [];
    buyDetails.forEach(function(buy, i){
        finalList.push(buy);
        sellDetails.forEach(function(sell, ii){
            if(buy.symbol == sell.symbol){
                finalList[i].pcs -= sell.pcs;
                finalList[i].salesTotal += sell.pcs * sell.price;
                finalList[i].salesPcs += sell.pcs;
                finalList[i].currentTotal -= sell.pcs * buy.price;
                finalList[i].balance -= sell.pcs * sell.price;
            }
        });
    });

    if(consoleOutput) console.log('Calculate investments & cashouts before API calls.');
    finalList.forEach(function(stock, i){
        totalInvested += stock.pcs * stock.price;
        if(includeCashouts == true && stock.pcs == 0){
            totalLiquid += stock.balance * -1;
        }
        if((includeCashouts == false || showCashouts == false) && stock.pcs == 0 && mockData == false){
            if(consoleOutput) console.log('Remove cashed out stock', i, stock);
            delete finalList[i];
        }
    });
    finalList = finalList.filter(function (el) {return el != null;});

    if(consoleOutput) console.log('Total INVESTED:', totalInvested);
    if(consoleOutput) console.log('Total CASHED OUT:', totalLiquid);

    return finalList;
}

function parseInterests(data){
    var events = data.split(/\n\s*\n/);
    var intersts = [];
    if(events[2]) interests = events[2].split('\n').filter(function(line){return line.indexOf('#') != 0}); if(consoleOutput) console.log('LOOKOUT', interests);
    var ntArr = [];
    interests.forEach(function(item, i){
        var details = {
            symbol: item.trim(),
            type: 'interest'
        };
        ntArr.push(details);
    });
    return ntArr;
}

function initProcess(){
    $(container).html('').hide();
    $(interestsContainer).html('').hide();
    if(mockData){
        var finalList = parseStocks(mockEvents);
        addRows(finalList);
        if(showFollows == true){
            var interestsList = parseInterests(mockEvents);
            $(container).append('<div class="hr large"></div>');
            addRows(interestsList, interestsContainer);
            finalList = finalList.concat(interestsList);
        }
        parseBuys(finalList);
    } else {
        $.get({
            url: tradeEventsTxt + '?' + new Date().getTime(),
            async: false,
            success: function(data) {
                if(consoleOutput || printToCopy) console.log('\x1b[35mRAW DATA (copy this to mock):', data.replaceAll(" ", "").replaceAll("\n", '\\n'));

                var finalList = parseStocks(data);
                if(consoleOutput) console.log('ALL handled trade events:', finalList);
                addRows(finalList);

                if(showFollows == true){
                    var interestsList = parseInterests(data);
                    if(consoleOutput) console.log('All handled lookouts', interestsList);
                    $(container).append('<div class="hr large"></div>');
                    addRows(interestsList, interestsContainer);
                    finalList = finalList.concat(interestsList);
                }

                parseBuys(finalList);
            }
        });
    }
}

function processInterests(data){
    $.each(data, function(i, stock) {
        if(consoleOutput) console.log('->', i, stock);
        $('#'+id).find('.name').html(name);
        $('#'+id).find('.symbol').html(symbol);
        $('#'+id).find('.exchange').html(exchange);
    });
}

function processStocks(data){
    $.each(data, function(i, stock) {

        if(consoleOutput) console.log('->', i, stock);

        var currency = stock.currency;
        var price = Number(stock.last);
        var symbol = stock.symbol;
        var name = stock.name;
        var exchange = stock.exchange;
        var id = symbol;
        var paidBack = false;
        var cashedOut = false;
        var vic = 0;
        var vicEur = 0;
        var vicPer = 0;

        var type = $('#'+id).data('type');

        // Convert USD to EUR
        if(currency == 'USD') price = toEur(price);
        $('#'+id).attr('data-currency', currency);

        // UI
        $('#'+id).find('.name').html(name);
        $('#'+id).find('.symbol').html(symbol);
        $('#'+id).find('.exchange').html(exchange);

        if( type == 'trade'){

            // Calculate things
            var pcs =  Number($('#'+id).data('pcs'));
            // var purchaseTotal = Number($('#'+id).data('invested'));
            var purchaseTotal = Number($('#'+id).data('current-total'));
            var perPc = purchaseTotal/pcs;
            var marketTotal = price*pcs;
            var marketTotalWithSales = marketTotal + Number($('#'+id).data('balance'));
            var diff = marketTotal-purchaseTotal;
            var percent = diff/purchaseTotal*100;
            var salesPL = Number($('#'+id).data('sales-total')) - Number($('#'+id).data('purchases-total'));
            
            if(Number($('#'+id).data('invested-after-sales')) <= 0){
                paidBack = true;
                $('#'+id).addClass('paid-back');
                vicEur = Number($('#'+id).data('sales-total')) - Number($('#'+id).data('purchases-total'));
                vicPer = vicEur/Number($('#'+id).data('purchases-total'))*100;
            }
            if(Number($('#'+id).data('pcs')) == 0){
                cashedOut = true;
                $('#'+id).addClass('cashed-out');
                vicEur = Number($('#'+id).data('sales-total')) - Number($('#'+id).data('purchases-total'));
                vicPer = vicEur/Number($('#'+id).data('purchases-total'))*100;
            }

            // First market price column
            $('#'+id).find('.market').attr('data-percent-amount', percent.toFixed(2)).attr('data-eur-amount', diff.toFixed(2));
            $('#'+id).find('.market .price.percent').html(percent.toFixed(2));
            $('#'+id).find('.market .price.eur').html(diff.toFixed(2));
            paint($('#'+id).find('.market .price'), marketTotal, purchaseTotal);

            // Second market price column
            $('#'+id).find('.percents').attr('data-purchase-total', purchaseTotal).attr('data-percent-amount', percent.toFixed(2)).attr('data-eur-amount', marketTotal.toFixed(2));
            $('#'+id).find('.percents .percent').html(percent.toFixed(2));
            $('#'+id).find('.percents .eur').html(marketTotal.toFixed(2));
            paint($('#'+id).find('.percents'), percent);

        }

        if( type == 'interest'){
            var pcs = 1;
            $('#'+id).find('.purchase .price.eur').removeClass('hidden').html(Number(price).toFixed(2));
        }

        // Show stuff
        if( showSymbol && !veryCompact ){ $('#'+id).find('.symbol').removeClass('hidden'); }
        if( showName ){ $('#'+id).find('.name').removeClass('hidden'); }
        if( showExchange && !veryCompact ){ $('#'+id).find('.exchange').removeClass('hidden'); }
        if( showDate && !veryCompact ){ $('#'+id).find('.meta .date').removeClass('hidden'); }
        if( showQuantity && !veryCompact ){ $('#'+id).find('.purchase .pcs').removeClass('hidden permahidden').addClass('permashow'); }
        if( showPrice && !cashedOut ){ $('#'+id).find('.purchase .invested').removeClass('hidden'); }
        if( showChangeEur ){ $('#'+id).find('.market .price.eur').removeClass('hidden'); }
        if( showPercent ){ $('#'+id).find('.percents .percent').removeClass('hidden'); }
        if( veryCompact ){ $('#'+id).addClass('very-compact'); }
        if( cashedOut) { 
            $('#'+id).find('.purchase, .market, .percents, .trend').remove(); 
            $('#'+id).find('.nostocks').html('0').removeClass('hidden'); 
            $('#'+id).append('<div class="cashoutd"><div class="ceur">'+vicEur.toFixed(2)+'</div><div class="cpercent hidden">'+vicPer.toFixed(2)+'</div></div>')
            paint($('#'+id).find('.cashoutd .ceur, .cashoutd .cpercent'));
        }
        if( type=='interest' && compactFollows ){
            $('#'+id).addClass('compact');
            $('#'+id).find('.exchange').addClass('hidden');
            $('#'+id).find('.prices').addClass('hidden');
        }
    
        if( truncateTo > 0){
            // var name = $('#'+id).find('.name').html();
            if(name.indexOf(' ') > -1){
                name = name.split(' ')[0];
            }
            if(name.length <= truncateTo+3){
                trunced = name
            } else {
                trunced = truncateString(name, truncateTo);
            }
            $('#'+id).find('.name').html(trunced);
        }
    });
    calcTotals();
}

function paint(el, comp, base){
    comp = (typeof comp !== 'undefined') ? comp : Number(el.html().trim());
    base = (typeof base !== 'undefined') ? base : 0.00;
    if(comp > base){
        el.removeClass('neg').addClass('pos');
    } else if (comp < base){
        el.removeClass('pos').addClass('neg');
    }
}

function paintReverse(el, comp, base){
    comp = (typeof comp !== 'undefined') ? comp : el.html().trim();
    base = (typeof base !== 'undefined') ? base : 0.00;
    if(comp < base){
        el.removeClass('neg').addClass('pos');
    } else if (comp > base){
        el.removeClass('pos').addClass('neg');
    }
}

function makeChart(id, chartData, interval, i, firstPrice, type, begin, highest, lowest){
    var bgc = 'rgba(255,255,255,1)';
    var tickSettings;
    if(type=='interest' && syncScale){
        tickSettings = {
            display: false,
            beginAtZero: begin,
            suggestedMax: highest,
            suggestedMin: lowest,
        };
    } else {
        tickSettings = {
            display: false,
            beginAtZero: begin,
        };
    }

    chartData.forEach(function(chart, i){

        var trds = chart;
        Chart.defaults.global.defaultFontSize = 10;
        Chart.defaults.global.elements.point.pointStyle = 'rectRot';
        Chart.defaults.global.elements.point.radius = 2;
        
        Chart.defaults.global.elements.point.borderColor = 'rbga(0,0,0,0)';
        Chart.defaults.global.elements.point.borderWidth = 0;
        Chart.defaults.global.elements.line.borderWidth = 1;
        Chart.defaults.global.legend.display = false;

        if (chartGen) chartGen.destroy();

        $('#'+id).find('.charts.x'+interval+i).empty().append('<canvas id="'+id+interval+i+'" data-high="'+highest+'" data-low="'+lowest+'" data-hline="'+firstPrice+'"></canvas>');
        var ctx = document.getElementById(id+interval+i).getContext('2d');

        var chartGen = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trds,
                datasets: [{
                    data: trds,
                    backgroundColor: 'transparent',
                    borderColor: clBs,
                    pointBorderWidth: 0,
                    pointBorderColor: 'rgba(0,0,0,0)',
                    pointBackgroundColor: function(ctx) {
                        var index = ctx.dataIndex;
                        var value = ctx.dataset.data[index];
                        var neg = false;
                        if( ctx.dataset.data[index-1] && value < ctx.dataset.data[index-1] ){
                            neg = true;
                        }
                        if(colorDownhillTicks && type == 'trade'){
                            return neg || value < firstPrice ? clNg : clPs;
                        }
                        if(type == 'interest'){
                            return neg ? clNg : clPs;
                        }
                        return value < firstPrice ? clNg : clPs;
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: false
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false,
                            tickMarkLength: 0
                        },
                        ticks: tickSettings
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: false
                        },
                        gridLines: {
                            display: false,
                            tickMarkLength: 0
                        },
                        ticks: {
                            display: false
                        }
                    }]
                },
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: firstPrice,
                        borderColor: clBs,
                        borderWidth: .5,
                        label: {
                            enabled: false,
                        }
                    }],
                    drawTime: "afterDraw"
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }

        });

        if(type == 'interest') $('#'+id).find('.charts.x'+interval+i).removeClass('hidden');

    });
}

const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

function processTrends(data, interval){

    if(consoleOutput) console.log('PROCESS', interval, 'CHART DATA:', data);

    $.each(data, function(i, stock) {

        if(consoleOutput) console.log('->', i, stock);

        var id = i.split(':')[0];
        var last = stock.ticks.length;
        var latest = stock.ticks[last-1].close;
        var highest = Number(stock.high);
        var lowest = Number(stock.low);
        var ocurLatest = latest;
        var currency = $('#'+id).data('currency');

        if( $('.interest #'+id+'5y0').length ){
            var oldHigh = Number($('#'+id+'5y0').data('high'));
            var oldLow = Number($('#'+id+'5y0').data('low'));
            if( oldHigh > highest){
                highest = oldHigh;
            }
            if( oldLow < lowest){
                lowest = oldLow;
            }
        }

        var type = $('#'+id).data('type');
        var purchaseDate = $('#'+id).data('date');
        var firstPrice = $('#'+id).data('first-price');
        var now3dago = moment().subtract(3, 'days').unix();

        if(consoleOutput) console.log('Collect', interval, 'chart data for', id);

        if(interval == '3d'){

            var charts = [];
            charts = [now3dago];
            var chartData = [];
            $.each(charts, function(){
                chartData.push([]);
            });
            $.each(stock.ticks, function(i, tick){
                if(tick.time > charts[0] && ((type == 'interest') || (type == 'trade' && i % nth === 0))){
                    if(currency == 'USD' && type=='trade'){
                        chartData[0].push(toEur(tick.close));
                    } else {
                        chartData[0].push( tick.close );
                    }
                }
            });

            var close3daysAgo = stock.ticks[last-4].close;
            var close2daysAgo = stock.ticks[last-3].close;
            var closeYesterday = stock.ticks[last-2].close;
            d3e = close2daysAgo - close3daysAgo;
            d2e = closeYesterday - close2daysAgo;
            d1e = latest - closeYesterday;
            d3p = (1 - close3daysAgo/close2daysAgo) * 100;
            d2p = (1 - close2daysAgo/closeYesterday) * 100;
            d1p = (1 - closeYesterday/latest) * 100;
            if(mockData && mockAlarm && id=='MSFT'){
                d1p = -4;
                d2p = -5;
                d3p = -6;
            }
            $('#'+id).find('.trend .eur .d1').html(d1e.toFixed(2));
            $('#'+id).find('.trend .eur .d2').html(d2e.toFixed(2));
            $('#'+id).find('.trend .eur .d3').html(d3e.toFixed(2));
            $('#'+id).find('.trend .percent .d1').html(d1p.toFixed(2));
            $('#'+id).find('.trend .percent .d2').html(d2p.toFixed(2));
            $('#'+id).find('.trend .percent .d3').html(d3p.toFixed(2));
            paint($('#'+id).find('.trend .d1'), d1p);
            paint($('#'+id).find('.trend .d2'), d2p);
            paint($('#'+id).find('.trend .d3'), d3p);
            if(d1p < alarmLimit && d2p < alarmLimit && d3p < alarmLimit){
                $('#'+id).addClass('alarm');
            }

        } else {

            charts = type == 'trade' ? [moment(purchaseDate).unix()] : [moment().subtract(yearsBack, 'y').unix()];
            var chartData = [];
            $.each(charts, function(){
                chartData.push([]);
            });
            $.each(stock.ticks, function(i, tick){
                if(tick.time >= charts[0] && (type=='trade' || (type=='interest' && tick.time < moment().subtract(7, 'd').unix() ) ) ){
                    chartData[0].push( tick.close );
                }
            });

            if(type=='interest'){
                var m3val = chartData[0][chartData[0].length - 12];
                var m1val = chartData[0][chartData[0].length - 4];
                var w1val = chartData[0][chartData[0].length - 1];
                var m3changeCustom = (latest - m3val) / m3val * 100;
                var m1changeCustom = (latest - m1val) / m1val * 100;
                var w1changeCustom = (latest - w1val) / w1val * 100;
                $('#'+id).find('.m3change').html(m3changeCustom.toFixed(2));
                $('#'+id).find('.m1change').html(m1changeCustom.toFixed(2));
                $('#'+id).find('.w1change').html(w1changeCustom.toFixed(2));
                paint($('#'+id).find('.m3change'));
                paint($('#'+id).find('.m1change'));
                paint($('#'+id).find('.w1change'));

                var mediani = median(chartData[0]);
                $('#'+id).find('.purchase .price.eur').append('<br><span class="dim xs">'+mediani.toFixed(2)+'</span>');
            }
        }

        if(generateCharts && ($('#'+id).find('.trend').length || type == 'interest')){
            if(consoleOutput) console.log('Create', interval, 'chart for', id);
            var begin = false;
            if(type=='interest') firstPrice = ocurLatest;
            makeChart(id, chartData, interval, i, firstPrice, type, begin, highest, lowest);
        }

    });

    if(interval == '3d'){
        if(show3dHistory && !veryCompact){ $('.trend, .trend > div:first-child').removeClass('hidden'); }
        $('.cashoutd').css('padding-right', $('.stocks .trend:last').width()+'px');
        $(container).show();
        $('.cashoutd').css('padding-right', $('.stocks .trend:last').width()+'px');
        if(showCashouts == false){
            $('.cashed-out').hide();
        }
        setTimeout(function(){
            $(container).show();
            $('.cashoutd').css('padding-right', $('.stocks .trend:last').width()+'px');
        }, 500);
        initClicks();
    }
}


function parseBuys(buys){
    stocks = [];
    buys.forEach(function(buy){
        stocks.push(buy.symbol);
    });

    var size = 10; var stockChunks = [];
    for (var i=0; i<stocks.length; i+=size) {
        stockChunks.push(stocks.slice(i,i+size));
    }
    
    // Get stock info
    stocks = stocks.join(',');
    if(mockData == true){

        if(consoleOutput) console.log('PROCESS STOCKS', mockStocks.result);

        processStocks(mockStocks.result);
        processTrends(mockTrends5y.result, '5y');
        processTrends(mockTrends3d.result, '3d');
        if(consoleOutput) console.log( 'Adjust vertical align', $(container).height(), 'vs.', $(window).height());
        if($(container).height() < $(window).height()) $(container).addClass('vmid');
        if(veryCompact) $('.hr').removeClass('large');
        if(consoleOutput) console.log('ALL DONE. Show page.');
        $('.loader').hide();
        $('.stocks').show();

    } else {

        if(consoleOutput) console.log('Send request to get stock info on', stocks);
        var stockInfo= {
            "async": false,
            "crossDomain": true,
            "url": api_stock+stocks,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": rapidApiKey,
                "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com"
            }
        };
        $.ajax(stockInfo).fail(function(response){
            $('.loader').hide();
            $('.stocks-container .message').html('<div class="err">Bloomberg\'s API responded:</div>'+response.responseJSON.message).show();
        }).done(function (response) {
            if(consoleOutput || printToCopy) console.log('\x1b[35mSTOCK INFO (copy this to mock):', response);
            processStocks(response.result);
        });

        stockChunks.forEach(function(chunk, idx){
            var requestStocks = chunk.join(',');

            // 5y
            if(consoleOutput) console.log('Send request to get 5y price data on', requestStocks);
            var stockTrends = {
                "async": false,
                "crossDomain": true,
                "url": api_history5y+requestStocks,
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": rapidApiKey,
                    "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com"
                }
            };
            $.ajax(stockTrends).fail(function(response){
                $('.loader').hide();
                $('.stocks-container .message').html('<div class="err">Bloomberg\'s API responded:</div>'+response.responseJSON.message).show();
            }).done(function(response) {
                if(consoleOutput || printToCopy) console.log('\x1b[35m5 YEAR TICKS (copy to mock):', response);
                processTrends(response.result, '5y');
            });

            // 3d
            if(consoleOutput) console.log('Send request to get 3d price data on', requestStocks);
            var stockTrends2 = {
                "async": false,
                "crossDomain": true,
                "url": api_history3d+requestStocks,
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": rapidApiKey,
                    "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com"
                }
            };
            $.ajax(stockTrends2).fail(function(response){
                $('.loader').hide();
                $('.stocks-container .message').html('<div class="err">Bloomberg\'s API responded:</div>'+response.responseJSON.message).show();
            }).done(function(response) {
                if(consoleOutput || printToCopy) console.log('\x1b[35m3 DAY TICKS (copy to mock):', response);
                processTrends(response.result, '3d');

                if (idx === stockChunks.length - 1){ 
                    if(consoleOutput) console.log( 'Adjust vertical align', $(container).height(), 'vs.', $(window).height());
                    if($(container).height() < $(window).height()) $(container).addClass('vmid');
                    if(veryCompact) $('.hr').removeClass('large');
                    if(consoleOutput) console.log('ALL DONE. Show page.');
                    $('.loader').hide();
                    $('.stocks').show();
                }
            });

        });

    }
}

function calcTotals(){

    var sold = 0;
    $('.trade').each(function(){
        sold += Number($(this).data('return'));
    });
    
    var xpurchaseTotal = totalInvested;
    var liquidationsTotal = totalLiquid + sold;
    // var liquidationsTotal = sold;
    var xmarketDiff = 0;

    console.log('Sales returns total:', liquidationsTotal);

    $('.market .price.eur').each(function(){
        xmarketDiff += Number($(this).html());
    });

    var xpercentageTotal = xmarketDiff/xpurchaseTotal*100;
    var xmarketTotal = xpurchaseTotal+xmarketDiff;
    var totalWithLiquidations = xmarketTotal+liquidationsTotal;
    var xmarketDiffWithSales = xmarketDiff+liquidationsTotal;
    var xpurchaseTotalWithSales = xpurchaseTotal-liquidationsTotal;

    if( showTotalsTop == true ){
        if( $(container).find('.tops').length ){
            $(container).find('.tops').remove();
        }
        $(container).prepend('<div class="tops values"><div class="paid"><div class="eur"></div><div class="eur-excl-sales hidden"></div></div><div class="difference"><div class="eur"></div><div class="eur-with-sales hidden"></div><div class="percent hidden"></div></div><div class="pvalue"><div class="value hidden"></div><div class="value-with-liquid hidden"></div><div class="value-only-liquid hidden"></div></div></div>');
        $('.tops.values .paid .eur').html(xpurchaseTotal.toFixed(2));
        if(xpurchaseTotalWithSales <= 0){
            $('.tops.values .paid .eur-excl-sales').html('0.00');
        } else {
            $('.tops.values .paid .eur-excl-sales').html(xpurchaseTotalWithSales.toFixed(2));
        }
        
        $('.tops.values .difference .eur').html(xmarketDiff.toFixed(2));
        $('.tops.values .difference .eur-with-sales').html(xmarketDiffWithSales.toFixed(2));
        $('.tops.values .difference .percent').html(xpercentageTotal.toFixed(2));

        $('.tops.values .pvalue .value').html(xmarketTotal.toFixed(2)).attr('data-total', xmarketTotal.toFixed(2)).attr('data-with-liquidations', totalWithLiquidations);
        $('.tops.values .pvalue .value-with-liquid').html(totalWithLiquidations.toFixed(2)).attr('data-total', xmarketTotal.toFixed(2)).attr('data-with-liquidations', totalWithLiquidations);
        $('.tops.values .pvalue .value-only-liquid').html(liquidationsTotal.toFixed(2));

        $(container).prepend('<div class="tops titles"><div class="paid">investment total</div><div class="difference">change</div><div class="pvalue"><div class="value hidden">current worth</div><div class="value-with-liquid hidden">value + sales return</div><div class="value-only-liquid hidden">sales return only</div></div></div>');
        paint($('.tops.values .difference .eur, .tops.values .difference .percent, .tops.values .value'), xmarketDiff);
        paint($('.tops.values .difference .eur-with-sales, .tops.values .value-with-liquid, .tops.values .value-only-liquid'));
        paintReverse($('.tops.values .paid .eur-excl-sales'));
    }
    if( showTotalsBottom == true){
        if( $(container).find('.totale').length ){
            $(container).find('.totale').remove();
        }
        $(container).append('<div id="totale" class="base"><div class="stock"></div><div class="purchase"></div><div class="market"></div><div class="percents"></div></div>');
        if(show3dHistory){
            $('#totale').append('<div class="trend"></div>');
        }
        $('#totale .purchase').html(xpurchaseTotal.toFixed(2));
        $('#totale .market').html(xmarketDiff.toFixed(2));
        $('#totale .percents').html(xpercentageTotal.toFixed(2));
        paint($('#totale .market, #totale .percents'), xmarketDiff);
    }
    $('.tops .value').removeClass('hidden');
}

function initClicks(){
    $('.base').click(function(){
        $(this).removeClass('alarm');
    });
    initClickery('.purchase .values');
    initClickery('.market');
    initClickery('.percents');
    initClickery('.tops.values .paid');
    initClickery('.tops.values .difference');
    initClickery('.tops .pvalue');
    initClickery('.cashoutd');
    initClickery('.trend');
    $('.tops.values .paid').click(function(){
        if($(this).find('.eur-excl-sales').is(':visible')){
            $('.tops.titles .paid').html('investment - sales');
        } else {
            $('.tops.titles .paid').html('investment total');
        }
    });
    $('.tops.values .difference').click(function(){
        if($(this).find('.eur-with-sales').is(':visible')){
            $('.tops.titles .difference').html('change + sales');
        } else {
            $('.tops.titles .difference').html('change');
        }
    });
}

function initClickery(el){
    $(el).on('click', function(e){
        cycleVisibility($(el));
    });
}

function cycleVisibility(el){
    var el = $(el);
    var curr = el.find('> div:not(".hidden")');
    if(curr.is(':last-child')){
        curr.addClass('hidden');
        el.find('> div:first-child').removeClass('hidden');
    } else {
        curr.addClass('hidden');
        curr.next().removeClass('hidden');
    }
}

function checkUrlParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const bg = urlParams.get('bg');
    const zoom = urlParams.get('zoom');
    const brightness = urlParams.get('brightness');
    const cursor = urlParams.get('cursor');
    $('body').css({
        'background': bg,
        'zoom': zoom,
        'filter': 'brightness('+brightness+')',
        'cursor': cursor
    });
}

let refreshWorker = new Worker('autorefresh.js');
$(document).ready(function(){
    if(generateCharts){
        if(defaultChart=='sincePurchase'){
            $('.trend').prepend('<div class="charts x5y0 hidden"></div><div class="charts x3d0 hidden"></div>');
        } else {
            $('.trend').prepend('<div class="charts x3d0 hidden"></div><div class="charts x5y0 hidden"></div>');
        }
    }
    initProcess();
    if(consoleOutput) console.log('Refresh every', refreshInterval);
    refreshWorker.postMessage({refreshInterval, refreshDuring, consoleOutput});
    refreshWorker.onmessage = function(e){
        if(e.data == 'refresh'){
            initProcess();
            if(consoleOutput) console.log('Refreshed at', new Date());
        }
    }
    if(theme=='light'){
        $('body, .stocks').addClass('light');
    } else {
        $('body, .stocks').removeClass('dark');
    }
    if(bgImage==true){
        $('body').prepend('<div class="bgs"></div>');
    }
    if(bgBox==true){
        $('.stocks').addClass('box');
    }

    checkUrlParams();
});
