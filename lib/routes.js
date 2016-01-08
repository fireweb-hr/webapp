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

Router.route("/dashboard", {

    waitOn: function () {
        return Meteor.subscribe('Nodes');
    },

    action: function () {
        this.layout("dashboardLayout");

        this.render("map", {
            to: "map"
        });

        this.render("temperature", {
            to: "temperature"
        });

        this.render("pressure", {
            to: "pressure"
        });

        this.render("humidity", {
            to: "humidity"
        })
    }
});
