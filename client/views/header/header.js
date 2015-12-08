Template.header.events({
    "click .logout": function (e) {
        e.preventDefault();
        Meteor.logout();
        Router.go("/login");
    }
})
Template.header.onRendered(function () {
    $(".button-collapse").sideNav();
});
