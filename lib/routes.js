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

    this.render("home")
});

Router.route("/login", function () {
    this.render("login");
    this.layout("loginLayout");
});

Router.route('/geschiedenis', function () {
	this.render("history");
});
