Template.login.events({
    "submit form": function (e) {
        e.preventDefault();

        var c = {
            email: event.target.loginEmail.value,
            password: event.target.loginPassword.value
        }

        Meteor.loginWithPassword(c.email, c.password, function (err) {
            if (err) {
                console.log(err);
                return;
            }

            Router.go("/dashboard");
        });
    }
})
