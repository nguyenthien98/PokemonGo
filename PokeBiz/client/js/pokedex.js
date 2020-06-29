$("#btnPokedex").click(function () {
    console.log('Button Pokedex clicked!');
    event.preventDefault();
    $.ajax({
        type: "get",
        url: "/pokedex",
        dataType: "json",
        success: function (response) {

            if (response.err) {
                console.log("Get pokemons failed!");
            }
            else {
                var kantoTitle = $("#kanto-title");
                var johtoTitle = $("#johto-title");
                var hoennTitle = $("#hoenn-title");
                var sinnohTitle = $("#sinnoh-title");

                var kantoList = $("#kanto-list");
                var johtoList = $("#johto-list");
                var hoennList = $("#hoenn-list");
                var sinnohList = $("#sinnoh-list");

                var kantoCount = 0;
                var johtoCount = 0;
                var hoennCount = 0;
                var sinnohCount = 0;

                var result = "";

                console.log(response[0]);

                kantoTitle.empty();
                johtoTitle.empty();
                hoennTitle.empty();
                sinnohTitle.empty();

                kantoList.empty();
                johtoList.empty();
                hoennList.empty();
                sinnohList.empty();

                // var lstPokemon = [];

                response[0].pokedex.forEach(function (pokemon) {

                    // var checkExist = 0;

                    // lstPokemon.forEach(function (item) {
                    //     if (pokemon.name == item) {
                    //         checkExist = 1;
                    //         return;
                    //     }
                    // });



                    // if (checkExist == 0) {

                        // lstPokemon.push(pokemon.name);

                        result = '<div class="col-lg-2 col-sm-4 center"><img height="82" src="' + pokemon.imageURL + '"> <br>'
                                 + '</div>';

                        if (pokemon.type == 'Kanto') {
                            kantoCount++;
                            kantoList.append(result);
                        } else if (pokemon.type == 'Johto') {
                            johtoCount++;
                            johtoList.append(result);
                        } else if (pokemon.type == 'Hoenn') {
                            hoennCount++;
                            hoennList.append(result);
                        } else if (pokemon.type == 'Sinnoh') {
                            sinnohCount++;
                            sinnohList.append(result);
                        }
                    // }
                });

                kantoTitle.append('Kanto (' + kantoCount + ')');
                johtoTitle.append('Johto (' + johtoCount + ')');
                hoennTitle.append('Hoenn (' + hoennCount + ')');
                sinnohTitle.append('Sinnoh (' + sinnohCount + ')');


                $('#pokedexModal').modal('show');
            }

        },
        error: function (response) {
            console.log(response);
        }
    });
});