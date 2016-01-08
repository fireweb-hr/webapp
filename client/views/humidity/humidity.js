Template.humidity.helpers({
    node() {
        return Nodes.findOne(Session.get('selectedNodeId'));
    },

    current() {
        let node = Nodes.findOne(Session.get('selectedNodeId'));
        node.data.reverse();
        let current = node.data[0].humidity;
        return current;
    }
});

Template.humidity.humidity = () => {
    let node = Nodes.findOne(Session.get('selectedNodeId'));
    let data = [];
    node.data.reverse();
    node.data.forEach(v => {
        var unix = v.outputTime;
        data.push([moment(unix).format('HH:mm:ss, DD MMM YY'), parseInt(v.humidity)]);
    });

    return {
        chart: {
           type: 'column'
           },
           title: {
               text: 'Current humidity levels'
           },
           subtitle: {
               text: 'Click on column to see recent changes.'
           },
           xAxis: {
               type: 'category'
           },
           yAxis: {
               title: {
                   text: 'Humidity percentage'
               }

           },
           legend: {
               enabled: false
           },
           plotOptions: {
               series: {
                   borderWidth: 0,
                   dataLabels: {
                       enabled: true,
                       format: '{point.y:.1f}%'
                   }
               }
           },

           tooltip: {
               headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
               pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
           },

           series: [{
               name: 'Humidity levels',
               colorByPoint: true,
               data: [{
                   name: `Current humidity level, at ${data[0][0]}`,
                   y: data[0][1],
                   drilldown: 'Recent humidity levels'
               }]
           }],
           drilldown: {
               series: [{
                   name: 'Recent humidity levels',
                   id: 'Recent humidity levels',
                   data: [data]
               }]
        }
    }
};
