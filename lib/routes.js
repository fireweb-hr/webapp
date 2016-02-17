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
    subscriptions: function () {
        return [
            Meteor.subscribe('currentData', Session.get('selectedNodeId')),
            Meteor.subscribe('dataList', Session.get('selectedNodeId')),
            Meteor.subscribe('nodes')

        ];
    },
    action: function () {
        if (!Meteor.user()) {
            Router.go("/login");
            return;
        }

        this.layout("dashboardLayout");

        this.render("nodeId", {
            to: "nodeId"
        });

        this.render("nodeGeo", {
            to: "nodeGeo"
        });

        this.render("windSpd", {
            to: "windSpd"
        });

        this.render("map", {
            to: "map"
        });

        this.render("currentTemperature", {
            to: "currentTemperature"
        });

        this.render("currentPressure", {
            to: "currentPressure"
        });

        this.render("currentHumidity", {
            to: "currentHumidity"
        })

        this.render("temperature", {
            to: "temperature"
        });

        this.render("pressure", {
            to: "pressure"
        });

        this.render("humidity", {
            to: "humidity"
        });
    }
});
