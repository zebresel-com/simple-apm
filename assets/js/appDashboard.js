(function(){

    var cpuChart = null;
    var memoryChart = null;
    var diskChart = null;

    var cpuLineChart = null;
    var memoryLineChart = null;

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
                                    data.dashboard.cpuOther,
                                    data.dashboard.cpuApp,
                                    data.dashboard.cpuFree
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
                    data.dashboard.cpuOther,
                    data.dashboard.cpuApp,
                    data.dashboard.cpuFree
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
                                    Math.round(data.dashboard.memoryOther * 100)/100,
                                    Math.round(data.dashboard.memoryApp * 100)/100,
                                    Math.round(data.dashboard.memoryFree * 100)/100
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
                    Math.round(data.dashboard.memoryOther * 100)/100,
                    Math.round(data.dashboard.memoryApp * 100)/100,
                    Math.round(data.dashboard.memoryFree * 100)/100
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
                                    data.dashboard.diskUsed,
                                    data.dashboard.diskFree
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
                    data.dashboard.diskUsed,
                    data.dashboard.diskFree
                ];
                diskChart.update();
            }


            if(cpuLineChart === null)
            {
                var min = new Date(data.dashboard.chart.cpu.labels[0]);
                var max = new Date(data.dashboard.chart.cpu.labels[data.dashboard.chart.cpu.labels.length - 1]);
                var ctx = document.getElementById("metric-cpu-time");
                cpuLineChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.dashboard.chart.cpu.labels,
                        datasets: [
                            {
                                data: data.dashboard.chart.cpu.values,
                                backgroundColor: "transparent",
                                borderColor: "#fed330",
                                lineTension: 0,
                                pointRadius: 2,
                                pointHitRadius: 4
                            },
                            {
                                data: data.dashboard.chart.cpu.appValues,
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
                var min = new Date(data.dashboard.chart.cpu.labels[0]);
                var max = new Date(data.dashboard.chart.cpu.labels[data.dashboard.chart.cpu.labels.length - 1]);

                cpuLineChart.options.scales.xAxes[0].time.min = min;
                cpuLineChart.options.scales.xAxes[0].time.max = max;

                cpuLineChart.data.labels = data.dashboard.chart.cpu.labels;
                cpuLineChart.data.datasets[0].data = data.dashboard.chart.cpu.values;
                cpuLineChart.data.datasets[1].data = data.dashboard.chart.cpu.appValues;

                cpuLineChart.update();
            }

            if(memoryLineChart === null)
            {
                var min = new Date(data.dashboard.chart.memory.labels[0]);
                var max = new Date(data.dashboard.chart.memory.labels[data.dashboard.chart.memory.labels.length - 1]);

                var ctx = document.getElementById("metric-memory-time");
                memoryLineChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.dashboard.chart.memory.labels,
                        datasets: [
                            {
                                data: data.dashboard.chart.memory.values,
                                backgroundColor: "transparent",
                                borderColor: "#fed330",
                                lineTension: 0,
                                pointRadius: 2,
                                pointHitRadius: 4
                            },
                            {
                                data: data.dashboard.chart.memory.appValues,
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
                var min = new Date(data.dashboard.chart.memory.labels[0]);
                var max = new Date(data.dashboard.chart.memory.labels[data.dashboard.chart.memory.labels.length - 1]);
                memoryLineChart.options.scales.xAxes[0].time.min = min;
                memoryLineChart.options.scales.xAxes[0].time.max = max;


                memoryLineChart.data.labels = data.dashboard.chart.memory.labels;
                memoryLineChart.data.datasets[0].data = data.dashboard.chart.memory.values;
                memoryLineChart.data.datasets[1].data = data.dashboard.chart.memory.appValues;
                
                memoryLineChart.update();
            }

            setTimeout(refresh, 10000); // every 10 seconds

        }, 'json');
    }

    refresh();

})()