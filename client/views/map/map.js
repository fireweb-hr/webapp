Template.map.helpers({
    node: function () {
        // Eventually get info from database.
        return Session.get("selectedNode");
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
    GoogleMaps.ready('dashboardMap', function(map) {
        var that = this;

        // Eventually get nodes from database with id and lat lng.
        var markerOptions = [
            new google.maps.Marker({
                position: map.options.center,
                map: GoogleMaps.maps.dashboardMap.instance,
                title: "I am a demo marker.",
                id: 1
            }),
            new google.maps.Marker({
                position: {lat: 52.7400, lng: 4.700},
                map: GoogleMaps.maps.dashboardMap.instance,
                title: "I am a demo marker.",
                id: 2
            })

        ];

        this.addMarker = function (options) {
            var marker = options;
            marker.addListener("click", function () {
                Session.set("selectedNode", this.id);
            });
        };

        _.each(markerOptions, function (marker) {
            that.addMarker(marker);
        });

        Session.set("selectedNode", 1);
    });
});