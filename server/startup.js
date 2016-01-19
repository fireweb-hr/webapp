Meteor.startup(() => {
    const spark = Meteor.npmRequire('spark');
    spark.login({accessToken: 'b79740fd6a30fc27f3b01fcbd3a044dcc5bfab50'});
    spark.listDevices().then(Meteor.bindEnvironment((devices) => {
        devices.forEach((value) => {
            if (Nodes.find({_id: value.id}).count() === 0) {
                Nodes.insert({
                    _id: value.id,
                    geo: {lat: 51.9164254, lng: 4.4801832},
                    liveSince: Date.now()
                });
            }

            let nodeData = {nodeId: value.id};

            value.onEvent('p', p => {
                    nodeData.pressure = p.data;
                });

            value.onEvent('t', t => {
                    nodeData.temperature = t.data;
                });

            value.onEvent('h', h => {
                    nodeData.humidity = h.data;
                });

            setInterval(Meteor.bindEnvironment(() => {
                nodeData.outputTime = Date.now();
                SensorData.insert(nodeData);
            }), 10000);
        });
    }))
});
