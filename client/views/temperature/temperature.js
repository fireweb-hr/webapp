Template.temperature.helpers({
    current() {
        return SensorData.findOne({}, {sort: {outputTime: -1},
            fields: {temperature: 1}, limit: 1});
    }
});

Template.temperature.temperature = function () {
    let data = SensorData.find({}, {sort: {outputTime: -1}, fields: {temperature: 1, outputTime: 1}, limit: 100});
    console.log(data.fetch());
    let mappedData = data.fetch().map((value) => {
        const time = value.outputTime+3600000
        return [time, parseInt(value.temperature)];
    }).reverse();

    return {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Temperature over time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Temperature'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                    states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            name: 'Temperature in °C ',
            data: mappedData
        }]
    }
};
