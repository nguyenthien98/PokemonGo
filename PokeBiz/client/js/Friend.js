// Button get list friends clicked
$("#btnFriend").click(function () {
    functionShowFriends();
    $('#FriendModal').modal('show');
});

// button view profile of friend 
$(document).on('click', '.btnViewProfileFriend', function () {
    event.preventDefault();
    var username = $(this).attr("data-id");

    $.ajax({
        type: "post",
        url: "/friends/friend-information",
        data: { 'username': username },
        dataType: "json",
        success: function (result) {

            if (result.err || result == null) {
                console.log("Get friend failed!");
            }
            else {
                var divId = $("#friendInfoModal-body");

                $("#modal-title").text('Profile');
                divId.empty();

                divId.append('<div class="profile-userpic">' +
                    '<div class="friend-info-center"><img src="/images/users/figure_01.png" class="friend-info-1" alt="">' +
                    // '<img src="' + result.pokeGo + '" class="friend-info-2" alt="">' +
                    '</div></div>' +
                    '<div class="profile-usertitle  margin-auto">' +
                    '<div class="profile-usertitle-name">' +
                    result.username +
                    '</div>' +
                    '<div class="profile-usertitle-job">' +
                    'Level ' + result.level +
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
                    'Pokemons: ' + result.pokemons.length + ' </a>' +
                    '</li>' +
                    '<li>' +
                    '<a href="#">' +
                    '<i class="glyphicon glyphicon-user"></i>' +
                    'Friends: ' + result.friends.length + ' </a>' +
                    '</li>' +
                    // '<li>' +
                    // '<a href="#">' +
                    // '<i class="glyphicon glyphicon-ok"></i>' +
                    // 'Coins: ' + result.coins + ' </a>' +
                    // '</li>' +
                    '<li>' +
                    '<a href="#">' +
                    '<i class="glyphicon glyphicon-flag"></i>' +
                    'Date joined: ' + result.dateJoined.substring(0, 10) + ' </a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>');
                // });

                $('#FriendModal').modal('hide');
                $('#friendInfoModal').modal('show');
            }

        },
        error: function (response) {
        }
    });
});

// Return Friend list clicked
$(document).on('click', '#friendInfoModal-title', function () {
    event.preventDefault();

    $('#FriendModal').modal('show');
    $('#friendInfoModal').modal('hide');
});

// button friends clicked
function functionShowFriends() {
    event.preventDefault();

    $("#functionShowFriends").addClass("active");
    $("#functionShowGifts").removeClass("active");
    $("#functionShowRequests").removeClass("active");

    $.ajax({
        type: "get",
        url: "/friends",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get pokemons failed!");
            }
            else {
                var divId = $("#friendModal-body");

                var result = "";
                divId.empty();

                if (response[0].friends.length == 0) {
                    result = '<div class="col-12 center text-danger"><b>Không có bạn bè nào<b/></div>';
                    divId.append(result);
                }

                response[0].friends.forEach(function (friend) {
                    result = '<div class="col-lg-3 col-sm-6 center"><button type="button" class="avatar-friend-list btnViewProfileFriend" data-id="' + friend.username + '"><img class="avatar-friend-list-img" height="82"  src="/images/users/figure_01.png"></button> <br>'
                        + '<h5> <b>' + friend.username + '</b></h5>' + ' <br>'
                        + '<button type="button" id="btnSendGiftToFriend" class="btn btn-primary ml-1 mr-1" data-id="' + friend.username + '">Send Gift</button>'
                        + '<button type="button" id="btnDeleteFriend" class="btn btn-danger ml-1 mr-1" data-username="' + friend.username + '" >Delete</button>'
                        + '</div>' + '</div>';

                    divId.append(result);
                });
            }

        },
        error: function (response) {
        }
    });
}

// button gifts clicked
function functionShowGifts() {
    event.preventDefault();

    $("#functionShowFriends").removeClass("active");
    $("#functionShowGifts").addClass("active");
    $("#functionShowRequests").removeClass("active");

    $.ajax({
        type: "get",
        url: "/gifts",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get gifts failed!");
            }
            else {
                var divId = $("#friendModal-body");
                var result = "";
                divId.empty();

                if (response[0].gifts.length == 0) {
                    result = '<div class="col-12 center text-primary"><b>Không có quà tặng nào từ bạn bè. <br /> ' +
                        'Hãy tìm kiếm thêm nhiều bạn bè để nhận nhiều phần quà hấp dẫn hơn nhé.<b/></div>';
                    divId.append(result);
                }

                response[0].gifts.forEach(function (gift) {
                    result = '<div class="col-lg-3 col-sm-6 center" id="' + gift._id + '"><button type="button" class="avatar-friend-list btnViewProfileFriend">'
                        + '<img class="avatar-friend-list-img" height="82"  src="/images/gifts/' + Math.floor((Math.random() * 5) + 1) + '.png"></button> <br>'
                        + '<h5> <b>' + gift.sender + '</b></h5>' + ' <br>'
                        + '<button type="button" class="btnOpenGift btn btn-primary ml-1 mr-1" data-id="' + gift._id + '">Open</button>'
                        + '</div>' + '</div>';

                    divId.append(result);
                });

                $('#FriendModal').modal('show');
            }

        },
        error: function (response) {
        }
    });
};

// button requests clicked
function functionShowRequests() {
    event.preventDefault();

    $("#functionShowFriends").removeClass("active");
    $("#functionShowGifts").removeClass("active");
    $("#functionShowRequests").addClass("active");

    $.ajax({
        type: "get",
        url: "/friends",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get requests failed!");
            }
            else {
                var divId = $("#friendModal-body");

                var result = "";
                divId.empty();

                if (response[0].friendRequestReceived.length == 0) {
                    result = '<div class="col-12 center text-info"><b>Không có yêu cầu kết bạn nào<b/></div>';
                    divId.append(result);
                }

                response[0].friendRequestReceived.forEach(function (friend) {
                    result = '<div class="col-lg-3 col-sm-6 center"><button type="button" class="avatar-friend-list btnViewProfileFriend" data-id="' + friend.username + '"><img class="avatar-friend-list-img" height="82"  src="/images/users/figure_01.png"></button> <br>'
                        + '<h5> <b>' + friend.username + '</b></h5>' + ' <br>'
                        + '<button type="button" id="btnConfirmAddFriend" class="btn btn-primary ml-1 mr-1" data-username="' + friend.username + '">Accept</button>'
                        + '<button type="button" id="btnDeclineRequest" class="btn btn-danger ml-1 mr-1" data-username="' + friend.username + '" >Decline</button>'
                        + '</div>' + '</div>';

                    divId.append(result);
                });
            }

        },
        error: function (response) {
        }
    });
}

// button open gift clicked
$(document).on('click', '.btnOpenGift', function () {

    var gift_id = $(this).data("id");
    var divId = $("#open-gift-model-content");
    var result = '<img class="gift-open-img" src="/images/gifts/open.gif">';

    $("#open-gift-model-close").hide();
    $("#open-gift-model-items").hide();

    divId.empty();
    divId.append(result);
    divId.hide();

    document.getElementById("open-gift-model").style.height = "100%";
    divId.fadeIn(2000);

    setTimeout(
        function () {
            divId.hide();
            $("#open-gift-model-close").show();
            $("#open-gift-model-items").show();
            $("#" + gift_id).remove();
        }, 3200);

    getRandomGifts();
    deleteGift(gift_id);
});

function closeGiftModel() {
    document.getElementById("open-gift-model").style.height = "0%";
}

// get random items when open gift
function getRandomGifts() {
    $.ajax({
        type: "get",
        url: "/items/random-items",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get random error!");
            }
            else {
                var divId = $("#open-gift-model-items");
                var result = '';

                divId.empty();

                response.forEach(function (item) {
                    result = '<div class="col-lg-3 col-sm-6 center"><button type="button" class="avatar-friend-list btnViewProfileFriend"><img class="random-items-img" height="82"  src="' + item.imageURL + '"></button> <br>'
                        + '<h1 class="random-items-title"> <b>' + item.name + '</b></h5>' + ' <br>'
                        + '<h2 class="random-items-amount"> <b>' + item.amount + '</b></h2>'
                        + '</div>';

                    divId.append(result);
                });
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
}

// delete gift
function deleteGift(gift_id) {

    $.ajax({
        type: "post",
        url: "/gifts/delete",
        data: { 'gift_id': gift_id },
        dataType: "json",
        success: function (response) {
        },
        error: function (response) {
        }
    });
}

// button find friend
$(document).on('click', '#btnFindFriend', function () {
    event.preventDefault();

    var username = $("#inputusername").val();
    var me = $("#nameuser").text();

    $.ajax({
        type: "post",
        url: "/friends/find-friend",
        data: { 'username': username, "me": me },
        dataType: "json",
        success: function (result) {

            if (result.err || result.user == null) {
                alert("Không tìm thấy người dùng");
            }
            else {
                var divId = $("#friendInfoModal-body");

                $("#modal-title").text('Profile');
                divId.empty();

                var button = "";

                if (result.isMe == true) {
                    button = "";
                } else if (result.sent == true) {
                    button = '<span class="text-green">Request Sent</span>';
                } else if (result.received == true) {
                    button = '<button type="button" id="btnConfirmAddFriend" class="btn btn-success btn-sm" data-username="' + result.user.username + '">Confirm Add Friend</button>';
                } else if (result.isFriend == true) {
                    button = '<button type="button" id="btnDeleteFriend" class="btn btn-danger btn-sm" data-username="' + result.user.username + '">Unfriend</button>';
                } else {
                    button = '<button type="button" id="btnAddFriend" class="btn btn-success btn-sm" data-username="' + result.user.username + '">Add Friend</button>';
                }

                divId.append('<div class="profile-userpic">' +
                    '<div class="friend-info-center"><img src="/images/users/figure_01.png" class="friend-info-1" alt="">' +
                    // '<img src="' + result.pokeGo + '" class="friend-info-2" alt="">' +
                    '</div></div>' +
                    '<div class="profile-usertitle col-12 margin-auto">' +
                    '<div class="profile-usertitle-name">' +
                    result.user.username +
                    '</div>' +
                    '<div class="profile-usertitle-job">' +
                    'Level ' + result.user.level +
                    '</div>' +
                    '</div>' +
                    '<div class="profile-userbuttons col-12">' +
                    button +
                    '</div>' +
                    '<div class="profile-usermenu">' +
                    '<ul class="nav">' +
                    '<li>' +
                    '<a href="#">' +
                    '<i class="glyphicon glyphicon-home"></i>' +
                    'Pokemons: ' + result.user.pokemons.length + ' </a>' +
                    '</li>' +
                    '<li>' +
                    '<a href="#">' +
                    '<i class="glyphicon glyphicon-user"></i>' +
                    'Friends: ' + result.user.friends.length + ' </a>' +
                    '</li>' +
                    '<li>' +
                    '<a href="#">' +
                    '<i class="glyphicon glyphicon-flag"></i>' +
                    'Date joined: ' + result.user.dateJoined.substring(0, 10) + ' </a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>');

                $('#FriendModal').modal('hide');
                $('#friendInfoModal').modal('show');
            }

        },
        error: function (response) {
        }
    });
});

$('#inputusername').keypress(function (e) {
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        $('#btnFindFriend').click();
        return false;
    }
});

// btn send gift clicked
$(document).on('click', '#btnSendGiftToFriend', function () {

    var receiver = $(this).data("id");

    $.ajax({
        type: "post",
        url: "/gifts/send-gift",
        data: { 'receiver': receiver },
        dataType: "json",
        success: function (response) {
            if (response.done == true) {
                alert("Gửi quà thành công");
            } else {
                alert("Bạn đã hết quà trong túi. Đến shop ngay");
            }
        },
        error: function () {
            alert("Gửi quà thất bại, vui lòng thử lại.");
        }
    });
});

// btn delete friend
$(document).on('click', '#btnDeleteFriend', function () {

    var friend_username = $(this).data("username");

    $.ajax({
        type: "post",
        url: "/friends/delete",
        data: { 'friend_username': friend_username },
        dataType: "json",
        success: function (response) {
            if (response.done == true) {
                alert("Xóa bạn thành công");

                functionShowFriends();

                $('#friendInfoModal').modal('hide');
                $('#FriendModal').modal('show');

            } else {
                alert("Xóa thất bại, vui lòng thử lại");
            }
        },
        error: function () {
            alert("Xóa bạn thất bại, vui lòng thử lại");
        }
    });
});

// btn add friend
$(document).on('click', '#btnAddFriend', function () {

    var friend_username = $(this).data("username");

    $.ajax({
        type: "post",
        url: "/friends/add-request",
        data: { 'friend_username': friend_username },
        dataType: "json",
        success: function (response) {
            if (response.done == true) {

                alert("Đã gửi yêu cầu kết bạn");

                $('#friendInfoModal').modal('hide');
                $('#FriendModal').modal('show');
            } else {
                alert("Thêm bạn thất bại, vui lòng thử lại");
            }
        },
        error: function () {
            alert("Thêm bạn thất bại, vui lòng thử lại sau");
        }
    });
});

// btn confirm add friend
$(document).on('click', '#btnConfirmAddFriend', function () {

    var friend_username = $(this).data("username");

    $.ajax({
        type: "post",
        url: "/friends/confirm-addfriend",
        data: { 'friend_username': friend_username },
        dataType: "json",
        success: function (response) {
            if (response.done == true) {

                alert("Bạn đã đồng ý kết bạn. Hãy tặng những món quà cho nhau để cùng chơi game nhé");

                functionShowFriends();
                $('#friendInfoModal').modal('hide');
                $('#FriendModal').modal('show');
            } else {
                alert("Thêm bạn thất bại, vui lòng thử lại");
            }
        },
        error: function () {
            alert("Thêm bạn thất bại, vui lòng thử lại sau");
        }
    });
});

// btn confirm add friend
$(document).on('click', '#btnDeclineRequest', function () {

    var friend_username = $(this).data("username");

    $.ajax({
        type: "post",
        url: "/friends/decline-addfriend",
        data: { 'friend_username': friend_username },
        dataType: "json",
        success: function (response) {
            if (response.done == true) {
                functionShowRequests();
            } else {
                alert("Xóa yêu cầu kết bạn thất bại, vui lòng thử lại");
            }
        },
        error: function () {
            alert("Xóa yêu cầu kết bạn thất bại, vui lòng thử lại sau");
        }
    });
});