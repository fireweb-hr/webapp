Template.temperature.helpers({
    current() {
        return SensorData.findOne({}, {sort: {outputTime: -1},
            fields: {temperature: 1}, limit: 1});
    }
});

Template.temperature.temperature = function () {
    let data = SensorData.find({}, {sort: {outputTime: -1}, fields: {temperature: 1, outputTime: 1}, limit: 25});
    let temps = data.fetch().map((value) => {
        return parseInt(value.temperature);
    }).reverse();
    let times = data.fetch().map((value) => {
        const unix = value.outputTime;
        return moment(unix).format('HH:mm:ss, DD MMM YY');
    }).reverse();

    return {
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: times
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: `Node ID: ${Session.get('selectedNodeId')}`,
            data: temps
        }]
    }
};
