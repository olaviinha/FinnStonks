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

// Refresh every n minutes. (5 hours = 300 minutes)
var refreshInterval = 300;

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


//---------------------------------------------------------------------------------------------
// - LOOKOUT ----------------------------------------------------------------------------------

// How many years to display in the left chart.
var yearsBack = 3;

// Which three price changes (in percents) to display on the right side of the charts.
// Options: 
//  - alltime (up to yearsBack value)
//  - y1 (1 year)
//  - m6 (6 months)
//  - m3 (3 months)
//  - m1 (1 month)
//  - w2 (2 weeks)
//  - w1 (1 week)
var displayChanges = ['y1', 'm3', 'm1'];

// Align left and right charts to the current market price (horizontal line).
var syncScale = false;


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
var printToCopy = false;    // Print only what's necessary to update mock data (copy-paste from browser console).
var consoleOutput = false;  // Print stuff in browser console. This is always true for mockData.
var mockData = false;       // Use mocked stock trade data, 5y ticks and 3d ticks.
var mockAlarm = false;      // Simulate alarm.

// When doing development, styling, etc., you can mock API responses by copy-pasting the actual responses from 
// browser console or Network tab to variables below. This way FinnStonks will not consume API calls while you keep 
// refreshing the page frequently. Set printToCopy (above) to true and copy-paste responses from browser accordingly below:
var mockEvents = '';
var mockStocks = {};
var mockTrends5y = {};
var mockTrends3d = {};

//---------------------------------------------------------------------------------------------

var api_currency = 'https://api.exchangeratesapi.io/latest';
var api_stock = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-compact?id=';
var api_history5y = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart?interval=y5&id='
var api_history3d = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart?interval=d3&id='

// var rates, rate, usd, eur;
var rates;
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
refreshInterval = 1000 * 60 * refreshInterval;


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
                if(consoleOutput || printToCopy) console.log('\x1b[35mRAW DATA (copy this to mockEvents):', data.replaceAll(" ", "").replaceAll("\n", '\\n'));

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
        if(currency != 'EUR') price = toEur(price, currency);
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
        Chart.defaults.global.elements.point.radius = 1.2;
        
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
                            return neg || value < firstPrice ? clNg : clPs;
                            // return neg ? clNg : clPs;
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
        var comp = currency == 'USD' ? ocurLatest : latest;

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
                    if(currency != 'EUR' && type=='trade'){
                        chartData[0].push(toEur(tick.close, currency));
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
            d1e = comp - closeYesterday;
            d3p = (1 - close3daysAgo/close2daysAgo) * 100;
            d2p = (1 - close2daysAgo/closeYesterday) * 100;
            d1p = (1 - closeYesterday/comp) * 100;
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
                var alltimeval = chartData[0][0];
                var y1val = chartData[0][chartData[0].length - 52] || chartData[0][0];
                var m6val = chartData[0][chartData[0].length - 26] || chartData[0][0];
                var m3val = chartData[0][chartData[0].length - 13] || chartData[0][0];
                var m1val = chartData[0][chartData[0].length - 4] || chartData[0][0];
                var w2val = chartData[0][chartData[0].length - 2] || chartData[0][0];
                var w1val = chartData[0][chartData[0].length - 1] || chartData[0][0];
                var alltimeCustom = (comp - alltimeval) / alltimeval * 100;
                var y1changeCustom = (comp - y1val) / y1val * 100;
                var m6changeCustom = (comp - m6val) / m6val * 100;
                var m3changeCustom = (comp - m3val) / m3val * 100;
                var m1changeCustom = (comp - m1val) / m1val * 100;
                var w2changeCustom = (comp - w2val) / w2val * 100;
                var w1changeCustom = (comp - w1val) / w1val * 100;

                $('#'+id).find('.alltimechange').html(alltimeCustom.toFixed(2));
                $('#'+id).find('.y1change').html(y1changeCustom.toFixed(2));
                $('#'+id).find('.m6change').html(m6changeCustom.toFixed(2));
                $('#'+id).find('.m3change').html(m3changeCustom.toFixed(2));
                $('#'+id).find('.m1change').html(m1changeCustom.toFixed(2));
                $('#'+id).find('.w2change').html(w2changeCustom.toFixed(2));
                $('#'+id).find('.w1change').html(w1changeCustom.toFixed(2));

                paint($('#'+id).find('.alltimechange'));
                paint($('#'+id).find('.y1change'));
                paint($('#'+id).find('.m6change'));
                paint($('#'+id).find('.m3change'));
                paint($('#'+id).find('.m1change'));
                paint($('#'+id).find('.w2change'));
                paint($('#'+id).find('.w1change'));

                displayChanges.forEach(function(change, i){
                    $('#'+id).find('.'+change+'change').removeClass('hidden');
                });

                var mediani = median(chartData[0]);
                $('#'+id).find('.purchase .price.eur').append('<br><span class="dim xs">'+mediani.toFixed(2)+'</span> ');
                // $('#'+id).find('.purchase .price.eur').append('<span class="dim xs">↥'+highest.toFixed(2)+'</span> ');
                // $('#'+id).find('.purchase .price.eur').append('<span class="dim xs">↧'+lowest.toFixed(2)+'</span>');
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
        setTimeout(function(){
            if($(container).height() < $(window).height()) $(container).addClass('vmid');
        }, 500);
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
            if(consoleOutput || printToCopy) console.log('\x1b[35mSTOCK INFO - response from get-compact?id=... - Copy this to var mockStocks:', response);
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
                if(consoleOutput || printToCopy) console.log('\x1b[35m5 YEAR TICKS - response from get-price-chart?interval=y5 - Copy this to var mockTrends5y:', response);
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
                if(consoleOutput || printToCopy) console.log('\x1b[35m3 DAY TICKS - response from get-price-chart?interval=d3... - Copy this to var mockTrends3d:', response);
                processTrends(response.result, '3d');

                if (idx === stockChunks.length - 1){ 
                    if(consoleOutput) console.log( 'Adjust vertical align', $(container).height(), 'vs.', $(window).height());
                    if($(container).height() < $(window).height()) $(container).addClass('vmid');
                    if(veryCompact) $('.hr').removeClass('large');
                    if(consoleOutput) console.log('ALL DONE. Show page.');
                    $('.loader').hide();
                    $('.stocks').show();
                    initClicks();
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

    if (consoleOutput) console.log('Sales returns total:', liquidationsTotal);

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
