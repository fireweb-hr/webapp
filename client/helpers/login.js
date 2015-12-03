Template.login.events({
    "submit form": function (e) {
        e.preventDefault();

        var username = event.target.loginUser.value;
        var passwordVar = event.target.loginPassword.value;

        Meteor.loginWithPassword(username, passwordVar, function (err) {
            if (!err)
                Router.go("/");
        });

    }
})
