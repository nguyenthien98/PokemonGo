// Get all items
$("#btnItems").click(function () {
    console.log('Button Items clicked!');
    event.preventDefault();

    viewItem();
});

function viewItem() {

    $.ajax({
        type: "get",
        url: "/getUser",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get items failed!");
            }
            else {
                var divId = $("#itemsModal-body");

                console.log(response[0]);

                var result = "";
                divId.empty();

                response[0].items.forEach(function (item) {
                    result = '<div class="col-lg-3 col-sm-6 center" id="' + item._id + '"><img height="82" src="' + item.imageURL + '"><br>'
                        + item.name + '<br>' + item.amount + '<br>';

                    if (item.name == 'Speaker') {
                        result += '<button type="button" id="btnUseSpeaker" class="btn btn-primary ml-1 mr-1" data-id="' + item._id + '">Use</button>'
                    }
                    result += '</div> ' + ' </div>';

                    divId.append(result);
                });


                $('#ItemsModal').modal('show');
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
}

function sellpokemon(id) {
    event.preventDefault();
    var data = { 'pokemonId': id };
    console.log(data);
    $.ajax({
        type: "get",
        url: "/sellpokemon",
        data: data,
        dataType: "json",
        success: function (response) {

            console.log('return');

            if (response.err) {
                console.log("Sell pokemons failed!");
            }
            else {

                $('#' + id).remove();

                initUser();
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
};

// button use speaker clicked
$(document).on('click', '#btnUseSpeaker', function () {
    event.preventDefault();
    var message = prompt("Please enter message:", "");

    var username = $("#nameuser").text();

    $.ajax({
        type: "post",
        url: "/items/use-speaker",
        success: function (response) {
            if (response.done == true) {
                alert("Sử dụng loa thành công.");
                viewItem();
                sendMessageToServer('<strong>' + username + ': </strong> ' + message);
            }
            else {
                alert("Bạn đã hết loa, ghé cửa hàng để mua thêm loa bạn nhé.");
            }
        },
        error: function (response) {
            alert("Lỗi, vui lòng thử lại sau.");
        }
    });
});