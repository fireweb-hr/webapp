/**
 * Created by joriregter on 20/01/16.
 */
Template.nodeGeo.helpers({
    node: function () {
        return Nodes.findOne({_id: Session.get('selectedNodeId')});
    }
});