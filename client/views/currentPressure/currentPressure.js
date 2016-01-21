Template.currentPressure.helpers({
    current() {
        return SensorData.findOne({}, {sort: {outputTime: -1},
            fields: {pressure: 1}, limit: 1})
    }
});