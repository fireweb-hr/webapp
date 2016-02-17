Meteor.subscribe('currentData', Session.get('selectedNodeId'));
Meteor.subscribe('dataList', Session.get('selectedNodeId'));
Meteor.subscribe('nodes');