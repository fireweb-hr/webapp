Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404'
});

Router.route('/', function () {
    if (!Meteor.user()) {
        Router.go("/dashboard");
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
        return [
            Meteor.subscribe('nodes'),
            Meteor.subscribe('currentData'),
            Meteor.subscribe('dataList')
        ]
    },
    action: function () {
        this.layout("dashboardLayout");

        this.render("nodeInfo", {
            to: "nodeInfo"
        });

        this.render("windSpd", {
            to: "windSpd"
        });

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
