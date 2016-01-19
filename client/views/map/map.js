Template.map.helpers({
    node: function () {
        return Nodes.findOne({_id: Session.get('selectedNodeId')});
    },
    dashboardMapOptions: function () {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(52.7000,4.7000),
                zoom: 10
            };
        }
    }
});

Template.map.onCreated(function () {
    this.subscribe('nodes');

    GoogleMaps.ready('dashboardMap', () => {
        let nodes = Nodes.find({});
        let markers = [];
        const i = 0;
        const length = nodes.fetch().length - 1;

        nodes.forEach((value) => {
            let options = new google.maps.Marker({
                position: value.geo,
                map: GoogleMaps.maps.dashboardMap.instance,
                title: '',
                id: value._id
            });

            options.addListener('click', () => {
                Session.set('selectedNodeId', id);
            });

            markers.push(options);

            if (i === length) {
                Session.set('selectedNodeId', value._id);
            }
        });
    });
});


Template.map.onRendered(function () {
    GoogleMaps.load();
});
