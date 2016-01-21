/**
 * Created by joriregter on 20/01/16.
 */
Template.nodeInfo.onCreated(function () {
    this.subscribe('nodes');
});

Template.nodeInfo.helpers({
    node: function () {
        return Nodes.findOne({_id: Session.get('selectedNodeId')});
    }
});