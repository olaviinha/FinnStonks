//---------------------------------------------------------------------------------------------
//--- Settings --------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

// rapidapi.com API key
var rapidApiKey = 'PASTE RAPIDAPI.COM API KEY HERE';

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

// Highlight row with an alarm if the closing price has dropped at least this many percent
// consecutively for three days.
var alarmLimit = -2.5;

// Truncate company name to this many characters. Set to 0 for no truncation.
var truncateTo = 10;

// Refresh every n hours.
var refreshInterval = 3;

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

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------


// For development purposes: when you don't want to do API calls, set mockData to true:
var mockData = false;
var mockAlarm = false;
var mockStocks = {"result":{"OR:FP":{"securityType":"Common Stock","symbol":"OR","exchange":"EN Paris","country":"France","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"or:fp","tickerName":"OR:FP","template":"Stock","tinyName":"L'Oreal SA","name":"L'Oreal SA","watchlist":true,"resourceId":"OR:FP","last":"302.0","netChange":"-2.8","lastPriceTime":1607531708,"pctChange1M":"-2.9","yearHigh":"321.4","dayHigh":"306.4","volume":406239.0,"yearLow":"196.0","dayLow":"300.4","pctChangeYTD":"14.4","lastPriceAllSessions":"302.0","lastPriceTimeAllSessions":1607531708,"pctChange":"-0.92"},"SAA1V:FH":{"securityType":"Common Stock","symbol":"SAA1V","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"saa1v:fh","tickerName":"SAA1V:FH","template":"Stock","tinyName":"Sanoma Oyj","name":"Sanoma Oyj","watchlist":true,"resourceId":"SAA1V:FH","last":"13.38","netChange":"0.00","lastPriceTime":1607531374,"pctChange1M":"10.21","yearHigh":"13.60","dayHigh":"13.60","volume":70680.0,"yearLow":"6.84","dayLow":"13.24","pctChangeYTD":"41.66","lastPriceAllSessions":"13.38","lastPriceTimeAllSessions":1607531374,"pctChange":"0.00"},"SSH1V:FH":{"securityType":"Common Stock","symbol":"SSH1V","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"ssh1v:fh","tickerName":"SSH1V:FH","template":"Stock","tinyName":"SSH Communications Security Oyj","name":"SSH Communications Security Oyj","watchlist":true,"resourceId":"SSH1V:FH","last":"1.33","netChange":"-0.01","lastPriceTime":1607531392,"pctChange1M":"1.14","yearHigh":"1.90","dayHigh":"1.34","volume":12205.0,"yearLow":"0.65","dayLow":"1.30","pctChangeYTD":"28.50","lastPriceAllSessions":"1.33","lastPriceTimeAllSessions":1607531392,"pctChange":"-0.75"},"TSLA:US":{"securityType":"Common Stock","symbol":"TSLA","exchange":"NASDAQ GS","country":"United States","currency":"USD","resourceType":"Company","fundamentalDataCurrency":"USD","resourceSubtype":"Public","region":"AMERICAS","ticker":"tsla:us","tickerName":"TSLA:US","template":"Stock","tinyName":"Tesla Inc","name":"Tesla Inc","watchlist":true,"resourceId":"TSLA:US","last":"604.48","netChange":"-45.40","lastPriceTime":1607547600,"pctChange1M":"43.49","yearHigh":"654.32","dayHigh":"654.32","volume":69949056,"yearLow":"67.02","dayLow":"588.00","pctChangeYTD":"654.71","lastPriceAllSessions":"604.44","lastPriceTimeAllSessions":1607548127,"pctChange":"-6.99"},"TL0:GR":{"securityType":"Common Stock","symbol":"TL0","exchange":"Xetra","country":"United States","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"USD","resourceSubtype":"Public","region":"EMEA","ticker":"tl0:gr","tickerName":"TL0:GR","template":"Stock","tinyName":"Tesla Inc","name":"Tesla Inc","watchlist":true,"resourceId":"TL0:GR","last":"499.60","netChange":"-37.30","lastPriceTime":1607546994,"pctChange1M":"38.78","yearHigh":"552.00","dayHigh":"544.20","volume":72320.0,"yearLow":"60.40","dayLow":"491.60","pctChangeYTD":"551.03","lastPriceAllSessions":"499.60","lastPriceTimeAllSessions":1607546994,"pctChange":"-6.95"},"YEINT:FH":{"securityType":"Common Stock","symbol":"YEINT","exchange":"Helsinki","country":"Finland","currency":"EUR","resourceType":"Company","fundamentalDataCurrency":"EUR","resourceSubtype":"Public","region":"EMEA","ticker":"yeint:fh","tickerName":"YEINT:FH","template":"Stock","tinyName":"Yleiselektroniikka Oyj","name":"Yleiselektroniikka Oyj","watchlist":true,"resourceId":"YEINT:FH","last":"26.6","netChange":"0.6","lastPriceTime":1607531390,"pctChange1M":"40.7","yearHigh":"34.0","dayHigh":"26.8","volume":1303.0,"yearLow":"9.9","dayLow":"26.0","pctChangeYTD":"150.9","lastPriceAllSessions":"26.6","lastPriceTimeAllSessions":1607531390,"pctChange":"2.31"}}};
var mockTrends = {"result":{"OR:FP":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1604930400,"close":311.0},{"time":1605016800,"close":315.4},{"time":1605103200,"close":319.0},{"time":1605189600,"close":317.3},{"time":1605276000,"close":314.2},{"time":1605535200,"close":317.5},{"time":1605621600,"close":316.6},{"time":1605708000,"close":314.6},{"time":1605794400,"close":310.8},{"time":1605880800,"close":312.1},{"time":1606140000,"close":306.3},{"time":1606226400,"close":295.9},{"time":1606312800,"close":304.4},{"time":1606399200,"close":305.8},{"time":1606485600,"close":309.3},{"time":1606744800,"close":306.8},{"time":1606831200,"close":306.3},{"time":1606917600,"close":306.4},{"time":1607004000,"close":305.0},{"time":1607090400,"close":306.3},{"time":1607349600,"close":304.0},{"time":1607436000,"close":304.8},{"time":1607522400,"close":302.0}],"low":"295.9","high":"319.0","first":1604930400,"last":1607522400,"security":{"ticker":"OR:FP","open":"306.4","prevClose":"311.0"},"hasVolume":false},"SAA1V:FH":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1604930400,"close":12.14},{"time":1605016800,"close":11.7},{"time":1605103200,"close":11.96},{"time":1605189600,"close":11.78},{"time":1605276000,"close":12.1},{"time":1605535200,"close":12.16},{"time":1605621600,"close":12.26},{"time":1605708000,"close":12.28},{"time":1605794400,"close":12.06},{"time":1605880800,"close":11.96},{"time":1606140000,"close":12.36},{"time":1606226400,"close":12.52},{"time":1606312800,"close":12.56},{"time":1606399200,"close":12.32},{"time":1606485600,"close":12.46},{"time":1606744800,"close":12.2},{"time":1606831200,"close":12.3},{"time":1606917600,"close":12.76},{"time":1607004000,"close":13.12},{"time":1607090400,"close":13.08},{"time":1607349600,"close":13.08},{"time":1607436000,"close":13.38},{"time":1607522400,"close":13.46}],"low":"11.7","high":"13.46","first":1604930400,"last":1607522400,"security":{"ticker":"SAA1V:FH","open":"13.38","prevClose":"12.14"},"hasVolume":false},"SSH1V:FH":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1604930400,"close":1.315},{"time":1605016800,"close":1.34},{"time":1605103200,"close":1.3599999999999999},{"time":1605189600,"close":1.27},{"time":1605276000,"close":1.26},{"time":1605535200,"close":1.27},{"time":1605621600,"close":1.25},{"time":1605708000,"close":1.255},{"time":1605794400,"close":1.27},{"time":1605880800,"close":1.26},{"time":1606140000,"close":1.28},{"time":1606226400,"close":1.2650000000000001},{"time":1606312800,"close":1.2650000000000001},{"time":1606399200,"close":1.27},{"time":1606485600,"close":1.27},{"time":1606744800,"close":1.255},{"time":1606831200,"close":1.26},{"time":1606917600,"close":1.28},{"time":1607004000,"close":1.275},{"time":1607090400,"close":1.275},{"time":1607349600,"close":1.305},{"time":1607436000,"close":1.34},{"time":1607522400,"close":1.33}],"low":"1.25","high":"1.3599999999999999","first":1604930400,"last":1607522400,"security":{"ticker":"SSH1V:FH","open":"1.34","prevClose":"1.31"},"hasVolume":false},"TSLA:US":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1604930400,"close":421.26},{"time":1605016800,"close":410.36},{"time":1605103200,"close":417.13},{"time":1605189600,"close":411.76},{"time":1605276000,"close":408.5},{"time":1605535200,"close":408.09},{"time":1605621600,"close":441.61},{"time":1605708000,"close":486.64},{"time":1605794400,"close":499.27},{"time":1605880800,"close":489.61},{"time":1606140000,"close":521.85},{"time":1606226400,"close":555.38},{"time":1606312800,"close":574.0},{"time":1606485600,"close":585.76},{"time":1606744800,"close":567.6},{"time":1606831200,"close":584.76},{"time":1606917600,"close":568.82},{"time":1607004000,"close":593.38},{"time":1607090400,"close":599.04},{"time":1607349600,"close":641.76},{"time":1607436000,"close":649.88},{"time":1607522400,"close":620.92}],"low":"408.09","high":"649.88","first":1604930400,"last":1607522400,"security":{"ticker":"TSLA:US","open":"653.69","prevClose":"421.26"},"hasVolume":false},"TL0:GR":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1604930400,"close":360.0},{"time":1605016800,"close":346.0},{"time":1605103200,"close":353.85},{"time":1605189600,"close":348.75},{"time":1605276000,"close":345.4},{"time":1605535200,"close":344.2},{"time":1605621600,"close":372.45},{"time":1605708000,"close":410.8},{"time":1605794400,"close":419.75},{"time":1605880800,"close":413.8},{"time":1606140000,"close":440.4},{"time":1606226400,"close":467.4},{"time":1606312800,"close":480.25},{"time":1606399200,"close":478.05},{"time":1606485600,"close":490.6},{"time":1606744800,"close":475.4},{"time":1606831200,"close":484.9},{"time":1606917600,"close":469.7},{"time":1607004000,"close":488.45},{"time":1607090400,"close":493.25},{"time":1607349600,"close":528.4},{"time":1607436000,"close":536.9},{"time":1607522400,"close":528.6}],"low":"344.2","high":"536.9","first":1604930400,"last":1607522400,"security":{"ticker":"TL0:GR","open":"535.10","prevClose":"360.00"},"hasVolume":false},"YEINT:FH":{"historical":true,"ticksType":"DayTick","ticks":[{"time":1604930400,"close":18.9},{"time":1605016800,"close":19.0},{"time":1605103200,"close":19.0},{"time":1605189600,"close":19.8},{"time":1605276000,"close":20.4},{"time":1605535200,"close":22.2},{"time":1605621600,"close":25.2},{"time":1605708000,"close":24.4},{"time":1605794400,"close":24.2},{"time":1605880800,"close":25.6},{"time":1606140000,"close":27.8},{"time":1606226400,"close":27.8},{"time":1606312800,"close":29.0},{"time":1606399200,"close":33.0},{"time":1606485600,"close":33.6},{"time":1606744800,"close":31.2},{"time":1606831200,"close":28.0},{"time":1606917600,"close":26.2},{"time":1607004000,"close":25.2},{"time":1607090400,"close":26.4},{"time":1607349600,"close":26.0},{"time":1607436000,"close":26.0},{"time":1607522400,"close":26.4}],"low":"18.9","high":"33.6","first":1604930400,"last":1607522400,"security":{"ticker":"YEINT:FH","open":"26.4","prevClose":"18.9"},"hasVolume":false}}};

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

// Work around Dropbox CORS headers
if(tradeEventsTxt.indexOf('www.dropbox.com') > -1){
    tradeEventsTxt = tradeEventsTxt.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('dl=0', 'raw=1').replace('dl=1', 'raw=1');
}

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

function addRows(detailsList){
    detailsList.forEach(function(details, i){
        var symbol = details.symbol.split(':')[0];
        var id = symbol;
        var tpl = $('.template').html();
        tpl = tpl.replace('STOCK', symbol);
        $(container).append(tpl);
        $('#'+id)
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
        var details = {
            symbol: itm[0],
            date: itm[1],
            pcs: Number(itm[2]),
            price: Number(itm[3]),
            total: Number(itm[2]) * Number(itm[3]),
            totalWithSales: Number(itm[2]) * Number(itm[3]),
            turnover: 0,
            turnoverWithSales: 0,
            liquidBalance: Number(itm[2]) * Number(itm[3]),
            difference: 0,
            purchasesTotal: Number(itm[2]) * Number(itm[3]),
            purchasesPcs: Number(itm[2]),
            salesTotal: 0,
            salesPcs: 0
        };
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
    });
    return arrDetails;
}

var sold = false;
function initProcess(){
    $('.stocks').html('').hide();
    $.get({
        url: tradeEventsTxt,
        async: false,
        success: function(data) {
            var events = data.split('\n\n');
            var buys = events[0].split('\n').filter(function(line){return line.indexOf('#') != 0});
            var sells = events[1].split('\n').filter(function(line){return line.indexOf('#') != 0});
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
            if(includeCashouts == false){
                finalList.forEach(function(stock, i){
                    if(stock.pcs == 0){
                        finalList.splice(i, 1);
                    }
                });
            }
            addRows(finalList);
            parseBuys(finalList);
        }
    });
}


function processStocks(data){
    $.each(data, function(i, stock) {
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
            paint($('.cashoutd .ceur, .cashoutd .cpercent'), 1);
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
        if(d1p < alarmLimit){paint($('#'+id).find('.trend .d1'), d1p);}
        if(d2p < alarmLimit){paint($('#'+id).find('.trend .d2'), d2p);}
        if(d3p < alarmLimit){paint($('#'+id).find('.trend .d3'), d3p);}
        if(d1p < alarmLimit && d2p < alarmLimit && d3p < alarmLimit){
            $('#'+id).addClass('alarm');
        }
    });
    if(show3dHistory && !veryCompact){ $('.trend, .trend .percent').removeClass('hidden'); }
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

function parseBuys(buys){
    stocks = [];
    buys.forEach(function(buy){
        stocks.push(buy.symbol);
    });

    // Get stock info
    stocks = stocks.join(',');
    if(mockData == true){
        processStocks(mockStocks.result);
        processTrends(mockTrends.result);
        $('.loader').hide();
        $('.stocks').show();
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
        $.ajax(stockInfo).fail(function(response){
            $('.loader').hide();
            $('.stocks-container .message').html('<div class="err">Bloomberg\'s API responded:</div>'+response.responseJSON.message).show();
        }).done(function (response) {
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
        $.ajax(stockTrends).fail(function(response){
            $('.loader').hide();
            $('.stocks-container .message').html('<div class="err">Bloomberg\'s API responded:</div>'+response.responseJSON.message).show();
        }).done(function(response) {
            processTrends(response.result);
            $('.loader').hide();
            $('.stocks').show();
        });
    }
}

function calcTotals(){
    
    
    var xpurchaseTotal = 0;
    var liquidationsTotal = 0;
    $('.stocks .base').each(function(){
        xpurchaseTotal += Number($(this).data('invested'));

        var soldEur = Number($(this).data('sales-total'));
        var soldPcs = Number($(this).data('sales-pcs'));
        var purchasedEur = Number($(this).data('purchases-total'));
        var purchasedPcs = Number($(this).data('purchases-pcs'));
        console.log('deez', soldEur, soldPcs, purchasedEur, purchasedPcs);
        if(soldEur > 0){
            var purchasePriceOfSold = purchasedEur / purchasedPcs * soldPcs;
            var revenueEur = soldEur - purchasePriceOfSold;
            liquidationsTotal += revenueEur;

            console.log('calc', purchasePriceOfSold, revenueEur, liquidationsTotal);
        }
    });

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
        $(container).prepend('<div class="tops titles"><div class="paid">investment total</div><div class="difference">change</div><div class="pvalue"><div class="value hidden">portfolio value</div><div class="value-with-liquid hidden">value + sales return</div><div class="value-only-liquid hidden">sales return only</div></div></div>');
        paint($('.tops.values .difference .eur, .tops.values .difference .eur-with-sales, .tops.values .difference .percent, .tops.values .value, .tops.values .value-with-liquid, .tops.values .value-only-liquid'), xmarketDiff);
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
    $(el).click(function(){
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
