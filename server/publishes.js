Meteor.publish('Nodes', () => {
    return Nodes.find({});
});
