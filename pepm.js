//---------------------------------------------------------------------------------------------
//--- Settings --------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

// rapidapi.com API key
rapidApiKey = 'PASTE YOUR RAPIDAPI.COM API KEY HERE';

// Element in which to place the stock table
var container = '.stocks';

// Color scheme, etc.
// a) 'light' = darker texts, for light backgrounds
// b) 'dark' = lighter texts, for dark backgrounds
var theme = 'dark';
var bgImage = false;         // Show 'stock-bg.jpg' as page background.
var bgBox = false;           // Show translucent box. May be useful with some background images.

// What to show on page
var showSymbol = false;     // Symbol in front of company's long name.
var showName = true;        // Long name of the company.
var showExchange = true;    // Long name of the exchange.
var showDate = true;        // Date purchased.
var showQuantity = true;    // How many stocks owned.
var showPrice = true;       // Purchase price.
var showChangeEur = true;   // Show all-time change in EUR.
var showPercent = true;     // Show all-time change in percentage.
var showTrend = true;       // Show day-by-day change for past 3 days.
var showTotalsTop = true;   // Show totals on top. Note that this is different than below.
var showTotalsBottom = false;// Show totals on bottom. Note that this is different than above.

// Date to display in case you have purchased the same stock on multiple occasions. Either
// a) 'first' = first purchase.
// b) 'last' = last purchase date.
var effectiveDate = 'first';

// Highlight row with an alarm if the closing price has dropped at least this many percent
// consecutively for three days.
var alarmLimit = -1;

// Shown change in EUR (buy vs. worth price omparison) in either:
// a) 'total' = current market price of your holdings of the company in total.
// b) 'difference' = difference between current market price and the original purchase price.
var viewChangeIn = 'difference';

// Shown 3 day closing price history in either:
// a) 'eur' = euros.
// b) 'percent' = percentage.
var viewTrendIn = 'percent';

// Truncate company name to this many characters (if narrow space)
var truncateTo = 10;

// Include liquidation turnovers in totals. I.e. when you have sold stocks, add the
// profits or losses of those trades in the numbers displayed on page.
// false = stock liquidations will only correct the amounts and values of your current holdings.
// true = profits/losses through liquidations will be included in all changes and totals.
var includeLiquidations = true;

// Refresh every n hours.
var refreshInterval = 3;

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------


// For development purposes: when you don't want to do API calls, set mockData to true:
var mockData = false;
var mockStocks = {"result":{"OR:FP":{"securityType":"Common Stock","symbol":"OR","exchange":"EN Paris","country":"France","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"or:fp","tickerName":"OR:FP","template":"Stock","tinyName":"L'Oreal SA","name":"L'Oreal SA","watchlist":true,"resourceId":"OR:FP","last":"309.4","netChange":"3.6","lastPriceTime":1606480476,"pctChange1M":"7.8","yearHigh":"321.4","dayHigh":"309.8","volume":182769.0,"yearLow":"196.0","dayLow":"305.0","pctChangeYTD":"15.8","lastPriceAllSessions":"309.4","lastPriceTimeAllSessions":1606480476,"pctChange":"1.18"},"MSFT:US":{"securityType":"Common Stock","symbol":"MSFT","exchange":"NASDAQ GS","country":"United States","currency":"USD","resourceType":"Company","fundamentalDataCurrency":"USD","resourceSubtype":"Public","region":"AMERICAS","ticker":"msft:us","tickerName":"MSFT:US","template":"Stock","tinyName":"Microsoft Corp","name":"Microsoft Corp","watchlist":true,"resourceId":"MSFT:US","last":"213.87","netChange":"0.01","lastPriceTime":1606280400,"pctChange1M":"0.29","yearHigh":"232.86","dayHigh":"215.29","volume":21012887,"yearLow":"132.52","dayLow":"212.46","pctChangeYTD":"35.62","lastPriceAllSessions":"214.45","pctChange":"0.00"},"SAA1V:FH":{"securityType":"Common Stock","symbol":"SAA1V","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"saa1v:fh","tickerName":"SAA1V:FH","template":"Stock","tinyName":"Sanoma Oyj","name":"Sanoma Oyj","watchlist":true,"resourceId":"SAA1V:FH","last":"12.32","netChange":"0.00","lastPriceTime":1606480305,"pctChange1M":"-0.48","yearHigh":"13.18","dayHigh":"12.38","volume":26020.0,"yearLow":"6.84","dayLow":"12.14","pctChangeYTD":"30.23","lastPriceAllSessions":"12.32","lastPriceTimeAllSessions":1606480305,"pctChange":"0.00"},"TSLA:US":{"securityType":"Common Stock","symbol":"TSLA","exchange":"NASDAQ GS","country":"United States","currency":"USD","resourceType":"Company","fundamentalDataCurrency":"USD","resourceSubtype":"Public","region":"AMERICAS","ticker":"tsla:us","tickerName":"TSLA:US","template":"Stock","tinyName":"Tesla Inc","name":"Tesla Inc","watchlist":true,"resourceId":"TSLA:US","last":"574.00","netChange":"18.62","lastPriceTime":1606280400,"pctChange1M":"35.16","yearHigh":"574.00","dayHigh":"574.00","volume":48930162,"yearLow":"65.45","dayLow":"545.37","pctChangeYTD":"586.06","lastPriceAllSessions":"572.25","pctChange":"3.35"},"YEINT:FH":{"securityType":"Common Stock","symbol":"YEINT","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"yeint:fh","tickerName":"YEINT:FH","template":"Stock","tinyName":"Yleiselektroniikka Oyj","name":"Yleiselektroniikka Oyj","watchlist":true,"resourceId":"YEINT:FH","last":"33.2","netChange":"0.2","lastPriceTime":1606478954,"pctChange1M":"91.9","yearHigh":"34.0","dayHigh":"34.0","volume":1854.0,"yearLow":"9.9","dayLow":"32.2","pctChangeYTD":"217.0","lastPriceAllSessions":"33.2","lastPriceTimeAllSessions":1606478954,"pctChange":"0.61"}}};
var mockTrends = {"result":{"OR:FP":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1603803600,"close":287.1},{"time":1603890000,"close":278.8},{"time":1603976400,"close":279.1},{"time":1604062800,"close":277.7},{"time":1604325600,"close":283.9},{"time":1604412000,"close":290.2},{"time":1604498400,"close":299.9},{"time":1604584800,"close":298.8},{"time":1604671200,"close":297.0},{"time":1604930400,"close":311.0},{"time":1605016800,"close":315.4},{"time":1605103200,"close":319.0},{"time":1605189600,"close":317.3},{"time":1605276000,"close":314.2},{"time":1605535200,"close":317.5},{"time":1605621600,"close":316.6},{"time":1605708000,"close":314.6},{"time":1605794400,"close":310.8},{"time":1605880800,"close":312.1},{"time":1606140000,"close":306.3},{"time":1606226400,"close":295.9},{"time":1606312800,"close":304.4},{"time":1606399200,"close":305.8}],"low":"277.7","high":"319.0","first":1603803600,"last":1606399200,"security":{"ticker":"OR:FP","open":"305.0","prevClose":"287.1"},"hasVolume":false},"MSFT:US":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1603803600,"close":213.25},{"time":1603890000,"close":202.68},{"time":1603976400,"close":204.72},{"time":1604062800,"close":202.47},{"time":1604325600,"close":202.33},{"time":1604412000,"close":206.43},{"time":1604498400,"close":216.39},{"time":1604584800,"close":223.29},{"time":1604671200,"close":223.72},{"time":1604930400,"close":218.39},{"time":1605016800,"close":211.01},{"time":1605103200,"close":216.55},{"time":1605189600,"close":215.44},{"time":1605276000,"close":216.51},{"time":1605535200,"close":217.23},{"time":1605621600,"close":214.46},{"time":1605708000,"close":211.08},{"time":1605794400,"close":212.42},{"time":1605880800,"close":210.39},{"time":1606140000,"close":210.11},{"time":1606226400,"close":213.86},{"time":1606312800,"close":213.87}],"low":"202.33","high":"223.72","first":1603803600,"last":1606312800,"security":{"ticker":"MSFT:US","open":"215.11","prevClose":"213.25"},"hasVolume":false},"SAA1V:FH":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1603717200,"close":12.32},{"time":1603803600,"close":12.38},{"time":1603890000,"close":12.0},{"time":1603976400,"close":12.48},{"time":1604062800,"close":12.64},{"time":1604325600,"close":12.14},{"time":1604412000,"close":12.56},{"time":1604498400,"close":12.66},{"time":1604584800,"close":12.46},{"time":1604671200,"close":12.28},{"time":1604930400,"close":12.14},{"time":1605016800,"close":11.7},{"time":1605103200,"close":11.96},{"time":1605189600,"close":11.78},{"time":1605276000,"close":12.1},{"time":1605535200,"close":12.16},{"time":1605621600,"close":12.26},{"time":1605708000,"close":12.28},{"time":1605794400,"close":12.06},{"time":1605880800,"close":11.96},{"time":1606140000,"close":12.36},{"time":1606226400,"close":12.52},{"time":1606312800,"close":12.56},{"time":1606399200,"close":12.32}],"low":"11.7","high":"12.66","first":1603717200,"last":1606399200,"security":{"ticker":"SAA1V:FH","open":"12.56","prevClose":"12.32"},"hasVolume":false},"TSLA:US":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1603803600,"close":424.68},{"time":1603890000,"close":406.02},{"time":1603976400,"close":410.83},{"time":1604062800,"close":388.04},{"time":1604325600,"close":400.51},{"time":1604412000,"close":423.9},{"time":1604498400,"close":420.98},{"time":1604584800,"close":438.09},{"time":1604671200,"close":429.95},{"time":1604930400,"close":421.26},{"time":1605016800,"close":410.36},{"time":1605103200,"close":417.13},{"time":1605189600,"close":411.76},{"time":1605276000,"close":408.5},{"time":1605535200,"close":408.09},{"time":1605621600,"close":441.61},{"time":1605708000,"close":486.64},{"time":1605794400,"close":499.27},{"time":1605880800,"close":489.61},{"time":1606140000,"close":521.85},{"time":1606226400,"close":555.38},{"time":1606312800,"close":574.0}],"low":"388.04","high":"574.0","first":1603803600,"last":1606312800,"security":{"ticker":"TSLA:US","open":"550.06","prevClose":"424.68"},"hasVolume":false},"YEINT:FH":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1603803600,"close":17.3},{"time":1603890000,"close":16.7},{"time":1603976400,"close":17.5},{"time":1604062800,"close":17.4},{"time":1604325600,"close":17.1},{"time":1604412000,"close":17.3},{"time":1604498400,"close":17.3},{"time":1604584800,"close":18.6},{"time":1604671200,"close":18.5},{"time":1604930400,"close":18.9},{"time":1605016800,"close":19.0},{"time":1605103200,"close":19.0},{"time":1605189600,"close":19.8},{"time":1605276000,"close":20.4},{"time":1605535200,"close":22.2},{"time":1605621600,"close":25.2},{"time":1605708000,"close":24.4},{"time":1605794400,"close":24.2},{"time":1605880800,"close":25.6},{"time":1606140000,"close":27.8},{"time":1606226400,"close":27.8},{"time":1606312800,"close":29.0},{"time":1606399200,"close":33.0},{"time":1606485600,"close":33.0}],"low":"16.7","high":"33.0","first":1603803600,"last":1606485600,"security":{"ticker":"YEINT:FH","open":"33.0","prevClose":"17.3"},"hasVolume":false}}};

var rate, usd, eur;
var buys = new Array();
var sells = new Array();
var includeSales = true;
var currency = {
    async: false,
    url: 'https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,EUR',
    method: 'GET'
};

refreshInterval = 1000 * 60 * 60 * refreshInterval;

$.ajax(currency).done(function (response) {
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

function addRow(i, details){
    symbol = details.symbol.split(':')[0];
    id = symbol;
    total = details.pcs * details.price;
    if( $('#'+id).length ){
        if(effectiveDate=='last'){
            $('#'+id).find('.date').html(details.date);
        }
        prevPcs = Number($('#'+id).find('.pcs').html());
        prevTotal = Number($('#'+id).find('.price').html());
        newPcs = details.pcs + prevPcs;
        newTotal = total + prevTotal;
        $('#'+id).find('.pcs').html(newPcs);
        $('#'+id).find('.price').html(newTotal);
        if( $('#'+id).data('turnover') != ''){
            $('#'+id).attr('data-turnover', details.turnover + Number($('#'+id).data('turnover')));
        }
    } else {
        tpl = $('.template').html();
        tpl = tpl.replace('STOCK', symbol);
        $(container).append(tpl);
        $('#'+id).attr('data-turnover', details.turnover);
        $('#'+id).find('.date').html(details.date);
        $('#'+id).find('.pcs').html(details.pcs);
        $('#'+id).find('.price').html(total.toFixed(2));
    }
}

var sold = false;
function initProcess(){
    $.get({
        url: 'stocks.txt',
        async: false,
        success: function(data) {
            events = data.split('\n\n');
            buys = events[0].split('\n').filter(function(line){return line.indexOf('#') != 0});
            sells = events[1].split('\n').filter(function(line){return line.indexOf('#') != 0});
            buys.forEach(function(line, i){
                sold = false;
                var itm = line.split(';');
                var details = {
                    symbol: itm[0],
                    date: itm[1],
                    pcs: Number(itm[2]),
                    price: Number(itm[3]),
                    turnover: ''
                };
                sells.forEach(function(sline, i){
                    if(sline.split(';')[0] == details.symbol){
                        var sitm = sline.split(';');
                        sold = {
                            symbol: sitm[0],
                            date: sitm[1],
                            pcs: Number(sitm[2]),
                            price: Number(sitm[3])
                        };  
                    }
                });
                if(sold && includeSales){
                    paid = sold.pcs * details.price;
                    details.pcs = details.pcs-sold.pcs;
                    details.turnover = sold.pcs * sold.price - paid;
                }
                addRow(i, details);
            });
            parseBuys(buys);
        }
    });
}


function processStocks(data){
    $.each(data, function(i, stock) {
        currency = stock.currency;
        price = stock.last;
        symbol = stock.symbol;
        name = stock.name;
        exchange = stock.exchange;
        id = symbol;

        // Convert USD to EUR
        if(currency == 'USD'){
            price = toEur(price);
        }

        // Calculate things
        var pcs = Number($('#'+id).find('.pcs').html());
        var purchaseTotal = Number($('#'+id).find('.purchase .price').html());
        var marketTotal = price*pcs;
        if( includeLiquidations ){
            marketTotal = marketTotal + Number($('#'+id).data('turnover'));
        }
        var diff = marketTotal-purchaseTotal;
        var percent = diff/purchaseTotal*100;

        // UI
        $('#'+id).find('.name').html(name);
        $('#'+id).find('.symbol').html(symbol);
        $('#'+id).find('.exchange').html(exchange);

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
        if( showSymbol ){ $('#'+id).find('.symbol').removeClass('hidden'); }
        if( showName ){ $('#'+id).find('.name').removeClass('hidden'); }
        if( showExchange ){ $('#'+id).find('.exchange').removeClass('hidden'); }
        if( showDate ){ $('#'+id).find('.meta .date').removeClass('hidden'); }
        if( showQuantity ){ $('#'+id).find('.purchase .pcs').removeClass('hidden'); }
        if( showPrice ){ $('#'+id).find('.purchase .price').removeClass('hidden'); }
        if( showChangeEur ){ $('#'+id).find('.market .price.eur').removeClass('hidden'); }
        if( showPercent ){ $('#'+id).find('.percents .percent').removeClass('hidden'); }
        if( truncateTo > 0){
            var name = $('#'+id).find('.name').html();
            var firstWord = name.split(' ')[0];
            if(firstWord.length <= truncateTo+3){
                trunced = firstWord
            } else {
                trunced = truncateString(name, truncateTo);
            }
            $('#'+id).find('.name').html(trunced);
        }
    });

    calcTotals();
}

function paint(el, comp, base){
    base = (typeof base !== 'undefined') ?  base : 0.00
    if(comp > base){
        el.removeClass('neg').addClass('pos');
    } else if (comp < base){
        el.removeClass('pos').addClass('neg');
    }
}

function processTrends(data){
    $.each(data, function(i, stock) {
        var id = i.split(':')[0];
        var last = stock.ticks.length;
        var latest = stock.ticks[last-1].close;
        var close3daysAgo = stock.ticks[last-4].close;
        var close2daysAgo = stock.ticks[last-3].close;
        var closeYesterday = stock.ticks[last-2].close;
        if(viewTrendIn=='eur'){
            d3 = close2daysAgo - close3daysAgo;
            d2 = closeYesterday - close2daysAgo;
            d1 = latest - closeYesterday;
        } else {
            d3 = (1 - close3daysAgo/close2daysAgo) * 100;
            d2 = (1 - close2daysAgo/closeYesterday) * 100;
            d1 = (1 - closeYesterday/latest) * 100;
        }
        $('#'+id).find('.trend .d1').html(d1.toFixed(2));
        $('#'+id).find('.trend .d2').html(d2.toFixed(2));
        $('#'+id).find('.trend .d3').html(d3.toFixed(2));
        paint($('#'+id).find('.trend .d1'), d1);
        paint($('#'+id).find('.trend .d2'), d2);
        paint($('#'+id).find('.trend .d3'), d3);

        if(d1 < alarmLimit && d2 < alarmLimit && d3 < alarmLimit){
            $('#'+id).addClass('alarm');
        }
    });
    if(showTrend){ $('.trend').removeClass('hidden'); }
    initClicks();
}

function parseBuys(buys){
    stocks = [];
    buys.forEach(function(buy){
        stocks.push(buy.split(';')[0]);
    });

    // Get stock info
    stocks = stocks.join(',');

    if(mockData == true){
        processStocks(mockStocks.result);
        processTrends(mockTrends.result);
    } else {
        var stockInfo= {
            "async": false,
            "crossDomain": true,
            "url": 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-compact?id='+stocks,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": rapidApiKey,
                "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com"
            }
        };
        $.ajax(stockInfo).done(function (response) {
            processStocks(response.result);
        });

        var stockTrends = {
            "async": true,
            "crossDomain": true,
            "url": "https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart?&interval=m1&id="+stocks,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": rapidApiKey,
                "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com"
            }
        };
        $.ajax(stockTrends).done(function (response) {
            processTrends(response.result);
        });
    }
}

var liquidationsTotal = 0;
function calcTotals(){
    
    liquidationsTotal = 0;
    var xpurchaseTotal = 0;
    $('.purchase .price').each(function(){
        xpurchaseTotal += Number($(this).html());
    });

    var xmarketDiff = 0;
    $('.market .price').each(function(){
        xmarketDiff += Number($(this).html());
    });

    $('.base').each(function(){
        if( $(this).data('turnover') ){
            liquidationsTotal += Number($(this).data('turnover'));
        }
    });

    var xpercentageTotal = xmarketDiff/xpurchaseTotal*100;
    var xmarketTotal = xpurchaseTotal+xmarketDiff;
    var totalWithLiquidations = xmarketTotal+liquidationsTotal;
    if( showTotalsTop == true ){
        $(container).prepend('<div class="tops values"><div class="paid"></div><div class="difference"><div class="eur"></div><div class="percent hidden"></div></div><div class="value without-liquid hidden"></div><div class="value with-liquid hidden"></div></div>');
        $('.tops.values .paid').html(xpurchaseTotal.toFixed(2));
        $('.tops.values .difference .eur').html(xmarketDiff.toFixed(2));
        $('.tops.values .difference .percent').html(xpercentageTotal.toFixed(2));
        $('.tops.values .value.without-liquid').html(xmarketTotal.toFixed(2)).attr('data-total', xmarketTotal.toFixed(2)).attr('data-with-liquidations', totalWithLiquidations);
        $('.tops.values .value.with-liquid').html(totalWithLiquidations.toFixed(2)).attr('data-total', xmarketTotal.toFixed(2)).attr('data-with-liquidations', totalWithLiquidations);
        $(container).prepend('<div class="tops titles"><div class="paid">investment total</div><div class="difference">change</div><div class="value with-liquid hidden">portfolio value + liquidations</div><div class="value without-liquid hidden">portfolio value</div></div>');
        paint($('.tops.values .difference .eur, .tops.values .difference .percent, .tops.values .value'), xmarketDiff);
    }
    if( showTotalsBottom == true){
        $(container).append('<div id="totale" class="base"><div class="stock"></div><div class="purchase"></div><div class="market"></div><div class="percents"></div><div class="trend"></div></div>');
        // $('#totale .stock').html('TOTAL');
        $('#totale .purchase').html(xpurchaseTotal.toFixed(2));
        $('#totale .market').html(xmarketDiff.toFixed(2));
        $('#totale .percents').html(xpercentageTotal.toFixed(2));
        paint($('#totale .market, #totale .percents'), xmarketDiff);
    }

    if(includeLiquidations){ 
        $('.tops .value.with-liquid').removeClass('hidden'); 
    } else { 
        $('.tops .value.without-liquid').removeClass('hidden');
    }

}

function initClicks(){
    // Clicks
    $('.base').click(function(){
        $(this).removeClass('alarm');
    });

    $('.market').click(function(){
        $('.market .price.percent, .market .price.eur').toggleClass('hidden');
    });

    $('.percents').click(function(){
        $('.percents .percent, .percents .eur').toggleClass('hidden');
    });

    $('.tops.values .difference').click(function(){
        $(this).find('.eur, .percent').toggleClass('hidden');
    });

    $('.tops.values .value').click(function(){
        $('.tops .value').toggleClass('hidden');
    });
}

$(document).ready(function(){

    initProcess();
    fetchLoop = setInterval(function(){
        initProcess();
    }, refreshInterval);

    // Theme
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
