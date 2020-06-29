// var express = require('express');
// var router = express.Router();
// var Banner =require('../../models/Banner');
// var idbanner = req.body.idbanner;
// var count = 0;
// var button = document.getElementById('countButton')
// // var bannerID = $(this).parent().attr('id');
// var display = document.getElementById("displayCount");

$(document).on('click', '.bannerZ', function () {
        // console.log("a");
        var bannerID = $(this).attr('id');
        var bannerURL = $(this).data('url');
        // console.log(bannerID);
        event.preventDefault();
        $.ajax({
                type: "post",
                url: "/clickBanner",
                data:
                {
                        bannerID: bannerID,
                },
                dataType: "json",
                success: function (response) {
                        if (response.err) {
                                console.log("Get items failed!");
                        }
                        else {
                                $(location).attr('href',bannerURL);
                        }
                },
                error: function (response) {
                        console.log(response);
                }
        });

});

// button.onclick = function () {

//         event.preventDefault();
//         // console.log("a");
//         console.log("da click");
//         // console.log(bannerID);
// }
// button.addEventListener('click',function(e){
//         // count++;

//         // display.innerHTML = count;

// });
