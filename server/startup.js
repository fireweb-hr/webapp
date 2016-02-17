Meteor.startup(() => {
    const spark = Meteor.npmRequire('spark');
    spark.login({accessToken: 'b79740fd6a30fc27f3b01fcbd3a044dcc5bfab50'});
    spark.listDevices().then(Meteor.bindEnvironment((devices) => {
        devices.forEach((value) => {
            const geo = {lat: 51.9173620, lng: 4.4848130}
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
                HTTP.get(`http://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lng}&appid=eadc5f93facf9c3cbfe20e3988716115`, (err, output) => {
                    nodeData.wind = output.data.wind;
                    nodeData.outputTime = Date.now();

                    SensorData.insert(nodeData);
                });
            }), 15000);
        });
    }))
});
