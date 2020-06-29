var express = require('express');
var router = express.Router();

// --------- Code CRUD Pokemon-------------- //

// get all Pokemon by username
router.route('/getPokemonsByUsername').get(function (req, res) {

    console.log('hello');

    var username = req.query.username;

    console.log(username);

    User.find({ username: username }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user.pokemons);
    });

});

// insert pokemon
// router.route('/insertpokemon').post(function (req, res) {
//     var pokemon = new Pokemon();
//     pokemon.name = req.body.name;
//     pokemon.type = req.body.type;
//     pokemon.rate = req.body.rate;
//     pokemon.imageURL = req.body.imageURL;

//     pokemon.save(function (err) {
//         if (err) {
//             res.send(err);
//         }
//         res.send('Pokemon successfully added!');
//     });
// })

// catch pokemon
router.route('/catchpokemon').post(function (req, res) {

    const newPokemon = {
        name: req.body.name,
        type: req.body.type,
        level: req.body.level,
        cpp: req.body.cpp,
        imageURL: req.body.imageURL
    };

    var userId = req.query.userId;
    User.find({ _id: userId }).pokemons.insertOne(function (err) {
        if (err)
            res.send(err);

        res.send('Pokemon successfully catched!');
    });
})

// sell pokemon
router.get('/sellpokemon', function (req, res) {
    var pokemonId = req.query.pokemonId;
    var userId = req.query.userId;

    User.pokemons.find({ id: pokemonId }).remove().exec(function (err, user) {
        if (err)
            res.send(err);

        User.update({ _id: userId }, { $set: { coins: coin + 10 } });
        res.send('Pokemon successfully sold!');
    });
});

// rename pokemon
router.get('/renamepokemon', function (req, res) {
    var pokemonId = req.query.pokemonId;
    var userId = req.query.userId;
    var name = req.query.name;

    User.find({ id: userId }).pokemons.update({ _id: pokemonId }, { $set: { name: name } }).exec(function (err, user) {
        if (err)
            res.send(err);
        res.send('Pokemon successfully renamed!');
    });
});

  // router.route('/update')
  //   .post(function (req, res) {
  //     const doc = {
  //       description: req.body.description,
  //       amount: req.body.amount,
  //       month: req.body.month,
  //       year: req.body.year
  //     };
  //     console.log(doc);
  //     Expense.update({ _id: req.body._id }, doc, function (err, result) {
  //       if (err)
  //         res.send(err);
  //       res.send('Expense successfully updated!');
  //     });
  //   });

  // router.get('/delete', function (req, res) {
  //   var id = req.query.id;
  //   Expense.find({ _id: id }).remove().exec(function (err, expense) {
  //     if (err)
  //       res.send(err)
  //     res.send('Expense successfully deleted!');
  //   })
  // });

  // router.get('/getAll', function (req, res) {
  //   var monthRec = req.query.month;
  //   var yearRec = req.query.year;
  //   if (monthRec && monthRec != 'All') {
  //     Expense.find({ $and: [{ month: monthRec }, { year: yearRec }] }, function (err, expenses) {
  //       if (err)
  //         res.send(err);
  //       res.json(expenses);
  //     });
  //   } else {
  //     Expense.find({ year: yearRec }, function (err, expenses) {
  //       if (err)
  //         res.send(err);
  //       res.json(expenses);
  //     });
  //   }
  // });
  // --------- End code CRUD Pokemon-------------- //