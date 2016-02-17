Template.map.helpers({
    dashboardMapOptions: function () {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(51.9175013, 4.4826886),
                zoom: 14,
                disableDefaultUI: true,
                zoomControl: true,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };
        }
    }
});

Template.map.onCreated(function () {
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

                Session.set('selectedNodeId', value._id);
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
