Template.map.helpers({
    node: function () {
        let nodes = Nodes.find({_id: Session.get('selectedNodeId')}).fetch()[0];
        return nodes;
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

Template.map.onRendered(function () {
    GoogleMaps.load();
});

Template.map.onCreated(function () {
    GoogleMaps.ready('dashboardMap', () => {
        Session.set('selectedNodeId', "350027000a47343432313031");
        let nodes = Nodes.find({});
        let markers = [];


        nodes.forEach((value) => {
            const geo = value.geo;
            const id = value._id;
            let options = new google.maps.Marker({
                position: geo,
                map: GoogleMaps.maps.dashboardMap.instance,
                title: '',
                id: id
            });

            options.addListener('click', () => {
                Session.set('selectedNodeId', id);
            });

            markers.push(options);
        });
    });
});
