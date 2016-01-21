Meteor.startup(() => {
    const spark = Meteor.npmRequire('spark');
    spark.login({accessToken: 'b79740fd6a30fc27f3b01fcbd3a044dcc5bfab50'});
    spark.listDevices().then(Meteor.bindEnvironment((devices) => {
        devices.forEach((value) => {
            const geo = {lat: 51.9164254, lng: 4.4801832}
            if (Nodes.find({_id: value.id}).count() === 0) {
                Nodes.insert({
                    _id: value.id,
                    geo: geo,
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
                HTTP.get(`http://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lng}&appid=2de143494c0b295cca9337e1e96b00e0`, (err, output) => {
                    nodeData.wind = output.data.wind;
                    nodeData.outputTime = Date.now();

                    console.log(nodeData);
                    SensorData.insert(nodeData);
                });
            }), 30000);
        });
    }))
});
