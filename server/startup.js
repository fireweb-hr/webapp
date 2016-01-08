Meteor.startup(() => {
    const spark = Meteor.npmRequire('spark');
    spark.login({accessToken: 'b79740fd6a30fc27f3b01fcbd3a044dcc5bfab50'});
    spark.listDevices().then(Meteor.bindEnvironment((devices) => {
        devices.forEach((value) => {
            let node = Nodes.find({_id: value.id}).count();
            let nodeData = {
            };
            if (node === 0) {
                Nodes.insert({
                    _id: value.id,
                    geo: {lat: 52.7700, lng: 4.700},
                    data: [

                    ],
                    liveSince: Date.now()
                })
            }

            value
                .onEvent('p', p => {
                    nodeData.pressure = p.data;
                });

            value
                .onEvent('t', t => {
                    nodeData.temperature = t.data;
                });

            value
                .onEvent('h', h => {
                    nodeData.humidity = h.data;
                });

            setInterval(Meteor.bindEnvironment(() => {
                nodeData.outputTime = Date.now();
                console.log(nodeData);
                Nodes.update({_id: value.id}, {$addToSet: {data: nodeData}});
            }), 10000);


        });
    }))
});
