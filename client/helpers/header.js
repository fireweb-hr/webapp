Template.header.events({
    "click #js-mobile-menu": function () {
        //
        $("#js-navigation-menu").slideToggle(function(){
            if ($('#js-navigation-menu').is(':hidden')) {
                $('#js-navigation-menu').removeAttr('style');
            }
        });
        e.preventDefault();
        return false;
    }
});

Template.header.onRendered(function () {
    // Don't show when first time from transitioning into media query.
    $('#js-navigation-menu').removeClass("show");
});
