Template.pressure.helpers({
    node() {
        return Nodes.findOne(Session.get('selectedNodeId'));
    },

    current() {
        let node = Nodes.findOne(Session.get('selectedNodeId'));
        node.data.reverse();
        let current = node.data[0].pressure;
        return current;
    }
});

Template.pressure.pressure = () => {
    let node = Nodes.findOne(Session.get('selectedNodeId'));
    node.data.reverse();
    let press = parseFloat(node.data[0].pressure/1000);
    setInterval(function ( ) {
        console.log(node);
    }, 10000)
    return {
        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            },
            min: 0,
            max: 120,
            title: {
                text: 'Speed'
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Pressure',
            data: [press],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">kPa</span></div>'
            },
            tooltip: {
                valueSuffix: 'kPa'
            }
        }]
    };
};
