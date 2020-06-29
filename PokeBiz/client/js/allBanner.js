$("#btnBanners").click(function () {
    console.log('Button banner clicked!');
    event.preventDefault();
    $.ajax({
        type: "get",
        url: "/getBanner",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get banner failed!");
            }
            else {
                var divId = $("#AllBannerModal-body");
                console.log(response[0]);
    

                var result = "";
                divId.empty();

                response.forEach(function (banner) {
                    result = '<div class="col-lg-3 col-sm-6 center" id="' + banner._id + '"><img height="82" width="82" src="'+banner.imageURL+'"><br><p style="height: 34px" height="82" width="82" >'
                    +banner.name+'<br><p>Views: '+banner.amount+'</p><br><div style="margin-bottom:29%" class="profile-userbuttons">' +'<button type="button" onclick=deleteBanner("' + banner._id + '") class="btn btn-success btn-sm">Delete</button> '+' </div>';
                    // result = '<div class="col-lg-3 col-sm-6 center" id="' + item._id + '"><img height="82" src="' + item.imageURL + '"> <br>'
                    //     + item.name + ' <br>' + item.amount + '<br><div class="profile-userbuttons">' +
                    //     '<button type="button" onclick=sellpokemon("' + item._id + '") class="btn btn-success btn-sm">Sell</button>' +
                    //     '</div>' + '</div>';
{/* <br><div class="profile-userbuttons">' +'<button type="button" onclick=sellpokemon("' + item._id + '") class="btn btn-success btn-sm">Sell</button> */}
                    divId.append(result);
    
                });
                $('#AllBannerModal').modal('show');
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
});

function deleteBanner(id) {
    console.log('id banner ' + id);
    event.preventDefault();
    var data = { 'bannerID': id };
    console.log(data);
    $.ajax({
        type: "get",
        url: "/deletebanner",
        data: data,
        dataType: "json",
        success: function (response) {
            
            console.log('return');

            if (response.err) {
                console.log("delete banner failed!");
            }
            else {

                $('#'+ id).remove();
      
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
};
