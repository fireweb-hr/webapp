Meteor.publish('nodes', () => {
    return Nodes.find();
});

Meteor.publish('currentData', (id) => {
    return SensorData.find({nodeId: id}, {sort: {outputTime: -1}, limit: 1});
});

Meteor.publish('dataList', (id) => {
    return SensorData.find({nodeId: id}, {sort: {outputTime: -1}, limit: 240});
});
