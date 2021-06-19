var refreshInterval, refreshDuring, fetchLoop, consoleOutput;

onmessage = function(e) {
    refreshInterval = e.data.refreshInterval;
    refreshDuring = e.data.refreshDuring;
    consoleOutput = e.data.consoleOutput;
    if(fetchLoop) clearInterval(fetchLoop);
    fetchLoop = setInterval(function(){
        var d = new Date();
        var n = d.getHours();
        var doUpdate = false;

        if(consoleOutput) console.log('Checking if current time ', d, 'is between', refreshDuring[0], 'and', refreshDuring[1]);
        if(n >= refreshDuring[0] && n <= refreshDuring[1]){
            if(consoleOutput) console.log('And it is. Refreshing view at ', d);
            doUpdate = true;
            postMessage('refresh');
        } else {
            if(consoleOutput) console.log('It was not. Skip refresh.');
        }

    }, refreshInterval);

}

