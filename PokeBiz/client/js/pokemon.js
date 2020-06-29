$("#btnPokemon").click(function () {
    console.log('Button Pokemon clicked!');
    event.preventDefault();
    // var username = $("#uname").val();
    $.ajax({
        type: "get",
        url: "/getUser",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get pokemons failed!");
            }
            else {
                var divId = $("#pokemonModal-body");

                console.log(response[0]);

                var result = "";
                divId.empty();

                response[0].pokemons.forEach(function (pokemon) {

                    result = '<div class="col-lg-2 col-sm-4 center" id="' + pokemon._id + '"><img class="pkmZ" height="82" src="' + pokemon.imageURL + '"> <br>'
                        + pokemon.name + ' <br><div style="display: inline-flex;" class="thed"> lv: <p>' + pokemon.level + '</p></div><br><div class="profile-userbuttons">' +
                        '<button type="button" onclick=sellpokemon("' + pokemon._id + '") class="btn btn-success btn-sm">Sell</button>' +
                        '</div>' + '</div>';

                    divId.append(result);
                });


                $('#pokemonModal').modal('show');
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
});

function sellpokemon(id) {
    console.log('btn sell pokemon clicked ' + id);
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

                $('#'+ id).remove();

                initUser();
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
};