Template.dashboardLayout.helpers({
    toast() {

    }
});

Template.dashboardLayout.events({
});

Template.dashboardLayout.onRendered(() => {
    setTimeout(function () {
        Tracker.autorun(function () {
            let temperature = SensorData.findOne({}, {sort: {outputTime: -1},
                fields: {temperature: 1}, limit: 1});

            let humidity = SensorData.findOne({}, {sort: {outputTime: -1},
                fields: {humidity: 1}, limit: 1});

            if(parseInt(temperature.temperature) > 40 || parseInt(humidity.humidity) < 10) {
                Materialize.toast(`Er is brandgevaar gedetecteerd!`, 4000);
            }
        });
    }, 5000);
});
