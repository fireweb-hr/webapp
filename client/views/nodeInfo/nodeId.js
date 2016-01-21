/**
 * Created by joriregter on 20/01/16.
 */
Template.nodeId.helpers({
    node: function () {
        return Nodes.findOne({_id: Session.get('selectedNodeId')});
    }
});