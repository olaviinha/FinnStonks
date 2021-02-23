var refreshInterval, refreshDuring, fetchLoop, consoleOutput;
onmessage = function(e) {
    refreshInterval = e.data.refreshInterval;
    refreshDuring = e.data.refreshDuring;
    consoleOutput = e.data.consoleOutput;
    if(fetchLoop) clearInterval(fetchLoop);
    fetchLoop = setInterval(function(){
        var d = new Date();
        var n = d.getHours();
    
        if(consoleOutput) console.log('Current time:', d);
        if(consoleOutput) console.log('Check if', n, '>=', refreshDuring[0], 'and', n, '<=', refreshDuring[1]);
        if(n >= refreshDuring[0] && n <= refreshDuring[1]){
            if(consoleOutput) console.log('Refresh view');
            postMessage('refresh');
        }
    }, refreshInterval);

}

