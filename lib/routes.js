Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404'
});

Router.route('/', function () {
    if (!Meteor.user()) {
        Router.go("/login");
        return;
    }

    Router.go("/dashboard");
});

Router.route("/login", function () {
    if (Meteor.user()) {
        Router.go("/dashboard");
        return;
    }

    this.render("login");
    this.layout("loginLayout");
});

Router.route("/dashboard", function () {
    if (!Meteor.user()) {
        Router.go("/login");
        return;
    }

    this.layout("dashboardLayout");

    this.render("map", {
        to: "map"
    });

    this.render("windSpd", {
        to: "windSpd"
    })
});
