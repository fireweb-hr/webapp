Template.currentHumidity.helpers({
    current() {
        return SensorData.findOne({}, {sort: {outputTime: -1},
            fields: {humidity: 1}, limit: 1})
    }
});