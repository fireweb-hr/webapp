Template.temperature.helpers({
    node() {
        return Nodes.findOne(Session.get('selectedNodeId'));
    },

    current() {
        let node = Nodes.findOne(Session.get('selectedNodeId'));
        let length = node.data.length - 1;
        let current = node.data[length].temperature;
        return current;
    }
});

Template.temperature.temperature = () => {
    let node = Nodes.findOne(Session.get('selectedNodeId'));
    let temps = [];
    let times = [];

    node.data.forEach(v => {
        var unix = v.outputTime;
        temps.push(parseInt(v.temperature));
        times.push(moment(unix).format('HH:mm:ss, DD MMM YY'));
    });


    return {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Temperature'
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
            type: 'line',
            name: 'Samson\'s tropische woonkamer',
            data: temps
        }]
}};
