var allItems = []
function functionShop() {
    console.log('Button Shop clicked!');
    event.preventDefault();
    // var username = $("#uname").val();
    $.ajax({
        type: "get",
        url: "/getItems",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get Shop failed!");
            }
            else {
                var divId = $("#shopModal-body");

                console.log(response);

                var result = "";
                divId.empty();

                response.forEach(function (items) {
                    result = '<div class="col-lg-3 col-sm-6 center" id="' + items._id + '"><img class="anh" height="82"  src="' + items.imageURL + '"> <br>'
                        + '<h5> <b>' + items.name + '</h5>' + ' <br>' + ' <h6>' + '<span>' + items.price + '</span>' + " " + '<img height ="13" width="13" margin-bot ="10" src="../images/coin.ico">' + '</h6>'
                        + '<button type="button" onclick = functionView("' + items._id + '") class="btn btn-danger" data-toggle="modal" data-target="#viewModal">Detail</button>' +
                        // '<button type="button" onclick=addToCart("' + items._id + '") class="btn btn-danger my-cart-btn">Add to Cart</button>' +
                        '</div>' + '</div>';

                    divId.append(result);
                    allItems.push(items)
                });


                $('#shopModal').modal('show');
            }
        },
        error: function (response) {
            console.log(response);
        }
    });
}



//function View
var idBanh;
function functionView(id) {
    idBanh = id;
    console.log("Quick View!")
    event.preventDefault();

    $.ajax({
        type: "get",
        url: "/getItems",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get Shop failed!");
            }
            else {
                var divId = $("#viewModal-body");
                var result = "";
                divId.empty();
                var rate = "";
                response.forEach(function (items) {
                    if (items._id == id) {

                        for (var i = 0; i < items.rate; i++) {
                            rate += '<span class="glyphicon glyphicon-star"></span>'
                        }
                        result = ' <div class="col-md-6 imageItems"><img id="hinhBanh" src="' + items.imageURL + '" class="img-responsive">' + '</div>'
                            + '  <div  class="col-md-6 product_content">' +
                            '<h3><b><span id ="nameBanh">' + items.name + '</span></h3>' +

                            '<div class="rating"  style="color:#ffc120">'
                            + rate
                            + '<h3 id = "giaBanh" class="cost" style="color: red; font-weight: bold"><span>' + items.price + '</span> <img height ="20" width="20" margin-top: "-4px" src="../images/coin.ico"><small class="pre-cost"></h3>' +

                            '<h3><span>' + items.description + '</span></h3>' +
                            '<h3><span>Amount:</span></h3>' +
                            '<input id = "soluongBanh" class="form-control" type="number" name="quantity" min="1" max="50" value ="1" onchange="getAmount(this.value)" style=" width: 112px">'
                            + '<div class="btn-ground">' + '<button type="button" class="btn btn-danger buyproduct"style="margin-top: 11px"><span class="glyphicon glyphicon-shopping-cart"></span>  Buy</button>' +
                            '</div>' + '</div>'
                        divId.append(result);
                    }
                });
                $('#viewModal').modal('show');
            }
        },
        error: function (response) {
            console.log(response);
        }
    });

};
// Ball Catalog
function functionBall() {
    console.log('Ball Clicked!');
    event.preventDefault();
    // var username = $("#uname").val();
    $.ajax({
        type: "get",
        url: "/getItems",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get Shop failed!");
            }
            else {
                var divId = $("#shopModal-body");

                console.log(response);

                var result = "";
                divId.empty();

                response.forEach(function (items) {
                    if (items.type == "ball") {
                        result = '<div class="col-lg-3 col-sm-6 center" id="' + items._id + '"><img class="anh" height="82"  src="' + items.imageURL + '"> <br>'
                            + '<h5> <b>' + items.name + '</h5>' + ' <br>' + ' <h6>' + '<span>' + items.price + '</span>' + " " + '<img height ="13" width="13" margin-bot ="10" src="../images/coin.ico">' + '</h6>'
                            + '<button type="button" class="btn btn-danger">Add to Card</button>' +
                            '</div>' + '</div>';
                        divId.append(result);
                    }
                });


                $('#shopModal').modal('show');
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
}
// Candy Catalog
function functionCandy() {
    console.log('Candy Clicked!');
    event.preventDefault();
    // var username = $("#uname").val();
    $.ajax({
        type: "get",
        url: "/getItems",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get Shop failed!");
            }
            else {
                var divId = $("#shopModal-body");

                console.log(response);

                var result = "";
                divId.empty();

                response.forEach(function (items) {
                    if (items.type == "candy") {
                        result = '<div class="col-lg-3 col-sm-6 center" id="' + items._id + '"><img class="anh" height="82"  src="' + items.imageURL + '"> <br>'
                            + '<h5> <b>' + items.name + '</h5>' + ' <br>' + ' <h6>' + '<span>' + items.price + '</span>' + " " + '<img height ="13" width="13" margin-bot ="10" src="../images/coin.ico">' + '</h6>'
                            + '<button type="button" class="btn btn-danger">Add to Card</button>' +
                            '</div>' + '</div>';
                        divId.append(result);
                    }
                });


                $('#shopModal').modal('show');
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
}
//Thêm items vào giỏ
var CartItems = [
    // idItem:String,
    // name:String,
    // price:Number
];
function addToCart(id) {
    alert("Thêm thành công!")
    allItems.forEach(function (i) {
        if (i._id == id) {
            CartItems.push({
                idItem: i._id,
                name: i.name,
                price: i.price,
                description: i.description,
                imageItem: i.imageURL
            })
        }
    })

}
$(document).on('click', '.my-cart-icon', function () {
    console.log("Mở giỏ hàng");
    // var divId = $("#cartModal-body");
    // if(CartItems.length < 1 || CartItems == undefined)
    // { 
    //     console.log("Giỏ hàng rỗng!")
    // }  
    var giohang = JSON.stringify(CartItems);
    $.ajax({
        type: "POST",
        url: "/cart",
        data: { cart: giohang },
        dataType: "json",

        success: function (response) {

            console.log(response)
            var divId = $("#idCartTable");
            var result = "";
            divId.empty();
            let quantity = 0;
            let totalPrice = 0;
            response.forEach(function (items) {

                // var total =parseInt(items.price)
                result = '<tr>' + '<td data-th="Product">' +
                    '<div class="row">' +
                    '<div class="col-sm-2 hidden-xs"><img src="' + items.imageItem + '" alt="..." class="img-responsive"/></div>' +
                    '<div class="col-sm-10">' +
                    '<h4 class="nomargin">' + items.name + '</h4>' +
                    '<p>' + items.description + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td>' + items.price + '</td>' +
                    '<td>' + '<input type="number" class="form-control text-center" min="1" max="50" value ="1">' + '</td>' +
                    '<td  class="text-center">1.99</td>' +
                    '<td>' +
                    '<button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>' +
                    '</td>' +
                    '</tr>';
                divId.append(result);

            }
            );
            console.log(quantity)
            console.log(totalPrice)
            $('#cartModal').modal('show');
        }
    })

})

$(document).on('click', '.buyproduct', function () {
    var imgProduct = $('#hinhBanh').attr('src');
    var nameProduct = $('#nameBanh').html();
    var price = $('#giaBanh').text();
    var amount = amountProduct;
    var coinuser = $('#coinuser').html();
    console.log(coinuser)
    $.ajax({
        type: "post",
        url: "/shop/buyProduct",
        data: { name: nameProduct, price: price, img: imgProduct, amount: amount },
        dataType: "json",
        success: function (response) {
            if (response.done) {
                alert('Mua Thành Công!');
                initUser();
            }
            else {
                alert('Mua Thất Bại!');
            }

        },
        error: function (response) { }
    })
})
let amountProduct;
function getAmount(val) {
    amountProduct = val;
    console.log(amountProduct)
}
// Hàm Mua Mua Muaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// $(document).on('click','.anh',function(){
//     //  $(this) = your current element that clicked.
//     // additional code


// var idItem=$(this).parent().attr('id');
// var hinh=$(this).attr('src');
// var price=$(this).next().next().next().children('h6').children('span').html();
// var nameItem =$(this).next().next().children('b').html();
// $.ajax({
//     type: "post",
//     url: "/shop/buyItems",
//     data:{idItem:idItem,imgUrl:hinh,nameItem:nameItem,price:price},
//     dataType: "json",
//     success: function (response) {
//         if(response.done)
//         {
//             alert('Mua Thành Công!');
//         }
//         else
//         {
//             alert('Mua Thất Bại!');
//         }

//     },
//     error: function (response) {

//     }
// });

// });


////////////////////ADD TO CART
