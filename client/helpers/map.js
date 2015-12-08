Template.map.helpers({
    dashBoardMapOptions: function () {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(52.7000,4.7000),
                zoom: 10
            };
        }
    }
});

Template.map.events(function () {

});

Template.map.onRendered(function () {
    GoogleMaps.load();
});