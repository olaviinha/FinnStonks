//---------------------------------------------------------------------------------------------
// - GENERAL ----------------------------------------------------------------------------------

// rapidapi.com API key
var api_key = 'PASTE YOUR RAPIDAPI.COM API KEY HERE';

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
var effectiveDate = 'first';

// Truncate company name to this many characters. Set to 0 for no truncation.
var truncateTo = 10;

// Refresh every n minutes. (5 hours = 300 minutes)
var refreshInterval = 30;

// ...but only between these hours.
var refreshDuring = [16, 23];

//---------------------------------------------------------------------------------------------
// - CHARTS / PRICE DEVELOPMENT ---------------------------------------------------------------

// Generate charts. If false, only textual 3d history is shown instead.
var generateCharts = true;

// How long price history to display in default chart of stocks you own.
// a) 'w1' = 1 week
// b) 'w2' = 2 weeks
// c) 'm1' = 1 month
// d) 'm3' = 3 months
// e) 'm6' = 6 months
var defaultChart = 'm1';

// How many years of price history is displayed in charts.
// a) 1
// b) 3
// c) 5
var yearsBack = 1;

// How long history to display in the right hand side chart of LOOKOUT section.
// a) 'w1' = 1 week
// b) 'w2' = 2 weeks
// c) 'm1' = 1 month
// d) 'm3' = 3 months
// e) 'm6' = 6 months
// f) defaultChart = same as default chart in stocks.
var rightChart = defaultChart;

// In LOOKOUT section, align left and right charts to the current market price (horizontal line).
var syncScale = false;

// Which three price changes (in percents) to display on the right side of the charts.
// a) 'w1' = 1 week
// b) 'w2' = 2 weeks
// c) 'm1' = 1 month
// d) 'm3' = 3 months
// e) 'm6' = 6 months
var displayChanges = ['m1', 'm3', 'm6'];

// This option will color each chart ticks red, if lower than the previous tick,
// i.e. red point in chart whenever price has gone down instead of up. 
//  Otherwise only ticks that are lower than purchase price will be colored red.
var colorDownhillTicks = true;

// In graphic charts, include only every nth tick. This will produce a less detailed but 
// visually cleaner chart, handy especially if colorDownhillTicks above is true.
var nth = 1;

//---------------------------------------------------------------------------------------------
// - LAYOUT (experimental settings) -----------------------------------------------------------

// Display portfolio section and followed stocks section side by side or stacked
// a) 'cols' = portfolio and followed side by side in that order.
// b) 'cols-reverse' = followed and portfolio side by side in that order.
// b) 'rows' = portfolio and followed stacked.
var layoutDirection = 'cols-reverse';

// Color scheme, etc.
// a) 'light' = darker texts, for light backgrounds
// b) 'dark' = lighter texts, for dark backgrounds
var theme = 'dark';
var bgImage = false;         // Show 'stock-bg.jpg' as page background.
var bgBox = false;           // Show translucent box. May be useful with some background images.
var veryCompact = false;     // Force-hide all secondary information, despite later settings.

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
var consoleOutput = false;  // Print stuff in browser console. This is automatically set to true if mockData is true.
var mockData = false;       // Use mocked stock trade data, 5y ticks and 3d ticks.
var printToCopy = false;    // Print only what's necessary to update mock data (copy-paste from browser console).
var devInterval = false;    // Overwrite refresh interval with 15 seconds.
var mockAlarm = false;      // Simulate alarm.

// Mock data
var mockEvents = '';
var mockStocks = {};
var mockWeekTicks = {};
var mockDayTicks = {};
var mockMinTicks = {};

//---------------------------------------------------------------------------------------------

var api_currency = 'https://api.exchangerate.host/latest?source=ecb';
var api_stock = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-compact?id=';
var api_quote = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/auto-complete?query=';
var rapidapi_host = 'bloomberg-market-and-financial-news.p.rapidapi.com';

var api_weekTicks = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart?interval=y5&id=';
var api_dayTicks = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart?interval=y1&id=';
var api_minTicks = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart?interval=d3&id=';

// var rates, rate, usd, eur;
var rates, y3data, y3dataLeft, y5data, y5dataLeft, stockContainerTpl, interestContainerTpl;
var buys = sells = [];
var includeSales = true;
var currency = {
    async: false,
    url: api_currency,
    method: 'GET'
};

var totalLiquid = 0;
var totalInvested = 0;
var totalReturns = 0;
var colsCreated = false;
var alarmLimit = -99;
var interestsContainer = '.interests';
refreshInterval = 1000 * 60 * refreshInterval;


if(devInterval == true) {
    refreshInterval = 15000;
    refreshDuring = [00, 24];
}
if(mockData && consoleOutput) console.log('Using refresh interval of 15 seconds.')
if(mockData) consoleOutput = true;
if(mockData && consoleOutput){ console.log('!!! USING MOCK DATA !!!'); console.log('MOCKED STOCK TRADE EVENTS:', mockStocks); console.log('MOCKED 5 YEAR TICKS', mockTrends5y); console.log('MOCKED 3 DAY TICKS', mockTrends3d); }

if(veryCompact) compactFollows = true;

// Work around Dropbox CORS headers
if(tradeEventsTxt.indexOf('www.dropbox.com') > -1){
    tradeEventsTxt = tradeEventsTxt.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('dl=0', 'raw=1').replace('dl=1', 'raw=1');
}

$.ajax(currency).done(function (response) {
    if(consoleOutput) console.log('Currency rates:', response);
    rates = response.rates;
});

function toEur(amount, currency) {
    return amount / rates[currency];
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
        var tpl = element==container ? stockContainerTpl : interestContainerTpl;
        var effectivePrice = details.avgPrice || details.price;
        tpl = tpl.replace('STOCK', symbol);
        // $(container).append(tpl);
        $(element).append(tpl);
        if(details.price){

            var withReturns = details.currentTotal + (details.salesTotal - details.purchasesTotal);
            if(withReturns==0) withReturns = details.currentTotal;
            var salesReturn = details.salesTotal - details.purchasesTotal;
            if(salesReturn < 0) salesReturn = 0;

            $('#'+id).attr('data-first-price', details.price); 
            $('#'+id).attr('data-avg-price', details.avgPrice);
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
            $('#'+id).find('.purchase .pcs').html(effectivePrice.toFixed(2) +' &times; <span class="highlight pcnr">'+details.pcs)+'</span>';
            $('#'+id).find('.invested').html(details.currentTotal.toFixed(2));
            $('#'+id).find('.invested-after-sales').html(details.balance.toFixed(2));
            paintReverse($('#'+id).find('.invested-after-sales'));
        }
        if(!details.price) {
            $('#'+id).attr('data-type', 'interest');
        }
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
                purchaseEvents: 1,
                purchasesPcs: Number(itm[2].trim()),
                purchasePrices: [Number(itm[3].trim())],
                purchasesTotal: Number(itm[2]) * Number(itm[3].trim()),
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
                    arrDetails[i].purchaseEvents += 1;
                    arrDetails[i].purchasesPcs += details.purchasesPcs;
                    arrDetails[i].purchasePrices.push(details.price);
                    arrDetails[i].purchasesTotal += details.purchasesTotal;
                    arrDetails[i].currentTotal += details.currentTotal;
                    arrDetails[i].balance += details.balance;
                    arrDetails[i].avgPrice = arrDetails[i].purchasePrices.reduce( ( p, c ) => p + c, 0 ) / arrDetails[i].purchasePrices.length;
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
    if(consoleOutput) console.log('filtered list', arrDetails);
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
        totalInvested += stock.currentTotal;
        if(includeCashouts == true && stock.pcs == 0){
            totalLiquid += stock.balance * -1;
        }
        if((includeCashouts == false || showCashouts == false) && stock.pcs == 0){
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
    if(events[2]) { 
        interests = events[2].split('\n').filter(function(line){return line.indexOf('#') != 0}); 
        if(consoleOutput) console.log('LOOKOUT', interests);
    }
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
    if(consoleOutput) console.log('--------------------------------------------------------------');
    if(consoleOutput) console.log('                      FIRE STONK STONKS');
    if(consoleOutput) console.log('--------------------------------------------------------------');

    totalLiquid = totalInvested = totalReturns = 0;
    y3data = y3dataLeft = y5data = y5dataLeft = null;
    buys = sells = [];
    includeSales = true;
    colsCreated = false;

    $(container).html('');
    $(interestsContainer).html('');
    
    if(mockData){
        var finalList = parseStocks(mockEvents);
        addRows(finalList);
        if(showFollows == true){
            var interestsList = parseInterests(mockEvents);
            if(layoutDirection=='rows' && !$('hr.large').length) $(container).append('<div class="hr large"></div>');
            addRows(interestsList, interestsContainer);
            finalList = finalList.concat(interestsList);
        }
        parseBuys(finalList);
    } else {
        $.get({
            url: tradeEventsTxt + '?' + new Date().getTime(),
            async: false,
            success: function(data) {
                if(consoleOutput || printToCopy) console.log('\x1b[35mRAW DATA (copy this to mockEvents):', data.replaceAll(" ", "").replaceAll("\n", '\\n'));

                var finalList = parseStocks(data);
                if(consoleOutput) console.log('ALL handled trade events:', finalList);
                addRows(finalList);

                if(showFollows == true){
                    var interestsList = parseInterests(data);
                    if(consoleOutput) console.log('All handled lookouts', interestsList);
                    if(layoutDirection=='rows' && !$('hr.large').length)  $(container).append('<div class="hr large"></div>');
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
        if(currency != 'EUR') price = toEur(price, currency);
        $('#'+id).attr('data-currency', currency);

        // UI
        $('#'+id).find('.name').html(name);
        $('#'+id).find('.symbol').html(symbol);
        $('#'+id).find('.exchange').html(exchange);

        if( type == 'trade'){

            // Calculate things
            var pcs =  Number($('#'+id).data('pcs'));
            var purchaseTotal = Number($('#'+id).data('current-total'));
            var perPc = purchaseTotal/pcs;
            var marketTotal = price*pcs;
            var marketTotalWithSales = marketTotal + Number($('#'+id).data('balance'));
            var diff = marketTotal-purchaseTotal;
            var percent = diff/purchaseTotal*100;
            var salesPL = Number($('#'+id).data('sales-total')) - Number($('#'+id).data('purchases-total'));
            var latest = currency=='EUR' ? Number(stock.last) : Number(toEur(stock.last, currency));
            
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
            paint($('#'+id).find('.market .primary.price'), marketTotal, purchaseTotal);

            // Second market price column
            $('#'+id).find('.percents').attr('data-purchase-total', purchaseTotal).attr('data-percent-amount', percent.toFixed(2)).attr('data-eur-amount', marketTotal.toFixed(2));
            $('#'+id).find('.percents .percent').html(percent.toFixed(2));
            $('#'+id).find('.percents .eur').html(marketTotal.toFixed(2));
            $('#'+id).find('.percents .pcs').html(latest.toFixed(2) +' &times; <span class="highlight pcnr">'+pcs+'</span>');
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
        if( showChangeEur ){ $('#'+id).find('.market .first').removeClass('hidden'); }
        if( showPercent ){ $('#'+id).find('.percents .first').removeClass('hidden'); }
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

function makeChart(id, chartData, interval, i, price, type, begin, highest, lowest){

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
        Chart.defaults.global.elements.point.radius = 1.2;
        
        Chart.defaults.global.elements.point.borderColor = 'rbga(0,0,0,0)';
        Chart.defaults.global.elements.point.borderWidth = 0;
        Chart.defaults.global.elements.line.borderWidth = 1;
        Chart.defaults.global.legend.display = false;

        if (chartGen) chartGen.destroy();
        var targetEl = type=='trade' ? defaultChart : rightChart;
        if(interval=='full') targetEl = type=='trade' ? 'charts.alltime' : 'left-chart';
        var canvas = '<canvas id="'+id+interval+i+'" data-high="'+highest+'" data-low="'+lowest+'" data-hline="'+price+'"></canvas>';
        $('#'+id).find('.'+targetEl).empty().append(canvas);
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
                            return neg || value < price ? clNg : clPs;
                        }
                        if(type == 'interest'){
                            return neg || value < price ? clNg : clPs;
                            // return neg ? clNg : clPs;
                        }
                        return value < price ? clNg : clPs;
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
                        value: price,
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

        if(type=='trade') {
            $('#'+id).find('.trend, .charts.default').removeClass('hidden');
        }
        if(type=='interest') {
            $('#'+id).find('.trends').removeClass('hidden');
        }

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
        if(consoleOutput && stock.hasOwnProperty('restricted')) console.log('No chart data available, skip chart');
        if(stock.hasOwnProperty('ticks') && stock.ticks.length > 0){

            var id = i.split(':')[0];
            var last = stock.ticks.length;
            var latest = stock.ticks[last-1].close;
            var highest = Number(stock.high);
            var lowest = Number(stock.low);
            var ocurLatest = latest;
            var currency = $('#'+id).data('currency');
            // var comp = currency == 'USD' ? ocurLatest : latest;
            latest = currency != 'EUR' ? toEur(latest, currency) : latest;
            ocurLatest = comp = latest;

            var type = $('#'+id).data('type');
            var purchaseDate = $('#'+id).data('date');
            var firstPrice = $('#'+id).data('first-price');
            var avgPrice = $('#'+id).data('avg-price');
            var now3dago = moment().subtract(3, 'days').unix();

            if(consoleOutput) console.log('Collect', interval, 'chart data for', id);

            var lenMap = {
                'd3': 3,
                'w1': 7,
                'w2': 14,
                'm1': 30,
                'm3': 91,
                'm6': 182,
                'y1': 365,
                'y3': 156,
                'y5': 260,
            }

            if(interval == 'minTicks'){

                var charts = [];
                charts = [now3dago];
                var chartData = [];
                $.each(charts, function(){
                    chartData.push([]);
                });
                $.each(stock.ticks, function(i, tick){
                    if((type == 'interest') || (type == 'trade' && i % nth === 0)){
                        if(currency != 'EUR' && type=='trade'){
                            chartData[0].push( toEur(tick.close, currency) );
                        } else {
                            chartData[0].push( tick.close );
                        }
                    }
                });

                var d3data = [chartData[0]];

                var close3daysAgo = stock.ticks[last-4].close;
                var close2daysAgo = stock.ticks[last-3].close;
                var closeYesterday = stock.ticks[last-2].close;
                d3e = close2daysAgo - close3daysAgo;
                d2e = closeYesterday - close2daysAgo;
                d1e = comp - closeYesterday;
                d3p = (1 - close3daysAgo/close2daysAgo) * 100;
                d2p = (1 - close2daysAgo/closeYesterday) * 100;
                d1p = (1 - closeYesterday/comp) * 100;
                if(mockData && mockAlarm && id=='MSFT'){
                    d1p = -4;
                    d2p = -5;
                    d3p = -6;
                }
                $('#'+id).find('.trend .eur .x1').html(d1e.toFixed(2));
                $('#'+id).find('.trend .eur .x2').html(d2e.toFixed(2));
                $('#'+id).find('.trend .eur .x3').html(d3e.toFixed(2));
                $('#'+id).find('.trend .percent .x1').html(d1p.toFixed(2));
                $('#'+id).find('.trend .percent .x2').html(d2p.toFixed(2));
                $('#'+id).find('.trend .percent .x3').html(d3p.toFixed(2));
                paint($('#'+id).find('.trend .x1'), d1p);
                paint($('#'+id).find('.trend .x2'), d2p);
                paint($('#'+id).find('.trend .x3'), d3p);
                if(d1p < alarmLimit && d2p < alarmLimit && d3p < alarmLimit){
                    $('#'+id).addClass('alarm');
                }

            } else if (interval == 'weekTicks' && yearsBack > 1) {

                charts = type == 'trade' ? [moment(purchaseDate).unix()] : [moment().subtract(yearsBack, 'y').unix()];
                var chartData = [];
                $.each(charts, function(){
                    chartData.push([]);
                });
                $.each(stock.ticks, function(i, tick){
                    if((type == 'interest') || (type == 'trade' && i % nth === 0)){
                        if(currency != 'EUR'){
                            chartData[0].push( toEur(tick.close, currency) );
                        } else {
                            chartData[0].push( tick.close );
                        }
                    }
                });

                
                y5data = [chartData[0].slice(Math.max(chartData[0].length - 260, 0))];
                y3data = [chartData[0].slice(Math.max(chartData[0].length - 156, 0))];

                y5dataLeft = [chartData[0].slice(0, chartData[0].length-lenMap[rightChart])];
                y3dataLeft = [chartData[0].slice(0, chartData[0].length-lenMap[rightChart])];

                var dataMap = {
                    'y3': y3data,
                    'y5': y5data,
                };
    
                var dataMapLeft = {
                    'y3': y3dataLeft,
                    'y5': y5dataLeft,
                };

                var yb = 'y'+yearsBack;
                var leftData = dataMapLeft[yb];

                if(generateCharts && yearsBack > 1){
                    var begin = false;
                    
                    if(type=='interest') {
                        firstPrice = ocurLatest;
                        makeChart(id, leftData, 'full', i, firstPrice, type, begin, highest, lowest);
                        
                    }
                    if(type=='trade') {
                        var usePrice = avgPrice || firstPrice;
                        makeChart(id, leftData, 'full', i, usePrice, type, begin, highest, lowest);   
                    }
                }

            } else {

                // Day ticks
                charts = type == 'trade' ? [moment(purchaseDate).unix()] : [moment().subtract(yearsBack, 'y').unix()];
                var chartData = [];
                $.each(charts, function(){
                    chartData.push([]);
                });
                $.each(stock.ticks, function(i, tick){
                    if((type == 'interest') || (type == 'trade' && i % nth === 0)){
                        if(currency != 'EUR' && type=='trade'){
                            chartData[0].push( toEur(tick.close, currency) );
                        } else {
                            chartData[0].push( tick.close );
                        }
                    }
                });

                var y1val = chartData[0][chartData[0].length - 260] || chartData[0][0];
                var m6val = chartData[0][chartData[0].length - 128] || chartData[0][0];
                var m3val = chartData[0][chartData[0].length - 63] || chartData[0][0];
                var m1val = chartData[0][chartData[0].length - 21] || chartData[0][0];
                var w2val = chartData[0][chartData[0].length - 10] || chartData[0][0];
                var w1val = chartData[0][chartData[0].length - 5] || chartData[0][0];

                var y1changeCustom = (comp - y1val) / y1val * 100;
                var m6changeCustom = (comp - m6val) / m6val * 100;
                var m3changeCustom = (comp - m3val) / m3val * 100;
                var m1changeCustom = (comp - m1val) / m1val * 100;
                var w2changeCustom = (comp - w2val) / w2val * 100;
                var w1changeCustom = (comp - w1val) / w1val * 100;

                $('#'+id).find('.y1change').html(y1changeCustom.toFixed(2));
                $('#'+id).find('.m6change').html(m6changeCustom.toFixed(2));
                $('#'+id).find('.m3change').html(m3changeCustom.toFixed(2));
                $('#'+id).find('.m1change').html(m1changeCustom.toFixed(2));
                $('#'+id).find('.w2change').html(w2changeCustom.toFixed(2));
                $('#'+id).find('.w1change').html(w1changeCustom.toFixed(2));

                paint($('#'+id).find('.y1change'));
                paint($('#'+id).find('.m6change'));
                paint($('#'+id).find('.m3change'));
                paint($('#'+id).find('.m1change'));
                paint($('#'+id).find('.w2change'));
                paint($('#'+id).find('.w1change'));

                displayChanges.forEach(function(change, i){
                    $('#'+id).find('.'+change+'change').removeClass('hidden');
                });

                var mediani = currency!='EUR' ? toEur(median(chartData[0]), currency) : median(chartData[0]);
                $('#'+id).find('.purchase .price.eur').append('<br><span class="dim xs">'+mediani.toFixed(2)+'</span> ');

                var w1data = [chartData[0].slice(Math.max(chartData[0].length - 7, 0))];
                var w2data = [chartData[0].slice(Math.max(chartData[0].length - 14, 0))];
                var m1data = [chartData[0].slice(Math.max(chartData[0].length - 30, 0))];
                var m3data = [chartData[0].slice(Math.max(chartData[0].length - 91, 0))];
                var m6data = [chartData[0].slice(Math.max(chartData[0].length - 182, 0))];
                var y1data = [chartData[0]];
                var y1dataLeft = [chartData[0].slice(0, chartData[0].length-lenMap[rightChart])];

                var dataMap = {
                    'd3': d3data,
                    'w1': w1data,
                    'w2': w2data,
                    'm1': m1data,
                    'm3': m3data,
                    'm6': m6data,
                    'y1': y1data,
                };
    
                var dataMapLeft = {
                    'y1': y1dataLeft,
                    'y3': y3dataLeft,
                    'y5': y5dataLeft,
                };
    
                if(generateCharts){
                    var begin = false;
                    if(type=='interest') {
                        firstPrice = ocurLatest;
                        if(yearsBack == 1){
                            makeChart(id, dataMapLeft['y1'], 'full', i, firstPrice, type, begin, highest, lowest);
                        }
                        makeChart(id, dataMap[rightChart], interval, i, firstPrice, type, begin, highest, lowest);
                    }
                    if(type=='trade') {
                        var usePrice = avgPrice || firstPrice;
                        if(yearsBack == 1){
                            makeChart(id, dataMapLeft['y1'], 'full', i, usePrice, type, begin, highest, lowest);
                        }
                        makeChart(id, dataMap[defaultChart], interval, i, usePrice, type, begin, highest, lowest);
                    }
                }

            }

        } //if .historical

    }); //each

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
        processTrends(mockWeekTicks.result, 'weekTicks');
        processTrends(mockDayTicks.result, 'dayTicks');
        processTrends(mockMinTicks.result, 'minTicks');

        if(consoleOutput) console.log( 'Adjust vertical align', $(container).height(), 'vs.', $(window).height());
        setTimeout(function(){
            if($(container).height() < $(window).height()) $(container).addClass('vmid');
        }, 500);
        if(veryCompact) $('.hr').removeClass('large');
        finalize();

    } else {

        if(consoleOutput) console.log('Send request to get stock info on', stocks);
        var stockInfo= {
            "async": false,
            "crossDomain": true,
            "url": api_stock+stocks,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": api_key,
                "x-rapidapi-host": rapidapi_host
            }
        };
        $.ajax(stockInfo).fail(function(response){
            $('.loader').hide();
            $('.stocks-container .message').html('<div class="err">Bloomberg\'s API responded:</div>'+response.responseJSON.message).show();
        }).done(function (response) {
            if(consoleOutput || printToCopy) console.log('\x1b[35mSTOCK INFO - response from get-compact?id=... - Copy this to var mockStocks:', response);
            processStocks(response.result);
        });

        stockChunks.forEach(function(chunk, idx){
            var requestStocks = chunk.join(',');

            // Week ticks
            if(yearsBack > 1 || displayChanges.includes('alltime')) {
                if(consoleOutput) console.log('Send request to get weekTicks on', requestStocks);
                var stockTrends = {
                    "async": false,
                    "crossDomain": true,
                    "url": api_weekTicks+requestStocks,
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": api_key,
                        "x-rapidapi-host": rapidapi_host
                    }
                };
                $.ajax(stockTrends).fail(function(response){
                    $('.loader').hide();
                    $('.stocks-container .message').html('<div class="err">Bloomberg\'s API responded:</div>'+response.responseJSON.message).show();
                }).done(function(response) {
                    if(consoleOutput || printToCopy) console.log('\x1b[35mWEEK TICKS - response from get-price-chart?interval=y5 - Copy this to var mockWeekTicks:', response);
                    processTrends(response.result, 'weekTicks');
                });
            }

            // Min ticks
            if(defaultChart.includes('3d')) {
                if(consoleOutput) console.log('Send request to get minTicks on', requestStocks);
                if(defaultChart == '3d' || rightChart.includes('')){
                    if(consoleOutput) console.log('Send request to get 3d price data on', requestStocks);
                    var stockTrends2 = {
                        "async": false,
                        "crossDomain": true,
                        "url": api_minTicks+requestStocks,
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-key": api_key,
                            "x-rapidapi-host": rapidapi_host
                        }
                    };
                    $.ajax(stockTrends2).fail(function(response){
                        $('.loader').hide();
                        $('.stocks-container .message').html('<div class="err">Bloomberg\'s API responded:</div>'+response.responseJSON.message).show();
                    }).done(function(response) {
                        if(consoleOutput || printToCopy) console.log('\x1b[35mMINUTE TICKS - response from get-price-chart?interval=d3... - Copy this to var mockMinTicks:', response);
                        processTrends(response.result, 'minTicks');
                    });
                }
            }

            // Day ticks
            if(consoleOutput) console.log('Send request to get dayTicks on', requestStocks);
            var stockTrends = {
                "async": false,
                "crossDomain": true,
                "url": api_dayTicks+requestStocks,
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": api_key,
                    "x-rapidapi-host": rapidapi_host
                }
            };
            $.ajax(stockTrends).fail(function(response){
                $('.loader').hide();
                $('.stocks-container .message').html('<div class="err">Bloomberg\'s API responded:</div>'+response.responseJSON.message).show();
            }).done(function(response) {
                if(consoleOutput || printToCopy) console.log('\x1b[35mDAY TICKS - response from get-price-chart?interval=y1 - Copy this to var mockDayTicks:', response);
                processTrends(response.result, 'dayTicks');

                if (idx === stockChunks.length - 1){ 
                    if(consoleOutput) console.log( 'Adjust vertical align', $(container).height(), 'vs.', $(window).height());
                    if($(container).height() < $(window).height()) $(container).addClass('vmid');
                    if(veryCompact) $('.hr').removeClass('large');
                    finalize();
                }
            });


        });

    }
}

function calcTotals(){

    var sold = 0;
    $(container).find('.trade').each(function(){
        sold += Number($(this).data('return'));
    });
    
    var xpurchaseTotal = totalInvested;
    var liquidationsTotal = totalLiquid + sold;
    var xmarketDiff = 0;

    if (consoleOutput) console.log('Sales returns total:', liquidationsTotal);

    $(container).find('.market .first .price.eur').each(function(){
        xmarketDiff += Number($(this).html());
    });

    var xpercentageTotal = xmarketDiff/xpurchaseTotal*100;
    var xmarketTotal = xpurchaseTotal+xmarketDiff;
    var totalWithLiquidations = xmarketTotal+liquidationsTotal;
    var xmarketDiffWithSales = xmarketDiff+liquidationsTotal;
    var xpurchaseTotalWithSales = xpurchaseTotal-liquidationsTotal;

    if( showTotalsTop == true ){
        $('.tops').remove();
        $(container).prepend('<div class="tops values"><div class="paid"><div class="eur"></div><div class="eur-excl-sales hidden"></div></div><div class="difference"><div class="percent"></div><div class="eur hidden"></div><div class="eur-with-sales hidden"></div></div><div class="pvalue"><div class="value hidden"></div><div class="value-with-liquid hidden"></div><div class="value-only-liquid hidden"></div></div></div>');
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

        $(container).prepend('<div class="tops titles"><div class="paid">investment total</div><div class="difference">change</div><div class="pvalue"><div class="value hidden">current value</div><div class="value-with-liquid hidden">value + sales return</div><div class="value-only-liquid hidden">sales return only</div></div></div>');
        paint($('.tops.values .difference .eur, .tops.values .difference .percent, .tops.values .value'), xmarketDiff);
        paint($('.tops.values .difference .eur-with-sales, .tops.values .value-with-liquid, .tops.values .value-only-liquid'));
        paintReverse($('.tops.values .paid .eur-excl-sales'));
    }
    if( showTotalsBottom == true){
        $('.totale').remove();
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
    if(consoleOutput) console.log('Initialize element clicks.');
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
    if(consoleOutput) console.log('-> cycle children of', el);
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
    const container = urlParams.get('container');
    const bg = urlParams.get('bg');
    const zoom = urlParams.get('zoom');
    const brightness = urlParams.get('brightness');
    const cursor = urlParams.get('cursor');
    if(consoleOutput) console.log('Apply CSS from URL params ->', 'container:', container, 'bg:', bg, 'zoom:', zoom, 'brightness', brightness, 'cursor:', cursor);
    if(bg)          $('body').css('background', bg);
    if(zoom)        $('body').css('zoom', zoom);
    if(brightness)  $('body').css('filter', 'brightness('+brightness+')');
    if(cursor)      $('body').css('cursor', cursor);
    if(container){
        // Do something with container.
    }
}

function processTickers(tickers){
    if(consoleOutput) console.log('process ticker');
    Object.keys(tickers).forEach(i => {  
        ticker = tickers[i]; 
        if(consoleOutput) console.log('->', i, ticker);
        var tpl = $('.result-template').html();
        tpl = tpl.replace('STOCK', 'res'+i);
        $('.query-ticker .results').append(tpl);
        $('#res'+i).find('.ticker').html(ticker.tickerName);
        $('#res'+i).find('.exchange').html(ticker.exchange+':');
        $('#res'+i).find('.name').html(ticker.name+',');
        $('#res'+i).find('.country').html(ticker.country);
        i++;
    });
    $('.loader').hide();
    
}

function queryTickers(quote){
    $('.loader').show();
    var stockInfo= {
        "async": false,
        "crossDomain": true,
        "url": api_quote+quote,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": api_key,
            "x-rapidapi-host": rapidapi_host
        }
    };
    $.ajax(stockInfo).fail(function(response){
        $('.loader').hide();
        $('.stocks-container .message').html('<div class="err">Bloomberg\'s API responded:</div>'+response.responseJSON.message).show();
    }).done(function (response) {
        if(consoleOutput || printToCopy) console.log('\x1b[35mSTOCK INFO - response from get-compact?id=... - Copy this to var mockStocks:', response);
        processTickers(response.quote);
    });
}

function finalize() {
    
    checkUrlParams();
    if(consoleOutput) console.log('ALL DONE. Show page.');

    if(layoutDirection=='cols' || layoutDirection=='cols-reverse'){
        $('.stocks-container').css({
            'max-width': '1200px',
            'height': 'auto'
        }).addClass('row');
        var portfolioEl = '<div class="portfolio col-6 col-left"></div>';
        var lookoutEl = '<div class="lookout col-6 col-right"></div>';
        var leftcol = layoutDirection=='cols' ? portfolioEl : lookoutEl;
        var rightcol = layoutDirection=='cols' ? lookoutEl : portfolioEl;
        $('.portfolio, .lookout').remove();
        $('.stocks-container').append(leftcol+rightcol);
        if(layoutDirection=='cols-reverse') $('.portfolio, .lookout').toggleClass('col-left col-right');

        $(container).find('.base.trade, .tops').each(function(){
            $(this).appendTo('.portfolio');
        });
        $(interestsContainer).find('.base.interest').each(function(){
            $(this).appendTo('.lookout');
        });

        $('.stocks-container').find('.stocks, .interests').hide();
        $('.stocks-container').find('.portfolio, .lookout').show();
        $('.stocks-container').find('.col-left').css({
            'padding-right': '30px',
            'border-right': '1px solid rgba(250,250,250,.1)'
        });
        $('.stocks-container').find('.col-right').css({
            'padding-left': '30px',
        });

        colsCreated = true;
    } else {
        $(container).show();
    }
    $('.loader').hide();
    initClicks();
    
}

let refreshWorker = new Worker('autorefresh.js');
$(document).ready(function(){

    // Prep
    $('.base .trend .charts.alltime').addClass('sincePurchase');
    $('.base .trend .charts.default').addClass(defaultChart);
    $('.base.interest .trends.left-chart').addClass('y'+yearsBack);
    $('.base.interest .trends.right-chart').addClass(rightChart);
    stockContainerTpl = $('.template').clone().html();
    interestContainerTpl = $('.interests-template').clone().html();

    // Init
    initProcess();

    // General
    if(consoleOutput) console.log('Refresh every', refreshInterval/1000, 'sec');
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
    $(document).keyup(function(e) {
        e = e.originalEvent;
        if(e.key == 'q' && !$('.query-ticker input').is(':focus')){
          $('.query-ticker').toggle();
          setTimeout(function(){
            $('.query-ticker input').focus();
          }, 100);
        }
    });
    $('.query-ticker input').keydown(function(ee) {
        if(ee.code == 'Enter'){
            $('.query-ticker button.search').click();
        }
        if(ee.code == 'Escape'){
            $('.query-ticker').hide();
        }
    });
    $('button.close').unbind().click(function(){
        $('.query-ticker').hide();
    });
    $('.query-ticker button').click(function(){
        queryTickers($('.query-ticker input').val());
    });
});
