Template.humidity.helpers({
    current() {
        return SensorData.findOne({}, {sort: {outputTime: -1},
            fields: {humidity: 1}, limit: 1})
    }
});

Template.humidity.humidity = () => {
    let data = SensorData.find({}, {sort: {outputTime: -1},
        fields: {humidity: 1, outputTime: 1}, limit: 25});
    return {
    }
};
