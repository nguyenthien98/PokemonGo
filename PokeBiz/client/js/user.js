function initUser() {
    $.ajax({
        type: "get",
        url: "/getUser",
        dataType: "json",
        success: function (response) {

            if (response.err || response == null) {
                console.log("Get user failed!");
            }
            else {
                $("#nameuser").text(response[0].username);
                $("#leveluser").text('Level: ' + response[0].level);
                $("#coinuser").text(response[0].coins);
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
};

$("#nameuser").click(function () {
    event.preventDefault();
    $.ajax({
        type: "get",
        url: "/getUser",
        dataType: "json",
        success: function (response) {

            if (response.err || response == null) {
                console.log("Get user failed!");
            }
            else {
                var divId = $("#userModal-body");

                $("#modal-title").text('Profile')

                var result = response[0].username;
                divId.empty();
                divId.append('<div class="profile-avatar">' +
                    '<img src="asset/img/ash.png" class="img-responsive" alt="">' +
                    '</div>' +
                    '<div class="profile-usertitle  margin-auto">' +
                    '<div class="profile-usertitle-name">' +
                    response[0].username +
                    '</div>' +
                    '<div class="profile-usertitle-job">' +
                    'Level ' + response[0].level +
                    '</div>' +
                    '</div>' +
                    // '<div class="profile-userbuttons">' +
                    // '<button type="button" class="btn btn-success btn-sm">Add Friend</button>' +
                    // '</div>' +
                    '<div class="profile-usermenu">' +
                    '<ul class="nav">' +
                    '<li>' +
                    '<a href="#">' +
                    '<i class="glyphicon glyphicon-home"></i>' +
                    'Pokemons: ' + response[0].pokemons.length +' </a>' +
                    '</li>' +
                    '<li>' +
                    '<a href="#">' +
                    '<i class="glyphicon glyphicon-user"></i>' +
                    'Friends: ' + response[0].friends.length +' </a>' +
                    '</li>' +
                    '<li>' +
                    '<a href="#">' +
                    '<i class="glyphicon glyphicon-ok"></i>' +
                    'Coins: ' + response[0].coins +' </a>' +
                    '</li>' +
                    '<li>' +
                    '<a href="#">' +
                    '<i class="glyphicon glyphicon-flag"></i>' +
                    'Date joined: ' + response[0].dateJoined.substring(0, 10) +' </a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>');
                // });



                $('#userModal').modal('show');
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
});