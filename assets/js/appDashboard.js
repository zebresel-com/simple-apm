(function(){

    var cpuChart = null;
    var memoryChart = null;
    var diskChart = null;

    var cpuLineChart = null;
    var memoryLineChart = null;

    function valueWithDefault(obj,path,def)
    {
        var splitted = path.split('.');        
        var value = obj;
        var count = 0;

        while(count < splitted.length)
        {
            if(typeof value[splitted[count]] !== 'undefined')
            {
                value = value[splitted[count]];
            }
            else
            {
                value = def;
            }

            ++count;
        }

        return value;
    };

    function refresh()
    {
        $.get( '/applications/'+window.apm.currApp.id+'/dashboard', null, function( data ) {

            // And for a doughnut chart
            if(cpuChart === null)
            {
                var ctx = document.getElementById("metric-cpu");

                cpuChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: [
                            'Other',
                            'App',
                            'Free'
                        ],
                        datasets: [
                            {
                                data: [
                                    valueWithDefault(data, 'data.dashboard.cpuOther', 0),
                                    valueWithDefault(data, 'data.dashboard.cpuApp', 0),
                                    valueWithDefault(data, 'data.dashboard.cpuFree', 0)
                                ],
                                backgroundColor: [
                                    '#fed330',
                                    '#fc5c65',
                                    '#d1d8e0'
                                ]
                            }
                        ]
                    },
                    options: {
                        rotation: 1 * Math.PI,
                        circumference: 1 * Math.PI,
                        animation: false,
                        legend: {
                            display: true,
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'CPU Usage'
                        }
                    }
                });
            }
            else
            {
                cpuChart.data.datasets[0].data = [
                    valueWithDefault(data, 'data.dashboard.cpuOther', 0),
                    valueWithDefault(data, 'data.dashboard.cpuApp', 0),
                    valueWithDefault(data, 'data.dashboard.cpuFree', 0)
                ];
                cpuChart.update();
            }

            // And for a doughnut chart
            if(memoryChart === null)
            {
                var ctx = document.getElementById("metric-memory");
                memoryChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: [
                            'Other',
                            'App',
                            'Free'
                        ],
                        datasets: [
                            {
                                data: [
                                    Math.round(valueWithDefault(data, 'data.dashboard.memoryOther',0) * 100)/100,
                                    Math.round(valueWithDefault(data, 'data.dashboard.memoryApp',0) * 100)/100,
                                    Math.round(valueWithDefault(data, 'data.dashboard.memoryFree',0) * 100)/100
                                ],
                                backgroundColor: [
                                    '#fed330',
                                    '#fc5c65',
                                    '#d1d8e0'
                                ]
                            }
                        ]
                    },
                    options: {
                        rotation: 1 * Math.PI,
                        circumference: 1 * Math.PI,
                        animation: false,
                        legend: {
                            display: true,
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Memory Usage'
                        }
                    }
                });
            }
            else
            {
                memoryChart.data.datasets[0].data = [
                    Math.round(valueWithDefault(data, 'data.dashboard.memoryOther',0) * 100)/100,
                    Math.round(valueWithDefault(data, 'data.dashboard.memoryApp',0) * 100)/100,
                    Math.round(valueWithDefault(data, 'data.dashboard.memoryFree',0) * 100)/100
                ];
                memoryChart.update();
            }


            // And for a doughnut chart
            if(diskChart === null)
            {
                var ctx = document.getElementById("metric-disk");

                diskChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: [
                            'Used',
                            'Free'
                        ],
                        datasets: [
                            {
                                data: [
                                    valueWithDefault(data, 'data.dashboard.diskUsed', 0),
                                    valueWithDefault(data, 'data.dashboard.diskFree', 0)
                                ],
                                backgroundColor: [
                                    '#fed330',
                                    '#d1d8e0'
                                ]
                            }
                        ]
                    },
                    options: {
                        rotation: 1 * Math.PI,
                        circumference: 1 * Math.PI,
                        animation: false,
                        legend: {
                            display: true,
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Disk Usage'
                        }
                    }
                });
            }
            else
            {
                diskChart.data.datasets[0].data = [
                    valueWithDefault(data, 'data.dashboard.diskUsed', 0),
                    valueWithDefault(data, 'data.dashboard.diskFree', 0)
                ];
                diskChart.update();
            }

            // CPU LINE CHART
            {
                var min = new Date();
                var max = new Date();
                var labels = [];
                var values = [];
                var appValues = [];

                try 
                {
                    min = new Date(data.dashboard.chart.cpu.labels[0]);
                    max = new Date(data.dashboard.chart.cpu.labels[data.dashboard.chart.cpu.labels.length - 1]);

                    labels = data.dashboard.chart.cpu.labels;
                    values = data.dashboard.chart.cpu.values;
                    appValues = data.dashboard.chart.cpu.appValues;
                }
                catch(err)
                {

                }


                if(cpuLineChart === null)
                {
                    var ctx = document.getElementById("metric-cpu-time");
                    cpuLineChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    data: values,
                                    backgroundColor: "transparent",
                                    borderColor: "#fed330",
                                    lineTension: 0,
                                    pointRadius: 2,
                                    pointHitRadius: 4
                                },
                                {
                                    data: appValues,
                                    backgroundColor: "transparent",
                                    borderColor: "#fc5c65",
                                    lineTension: 0,
                                    pointRadius: 2,
                                    pointHitRadius: 4
                                }
                            ]
                        },
                        options: {
                            maintainAspectRatio: false,
                            legend: {
                               display: false
                            },
                            animation: false,
                            scales: {
                                xAxes: [
                                    {
                                        type: 'time',
                                        time: {
                                            min: min,
                                            max: max,
                                            unit: 'hour',
                                            unitStepSize: 2,
                                            displayFormats: { 'hour': 'H:mm' }
                                        }
                                    }
                                ]
                            },
                            title: {
                                display: true,
                                text: 'CPU usage Total/App'
                            }
                        }
                    });
                }
                else
                {

                    cpuLineChart.options.scales.xAxes[0].time.min = min;
                    cpuLineChart.options.scales.xAxes[0].time.max = max;

                    cpuLineChart.data.labels = labels;
                    cpuLineChart.data.datasets[0].data = values;
                    cpuLineChart.data.datasets[1].data = appValues;

                    cpuLineChart.update();
                }
            }


            {
                var min = new Date();
                var max = new Date();
                var labels = [];
                var values = [];
                var appValues = [];

                try 
                {
                    min = new Date(data.dashboard.chart.memory.labels[0]);
                    max = new Date(data.dashboard.chart.memory.labels[data.dashboard.chart.memory.labels.length - 1]);

                    labels = data.dashboard.chart.memory.labels;
                    values = data.dashboard.chart.memory.values;
                    appValues = data.dashboard.chart.memory.appValues;
                }
                catch(err)
                {

                }

                if(memoryLineChart === null)
                {
                    var ctx = document.getElementById("metric-memory-time");
                    memoryLineChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    data: values,
                                    backgroundColor: "transparent",
                                    borderColor: "#fed330",
                                    lineTension: 0,
                                    pointRadius: 2,
                                    pointHitRadius: 4
                                },
                                {
                                    data: appValues,
                                    backgroundColor: "transparent",
                                    borderColor: "#fc5c65",
                                    lineTension: 0,
                                    pointRadius: 2,
                                    pointHitRadius: 4
                                }
                            ]
                        },
                        options: {
                            maintainAspectRatio: false,
                            legend: {
                               display: false
                            },
                            animation: false,
                            scales: {
                                xAxes: [
                                    {
                                        type: 'time',
                                        time: {
                                            min: min,
                                            max: max,
                                            unit: 'hour',
                                            unitStepSize: 2,
                                            displayFormats: { 'hour': 'H:mm' }
                                        }
                                    }
                                ]
                            },
                            title: {
                                display: true,
                                text: 'Memory usage Total/App'
                            }
                        }
                    });
                }
                else
                {
                    memoryLineChart.options.scales.xAxes[0].time.min = min;
                    memoryLineChart.options.scales.xAxes[0].time.max = max;


                    memoryLineChart.data.labels = labels;
                    memoryLineChart.data.datasets[0].data = values;
                    memoryLineChart.data.datasets[1].data = appValues;
                    
                    memoryLineChart.update();
                }
            }

            // render requests
            var httpList = document.getElementById('http-requests-body');

            // reset content
            httpList.innerHTML = '';

            var httpDom = null;
            for (var i = 0; i < data.dashboard.https.length; i++)
            {
                httpDom = tpl.render('tpl-http-requests-row', data.dashboard.https[i]);
                httpList.appendChild(httpDom);
            }

            setTimeout(refresh, 10000); // every 10 seconds

        }, 'json');
    }

    refresh();

})()