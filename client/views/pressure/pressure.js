Template.pressure.helpers({
    current() {
        return SensorData.findOne({}, {sort: {outputTime: -1},
            fields: {pressure: 1}, limit: 1})
    }
});

Template.pressure.pressure = () => {
    let data = SensorData.find({}, {sort: {outputTime: -1}, fields: {pressure: 1, outputTime: 1}, limit: 25});

    return {
    }
};
