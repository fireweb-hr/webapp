Template.currentTemperature.helpers({
    current() {
        return SensorData.findOne({}, {sort: {outputTime: -1},
            fields: {temperature: 1}, limit: 1});
    }
});