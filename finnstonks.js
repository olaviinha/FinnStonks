//---------------------------------------------------------------------------------------------
// - GENERAL ----------------------------------------------------------------------------------

// rapidapi.com API key
var rapidApiKey = 'PASTE YOUR RAPIDAPI.COM API KEY HERE';

// Url to your stocks.txt file, in case you want to host it in another location, e.g. Dropbox.
var tradeEventsTxt = 'stocks.txt';

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
var refreshInterval = 24;



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



//---------------------------------------------------------------------------------------------
// - LAYOUT -----------------------------------------------------------------------------------

// Color scheme, etc.
// a) 'light' = darker texts, for light backgrounds
// b) 'dark' = lighter texts, for dark backgrounds
var theme = 'dark';
var bgImage = false;         // Show 'stock-bg.jpg' as page background.
var bgBox = false;           // Show translucent box. May be useful with some background images.
var veryCompact = false;     // Force-hide all secondary information, despite later settings.

// What to show on page
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

var clBs = '#888'; // Base color, ideally same as in CSS
var clPs = '#696'; // Positive color, ideally same as in CSS
var clNg = '#a66'; // Negative color, ideally same as in CSS



//---------------------------------------------------------------------------------------------
// - DEVELOPMENT & DEBUGGING  -----------------------------------------------------------------

var consoleOutput = true;  // Print stuff in browser console. This is always true for mockData.
var mockData = false;       // Use mocked stock trade data, 5y ticks and 3d ticks.
var mockAlarm = false;      // Simulate alarm.



//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//--- END OF SETTINGS -------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

var mockEvents = '#BUYS\nYEINT:FH;2020-06-15;20;14.92\nSSH1V:FH;2020-08-04;121;1.33\nTSLA:US;2020-09-01;5;420.00\nSAA1V:FH;2020-02-12;35;12.85\nMSFT:US;2020-04-20;4;147.49\n\n#SELLS\nYEINT:FH;2020-11-23;8;26.00\nSSH1V:FH;2020-12-11;121;1.74\nTSLA:US;2020-01-28;4;682.21';
var mockStocks = {"result":{"YEINT:FH":{"securityType":"Common Stock","symbol":"YEINT","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"yeint:fh","tickerName":"YEINT:FH","template":"Stock","tinyName":"Yleiselektroniikka Oyj","name":"Yleiselektroniikka Oyj","watchlist":true,"resourceId":"YEINT:FH","last":"31.0","netChange":"0.0","lastPriceTime":1612501200,"pctChange1M":"8.4","yearHigh":"34.0","dayHigh":"31.4","volume":1092.0,"yearLow":"10.3","dayLow":"30.6","pctChangeYTD":"5.4","pctChange":"0.00"},"SSH1V:FH":{"securityType":"Common Stock","symbol":"SSH1V","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"ssh1v:fh","tickerName":"SSH1V:FH","template":"Stock","tinyName":"SSH Communications Security Oyj","name":"SSH Communications Security Oyj","watchlist":true,"resourceId":"SSH1V:FH","last":"2.47","netChange":"-0.02","lastPriceTime":1612542591,"pctChange1M":"47.02","yearHigh":"2.60","dayHigh":"2.49","volume":69311.0,"yearLow":"0.65","dayLow":"2.41","pctChangeYTD":"45.72","pctChange":"-0.80"},"TSLA:US":{"securityType":"Common Stock","symbol":"TSLA","exchange":"NASDAQ GS","country":"United States","currency":"USD","resourceType":"Company","fundamentalDataCurrency":"USD","resourceSubtype":"Public","region":"AMERICAS","ticker":"tsla:us","tickerName":"TSLA:US","template":"Stock","tinyName":"Tesla Inc","name":"Tesla Inc","watchlist":true,"resourceId":"TSLA:US","last":"852.23","netChange":"2.24","lastPriceTime":1612501200,"pctChange1M":"4.43","yearHigh":"900.40","dayHigh":"864.77","volume":18566637,"yearLow":"70.10","dayLow":"838.97","pctChangeYTD":"20.77","lastPriceAllSessions":"853.49","pctChange":"0.26"},"SAA1V:FH":{"securityType":"Common Stock","symbol":"SAA1V","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"saa1v:fh","tickerName":"SAA1V:FH","template":"Stock","tinyName":"Sanoma Oyj","name":"Sanoma Oyj","watchlist":true,"resourceId":"SAA1V:FH","last":"16.50","netChange":"-0.06","lastPriceTime":1612501200,"pctChange1M":"20.61","yearHigh":"16.72","dayHigh":"16.68","volume":68837.0,"yearLow":"6.84","dayLow":"16.42","pctChangeYTD":"20.09","pctChange":"-0.36"},"MSFT:US":{"securityType":"Common Stock","symbol":"MSFT","exchange":"NASDAQ GS","country":"United States","currency":"USD","resourceType":"Company","fundamentalDataCurrency":"USD","resourceSubtype":"Public","region":"AMERICAS","ticker":"msft:us","tickerName":"MSFT:US","template":"Stock","tinyName":"Microsoft Corp","name":"Microsoft Corp","watchlist":true,"resourceId":"MSFT:US","last":"242.20","netChange":"0.19","lastPriceTime":1612501200,"pctChange1M":"10.95","yearHigh":"245.09","dayHigh":"243.28","volume":18054752,"yearLow":"132.52","dayLow":"240.42","pctChangeYTD":"8.89","lastPriceAllSessions":"242.30","pctChange":"0.08"}}};
var mockTrends5y = {"result":{"YEINT:FH":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1455285600,"close":5.9},{"time":1455890400,"close":5.8},{"time":1456495200,"close":5.64},{"time":1457100000,"close":6.04},{"time":1457704800,"close":6.04},{"time":1458306000,"close":6.01},{"time":1458910800,"close":5.9399999999999995},{"time":1459515600,"close":6.05},{"time":1460120400,"close":6.14},{"time":1460725200,"close":5.58},{"time":1461330000,"close":5.84},{"time":1461934800,"close":5.78},{"time":1462539600,"close":5.75},{"time":1463144400,"close":5.51},{"time":1463749200,"close":5.65},{"time":1464354000,"close":5.5},{"time":1464958800,"close":5.29},{"time":1465563600,"close":5.28},{"time":1466168400,"close":5.7},{"time":1466773200,"close":5.48},{"time":1467378000,"close":5.41},{"time":1467982800,"close":5.43},{"time":1468587600,"close":5.8},{"time":1469192400,"close":5.7},{"time":1469797200,"close":5.7},{"time":1470402000,"close":5.8},{"time":1471006800,"close":5.55},{"time":1471611600,"close":5.66},{"time":1472216400,"close":5.75},{"time":1472821200,"close":5.7},{"time":1473426000,"close":5.6},{"time":1474030800,"close":5.7},{"time":1474635600,"close":5.7},{"time":1475240400,"close":5.61},{"time":1475845200,"close":5.6899999999999995},{"time":1476450000,"close":5.62},{"time":1477054800,"close":5.78},{"time":1477659600,"close":5.7},{"time":1478264400,"close":5.75},{"time":1478872800,"close":5.67},{"time":1479477600,"close":5.98},{"time":1480082400,"close":6.05},{"time":1480687200,"close":6.1},{"time":1481292000,"close":5.92},{"time":1481896800,"close":5.98},{"time":1482501600,"close":5.9399999999999995},{"time":1483106400,"close":6.17},{"time":1483711200,"close":6.29},{"time":1484316000,"close":6.05},{"time":1484920800,"close":6.26},{"time":1485525600,"close":6.27},{"time":1486130400,"close":6.4},{"time":1486735200,"close":6.48},{"time":1487340000,"close":6.39},{"time":1487944800,"close":6.2},{"time":1488549600,"close":6.45},{"time":1489154400,"close":6.64},{"time":1489755600,"close":6.75},{"time":1490360400,"close":6.4},{"time":1490965200,"close":6.65},{"time":1491570000,"close":6.8100000000000005},{"time":1492174800,"close":6.61},{"time":1492779600,"close":6.61},{"time":1493384400,"close":6.8100000000000005},{"time":1493989200,"close":6.95},{"time":1494594000,"close":8.08},{"time":1495198800,"close":7.8},{"time":1495803600,"close":7.96},{"time":1496408400,"close":8.55},{"time":1497013200,"close":8.85},{"time":1497618000,"close":8.7},{"time":1498222800,"close":9.0},{"time":1498827600,"close":8.63},{"time":1499432400,"close":8.74},{"time":1500037200,"close":9.09},{"time":1500642000,"close":8.9},{"time":1501246800,"close":8.91},{"time":1501851600,"close":9.5},{"time":1502456400,"close":9.8},{"time":1503061200,"close":9.51},{"time":1503666000,"close":9.27},{"time":1504270800,"close":9.15},{"time":1504875600,"close":8.71},{"time":1505480400,"close":8.9},{"time":1506085200,"close":8.95},{"time":1506690000,"close":8.84},{"time":1507294800,"close":8.58},{"time":1507899600,"close":8.6},{"time":1508504400,"close":8.71},{"time":1509109200,"close":8.75},{"time":1509714000,"close":8.91},{"time":1510322400,"close":8.76},{"time":1510927200,"close":8.2},{"time":1511532000,"close":8.36},{"time":1512136800,"close":8.41},{"time":1512741600,"close":8.42},{"time":1513346400,"close":8.45},{"time":1513951200,"close":8.46},{"time":1514556000,"close":8.6},{"time":1515160800,"close":9.25},{"time":1515765600,"close":9.25},{"time":1516370400,"close":9.25},{"time":1516975200,"close":9.5},{"time":1517580000,"close":9.55},{"time":1518184800,"close":9.15},{"time":1518789600,"close":9.05},{"time":1519394400,"close":8.65},{"time":1519999200,"close":8.55},{"time":1520604000,"close":8.5},{"time":1521205200,"close":8.65},{"time":1521810000,"close":8.65},{"time":1522414800,"close":8.5},{"time":1523019600,"close":8.6},{"time":1523624400,"close":8.3},{"time":1524229200,"close":8.25},{"time":1524834000,"close":8.2},{"time":1525438800,"close":8.15},{"time":1526043600,"close":8.15},{"time":1526648400,"close":8.2},{"time":1527253200,"close":8.2},{"time":1527858000,"close":8.25},{"time":1528462800,"close":8.15},{"time":1529067600,"close":8.0},{"time":1529672400,"close":7.95},{"time":1530277200,"close":8.0},{"time":1530882000,"close":7.8},{"time":1531486800,"close":8.25},{"time":1532091600,"close":8.3},{"time":1532696400,"close":8.25},{"time":1533301200,"close":8.3},{"time":1533906000,"close":8.4},{"time":1534510800,"close":8.05},{"time":1535115600,"close":8.05},{"time":1535720400,"close":8.05},{"time":1536325200,"close":8.0},{"time":1536930000,"close":8.2},{"time":1537534800,"close":8.05},{"time":1538139600,"close":8.25},{"time":1538744400,"close":8.25},{"time":1539349200,"close":8.0},{"time":1539954000,"close":8.2},{"time":1540558800,"close":7.85},{"time":1541163600,"close":8.0},{"time":1541772000,"close":8.25},{"time":1542376800,"close":8.0},{"time":1542981600,"close":7.9},{"time":1543586400,"close":7.9},{"time":1544191200,"close":7.9},{"time":1544796000,"close":8.0},{"time":1545400800,"close":7.8},{"time":1546005600,"close":7.35},{"time":1546610400,"close":7.25},{"time":1547215200,"close":7.5},{"time":1547820000,"close":7.8},{"time":1548424800,"close":7.8},{"time":1549029600,"close":7.8},{"time":1549634400,"close":7.6},{"time":1550239200,"close":8.1},{"time":1550844000,"close":8.0},{"time":1551448800,"close":8.0},{"time":1552053600,"close":8.0},{"time":1552654800,"close":7.95},{"time":1553259600,"close":7.95},{"time":1553864400,"close":7.8},{"time":1554469200,"close":8.1},{"time":1555074000,"close":7.7},{"time":1555678800,"close":7.65},{"time":1556283600,"close":7.75},{"time":1556888400,"close":7.75},{"time":1557493200,"close":7.7},{"time":1558098000,"close":7.75},{"time":1558702800,"close":7.6},{"time":1559307600,"close":7.7},{"time":1559912400,"close":7.6},{"time":1560517200,"close":7.65},{"time":1561122000,"close":8.65},{"time":1561726800,"close":8.7},{"time":1562331600,"close":8.7},{"time":1562936400,"close":8.65},{"time":1563541200,"close":8.65},{"time":1564146000,"close":8.7},{"time":1564750800,"close":8.7},{"time":1565355600,"close":8.7},{"time":1565960400,"close":8.8},{"time":1566565200,"close":8.85},{"time":1567170000,"close":8.7},{"time":1567774800,"close":8.65},{"time":1568379600,"close":8.8},{"time":1568984400,"close":8.7},{"time":1569589200,"close":8.9},{"time":1570194000,"close":9.6},{"time":1570798800,"close":10.0},{"time":1571403600,"close":10.2},{"time":1572008400,"close":10.5},{"time":1572613200,"close":10.0},{"time":1573221600,"close":10.3},{"time":1573826400,"close":12.0},{"time":1574431200,"close":11.2},{"time":1575036000,"close":11.4},{"time":1575640800,"close":10.6},{"time":1576245600,"close":10.7},{"time":1576850400,"close":10.5},{"time":1577455200,"close":10.6},{"time":1578060000,"close":10.6},{"time":1578664800,"close":10.9},{"time":1579269600,"close":10.6},{"time":1579874400,"close":11.3},{"time":1580479200,"close":10.9},{"time":1581084000,"close":14.1},{"time":1581688800,"close":15.4},{"time":1582293600,"close":17.6},{"time":1582898400,"close":14.8},{"time":1583503200,"close":15.5},{"time":1584104400,"close":13.3},{"time":1584709200,"close":11.8},{"time":1585314000,"close":11.7},{"time":1585918800,"close":11.7},{"time":1586523600,"close":14.8},{"time":1587128400,"close":13.2},{"time":1587733200,"close":14.2},{"time":1588338000,"close":15.3},{"time":1588942800,"close":14.8},{"time":1589547600,"close":14.1},{"time":1590152400,"close":14.4},{"time":1590757200,"close":15.3},{"time":1591362000,"close":15.2},{"time":1591966800,"close":15.3},{"time":1592571600,"close":14.9},{"time":1593176400,"close":14.7},{"time":1593781200,"close":14.0},{"time":1594386000,"close":14.6},{"time":1594990800,"close":13.9},{"time":1595595600,"close":14.5},{"time":1596200400,"close":14.7},{"time":1596805200,"close":14.7},{"time":1597410000,"close":14.3},{"time":1598014800,"close":14.5},{"time":1598619600,"close":14.9},{"time":1599224400,"close":17.9},{"time":1599829200,"close":17.3},{"time":1600434000,"close":17.3},{"time":1601038800,"close":16.6},{"time":1601643600,"close":16.8},{"time":1602248400,"close":17.0},{"time":1602853200,"close":17.2},{"time":1603458000,"close":17.3},{"time":1604062800,"close":17.4},{"time":1604671200,"close":18.5},{"time":1605276000,"close":20.4},{"time":1605880800,"close":25.6},{"time":1606485600,"close":33.6},{"time":1607090400,"close":26.4},{"time":1607695200,"close":26.2},{"time":1608300000,"close":28.4},{"time":1608904800,"close":28.6},{"time":1609509600,"close":29.4},{"time":1610114400,"close":28.4},{"time":1610719200,"close":29.0},{"time":1611324000,"close":30.6},{"time":1611928800,"close":29.4},{"time":1612533600,"close":31.0}],"low":"5.28","high":"33.6","first":1455285600,"last":1612533600,"security":{"ticker":"YEINT:FH","open":"31.0","prevClose":"6.15"},"hasVolume":false},"SSH1V:FH":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1455285600,"close":3.55},{"time":1455890400,"close":3.36},{"time":1456495200,"close":3.65},{"time":1457100000,"close":3.8},{"time":1457704800,"close":3.65},{"time":1458306000,"close":3.49},{"time":1458910800,"close":3.52},{"time":1459515600,"close":3.4},{"time":1460120400,"close":3.25},{"time":1460725200,"close":3.2},{"time":1461330000,"close":3.2},{"time":1461934800,"close":3.44},{"time":1462539600,"close":3.23},{"time":1463144400,"close":3.38},{"time":1463749200,"close":3.31},{"time":1464354000,"close":3.33},{"time":1464958800,"close":3.11},{"time":1465563600,"close":2.99},{"time":1466168400,"close":2.7199999999999998},{"time":1466773200,"close":2.92},{"time":1467378000,"close":2.89},{"time":1467982800,"close":3.27},{"time":1468587600,"close":3.13},{"time":1469192400,"close":3.1},{"time":1469797200,"close":3.13},{"time":1470402000,"close":2.99},{"time":1471006800,"close":3.13},{"time":1471611600,"close":3.6},{"time":1472216400,"close":3.74},{"time":1472821200,"close":4.19},{"time":1473426000,"close":4.0},{"time":1474030800,"close":3.82},{"time":1474635600,"close":3.68},{"time":1475240400,"close":3.73},{"time":1475845200,"close":3.55},{"time":1476450000,"close":2.82},{"time":1477054800,"close":2.74},{"time":1477659600,"close":2.36},{"time":1478264400,"close":2.06},{"time":1478872800,"close":2.16},{"time":1479477600,"close":2.07},{"time":1480082400,"close":2.02},{"time":1480687200,"close":2.0},{"time":1481292000,"close":1.92},{"time":1481896800,"close":1.9300000000000002},{"time":1482501600,"close":1.95},{"time":1483106400,"close":1.94},{"time":1483711200,"close":2.49},{"time":1484316000,"close":2.29},{"time":1484920800,"close":2.15},{"time":1485525600,"close":2.12},{"time":1486130400,"close":2.07},{"time":1486735200,"close":2.05},{"time":1487340000,"close":2.2},{"time":1487944800,"close":2.27},{"time":1488549600,"close":2.27},{"time":1489154400,"close":2.27},{"time":1489755600,"close":2.2800000000000002},{"time":1490360400,"close":2.19},{"time":1490965200,"close":2.11},{"time":1491570000,"close":2.1},{"time":1492174800,"close":2.15},{"time":1492779600,"close":1.98},{"time":1493384400,"close":2.02},{"time":1493989200,"close":1.99},{"time":1494594000,"close":2.02},{"time":1495198800,"close":2.26},{"time":1495803600,"close":2.2},{"time":1496408400,"close":2.3},{"time":1497013200,"close":2.21},{"time":1497618000,"close":2.24},{"time":1498222800,"close":2.23},{"time":1498827600,"close":2.2},{"time":1499432400,"close":2.2},{"time":1500037200,"close":2.13},{"time":1500642000,"close":1.98},{"time":1501246800,"close":1.97},{"time":1501851600,"close":1.98},{"time":1502456400,"close":1.99},{"time":1503061200,"close":1.92},{"time":1503666000,"close":1.92},{"time":1504270800,"close":1.95},{"time":1504875600,"close":1.92},{"time":1505480400,"close":1.9300000000000002},{"time":1506085200,"close":1.95},{"time":1506690000,"close":2.02},{"time":1507294800,"close":1.98},{"time":1507899600,"close":1.97},{"time":1508504400,"close":1.9300000000000002},{"time":1509109200,"close":1.87},{"time":1509714000,"close":1.85},{"time":1510322400,"close":1.9},{"time":1510927200,"close":1.85},{"time":1511532000,"close":1.8399999999999999},{"time":1512136800,"close":1.77},{"time":1512741600,"close":1.8599999999999999},{"time":1513346400,"close":1.8199999999999998},{"time":1513951200,"close":1.78},{"time":1514556000,"close":1.77},{"time":1515160800,"close":1.8599999999999999},{"time":1515765600,"close":1.8399999999999999},{"time":1516370400,"close":1.8050000000000002},{"time":1516975200,"close":1.8399999999999999},{"time":1517580000,"close":1.935},{"time":1518184800,"close":2.07},{"time":1518789600,"close":2.08},{"time":1519394400,"close":2.06},{"time":1519999200,"close":2.12},{"time":1520604000,"close":2.18},{"time":1521205200,"close":2.14},{"time":1521810000,"close":2.07},{"time":1522414800,"close":2.1},{"time":1523019600,"close":2.08},{"time":1523624400,"close":2.07},{"time":1524229200,"close":2.2},{"time":1524834000,"close":2.11},{"time":1525438800,"close":2.1},{"time":1526043600,"close":2.08},{"time":1526648400,"close":2.08},{"time":1527253200,"close":2.08},{"time":1527858000,"close":2.06},{"time":1528462800,"close":2.03},{"time":1529067600,"close":2.0},{"time":1529672400,"close":2.17},{"time":1530277200,"close":2.15},{"time":1530882000,"close":2.11},{"time":1531486800,"close":2.12},{"time":1532091600,"close":2.04},{"time":1532696400,"close":2.01},{"time":1533301200,"close":2.04},{"time":1533906000,"close":2.0},{"time":1534510800,"close":1.97},{"time":1535115600,"close":1.975},{"time":1535720400,"close":1.99},{"time":1536325200,"close":1.94},{"time":1536930000,"close":1.95},{"time":1537534800,"close":1.88},{"time":1538139600,"close":1.87},{"time":1538744400,"close":1.83},{"time":1539349200,"close":1.69},{"time":1539954000,"close":1.755},{"time":1540558800,"close":1.615},{"time":1541163600,"close":1.7},{"time":1541772000,"close":1.725},{"time":1542376800,"close":1.795},{"time":1542981600,"close":1.755},{"time":1543586400,"close":1.6800000000000002},{"time":1544191200,"close":1.8199999999999998},{"time":1544796000,"close":1.77},{"time":1545400800,"close":1.7},{"time":1546005600,"close":1.6800000000000002},{"time":1546610400,"close":1.815},{"time":1547215200,"close":1.78},{"time":1547820000,"close":1.7349999999999999},{"time":1548424800,"close":1.73},{"time":1549029600,"close":1.74},{"time":1549634400,"close":1.845},{"time":1550239200,"close":1.71},{"time":1550844000,"close":1.75},{"time":1551448800,"close":1.73},{"time":1552053600,"close":1.6800000000000002},{"time":1552654800,"close":1.3900000000000001},{"time":1553259600,"close":1.34},{"time":1553864400,"close":1.37},{"time":1554469200,"close":1.345},{"time":1555074000,"close":1.37},{"time":1555678800,"close":1.2650000000000001},{"time":1556283600,"close":1.185},{"time":1556888400,"close":1.2},{"time":1557493200,"close":1.17},{"time":1558098000,"close":1.135},{"time":1558702800,"close":1.125},{"time":1559307600,"close":1.1400000000000001},{"time":1559912400,"close":1.4},{"time":1560517200,"close":1.5150000000000001},{"time":1561122000,"close":1.5},{"time":1561726800,"close":1.455},{"time":1562331600,"close":1.46},{"time":1562936400,"close":1.47},{"time":1563541200,"close":1.495},{"time":1564146000,"close":1.45},{"time":1564750800,"close":1.405},{"time":1565355600,"close":1.45},{"time":1565960400,"close":1.3900000000000001},{"time":1566565200,"close":1.435},{"time":1567170000,"close":1.385},{"time":1567774800,"close":1.395},{"time":1568379600,"close":1.3599999999999999},{"time":1568984400,"close":1.37},{"time":1569589200,"close":1.325},{"time":1570194000,"close":1.4},{"time":1570798800,"close":1.375},{"time":1571403600,"close":1.41},{"time":1572008400,"close":1.34},{"time":1572613200,"close":1.28},{"time":1573221600,"close":1.295},{"time":1573826400,"close":1.15},{"time":1574431200,"close":1.13},{"time":1575036000,"close":1.09},{"time":1575640800,"close":1.06},{"time":1576245600,"close":1.0},{"time":1576850400,"close":0.994},{"time":1577455200,"close":0.992},{"time":1578060000,"close":1.18},{"time":1578664800,"close":1.1400000000000001},{"time":1579269600,"close":1.215},{"time":1579874400,"close":1.165},{"time":1580479200,"close":1.15},{"time":1581084000,"close":1.15},{"time":1581688800,"close":1.1},{"time":1582293600,"close":1.065},{"time":1582898400,"close":1.02},{"time":1583503200,"close":0.988},{"time":1584104400,"close":0.738},{"time":1584709200,"close":0.746},{"time":1585314000,"close":0.732},{"time":1585918800,"close":0.802},{"time":1586523600,"close":0.86},{"time":1587128400,"close":0.88},{"time":1587733200,"close":0.9},{"time":1588338000,"close":1.02},{"time":1588942800,"close":1.195},{"time":1589547600,"close":1.335},{"time":1590152400,"close":1.6949999999999998},{"time":1590757200,"close":1.6},{"time":1591362000,"close":1.625},{"time":1591966800,"close":1.55},{"time":1592571600,"close":1.6},{"time":1593176400,"close":1.62},{"time":1593781200,"close":1.51},{"time":1594386000,"close":1.5},{"time":1594990800,"close":1.5699999999999998},{"time":1595595600,"close":1.25},{"time":1596200400,"close":1.2650000000000001},{"time":1596805200,"close":1.22},{"time":1597410000,"close":1.37},{"time":1598014800,"close":1.41},{"time":1598619600,"close":1.4},{"time":1599224400,"close":1.385},{"time":1599829200,"close":1.4},{"time":1600434000,"close":1.475},{"time":1601038800,"close":1.3599999999999999},{"time":1601643600,"close":1.37},{"time":1602248400,"close":1.27},{"time":1602853200,"close":1.3},{"time":1603458000,"close":1.28},{"time":1604062800,"close":1.21},{"time":1604671200,"close":1.2349999999999999},{"time":1605276000,"close":1.26},{"time":1605880800,"close":1.26},{"time":1606485600,"close":1.27},{"time":1607090400,"close":1.275},{"time":1607695200,"close":1.77},{"time":1608300000,"close":1.6400000000000001},{"time":1608904800,"close":1.65},{"time":1609509600,"close":1.6949999999999998},{"time":1610114400,"close":1.7},{"time":1610719200,"close":1.6800000000000002},{"time":1611324000,"close":1.8},{"time":1611928800,"close":2.01},{"time":1612533600,"close":2.4699999999999998}],"low":"0.732","high":"4.19","first":1455285600,"last":1612533600,"security":{"ticker":"SSH1V:FH","open":"2.45","prevClose":"3.96"},"hasVolume":false},"TSLA:US":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1455285600,"close":30.208},{"time":1455890400,"close":33.316},{"time":1456495200,"close":38.068},{"time":1457100000,"close":40.208},{"time":1457704800,"close":41.5},{"time":1458306000,"close":46.548},{"time":1458910800,"close":45.55},{"time":1459515600,"close":47.518},{"time":1460120400,"close":50.014},{"time":1460725200,"close":50.902},{"time":1461330000,"close":50.75},{"time":1461934800,"close":48.152},{"time":1462539600,"close":42.986},{"time":1463144400,"close":41.522},{"time":1463749200,"close":44.056},{"time":1464354000,"close":44.608},{"time":1464958800,"close":43.798},{"time":1465563600,"close":43.758},{"time":1466168400,"close":43.094},{"time":1466773200,"close":38.63},{"time":1467378000,"close":43.3},{"time":1467982800,"close":43.356},{"time":1468587600,"close":44.08},{"time":1469192400,"close":44.454},{"time":1469797200,"close":46.958},{"time":1470402000,"close":46.006},{"time":1471006800,"close":45.122},{"time":1471611600,"close":45.0},{"time":1472216400,"close":43.998},{"time":1472821200,"close":39.556},{"time":1473426000,"close":38.894},{"time":1474030800,"close":41.08},{"time":1474635600,"close":41.49},{"time":1475240400,"close":40.806},{"time":1475845200,"close":39.322},{"time":1476450000,"close":39.302},{"time":1477054800,"close":40.018},{"time":1477659600,"close":39.994},{"time":1478264400,"close":38.112},{"time":1478872800,"close":37.712},{"time":1479477600,"close":37.004},{"time":1480082400,"close":39.33},{"time":1480687200,"close":36.294},{"time":1481292000,"close":38.436},{"time":1481896800,"close":40.498},{"time":1482501600,"close":42.668},{"time":1483106400,"close":42.738},{"time":1483711200,"close":45.802},{"time":1484316000,"close":47.55},{"time":1484920800,"close":48.946},{"time":1485525600,"close":50.59},{"time":1486130400,"close":50.266},{"time":1486735200,"close":53.846},{"time":1487340000,"close":54.446},{"time":1487944800,"close":51.4},{"time":1488549600,"close":50.314},{"time":1489154400,"close":48.738},{"time":1489755600,"close":52.3},{"time":1490360400,"close":52.632},{"time":1490965200,"close":55.66},{"time":1491570000,"close":60.508},{"time":1492174800,"close":60.8},{"time":1492779600,"close":61.12},{"time":1493384400,"close":62.814},{"time":1493989200,"close":61.67},{"time":1494594000,"close":64.962},{"time":1495198800,"close":62.166},{"time":1495803600,"close":65.028},{"time":1496408400,"close":67.97},{"time":1497013200,"close":71.464},{"time":1497618000,"close":74.28},{"time":1498222800,"close":76.69},{"time":1498827600,"close":72.322},{"time":1499432400,"close":62.644},{"time":1500037200,"close":65.556},{"time":1500642000,"close":65.68},{"time":1501246800,"close":67.014},{"time":1501851600,"close":71.382},{"time":1502456400,"close":71.574},{"time":1503061200,"close":69.492},{"time":1503666000,"close":69.61},{"time":1504270800,"close":71.08},{"time":1504875600,"close":68.68},{"time":1505480400,"close":75.962},{"time":1506085200,"close":70.218},{"time":1506690000,"close":68.22},{"time":1507294800,"close":71.376},{"time":1507899600,"close":71.114},{"time":1508504400,"close":69.02},{"time":1509109200,"close":64.174},{"time":1509714000,"close":61.218},{"time":1510322400,"close":60.598},{"time":1510927200,"close":63.01},{"time":1511532000,"close":63.11},{"time":1512136800,"close":61.306},{"time":1512741600,"close":63.026},{"time":1513346400,"close":68.69},{"time":1513951200,"close":65.04},{"time":1514556000,"close":62.27},{"time":1515160800,"close":63.316},{"time":1515765600,"close":67.244},{"time":1516370400,"close":70.004},{"time":1516975200,"close":68.57},{"time":1517580000,"close":68.75},{"time":1518184800,"close":62.084},{"time":1518789600,"close":67.098},{"time":1519394400,"close":70.41},{"time":1519999200,"close":67.024},{"time":1520604000,"close":65.434},{"time":1521205200,"close":64.27},{"time":1521810000,"close":60.308},{"time":1522414800,"close":53.226},{"time":1523019600,"close":59.86},{"time":1523624400,"close":60.068},{"time":1524229200,"close":58.048},{"time":1524834000,"close":58.815},{"time":1525438800,"close":58.818},{"time":1526043600,"close":60.212},{"time":1526648400,"close":55.364},{"time":1527253200,"close":55.77},{"time":1527858000,"close":58.364},{"time":1528462800,"close":63.532},{"time":1529067600,"close":71.634},{"time":1529672400,"close":66.726},{"time":1530277200,"close":68.59},{"time":1530882000,"close":61.78},{"time":1531486800,"close":63.774},{"time":1532091600,"close":62.716},{"time":1532696400,"close":59.436},{"time":1533301200,"close":69.634},{"time":1533906000,"close":71.098},{"time":1534510800,"close":61.1},{"time":1535115600,"close":64.564},{"time":1535720400,"close":60.332},{"time":1536325200,"close":52.648},{"time":1536930000,"close":59.04},{"time":1537534800,"close":59.82},{"time":1538139600,"close":52.954},{"time":1538744400,"close":52.39},{"time":1539349200,"close":51.756},{"time":1539954000,"close":52.0},{"time":1540558800,"close":66.18},{"time":1541163600,"close":69.282},{"time":1541772000,"close":70.102},{"time":1542376800,"close":70.862},{"time":1542981600,"close":65.166},{"time":1543586400,"close":70.096},{"time":1544191200,"close":71.593},{"time":1544796000,"close":73.142},{"time":1545400800,"close":63.954},{"time":1546005600,"close":66.774},{"time":1546610400,"close":63.538},{"time":1547215200,"close":69.452},{"time":1547820000,"close":60.452},{"time":1548424800,"close":59.408},{"time":1549029600,"close":62.442},{"time":1549634400,"close":61.16},{"time":1550239200,"close":61.576},{"time":1550844000,"close":58.942},{"time":1551448800,"close":58.958},{"time":1552053600,"close":56.828},{"time":1552654800,"close":55.086},{"time":1553259600,"close":52.906},{"time":1553864400,"close":55.972},{"time":1554469200,"close":54.992},{"time":1555074000,"close":53.54},{"time":1555678800,"close":54.652},{"time":1556283600,"close":47.028},{"time":1556888400,"close":51.006},{"time":1557493200,"close":47.904},{"time":1558098000,"close":42.206},{"time":1558702800,"close":38.126},{"time":1559307600,"close":37.032},{"time":1559912400,"close":40.9},{"time":1560517200,"close":42.984},{"time":1561122000,"close":44.372},{"time":1561726800,"close":44.692},{"time":1562331600,"close":46.62},{"time":1562936400,"close":49.016},{"time":1563541200,"close":51.636},{"time":1564146000,"close":45.608},{"time":1564750800,"close":46.868},{"time":1565355600,"close":47.002},{"time":1565960400,"close":43.988},{"time":1566565200,"close":42.28},{"time":1567170000,"close":45.122},{"time":1567774800,"close":45.49},{"time":1568379600,"close":49.04},{"time":1568984400,"close":48.124},{"time":1569589200,"close":48.426},{"time":1570194000,"close":46.286},{"time":1570798800,"close":49.578},{"time":1571403600,"close":51.39},{"time":1572008400,"close":65.626},{"time":1572613200,"close":62.662},{"time":1573221600,"close":67.428},{"time":1573826400,"close":70.434},{"time":1574431200,"close":66.608},{"time":1575036000,"close":65.988},{"time":1575640800,"close":67.178},{"time":1576245600,"close":71.678},{"time":1576850400,"close":81.118},{"time":1577455200,"close":86.076},{"time":1578060000,"close":88.602},{"time":1578664800,"close":95.63},{"time":1579269600,"close":102.1},{"time":1579874400,"close":112.964},{"time":1580479200,"close":130.114},{"time":1581084000,"close":149.614},{"time":1581688800,"close":160.006},{"time":1582293600,"close":180.2},{"time":1582898400,"close":133.598},{"time":1583503200,"close":140.696},{"time":1584104400,"close":109.324},{"time":1584709200,"close":85.506},{"time":1585314000,"close":102.872},{"time":1585918800,"close":96.002},{"time":1586523600,"close":114.6},{"time":1587128400,"close":150.778},{"time":1587733200,"close":145.03},{"time":1588338000,"close":140.264},{"time":1588942800,"close":163.884},{"time":1589547600,"close":159.834},{"time":1590152400,"close":163.376},{"time":1590757200,"close":167.0},{"time":1591362000,"close":177.132},{"time":1591966800,"close":187.056},{"time":1592571600,"close":200.18},{"time":1593176400,"close":191.948},{"time":1593781200,"close":241.732},{"time":1594386000,"close":308.93},{"time":1594990800,"close":300.168},{"time":1595595600,"close":283.4},{"time":1596200400,"close":286.152},{"time":1596805200,"close":290.542},{"time":1597410000,"close":330.142},{"time":1598014800,"close":409.996},{"time":1598619600,"close":442.68},{"time":1599224400,"close":418.32},{"time":1599829200,"close":372.72},{"time":1600434000,"close":442.15},{"time":1601038800,"close":407.34},{"time":1601643600,"close":415.09},{"time":1602248400,"close":434.0},{"time":1602853200,"close":439.67},{"time":1603458000,"close":420.63},{"time":1604062800,"close":388.04},{"time":1604671200,"close":429.95},{"time":1605276000,"close":408.5},{"time":1605880800,"close":489.61},{"time":1606485600,"close":585.76},{"time":1607090400,"close":599.04},{"time":1607695200,"close":609.99},{"time":1608300000,"close":695.0},{"time":1608904800,"close":661.77},{"time":1609509600,"close":705.67},{"time":1610114400,"close":880.02},{"time":1610719200,"close":826.16},{"time":1611324000,"close":846.64},{"time":1611928800,"close":793.53},{"time":1612533600,"close":852.23}],"low":"30.208","high":"880.02","first":1455285600,"last":1612533600,"security":{"ticker":"TSLA:US","open":"845.00","prevClose":"32.52"},"hasVolume":false},"SAA1V:FH":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1455285600,"close":4.438},{"time":1455890400,"close":4.522},{"time":1456495200,"close":4.1},{"time":1457100000,"close":4.25},{"time":1457704800,"close":4.128},{"time":1458306000,"close":4.25},{"time":1458910800,"close":4.178},{"time":1459515600,"close":4.286},{"time":1460120400,"close":4.142},{"time":1460725200,"close":4.144},{"time":1461330000,"close":4.2},{"time":1461934800,"close":4.28},{"time":1462539600,"close":4.98},{"time":1463144400,"close":5.02},{"time":1463749200,"close":5.0},{"time":1464354000,"close":5.26},{"time":1464958800,"close":5.25},{"time":1465563600,"close":5.45},{"time":1466168400,"close":5.1},{"time":1466773200,"close":5.205},{"time":1467378000,"close":5.345},{"time":1467982800,"close":5.545},{"time":1468587600,"close":6.8},{"time":1469192400,"close":7.095},{"time":1469797200,"close":7.175},{"time":1470402000,"close":7.67},{"time":1471006800,"close":7.97},{"time":1471611600,"close":8.205},{"time":1472216400,"close":8.29},{"time":1472821200,"close":8.84},{"time":1473426000,"close":8.615},{"time":1474030800,"close":8.585},{"time":1474635600,"close":8.38},{"time":1475240400,"close":8.48},{"time":1475845200,"close":8.59},{"time":1476450000,"close":8.575},{"time":1477054800,"close":8.965},{"time":1477659600,"close":9.17},{"time":1478264400,"close":7.7},{"time":1478872800,"close":7.42},{"time":1479477600,"close":7.83},{"time":1480082400,"close":7.725},{"time":1480687200,"close":8.2},{"time":1481292000,"close":8.62},{"time":1481896800,"close":8.3},{"time":1482501600,"close":8.365},{"time":1483106400,"close":8.245},{"time":1483711200,"close":8.075},{"time":1484316000,"close":8.45},{"time":1484920800,"close":8.36},{"time":1485525600,"close":8.5},{"time":1486130400,"close":8.695},{"time":1486735200,"close":7.975},{"time":1487340000,"close":8.025},{"time":1487944800,"close":8.2},{"time":1488549600,"close":8.365},{"time":1489154400,"close":8.195},{"time":1489755600,"close":8.22},{"time":1490360400,"close":8.2},{"time":1490965200,"close":7.845},{"time":1491570000,"close":7.98},{"time":1492174800,"close":8.25},{"time":1492779600,"close":8.07},{"time":1493384400,"close":8.1},{"time":1493989200,"close":8.05},{"time":1494594000,"close":8.08},{"time":1495198800,"close":8.195},{"time":1495803600,"close":8.52},{"time":1496408400,"close":8.34},{"time":1497013200,"close":8.065},{"time":1497618000,"close":8.315},{"time":1498222800,"close":8.25},{"time":1498827600,"close":8.18},{"time":1499432400,"close":8.16},{"time":1500037200,"close":8.24},{"time":1500642000,"close":8.305},{"time":1501246800,"close":7.84},{"time":1501851600,"close":7.965},{"time":1502456400,"close":7.73},{"time":1503061200,"close":7.695},{"time":1503666000,"close":7.885},{"time":1504270800,"close":7.96},{"time":1504875600,"close":8.87},{"time":1505480400,"close":8.715},{"time":1506085200,"close":8.69},{"time":1506690000,"close":9.23},{"time":1507294800,"close":9.45},{"time":1507899600,"close":9.5},{"time":1508504400,"close":9.39},{"time":1509109200,"close":10.09},{"time":1509714000,"close":10.28},{"time":1510322400,"close":10.51},{"time":1510927200,"close":10.34},{"time":1511532000,"close":10.14},{"time":1512136800,"close":10.61},{"time":1512741600,"close":11.19},{"time":1513346400,"close":11.77},{"time":1513951200,"close":11.1},{"time":1514556000,"close":10.87},{"time":1515160800,"close":11.28},{"time":1515765600,"close":11.34},{"time":1516370400,"close":11.22},{"time":1516975200,"close":10.58},{"time":1517580000,"close":10.51},{"time":1518184800,"close":9.635},{"time":1518789600,"close":9.8},{"time":1519394400,"close":9.91},{"time":1519999200,"close":9.835},{"time":1520604000,"close":10.1},{"time":1521205200,"close":10.07},{"time":1521810000,"close":9.69},{"time":1522414800,"close":9.525},{"time":1523019600,"close":9.515},{"time":1523624400,"close":9.62},{"time":1524229200,"close":9.62},{"time":1524834000,"close":9.0},{"time":1525438800,"close":9.0},{"time":1526043600,"close":9.185},{"time":1526648400,"close":9.3},{"time":1527253200,"close":9.15},{"time":1527858000,"close":9.015},{"time":1528462800,"close":9.02},{"time":1529067600,"close":9.09},{"time":1529672400,"close":8.67},{"time":1530277200,"close":8.69},{"time":1530882000,"close":8.775},{"time":1531486800,"close":9.1},{"time":1532091600,"close":9.02},{"time":1532696400,"close":8.53},{"time":1533301200,"close":8.575},{"time":1533906000,"close":8.635},{"time":1534510800,"close":8.415},{"time":1535115600,"close":8.77},{"time":1535720400,"close":8.935},{"time":1536325200,"close":8.4},{"time":1536930000,"close":8.67},{"time":1537534800,"close":8.555},{"time":1538139600,"close":8.475},{"time":1538744400,"close":8.34},{"time":1539349200,"close":8.87},{"time":1539954000,"close":8.94},{"time":1540558800,"close":9.42},{"time":1541163600,"close":9.82},{"time":1541772000,"close":9.84},{"time":1542376800,"close":9.695},{"time":1542981600,"close":9.205},{"time":1543586400,"close":9.115},{"time":1544191200,"close":9.07},{"time":1544796000,"close":8.66},{"time":1545400800,"close":8.365},{"time":1546005600,"close":8.485},{"time":1546610400,"close":8.58},{"time":1547215200,"close":8.72},{"time":1547820000,"close":8.66},{"time":1548424800,"close":8.49},{"time":1549029600,"close":8.475},{"time":1549634400,"close":8.865},{"time":1550239200,"close":8.845},{"time":1550844000,"close":8.74},{"time":1551448800,"close":8.815},{"time":1552053600,"close":8.595},{"time":1552654800,"close":9.095},{"time":1553259600,"close":8.965},{"time":1553864400,"close":8.735},{"time":1554469200,"close":9.16},{"time":1555074000,"close":9.135},{"time":1555678800,"close":9.245},{"time":1556283600,"close":9.28},{"time":1556888400,"close":8.58},{"time":1557493200,"close":8.56},{"time":1558098000,"close":8.515},{"time":1558702800,"close":8.335},{"time":1559307600,"close":8.085},{"time":1559912400,"close":8.02},{"time":1560517200,"close":8.14},{"time":1561122000,"close":8.44},{"time":1561726800,"close":8.485},{"time":1562331600,"close":8.925},{"time":1562936400,"close":8.87},{"time":1563541200,"close":8.66},{"time":1564146000,"close":8.91},{"time":1564750800,"close":8.91},{"time":1565355600,"close":8.775},{"time":1565960400,"close":8.53},{"time":1566565200,"close":8.99},{"time":1567170000,"close":9.33},{"time":1567774800,"close":9.51},{"time":1568379600,"close":9.52},{"time":1568984400,"close":10.17},{"time":1569589200,"close":10.2},{"time":1570194000,"close":10.06},{"time":1570798800,"close":9.75},{"time":1571403600,"close":9.96},{"time":1572008400,"close":10.16},{"time":1572613200,"close":9.31},{"time":1573221600,"close":9.73},{"time":1573826400,"close":9.44},{"time":1574431200,"close":9.35},{"time":1575036000,"close":9.35},{"time":1575640800,"close":9.435},{"time":1576245600,"close":9.205},{"time":1576850400,"close":9.8},{"time":1577455200,"close":9.46},{"time":1578060000,"close":9.68},{"time":1578664800,"close":10.67},{"time":1579269600,"close":11.1},{"time":1579874400,"close":10.52},{"time":1580479200,"close":10.83},{"time":1581084000,"close":10.64},{"time":1581688800,"close":11.27},{"time":1582293600,"close":11.04},{"time":1582898400,"close":10.28},{"time":1583503200,"close":10.75},{"time":1584104400,"close":8.705},{"time":1584709200,"close":7.65},{"time":1585314000,"close":7.68},{"time":1585918800,"close":7.95},{"time":1586523600,"close":8.56},{"time":1587128400,"close":8.39},{"time":1587733200,"close":8.14},{"time":1588338000,"close":8.26},{"time":1588942800,"close":8.31},{"time":1589547600,"close":7.96},{"time":1590152400,"close":8.16},{"time":1590757200,"close":8.72},{"time":1591362000,"close":9.17},{"time":1591966800,"close":8.7},{"time":1592571600,"close":8.94},{"time":1593176400,"close":9.03},{"time":1593781200,"close":8.99},{"time":1594386000,"close":8.88},{"time":1594990800,"close":9.1},{"time":1595595600,"close":9.3},{"time":1596200400,"close":9.55},{"time":1596805200,"close":9.9},{"time":1597410000,"close":10.02},{"time":1598014800,"close":10.24},{"time":1598619600,"close":10.76},{"time":1599224400,"close":10.68},{"time":1599829200,"close":11.02},{"time":1600434000,"close":10.76},{"time":1601038800,"close":10.64},{"time":1601643600,"close":11.26},{"time":1602248400,"close":11.9},{"time":1602853200,"close":11.84},{"time":1603458000,"close":12.42},{"time":1604062800,"close":12.64},{"time":1604671200,"close":12.28},{"time":1605276000,"close":12.1},{"time":1605880800,"close":11.96},{"time":1606485600,"close":12.46},{"time":1607090400,"close":13.08},{"time":1607695200,"close":13.44},{"time":1608300000,"close":13.72},{"time":1608904800,"close":13.88},{"time":1609509600,"close":13.74},{"time":1610114400,"close":13.74},{"time":1610719200,"close":14.46},{"time":1611324000,"close":15.54},{"time":1611928800,"close":15.8},{"time":1612533600,"close":16.5}],"low":"4.1","high":"16.5","first":1455285600,"last":1612533600,"security":{"ticker":"SAA1V:FH","open":"16.56","prevClose":"3.85"},"hasVolume":false},"MSFT:US":{"historical":true,"ticksType":"WeekTick","ticks":[{"time":1455285600,"close":50.5},{"time":1455890400,"close":51.82},{"time":1456495200,"close":51.3},{"time":1457100000,"close":52.03},{"time":1457704800,"close":53.07},{"time":1458306000,"close":53.49},{"time":1458910800,"close":54.21},{"time":1459515600,"close":55.57},{"time":1460120400,"close":54.42},{"time":1460725200,"close":55.65},{"time":1461330000,"close":51.78},{"time":1461934800,"close":49.87},{"time":1462539600,"close":50.39},{"time":1463144400,"close":51.08},{"time":1463749200,"close":50.62},{"time":1464354000,"close":52.32},{"time":1464958800,"close":51.79},{"time":1465563600,"close":51.48},{"time":1466168400,"close":50.13},{"time":1466773200,"close":49.83},{"time":1467378000,"close":51.16},{"time":1467982800,"close":52.3},{"time":1468587600,"close":53.7},{"time":1469192400,"close":56.57},{"time":1469797200,"close":56.68},{"time":1470402000,"close":57.96},{"time":1471006800,"close":57.94},{"time":1471611600,"close":57.62},{"time":1472216400,"close":58.03},{"time":1472821200,"close":57.67},{"time":1473426000,"close":56.21},{"time":1474030800,"close":57.25},{"time":1474635600,"close":57.43},{"time":1475240400,"close":57.6},{"time":1475845200,"close":57.8},{"time":1476450000,"close":57.42},{"time":1477054800,"close":59.66},{"time":1477659600,"close":59.87},{"time":1478264400,"close":58.71},{"time":1478872800,"close":59.02},{"time":1479477600,"close":60.35},{"time":1480082400,"close":60.53},{"time":1480687200,"close":59.25},{"time":1481292000,"close":61.97},{"time":1481896800,"close":62.3},{"time":1482501600,"close":63.24},{"time":1483106400,"close":62.14},{"time":1483711200,"close":62.84},{"time":1484316000,"close":62.7},{"time":1484920800,"close":62.74},{"time":1485525600,"close":65.78},{"time":1486130400,"close":63.68},{"time":1486735200,"close":64.0},{"time":1487340000,"close":64.62},{"time":1487944800,"close":64.62},{"time":1488549600,"close":64.25},{"time":1489154400,"close":64.93},{"time":1489755600,"close":64.87},{"time":1490360400,"close":64.98},{"time":1490965200,"close":65.86},{"time":1491570000,"close":65.68},{"time":1492174800,"close":64.95},{"time":1492779600,"close":66.4},{"time":1493384400,"close":68.46},{"time":1493989200,"close":69.0},{"time":1494594000,"close":68.38},{"time":1495198800,"close":67.69},{"time":1495803600,"close":69.96},{"time":1496408400,"close":71.76},{"time":1497013200,"close":70.32},{"time":1497618000,"close":70.0},{"time":1498222800,"close":71.21},{"time":1498827600,"close":68.93},{"time":1499432400,"close":69.46},{"time":1500037200,"close":72.78},{"time":1500642000,"close":73.79},{"time":1501246800,"close":73.04},{"time":1501851600,"close":72.68},{"time":1502456400,"close":72.5},{"time":1503061200,"close":72.49},{"time":1503666000,"close":72.82},{"time":1504270800,"close":73.94},{"time":1504875600,"close":73.98},{"time":1505480400,"close":75.31},{"time":1506085200,"close":74.41},{"time":1506690000,"close":74.49},{"time":1507294800,"close":76.0},{"time":1507899600,"close":77.49},{"time":1508504400,"close":78.81},{"time":1509109200,"close":83.81},{"time":1509714000,"close":84.14},{"time":1510322400,"close":83.87},{"time":1510927200,"close":82.4},{"time":1511532000,"close":83.26},{"time":1512136800,"close":84.26},{"time":1512741600,"close":84.16},{"time":1513346400,"close":86.85},{"time":1513951200,"close":85.51},{"time":1514556000,"close":85.54},{"time":1515160800,"close":88.19},{"time":1515765600,"close":89.6},{"time":1516370400,"close":90.0},{"time":1516975200,"close":94.06},{"time":1517580000,"close":91.78},{"time":1518184800,"close":88.18},{"time":1518789600,"close":92.0},{"time":1519394400,"close":94.06},{"time":1519999200,"close":93.05},{"time":1520604000,"close":96.54},{"time":1521205200,"close":94.6},{"time":1521810000,"close":87.18},{"time":1522414800,"close":91.27},{"time":1523019600,"close":90.23},{"time":1523624400,"close":93.08},{"time":1524229200,"close":95.0},{"time":1524834000,"close":95.82},{"time":1525438800,"close":95.16},{"time":1526043600,"close":97.7},{"time":1526648400,"close":96.36},{"time":1527253200,"close":98.36},{"time":1527858000,"close":100.79},{"time":1528462800,"close":101.63},{"time":1529067600,"close":100.13},{"time":1529672400,"close":100.41},{"time":1530277200,"close":98.61},{"time":1530882000,"close":101.16},{"time":1531486800,"close":105.43},{"time":1532091600,"close":106.27},{"time":1532696400,"close":107.68},{"time":1533301200,"close":108.04},{"time":1533906000,"close":109.0},{"time":1534510800,"close":107.58},{"time":1535115600,"close":108.4},{"time":1535720400,"close":112.33},{"time":1536325200,"close":108.21},{"time":1536930000,"close":113.37},{"time":1537534800,"close":114.26},{"time":1538139600,"close":114.37},{"time":1538744400,"close":112.13},{"time":1539349200,"close":109.57},{"time":1539954000,"close":108.66},{"time":1540558800,"close":106.96},{"time":1541163600,"close":106.16},{"time":1541772000,"close":109.57},{"time":1542376800,"close":108.29},{"time":1542981600,"close":103.07},{"time":1543586400,"close":110.89},{"time":1544191200,"close":104.82},{"time":1544796000,"close":106.03},{"time":1545400800,"close":98.23},{"time":1546005600,"close":100.39},{"time":1546610400,"close":101.93},{"time":1547215200,"close":102.8},{"time":1547820000,"close":107.71},{"time":1548424800,"close":107.17},{"time":1549029600,"close":102.78},{"time":1549634400,"close":105.67},{"time":1550239200,"close":108.22},{"time":1550844000,"close":110.97},{"time":1551448800,"close":112.53},{"time":1552053600,"close":110.51},{"time":1552654800,"close":115.91},{"time":1553259600,"close":117.05},{"time":1553864400,"close":117.94},{"time":1554469200,"close":119.89},{"time":1555074000,"close":120.95},{"time":1555678800,"close":123.37},{"time":1556283600,"close":129.89},{"time":1556888400,"close":128.9},{"time":1557493200,"close":127.13},{"time":1558098000,"close":128.07},{"time":1558702800,"close":126.24},{"time":1559307600,"close":123.68},{"time":1559912400,"close":131.4},{"time":1560517200,"close":132.45},{"time":1561122000,"close":136.97},{"time":1561726800,"close":133.96},{"time":1562331600,"close":137.06},{"time":1562936400,"close":138.9},{"time":1563541200,"close":136.62},{"time":1564146000,"close":141.34},{"time":1564750800,"close":136.9},{"time":1565355600,"close":137.71},{"time":1565960400,"close":136.13},{"time":1566565200,"close":133.39},{"time":1567170000,"close":137.86},{"time":1567774800,"close":139.1},{"time":1568379600,"close":137.32},{"time":1568984400,"close":139.44},{"time":1569589200,"close":137.73},{"time":1570194000,"close":138.12},{"time":1570798800,"close":139.68},{"time":1571403600,"close":137.41},{"time":1572008400,"close":140.73},{"time":1572613200,"close":143.72},{"time":1573221600,"close":145.96},{"time":1573826400,"close":149.97},{"time":1574431200,"close":149.59},{"time":1575036000,"close":151.38},{"time":1575640800,"close":151.75},{"time":1576245600,"close":154.53},{"time":1576850400,"close":157.41},{"time":1577455200,"close":158.96},{"time":1578060000,"close":158.62},{"time":1578664800,"close":161.34},{"time":1579269600,"close":167.1},{"time":1579874400,"close":165.04},{"time":1580479200,"close":170.23},{"time":1581084000,"close":183.89},{"time":1581688800,"close":185.35},{"time":1582293600,"close":178.59},{"time":1582898400,"close":162.01},{"time":1583503200,"close":161.57},{"time":1584104400,"close":158.83},{"time":1584709200,"close":137.35},{"time":1585314000,"close":149.7},{"time":1585918800,"close":153.83},{"time":1586523600,"close":165.14},{"time":1587128400,"close":178.6},{"time":1587733200,"close":174.55},{"time":1588338000,"close":174.57},{"time":1588942800,"close":184.68},{"time":1589547600,"close":183.16},{"time":1590152400,"close":183.51},{"time":1590757200,"close":183.25},{"time":1591362000,"close":187.2},{"time":1591966800,"close":187.74},{"time":1592571600,"close":195.15},{"time":1593176400,"close":196.33},{"time":1593781200,"close":206.26},{"time":1594386000,"close":213.67},{"time":1594990800,"close":202.88},{"time":1595595600,"close":201.3},{"time":1596200400,"close":205.01},{"time":1596805200,"close":212.48},{"time":1597410000,"close":208.9},{"time":1598014800,"close":213.02},{"time":1598619600,"close":228.91},{"time":1599224400,"close":214.25},{"time":1599829200,"close":204.03},{"time":1600434000,"close":200.39},{"time":1601038800,"close":207.82},{"time":1601643600,"close":206.19},{"time":1602248400,"close":215.81},{"time":1602853200,"close":219.66},{"time":1603458000,"close":216.23},{"time":1604062800,"close":202.47},{"time":1604671200,"close":223.72},{"time":1605276000,"close":216.51},{"time":1605880800,"close":210.39},{"time":1606485600,"close":215.23},{"time":1607090400,"close":214.36},{"time":1607695200,"close":213.26},{"time":1608300000,"close":218.59},{"time":1608904800,"close":222.75},{"time":1609509600,"close":222.42},{"time":1610114400,"close":219.62},{"time":1610719200,"close":212.65},{"time":1611324000,"close":225.95},{"time":1611928800,"close":231.96},{"time":1612533600,"close":242.2}],"low":"49.83","high":"242.2","first":1455285600,"last":1612533600,"security":{"ticker":"MSFT:US","open":"242.23","prevClose":"50.16"},"hasVolume":false}}};
var mockTrends3d = {"result":{"YEINT:FH":{"first":1612339200,"last":1612542900,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1612339200,"close":30.0},{"time":1612339500,"close":30.8},{"time":1612339800,"close":30.8},{"time":1612341000,"close":32.0},{"time":1612341600,"close":31.4},{"time":1612341900,"close":30.2},{"time":1612342800,"close":31.0},{"time":1612343400,"close":31.4},{"time":1612345200,"close":31.4},{"time":1612351500,"close":30.0},{"time":1612352700,"close":31.0},{"time":1612358100,"close":30.6},{"time":1612358700,"close":30.8},{"time":1612366800,"close":30.8},{"time":1612367100,"close":30.8},{"time":1612367400,"close":30.8},{"time":1612369500,"close":31.0},{"time":1612427700,"close":31.0},{"time":1612434600,"close":31.0},{"time":1612437000,"close":30.4},{"time":1612438800,"close":30.8},{"time":1612440300,"close":30.8},{"time":1612443900,"close":30.4},{"time":1612446900,"close":30.6},{"time":1612447200,"close":30.8},{"time":1612449000,"close":30.6},{"time":1612453500,"close":31.0},{"time":1612455000,"close":31.0},{"time":1612455600,"close":31.0},{"time":1612455900,"close":31.0},{"time":1612512000,"close":31.0},{"time":1612514400,"close":31.0},{"time":1612516200,"close":31.2},{"time":1612516500,"close":31.4},{"time":1612516800,"close":31.4},{"time":1612517700,"close":31.4},{"time":1612518300,"close":31.4},{"time":1612524600,"close":31.4},{"time":1612526700,"close":31.0},{"time":1612528800,"close":31.4},{"time":1612531200,"close":31.4},{"time":1612531800,"close":31.2},{"time":1612533000,"close":30.6},{"time":1612533300,"close":31.0},{"time":1612535400,"close":31.0},{"time":1612536300,"close":31.0},{"time":1612539900,"close":30.6},{"time":1612540200,"close":31.0},{"time":1612542000,"close":31.0},{"time":1612542300,"close":31.0}],"low":"30.0","high":"32.0","hasVolume":false,"security":{"ticker":"YEINT:FH","open":"31.0","prevClose":"30.0"}},"SSH1V:FH":{"first":1612339200,"last":1612542900,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1612339200,"close":2.47},{"time":1612339500,"close":2.49},{"time":1612339800,"close":2.49},{"time":1612340100,"close":2.49},{"time":1612340400,"close":2.51},{"time":1612340700,"close":2.51},{"time":1612341000,"close":2.48},{"time":1612341300,"close":2.38},{"time":1612341600,"close":2.48},{"time":1612342500,"close":2.47},{"time":1612343400,"close":2.47},{"time":1612343700,"close":2.46},{"time":1612344000,"close":2.46},{"time":1612344300,"close":2.46},{"time":1612344600,"close":2.43},{"time":1612344900,"close":2.43},{"time":1612345500,"close":2.39},{"time":1612345800,"close":2.4},{"time":1612346100,"close":2.39},{"time":1612346400,"close":2.4},{"time":1612346700,"close":2.4},{"time":1612347000,"close":2.4},{"time":1612347600,"close":2.4},{"time":1612347900,"close":2.36},{"time":1612348200,"close":2.4},{"time":1612349700,"close":2.39},{"time":1612350000,"close":2.45},{"time":1612350300,"close":2.39},{"time":1612350900,"close":2.44},{"time":1612352100,"close":2.45},{"time":1612352400,"close":2.46},{"time":1612352700,"close":2.48},{"time":1612353000,"close":2.48},{"time":1612353300,"close":2.42},{"time":1612354200,"close":2.42},{"time":1612355400,"close":2.44},{"time":1612355700,"close":2.44},{"time":1612356000,"close":2.43},{"time":1612356600,"close":2.43},{"time":1612356900,"close":2.4},{"time":1612357200,"close":2.41},{"time":1612357500,"close":2.41},{"time":1612357800,"close":2.39},{"time":1612358100,"close":2.37},{"time":1612358400,"close":2.36},{"time":1612359000,"close":2.4},{"time":1612359300,"close":2.36},{"time":1612359900,"close":2.35},{"time":1612360200,"close":2.36},{"time":1612360500,"close":2.34},{"time":1612360800,"close":2.34},{"time":1612361100,"close":2.34},{"time":1612361400,"close":2.33},{"time":1612361700,"close":2.32},{"time":1612362000,"close":2.34},{"time":1612362300,"close":2.32},{"time":1612362600,"close":2.32},{"time":1612362900,"close":2.32},{"time":1612363200,"close":2.32},{"time":1612364100,"close":2.33},{"time":1612364700,"close":2.32},{"time":1612365000,"close":2.33},{"time":1612365300,"close":2.33},{"time":1612365600,"close":2.36},{"time":1612365900,"close":2.35},{"time":1612366200,"close":2.36},{"time":1612367400,"close":2.36},{"time":1612367700,"close":2.35},{"time":1612368000,"close":2.35},{"time":1612368300,"close":2.35},{"time":1612368600,"close":2.37},{"time":1612368900,"close":2.38},{"time":1612369200,"close":2.35},{"time":1612369500,"close":2.4},{"time":1612425600,"close":2.44},{"time":1612425900,"close":2.43},{"time":1612426200,"close":2.45},{"time":1612426500,"close":2.4},{"time":1612426800,"close":2.43},{"time":1612427100,"close":2.44},{"time":1612427400,"close":2.44},{"time":1612427700,"close":2.44},{"time":1612428000,"close":2.44},{"time":1612428300,"close":2.38},{"time":1612428600,"close":2.4},{"time":1612428900,"close":2.44},{"time":1612429200,"close":2.44},{"time":1612429500,"close":2.45},{"time":1612429800,"close":2.43},{"time":1612430100,"close":2.43},{"time":1612432200,"close":2.44},{"time":1612432500,"close":2.43},{"time":1612433400,"close":2.43},{"time":1612433700,"close":2.43},{"time":1612434000,"close":2.43},{"time":1612434300,"close":2.43},{"time":1612434600,"close":2.44},{"time":1612434900,"close":2.44},{"time":1612435200,"close":2.44},{"time":1612435500,"close":2.44},{"time":1612435800,"close":2.44},{"time":1612436700,"close":2.44},{"time":1612437600,"close":2.44},{"time":1612438200,"close":2.43},{"time":1612439100,"close":2.42},{"time":1612439400,"close":2.44},{"time":1612440300,"close":2.41},{"time":1612441200,"close":2.44},{"time":1612441500,"close":2.44},{"time":1612442100,"close":2.44},{"time":1612443000,"close":2.44},{"time":1612443900,"close":2.44},{"time":1612444200,"close":2.44},{"time":1612444500,"close":2.43},{"time":1612444800,"close":2.41},{"time":1612445100,"close":2.43},{"time":1612445400,"close":2.43},{"time":1612446600,"close":2.44},{"time":1612446900,"close":2.39},{"time":1612447800,"close":2.4},{"time":1612449000,"close":2.39},{"time":1612449600,"close":2.39},{"time":1612449900,"close":2.45},{"time":1612450200,"close":2.45},{"time":1612450500,"close":2.48},{"time":1612451100,"close":2.48},{"time":1612452000,"close":2.48},{"time":1612453500,"close":2.48},{"time":1612453800,"close":2.45},{"time":1612454700,"close":2.45},{"time":1612455000,"close":2.45},{"time":1612455300,"close":2.45},{"time":1612455600,"close":2.45},{"time":1612455900,"close":2.49},{"time":1612512000,"close":2.41},{"time":1612512300,"close":2.41},{"time":1612512600,"close":2.41},{"time":1612512900,"close":2.45},{"time":1612513500,"close":2.45},{"time":1612513800,"close":2.47},{"time":1612514100,"close":2.43},{"time":1612514400,"close":2.44},{"time":1612514700,"close":2.42},{"time":1612515300,"close":2.46},{"time":1612515900,"close":2.47},{"time":1612516800,"close":2.47},{"time":1612518900,"close":2.48},{"time":1612520400,"close":2.47},{"time":1612521600,"close":2.48},{"time":1612522200,"close":2.47},{"time":1612522800,"close":2.45},{"time":1612523100,"close":2.47},{"time":1612523400,"close":2.46},{"time":1612524300,"close":2.43},{"time":1612524900,"close":2.46},{"time":1612525200,"close":2.46},{"time":1612525500,"close":2.46},{"time":1612527300,"close":2.48},{"time":1612527600,"close":2.49},{"time":1612528200,"close":2.49},{"time":1612529100,"close":2.49},{"time":1612530300,"close":2.48},{"time":1612530600,"close":2.46},{"time":1612532700,"close":2.48},{"time":1612533000,"close":2.48},{"time":1612533300,"close":2.49},{"time":1612533600,"close":2.49},{"time":1612533900,"close":2.48},{"time":1612534200,"close":2.48},{"time":1612534500,"close":2.49},{"time":1612536000,"close":2.49},{"time":1612537500,"close":2.49},{"time":1612537800,"close":2.47},{"time":1612538700,"close":2.47},{"time":1612539000,"close":2.47},{"time":1612539300,"close":2.47},{"time":1612540200,"close":2.49},{"time":1612540500,"close":2.49},{"time":1612541700,"close":2.49},{"time":1612542000,"close":2.45},{"time":1612542300,"close":2.47}],"low":"2.32","high":"2.51","hasVolume":false,"security":{"ticker":"SSH1V:FH","open":"2.45","prevClose":"2.40"}},"TSLA:US":{"first":1612362600,"last":1612558800,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1612362600,"close":871.945},{"time":1612362900,"close":862.78},{"time":1612363200,"close":864.775},{"time":1612363500,"close":864.384},{"time":1612363800,"close":866.48},{"time":1612364100,"close":872.53},{"time":1612364400,"close":869.5},{"time":1612364700,"close":865.772},{"time":1612365000,"close":859.65},{"time":1612365300,"close":861.05},{"time":1612365600,"close":859.82},{"time":1612365900,"close":853.36},{"time":1612366200,"close":856.96},{"time":1612366500,"close":854.35},{"time":1612366800,"close":860.18},{"time":1612367100,"close":858.95},{"time":1612367400,"close":858.37},{"time":1612367700,"close":856.1},{"time":1612368000,"close":856.116},{"time":1612368300,"close":855.34},{"time":1612368600,"close":855.5},{"time":1612368900,"close":856.44},{"time":1612369200,"close":856.42},{"time":1612369500,"close":856.03},{"time":1612369800,"close":856.5},{"time":1612370100,"close":859.843},{"time":1612370400,"close":863.15},{"time":1612370700,"close":863.299},{"time":1612371000,"close":864.566},{"time":1612371300,"close":866.53},{"time":1612371600,"close":865.39},{"time":1612371900,"close":864.86},{"time":1612372200,"close":863.776},{"time":1612372500,"close":863.732},{"time":1612372800,"close":865.477},{"time":1612373100,"close":864.567},{"time":1612373400,"close":863.98},{"time":1612373700,"close":863.05},{"time":1612374000,"close":862.94},{"time":1612374300,"close":861.607},{"time":1612374600,"close":859.35},{"time":1612374900,"close":858.39},{"time":1612375200,"close":859.223},{"time":1612375500,"close":859.05},{"time":1612375800,"close":859.395},{"time":1612376100,"close":858.84},{"time":1612376400,"close":858.39},{"time":1612376700,"close":857.6},{"time":1612377000,"close":859.11},{"time":1612377300,"close":857.633},{"time":1612377600,"close":857.125},{"time":1612377900,"close":858.418},{"time":1612378200,"close":858.131},{"time":1612378500,"close":857.105},{"time":1612378800,"close":856.025},{"time":1612379100,"close":856.94},{"time":1612379400,"close":857.899},{"time":1612379700,"close":857.162},{"time":1612380000,"close":858.06},{"time":1612380300,"close":859.4},{"time":1612380600,"close":860.265},{"time":1612380900,"close":860.35},{"time":1612381200,"close":860.44},{"time":1612381500,"close":862.4},{"time":1612381800,"close":860.08},{"time":1612382100,"close":857.15},{"time":1612382400,"close":858.06},{"time":1612382700,"close":857.33},{"time":1612383000,"close":856.75},{"time":1612383300,"close":855.08},{"time":1612383600,"close":857.07},{"time":1612383900,"close":855.47},{"time":1612384200,"close":856.75},{"time":1612384500,"close":856.015},{"time":1612384800,"close":857.18},{"time":1612385100,"close":857.0},{"time":1612385400,"close":855.535},{"time":1612385700,"close":854.69},{"time":1612387500,"close":854.69},{"time":1612449000,"close":849.37},{"time":1612449300,"close":848.31},{"time":1612449600,"close":848.92},{"time":1612449900,"close":849.0},{"time":1612450200,"close":845.77},{"time":1612450500,"close":844.0},{"time":1612450800,"close":840.984},{"time":1612451100,"close":837.268},{"time":1612451400,"close":843.609},{"time":1612451700,"close":843.625},{"time":1612452000,"close":842.0},{"time":1612452300,"close":839.16},{"time":1612452600,"close":837.9},{"time":1612452900,"close":835.566},{"time":1612453200,"close":836.28},{"time":1612453500,"close":839.255},{"time":1612453800,"close":839.27},{"time":1612454100,"close":836.95},{"time":1612454400,"close":839.447},{"time":1612454700,"close":841.316},{"time":1612455000,"close":840.74},{"time":1612455300,"close":839.0},{"time":1612455600,"close":840.42},{"time":1612455900,"close":841.32},{"time":1612456200,"close":839.35},{"time":1612456500,"close":840.614},{"time":1612456800,"close":839.35},{"time":1612457100,"close":839.73},{"time":1612457400,"close":842.664},{"time":1612457700,"close":842.054},{"time":1612458000,"close":842.25},{"time":1612458300,"close":845.87},{"time":1612458600,"close":846.08},{"time":1612458900,"close":846.3},{"time":1612459200,"close":848.55},{"time":1612459500,"close":846.99},{"time":1612459800,"close":845.95},{"time":1612460100,"close":845.257},{"time":1612460400,"close":844.775},{"time":1612460700,"close":844.705},{"time":1612461000,"close":843.315},{"time":1612461300,"close":842.684},{"time":1612461600,"close":844.25},{"time":1612461900,"close":844.011},{"time":1612462200,"close":845.91},{"time":1612462500,"close":843.927},{"time":1612462800,"close":843.74},{"time":1612463100,"close":843.22},{"time":1612463400,"close":844.151},{"time":1612463700,"close":844.785},{"time":1612464000,"close":845.275},{"time":1612464300,"close":845.582},{"time":1612464600,"close":845.82},{"time":1612464900,"close":846.54},{"time":1612465200,"close":846.3},{"time":1612465500,"close":845.917},{"time":1612465800,"close":845.0},{"time":1612466100,"close":845.9},{"time":1612466400,"close":845.581},{"time":1612466700,"close":846.353},{"time":1612467000,"close":845.41},{"time":1612467300,"close":845.97},{"time":1612467600,"close":845.9},{"time":1612467900,"close":846.034},{"time":1612468200,"close":846.24},{"time":1612468500,"close":846.858},{"time":1612468800,"close":848.545},{"time":1612469100,"close":848.64},{"time":1612469400,"close":850.425},{"time":1612469700,"close":848.47},{"time":1612470000,"close":849.16},{"time":1612470300,"close":850.42},{"time":1612470600,"close":848.59},{"time":1612470900,"close":847.855},{"time":1612471200,"close":848.25},{"time":1612471500,"close":849.23},{"time":1612471800,"close":849.9},{"time":1612472100,"close":849.99},{"time":1612473900,"close":849.99},{"time":1612535400,"close":841.774},{"time":1612535700,"close":843.757},{"time":1612536000,"close":847.21},{"time":1612536300,"close":844.995},{"time":1612536600,"close":844.43},{"time":1612536900,"close":844.09},{"time":1612537200,"close":841.966},{"time":1612537500,"close":841.003},{"time":1612537800,"close":840.0},{"time":1612538100,"close":842.525},{"time":1612538400,"close":843.5},{"time":1612538700,"close":844.593},{"time":1612539000,"close":841.76},{"time":1612539300,"close":842.99},{"time":1612539600,"close":841.65},{"time":1612539900,"close":842.5},{"time":1612540200,"close":842.597},{"time":1612540500,"close":843.67},{"time":1612540800,"close":846.68},{"time":1612541100,"close":847.17},{"time":1612541400,"close":848.0},{"time":1612541700,"close":854.12},{"time":1612542000,"close":857.834},{"time":1612542300,"close":859.15},{"time":1612542600,"close":863.602},{"time":1612542900,"close":861.585},{"time":1612543200,"close":863.0},{"time":1612543500,"close":863.73},{"time":1612543800,"close":860.435},{"time":1612544100,"close":859.331},{"time":1612544400,"close":861.2},{"time":1612544700,"close":858.68},{"time":1612545000,"close":859.11},{"time":1612545300,"close":858.076},{"time":1612545600,"close":858.505},{"time":1612545900,"close":860.205},{"time":1612546200,"close":860.35},{"time":1612546500,"close":860.013},{"time":1612546800,"close":859.7},{"time":1612547100,"close":859.73},{"time":1612547400,"close":860.74},{"time":1612547700,"close":862.0},{"time":1612548000,"close":861.17},{"time":1612548300,"close":860.16},{"time":1612548600,"close":860.54},{"time":1612548900,"close":860.89},{"time":1612549200,"close":859.97},{"time":1612549500,"close":859.59},{"time":1612549800,"close":856.57},{"time":1612550100,"close":857.975},{"time":1612550400,"close":858.19},{"time":1612550700,"close":858.85},{"time":1612551000,"close":855.0},{"time":1612551300,"close":855.26},{"time":1612551600,"close":855.48},{"time":1612551900,"close":856.916},{"time":1612552200,"close":857.369},{"time":1612552500,"close":859.2},{"time":1612552800,"close":855.39},{"time":1612553100,"close":854.57},{"time":1612553400,"close":855.49},{"time":1612553700,"close":854.914},{"time":1612554000,"close":853.98},{"time":1612554300,"close":852.25},{"time":1612554600,"close":850.972},{"time":1612554900,"close":851.83},{"time":1612555200,"close":851.328},{"time":1612555500,"close":850.479},{"time":1612555800,"close":849.76},{"time":1612556100,"close":850.4},{"time":1612556400,"close":849.53},{"time":1612556700,"close":848.84},{"time":1612557000,"close":850.39},{"time":1612557300,"close":850.14},{"time":1612557600,"close":850.725},{"time":1612557900,"close":849.98},{"time":1612558200,"close":851.505},{"time":1612558500,"close":852.23}],"low":"835.566","high":"872.53","hasVolume":false,"security":{"ticker":"TSLA:US","open":"845.00","prevClose":"872.79"}},"SAA1V:FH":{"first":1612339200,"last":1612542900,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1612339200,"close":16.42},{"time":1612339500,"close":16.54},{"time":1612339800,"close":16.48},{"time":1612340100,"close":16.44},{"time":1612340400,"close":16.5},{"time":1612340700,"close":16.5},{"time":1612341000,"close":16.5},{"time":1612341300,"close":16.5},{"time":1612341600,"close":16.5},{"time":1612342200,"close":16.48},{"time":1612342500,"close":16.52},{"time":1612342800,"close":16.5},{"time":1612343100,"close":16.48},{"time":1612343400,"close":16.52},{"time":1612344000,"close":16.52},{"time":1612344600,"close":16.5},{"time":1612344900,"close":16.52},{"time":1612345200,"close":16.52},{"time":1612345500,"close":16.52},{"time":1612345800,"close":16.52},{"time":1612346100,"close":16.62},{"time":1612346400,"close":16.58},{"time":1612346700,"close":16.58},{"time":1612347000,"close":16.58},{"time":1612347300,"close":16.6},{"time":1612347600,"close":16.64},{"time":1612348500,"close":16.62},{"time":1612349400,"close":16.6},{"time":1612349700,"close":16.6},{"time":1612350300,"close":16.58},{"time":1612350600,"close":16.62},{"time":1612350900,"close":16.58},{"time":1612352100,"close":16.58},{"time":1612352700,"close":16.56},{"time":1612353000,"close":16.66},{"time":1612353600,"close":16.68},{"time":1612353900,"close":16.64},{"time":1612354800,"close":16.66},{"time":1612355700,"close":16.68},{"time":1612356000,"close":16.62},{"time":1612356600,"close":16.6},{"time":1612356900,"close":16.62},{"time":1612357800,"close":16.58},{"time":1612358100,"close":16.58},{"time":1612358700,"close":16.6},{"time":1612359300,"close":16.58},{"time":1612359600,"close":16.6},{"time":1612360200,"close":16.62},{"time":1612360500,"close":16.62},{"time":1612361400,"close":16.58},{"time":1612361700,"close":16.56},{"time":1612362600,"close":16.6},{"time":1612364100,"close":16.62},{"time":1612364700,"close":16.64},{"time":1612365000,"close":16.6},{"time":1612365300,"close":16.62},{"time":1612365600,"close":16.58},{"time":1612367100,"close":16.58},{"time":1612367400,"close":16.64},{"time":1612367700,"close":16.64},{"time":1612368000,"close":16.64},{"time":1612368300,"close":16.66},{"time":1612368600,"close":16.68},{"time":1612368900,"close":16.68},{"time":1612369200,"close":16.66},{"time":1612369500,"close":16.7},{"time":1612425600,"close":16.7},{"time":1612425900,"close":16.7},{"time":1612426200,"close":16.66},{"time":1612426500,"close":16.58},{"time":1612427100,"close":16.58},{"time":1612427400,"close":16.58},{"time":1612427700,"close":16.54},{"time":1612428000,"close":16.54},{"time":1612428300,"close":16.54},{"time":1612428600,"close":16.54},{"time":1612428900,"close":16.5},{"time":1612429200,"close":16.5},{"time":1612429500,"close":16.56},{"time":1612430100,"close":16.6},{"time":1612430400,"close":16.62},{"time":1612431000,"close":16.58},{"time":1612431300,"close":16.58},{"time":1612431600,"close":16.58},{"time":1612432200,"close":16.58},{"time":1612432500,"close":16.54},{"time":1612432800,"close":16.52},{"time":1612433400,"close":16.52},{"time":1612433700,"close":16.52},{"time":1612434300,"close":16.5},{"time":1612434600,"close":16.5},{"time":1612434900,"close":16.52},{"time":1612435200,"close":16.54},{"time":1612435500,"close":16.52},{"time":1612436100,"close":16.54},{"time":1612436400,"close":16.52},{"time":1612437000,"close":16.54},{"time":1612437300,"close":16.52},{"time":1612438200,"close":16.52},{"time":1612438800,"close":16.52},{"time":1612439100,"close":16.52},{"time":1612439400,"close":16.52},{"time":1612440000,"close":16.54},{"time":1612440900,"close":16.56},{"time":1612441200,"close":16.56},{"time":1612441500,"close":16.56},{"time":1612442400,"close":16.52},{"time":1612442700,"close":16.52},{"time":1612443000,"close":16.52},{"time":1612444200,"close":16.52},{"time":1612444500,"close":16.52},{"time":1612444800,"close":16.54},{"time":1612445700,"close":16.54},{"time":1612446900,"close":16.52},{"time":1612447800,"close":16.5},{"time":1612448100,"close":16.52},{"time":1612448400,"close":16.5},{"time":1612449000,"close":16.5},{"time":1612449300,"close":16.5},{"time":1612449600,"close":16.5},{"time":1612449900,"close":16.5},{"time":1612450200,"close":16.5},{"time":1612450500,"close":16.5},{"time":1612450800,"close":16.5},{"time":1612452000,"close":16.52},{"time":1612452300,"close":16.5},{"time":1612452600,"close":16.5},{"time":1612452900,"close":16.5},{"time":1612453200,"close":16.5},{"time":1612453500,"close":16.5},{"time":1612453800,"close":16.5},{"time":1612454100,"close":16.5},{"time":1612455000,"close":16.5},{"time":1612455300,"close":16.5},{"time":1612455600,"close":16.6},{"time":1612455900,"close":16.56},{"time":1612512000,"close":16.44},{"time":1612512300,"close":16.5},{"time":1612512600,"close":16.52},{"time":1612512900,"close":16.56},{"time":1612513200,"close":16.54},{"time":1612513500,"close":16.56},{"time":1612514100,"close":16.58},{"time":1612514400,"close":16.6},{"time":1612515000,"close":16.68},{"time":1612515600,"close":16.62},{"time":1612515900,"close":16.6},{"time":1612516500,"close":16.58},{"time":1612517700,"close":16.6},{"time":1612518000,"close":16.62},{"time":1612519500,"close":16.62},{"time":1612519800,"close":16.6},{"time":1612520100,"close":16.62},{"time":1612520400,"close":16.58},{"time":1612521000,"close":16.6},{"time":1612521300,"close":16.58},{"time":1612521600,"close":16.56},{"time":1612522200,"close":16.56},{"time":1612522500,"close":16.54},{"time":1612523700,"close":16.54},{"time":1612524000,"close":16.52},{"time":1612524600,"close":16.52},{"time":1612525500,"close":16.5},{"time":1612525800,"close":16.5},{"time":1612526400,"close":16.52},{"time":1612527300,"close":16.54},{"time":1612527600,"close":16.52},{"time":1612527900,"close":16.52},{"time":1612529100,"close":16.5},{"time":1612531200,"close":16.54},{"time":1612531500,"close":16.52},{"time":1612531800,"close":16.5},{"time":1612532100,"close":16.52},{"time":1612532400,"close":16.52},{"time":1612532700,"close":16.56},{"time":1612533300,"close":16.52},{"time":1612533900,"close":16.56},{"time":1612534500,"close":16.54},{"time":1612535100,"close":16.54},{"time":1612535400,"close":16.54},{"time":1612535700,"close":16.52},{"time":1612536300,"close":16.52},{"time":1612536600,"close":16.54},{"time":1612537200,"close":16.52},{"time":1612538700,"close":16.54},{"time":1612539000,"close":16.54},{"time":1612539300,"close":16.52},{"time":1612539600,"close":16.52},{"time":1612539900,"close":16.52},{"time":1612540200,"close":16.52},{"time":1612540500,"close":16.52},{"time":1612540800,"close":16.54},{"time":1612541100,"close":16.54},{"time":1612541400,"close":16.5},{"time":1612541700,"close":16.52},{"time":1612542000,"close":16.5},{"time":1612542300,"close":16.5}],"low":"16.42","high":"16.7","hasVolume":false,"security":{"ticker":"SAA1V:FH","open":"16.56","prevClose":"16.26"}},"MSFT:US":{"first":1612362600,"last":1612558800,"historical":false,"ticksType":"MinuteTick","ticks":[{"time":1612362600,"close":240.09},{"time":1612362900,"close":240.27},{"time":1612363200,"close":240.19},{"time":1612363500,"close":240.79},{"time":1612363800,"close":241.65},{"time":1612364100,"close":242.565},{"time":1612364400,"close":242.735},{"time":1612364700,"close":241.76},{"time":1612365000,"close":241.57},{"time":1612365300,"close":241.09},{"time":1612365600,"close":240.9},{"time":1612365900,"close":240.315},{"time":1612366200,"close":241.19},{"time":1612366500,"close":241.365},{"time":1612366800,"close":241.51},{"time":1612367100,"close":241.29},{"time":1612367400,"close":241.63},{"time":1612367700,"close":241.56},{"time":1612368000,"close":242.05},{"time":1612368300,"close":242.54},{"time":1612368600,"close":242.39},{"time":1612368900,"close":242.79},{"time":1612369200,"close":242.96},{"time":1612369500,"close":242.9},{"time":1612369800,"close":242.7},{"time":1612370100,"close":242.885},{"time":1612370400,"close":243.18},{"time":1612370700,"close":242.97},{"time":1612371000,"close":242.85},{"time":1612371300,"close":243.115},{"time":1612371600,"close":243.48},{"time":1612371900,"close":243.23},{"time":1612372200,"close":243.055},{"time":1612372500,"close":243.55},{"time":1612372800,"close":243.42},{"time":1612373100,"close":243.36},{"time":1612373400,"close":243.13},{"time":1612373700,"close":243.41},{"time":1612374000,"close":243.45},{"time":1612374300,"close":243.532},{"time":1612374600,"close":243.44},{"time":1612374900,"close":243.48},{"time":1612375200,"close":243.35},{"time":1612375500,"close":243.33},{"time":1612375800,"close":243.1},{"time":1612376100,"close":242.92},{"time":1612376400,"close":243.382},{"time":1612376700,"close":243.28},{"time":1612377000,"close":243.335},{"time":1612377300,"close":243.71},{"time":1612377600,"close":243.74},{"time":1612377900,"close":243.668},{"time":1612378200,"close":243.93},{"time":1612378500,"close":243.935},{"time":1612378800,"close":244.07},{"time":1612379100,"close":244.455},{"time":1612379400,"close":244.355},{"time":1612379700,"close":244.36},{"time":1612380000,"close":244.85},{"time":1612380300,"close":244.72},{"time":1612380600,"close":244.97},{"time":1612380900,"close":244.691},{"time":1612381200,"close":244.41},{"time":1612381500,"close":244.04},{"time":1612381800,"close":244.16},{"time":1612382100,"close":243.61},{"time":1612382400,"close":243.66},{"time":1612382700,"close":243.97},{"time":1612383000,"close":244.115},{"time":1612383300,"close":243.35},{"time":1612383600,"close":243.55},{"time":1612383900,"close":243.34},{"time":1612384200,"close":243.71},{"time":1612384500,"close":243.504},{"time":1612384800,"close":243.96},{"time":1612385100,"close":243.57},{"time":1612385400,"close":243.58},{"time":1612385700,"close":243.0},{"time":1612387500,"close":243.0},{"time":1612449000,"close":241.45},{"time":1612449300,"close":242.845},{"time":1612449600,"close":241.9},{"time":1612449900,"close":242.48},{"time":1612450200,"close":242.02},{"time":1612450500,"close":242.28},{"time":1612450800,"close":241.285},{"time":1612451100,"close":241.36},{"time":1612451400,"close":242.29},{"time":1612451700,"close":242.52},{"time":1612452000,"close":242.288},{"time":1612452300,"close":241.05},{"time":1612452600,"close":241.12},{"time":1612452900,"close":240.83},{"time":1612453200,"close":241.025},{"time":1612453500,"close":241.19},{"time":1612453800,"close":241.5},{"time":1612454100,"close":240.96},{"time":1612454400,"close":241.15},{"time":1612454700,"close":240.92},{"time":1612455000,"close":240.63},{"time":1612455300,"close":240.66},{"time":1612455600,"close":240.755},{"time":1612455900,"close":240.69},{"time":1612456200,"close":240.59},{"time":1612456500,"close":240.6},{"time":1612456800,"close":240.46},{"time":1612457100,"close":240.96},{"time":1612457400,"close":240.78},{"time":1612457700,"close":240.98},{"time":1612458000,"close":240.891},{"time":1612458300,"close":240.84},{"time":1612458600,"close":240.67},{"time":1612458900,"close":240.7},{"time":1612459200,"close":240.53},{"time":1612459500,"close":240.62},{"time":1612459800,"close":240.62},{"time":1612460100,"close":240.58},{"time":1612460400,"close":240.65},{"time":1612460700,"close":240.505},{"time":1612461000,"close":240.45},{"time":1612461300,"close":240.58},{"time":1612461600,"close":240.552},{"time":1612461900,"close":240.515},{"time":1612462200,"close":240.81},{"time":1612462500,"close":240.87},{"time":1612462800,"close":240.97},{"time":1612463100,"close":240.8},{"time":1612463400,"close":240.98},{"time":1612463700,"close":240.97},{"time":1612464000,"close":240.78},{"time":1612464300,"close":240.92},{"time":1612464600,"close":240.6},{"time":1612464900,"close":240.52},{"time":1612465200,"close":240.62},{"time":1612465500,"close":240.859},{"time":1612465800,"close":240.735},{"time":1612466100,"close":240.63},{"time":1612466400,"close":240.615},{"time":1612466700,"close":240.73},{"time":1612467000,"close":240.93},{"time":1612467300,"close":240.923},{"time":1612467600,"close":241.315},{"time":1612467900,"close":241.38},{"time":1612468200,"close":241.25},{"time":1612468500,"close":241.245},{"time":1612468800,"close":241.275},{"time":1612469100,"close":240.97},{"time":1612469400,"close":240.87},{"time":1612469700,"close":241.02},{"time":1612470000,"close":241.28},{"time":1612470300,"close":241.3},{"time":1612470600,"close":241.19},{"time":1612470900,"close":241.23},{"time":1612471200,"close":241.265},{"time":1612471500,"close":241.54},{"time":1612471800,"close":241.77},{"time":1612472100,"close":242.01},{"time":1612473900,"close":242.01},{"time":1612535400,"close":242.382},{"time":1612535700,"close":241.32},{"time":1612536000,"close":241.22},{"time":1612536300,"close":240.7},{"time":1612536600,"close":240.88},{"time":1612536900,"close":240.72},{"time":1612537200,"close":240.83},{"time":1612537500,"close":241.135},{"time":1612537800,"close":241.33},{"time":1612538100,"close":240.939},{"time":1612538400,"close":241.36},{"time":1612538700,"close":241.57},{"time":1612539000,"close":241.11},{"time":1612539300,"close":241.54},{"time":1612539600,"close":241.7},{"time":1612539900,"close":241.676},{"time":1612540200,"close":241.98},{"time":1612540500,"close":241.63},{"time":1612540800,"close":241.54},{"time":1612541100,"close":241.48},{"time":1612541400,"close":241.39},{"time":1612541700,"close":240.985},{"time":1612542000,"close":240.9},{"time":1612542300,"close":240.94},{"time":1612542600,"close":240.935},{"time":1612542900,"close":241.27},{"time":1612543200,"close":241.28},{"time":1612543500,"close":241.12},{"time":1612543800,"close":240.91},{"time":1612544100,"close":240.96},{"time":1612544400,"close":241.36},{"time":1612544700,"close":241.34},{"time":1612545000,"close":241.39},{"time":1612545300,"close":241.701},{"time":1612545600,"close":241.91},{"time":1612545900,"close":241.763},{"time":1612546200,"close":241.77},{"time":1612546500,"close":241.96},{"time":1612546800,"close":242.16},{"time":1612547100,"close":242.21},{"time":1612547400,"close":242.265},{"time":1612547700,"close":242.5},{"time":1612548000,"close":242.275},{"time":1612548300,"close":242.248},{"time":1612548600,"close":242.3},{"time":1612548900,"close":242.54},{"time":1612549200,"close":242.46},{"time":1612549500,"close":242.442},{"time":1612549800,"close":242.2},{"time":1612550100,"close":242.2},{"time":1612550400,"close":242.37},{"time":1612550700,"close":242.08},{"time":1612551000,"close":241.93},{"time":1612551300,"close":241.78},{"time":1612551600,"close":241.64},{"time":1612551900,"close":241.762},{"time":1612552200,"close":241.78},{"time":1612552500,"close":241.64},{"time":1612552800,"close":241.755},{"time":1612553100,"close":241.77},{"time":1612553400,"close":241.99},{"time":1612553700,"close":242.02},{"time":1612554000,"close":241.74},{"time":1612554300,"close":241.56},{"time":1612554600,"close":241.5},{"time":1612554900,"close":241.54},{"time":1612555200,"close":241.4},{"time":1612555500,"close":241.515},{"time":1612555800,"close":241.63},{"time":1612556100,"close":241.65},{"time":1612556400,"close":241.92},{"time":1612556700,"close":241.48},{"time":1612557000,"close":241.62},{"time":1612557300,"close":241.25},{"time":1612557600,"close":241.56},{"time":1612557900,"close":241.405},{"time":1612558200,"close":241.73},{"time":1612558500,"close":242.2}],"low":"240.09","high":"244.97","hasVolume":false,"security":{"ticker":"MSFT:US","open":"242.23","prevClose":"239.51"}}}};

var api_currency = 'https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,EUR';
var api_stock = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-compact?id=';
var api_history5y = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart?&interval=y5&id='
var api_history3d = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart?&interval=d3&id='

var rate, usd, eur;
var buys = new Array();
var sells = new Array();
var includeSales = true;
var currency = {
    async: false,
    url: api_currency,
    method: 'GET'
};
refreshInterval = 1000 * 60 * 60 * refreshInterval;

if(mockData) consoleOutput = true;
if(mockData && consoleOutput){ console.log('!!! USING MOCK DATA !!!'); console.log('MOCKED STOCK TRADE EVENTS:', mockStocks); console.log('MOCKED 5 YEAR TICKS', mockTrends5y); console.log('MOCKED 3 DAY TICKS', mockTrends3d); }

// Work around Dropbox CORS headers
if(tradeEventsTxt.indexOf('www.dropbox.com') > -1){
    tradeEventsTxt = tradeEventsTxt.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('dl=0', 'raw=1').replace('dl=1', 'raw=1');
}

$.ajax(currency).done(function (response) {
    if(consoleOutput) console.log('CURRENCY RATE:', response);
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

function addRows(detailsList){
    detailsList.forEach(function(details, i){
        var symbol = details.symbol.split(':')[0];
        var id = symbol;
        var tpl = $('.template').html();
        tpl = tpl.replace('STOCK', symbol);
        $(container).append(tpl);
        $('#'+id)
            .attr('data-first-price', details.price)
            .attr('data-turnover', details.turnover)
            .attr('data-turnover-with-sales', details.turnoverWithSales)
            .attr('data-date', details.date)
            .attr('data-pcs', details.pcs)
            .attr('data-invested', details.total.toFixed(2))
            .attr('data-invested-with-sales', details.totalWithSales.toFixed(2))
            .attr('data-balance', details.liquidBalance.toFixed(2))
            .attr('data-purchases-total', details.purchasesTotal.toFixed(2))
            .attr('data-purchases-pcs', details.purchasesPcs)
            .attr('data-sales-pcs', details.salesPcs)
            .attr('data-sales-total', details.salesTotal.toFixed(2));
        $('#'+id).find('.date').html(details.date);
        $('#'+id).find('.pcs').html(details.pcs);
        $('#'+id).find('.invested').html(details.total.toFixed(2));
        $('#'+id).find('.invested-with-sales').html(details.totalWithSales.toFixed(2));
    });
}

function filterList(arr){

    var arrDetails = new Array();
    arr.forEach(function(line, i){
        var itm = line.split(';');
        if(itm.length > 1){
            var market = itm[0].trim().split(':')[1];
            var details = {
                symbol: itm[0].trim(),
                date: itm[1].trim(),
                pcs: Number(itm[2].trim()),
                price: Number(itm[3].trim()),
                total: Number(itm[2].trim()) * Number(itm[3].trim()),
                totalWithSales: Number(itm[2]) * Number(itm[3].trim()),
                turnover: 0,
                turnoverWithSales: 0,
                liquidBalance: Number(itm[2]) * Number(itm[3].trim()),
                difference: 0,
                purchasesTotal: Number(itm[2]) * Number(itm[3].trim()),
                purchasesPcs: Number(itm[2].trim()),
                salesTotal: 0,
                salesPcs: 0
            };
            // if(market=='US'){
            //     details.price = toEur(details.price);
            //     details.total = toEur(details.total);
            //     details.totalWithSales = toEur(details.totalWithSales);
            //     details.liquidBalance = toEur(details.liquidBalance);
            //     details.purchasesTotal = toEur(details.purchasesTotal);
            // }
            var addIt = true;
            arrDetails.forEach(function(bw, i){
                if(bw.symbol == details.symbol){
                    arrDetails[i].pcs += details.pcs;
                    arrDetails[i].purchasesPcs += details.purchasesPcs;
                    arrDetails[i].total += details.total;
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

var totalLiquid = 0;
var totalInvested = 0;

function parseStocks(data){
    var events = data.split(/\n\s*\n/);
    var buys = events[0].split('\n').filter(function(line){return line.indexOf('#') != 0});
    if(consoleOutput) console.log('BUYS', buys);
    var sells = events[1].split('\n').filter(function(line){return line.indexOf('#') != 0});
    if(consoleOutput) console.log('SELLS', sells);
    var buyDetails = filterList(buys);
    var sellDetails = filterList(sells);
    var finalList = new Array();
    buyDetails.forEach(function(buy, i){
        finalList.push(buy);
        sellDetails.forEach(function(sell, ii){
            if(buy.symbol == sell.symbol){
                finalList[i].pcs -= sell.pcs;
                finalList[i].totalWithSales -= sell.pcs * sell.price;
                finalList[i].total -= sell.pcs * buy.price;
                finalList[i].turnover += (sell.pcs * buy.price) - (buy.total/buy.pcs);
                finalList[i].turnoverWithSales += (sell.pcs * sell.price) - (buy.total/buy.pcs);
                finalList[i].salesTotal += sell.pcs * sell.price;
                finalList[i].salesPcs += sell.pcs;
            }
        });
    });

    if(consoleOutput) console.log('CALC INVESTMENT & CASHOUTS BEFORE API CALLS');
    finalList.forEach(function(stock, i){
        totalInvested += stock.pcs * stock.price;
        if(includeCashouts == true && stock.pcs == 0){
            totalLiquid += stock.totalWithSales * -1;
        }
        if((includeCashouts == false || showCashouts == false) && stock.pcs == 0 && mockData == false){
            if(consoleOutput) console.log('REMOVE', i, stock);
            delete finalList[i];
        }
    });
    finalList = finalList.filter(function (el) {return el != null;});

    if(consoleOutput) console.log('TOTAL INVESTED:', totalInvested);
    if(consoleOutput) console.log('CASHED OUT TOTAL:', totalLiquid);

    return finalList;
}

var sold = false;
function initProcess(){
    $('.stocks').html('').hide();
    if(mockData){
        var finalList = parseStocks(mockEvents);
        addRows(finalList);
        parseBuys(finalList);
    } else {
        $.get({
            url: tradeEventsTxt,
            async: false,
            success: function(data) {
                if(consoleOutput) console.log('STOCK TRADE EVENTS:', data);
                var finalList = parseStocks(data);
                if(consoleOutput) console.log('HANDLED TRADE EVENTS:', finalList);
                addRows(finalList);
                parseBuys(finalList);
            }
        });
    }
}


function processStocks(data){
    $.each(data, function(i, stock) {

        if(consoleOutput) console.log('->', i, stock);

        var currency = stock.currency;
        var price = stock.last;
        var symbol = stock.symbol;
        var name = stock.name;
        var exchange = stock.exchange;
        var id = symbol;
        var paidBack = false;
        var cashedOut = false;
        var vic = 0;

        // Convert USD to EUR
        if(currency == 'USD'){
            price = toEur(price);
        }

        // Calculate things
        var pcs =  Number($('#'+id).data('pcs'));
        var purchaseTotal = Number($('#'+id).data('invested'));
        var marketTotal = price*pcs;
        var marketTotalWithSales = marketTotal + Number($('#'+id).data('turnover'));
        var diff = marketTotal-purchaseTotal;
        var percent = diff/purchaseTotal*100;
        var salesPL = Number($('#'+id).data('sales-total')) - Number($('#'+id).data('purchases-total'));
        
        // UI
        $('#'+id).find('.name').html(name);
        $('#'+id).find('.symbol').html(symbol);
        $('#'+id).find('.exchange').html(exchange);
        if(Number($('#'+id).data('invested-with-sales')) <= 0){
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
        if( truncateTo > 0){
            var name = $('#'+id).find('.name').html();
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

function processTrends(data, interval){

    if(consoleOutput) console.log('PROCESS TRENDS', data);

    $.each(data, function(i, stock) {

        if(consoleOutput) console.log('->', i, stock);

        var id = i.split(':')[0];
        var last = stock.ticks.length;

        var latest = stock.ticks[last-1].close;
        var purchaseDate = $('#'+id).data('date');
        var firstPrice = $('#'+id).data('first-price');
        var now3dago = moment().subtract(3, 'days').unix();

        if(interval == '3d'){

            var charts = [];
            charts = [now3dago];
            var chartData = [];
            $.each(charts, function(){
                chartData.push([]);
            });
            $.each(stock.ticks, function(i, tick){
                if(tick.time > charts[0] && i % nth === 0){
                    chartData[0].push(toEur(tick.close));
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
            charts = [moment(purchaseDate).unix()];
            var chartData = [];
            $.each(charts, function(){
                chartData.push([]);
            });
            $.each(stock.ticks, function(i, tick){
                if(tick.time >= charts[0]){
                    chartData[0].push(toEur(tick.close));
                }
                // if(tick.time > charts[1]){
                //     chartData[1].push(tick.close);
                // }
                // if(tick.time > charts[2]){
                //     chartData[2].push(tick.close);
                // }
            });
        }

        if(generateCharts && $('#'+id).find('.trend').length){
            var bgc = 'rgba(255,255,255,1)';
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

                $('#'+id).find('.trend .charts.x'+interval+i).empty().append('<canvas id="'+id+interval+i+'"></canvas>');
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
                                if(colorDownhillTicks){
                                    return neg || value < firstPrice ? clNg : clPs;
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
                                ticks: {
                                    display: false,
                                    beginAtZero: false
                                }
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

            });
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

    // Get stock info
    stocks = stocks.join(',');
    if(mockData == true){

        if(consoleOutput) console.log('PROCESS STOCKS', mockStocks.result);

        processStocks(mockStocks.result);
        processTrends(mockTrends5y.result, '5y');
        processTrends(mockTrends3d.result, '3d');
        $('.loader').hide();
        $('.stocks').show();
    } else {
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
            if(consoleOutput) console.log('STOCK INFO:', response);
            processStocks(response.result);
        });

        // 5y
        var stockTrends = {
            "async": false,
            "crossDomain": true,
            "url": api_history5y+stocks,
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
            if(consoleOutput) console.log('5 YEAR TICKS:', response);
            processTrends(response.result, '5y');
        });

        // 3d
        var stockTrends2 = {
            "async": false,
            "crossDomain": true,
            "url": api_history3d+stocks,
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
            if(consoleOutput) console.log('3 DAY TICKS:', response);
            processTrends(response.result, '3d');
            $('.loader').hide();
            $('.stocks').show();
        });

    }
}

function calcTotals(){
    
    var xpurchaseTotal = totalInvested;
    var liquidationsTotal = totalLiquid;

    var xmarketDiff = 0;
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
            $('.tops.titles .paid').html('investment - sales return');
        } else {
            $('.tops.titles .paid').html('investment total');
        }
    });
    $('.tops.values .difference').click(function(){
        if($(this).find('.eur-with-sales').is(':visible')){
            $('.tops.titles .difference').html('change + sales return');
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

$(document).ready(function(){

    if(generateCharts){
        if(defaultChart=='sincePurchase'){
            $('.trend').prepend('<div class="charts x5y0 hidden"></div><div class="charts x3d0 hidden"></div>');
        } else {
            $('.trend').prepend('<div class="charts x3d0 hidden"></div><div class="charts x5y0 hidden"></div>');
        }
    }

    initProcess();
    fetchLoop = setInterval(function(){
        initProcess();
    }, refreshInterval);
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
});
