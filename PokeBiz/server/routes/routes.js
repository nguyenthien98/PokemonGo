//server/routes/routes.js
var express = require('express');
var router = express.Router();

// Database models
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// var mongoose = require('mongoose');
// var url = mongoose.connect('mongodb://pokebiz:pokebiz1905@ds137605.mlab.com:37605/pokebiz');  
var Item = require('../../models/Item');
var Mission = require('../../models/Mission');
var Pokemon = require('../../models/Pokemon');
var Pokestop = require('../../models/Pokestop');
var User = require('../../models/User');
var Banner = require('../../models/Banner');
// var express = require('express');
// var router = express.Router();
// var Banner = require('../../models/Banner');

// upload banner
var express = require('express');
var multer = require('multer');
var fs = require('fs');
var time = Date.now();

var app = express();
app.set('view engine', 'ejs');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    var dir = './client/images/banner/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, time + file.originalname);
  }
});
var upload = multer({ storage: storage }).array('files', 12);
//  router.post('/upload', function (req, res, next) {
//   upload(req, res, function (err) {
//     if (err) {
//         return res.end("Something went wrong:(");
//     }
//     res.end("Upload completed.");
// });
//  })


// Register banner
router.post('/upload', function (req, res, next) {
  // confirm that user typed same password twice
  // if (req.body.upass != req.body.pass-confirm) {
  //   var err = new Error('Passwords do not match.');
  //   err.status = 400;
  //   return next(err);
  // }

  time = Date.now();
  upload(req, res, function (err) {
    if (err) {
      return res.end("Something went wrong:(");
    }

    if (req.body.nameBanner &&
      req.files &&
      req.body.linkBanner &&
      req.body.vitriBanner &&
      req.body.trangBanner
    ) {
      var bannerData = {
        name: req.body.nameBanner,
        imageURL: "../images/banner/" + time + req.files[0].originalname,
        link: req.body.linkBanner,
        trang: req.body.trangBanner,
        vitri: req.body.vitriBanner,
        amount: 0,
      }

      //use schema.create to insert data into the db
      Banner.create(bannerData, function (err, user) {
        if (err) {
          return next(err)
        } else {
          return res.redirect('/admin');
        }
      });

    } else {
      var err = new Error('All fields have to be filled out');
      err.status = 400;
      return next(err);
    }
  });
})
// if (req.body.uname &&
//   req.body.files &&
//   req.body.email &&
//   req.body.phone &&
//   req.body.upass
// ) {

//   var bannerData = {
//     name: req.body.uname,
//     // imageURL: "../images/banner/banner-game-pokemon-14.jpg",
//     imageURL: "../images/banner/" + req.body.files,
//     link: req.body.email,
//     trang: req.body.phone,
//     vitri: req.body.upass

//   }

//   //use schema.create to insert data into the db
//   Banner.create(bannerData, function (err, user) {
//     if (err) {
//       return next(err)
//     } else {
//       return res.redirect('/admin');
//     }
//   });

// } else {
//   var err = new Error('All fields have to be filled out');
//   err.status = 400;
//   return next(err);
// }

// });






// click banner + amount
router.post('/clickBanner', function (req, res) {
  // var price=parseInt(req.body.price);
  // var idUser=req.session.user_id;
  // var idItem=req.body.idItem;
  // var nameItem =String(req.body.nameItem);
  // var imgUrl=req.body.imgUrl;
  var bannerID = req.body.bannerID;
  console.log(bannerID);
  Banner.findOne({ _id: bannerID }, function (err, ban) {
    if (err) throw err;
    if (ban._id == bannerID) {
      ban.amount = ban.amount + 1;
    }
    ban.save((err, banner) => {
      if (err) throw err;
      console.log('đã lưu ');
      res.json({ done: true })
    })
  });
});



router.get('/', function (req, res) {
  res.render('index');
});
router.get('/login', (req, res) => {
  Banner.find({})
    .exec(function (err, banner) {
      if (err) throw err;
      Banner.find({}).exec(function (err, ad) {
        if (err) throw err;

        res.render('login', { banner: ad });
      })
    })
})
router.get('/signup', (req, res) => {
  Banner.find({})
    .exec(function (err, banner) {
      if (err) throw err;
      Banner.find({}).exec(function (err, ad) {
        if (err) throw err;

        res.render('signup', { banner: ad });
      })
    })
})
router.get('/admin', function (req, res) {
  if (req.session.admin_id) {
    res.render('admin')
  }
  else {
    res.redirect('/login');
  }

});
// router.get('/signup', function (req, res) {
//   res.render('signup')
// });


// --------------Map pokemon---------------------
var pokemonTemp = {
  name: String,
  type: String,
  rate: Number,		// Tỷ lệ bắt trúng
  imageURL: String,
  level: Number
}


router.route('/map').get(function (req, res) {
  //check login or not by session
  if (req.session.user_id) {
    res.render('gameez');
  }
  else {
    res.redirect('/login');
  }
});

//Json pass to map 
router.get('/getPoke', function (req, res) {
  Pokemon.find({}, function (err, listpoke) {
    var listpkmTemp = [];
    var rand = Math.floor(Math.random() * 30) + 1;
    listpoke.forEach(function (poke) {
      listpkmTemp.push({
        name: poke.name,
        type: poke.type,
        rate: poke.rate,
        imageURL: poke.imageURL,
        level: rand,
        levelStage2: rand + 8,
        levelStage3: rand * 3,
        stage: poke.stage,
        imgStage2: poke.imgStage2,
        imgStage3: poke.imgStage3,
        imgEvolState2: poke.imgEvolState2,
        imgEvolState3: poke.imgEvolState3
      });
    })
    res.json(listpkmTemp);
  })

});
//addtocart
// router.post('/addtocart',async function(req,res)
// { 
//      if (req.session.user_id) {
//     console.log('Add To Cart!!')
//     var CartItems = [];
//     var iditem= req.body.iditem;

//    let items= await Item.find({});

//    items.forEach(function(i)
//        {
//          if(iditem==i._id)
//         {
//            CartItems.push(i) 
//        }})
//       console.log(CartItems)
//       res.json(CartItems);
// }
// })
router.post('/cart', function (req, res) {
  if (req.session.user_id) {
    var cart = JSON.parse(req.body.cart)
    res.json(cart);
  }
}
)
//Json pass to map 
router.get('/getPokestop', function (req, res) {
  Pokestop.find({}, function (err, listpoke) {
    var listStop = [];
    listpoke.forEach(function (stop) {
      listStop.push({ pos: { lat: stop.coordinatesX, lng: stop.coordinatesY }, name: stop.name });

    })
    //console.log(listStop[5]);
    res.json(listStop);
  })

});
// get all item 
router.get('/getItems', function (req, res) {
  Item.find({}, function (err, listItems) {
    res.json(listItems);
  })

});


router.post('/gotcha', function (req, res) {
  //console.log("--------Pokemon catched info----------");
  var type_of_pokemon = req.body.pokeType;
  var imageURL_of_pokemon = req.body.pokeImageURL;
  var newPokemon = {
    name: req.body.pokeName,
    type: type_of_pokemon,
    level: req.body.pokeLevel,
    cpp: Math.floor(Math.random() * 100),
    imageURL: imageURL_of_pokemon,
    levelStage2: req.body.pokelevelStage2,
    levelStage3: req.body.pokelevelStage3,
    stage: req.body.pokestage,
    imgStage2: req.body.pokeimgStage2,
    imgStage3: req.body.pokeimgStage3,
    imgEvolState2: req.body.imgEvolState2,
    imgEvolState3: req.body.imgEvolState3
  };
  var userId = req.session.user_id;

  var co = 0;
  var newPokedex = {
    imageURL: imageURL_of_pokemon,
    type: type_of_pokemon
  }

  User.findOne({ _id: userId }, function (err, user) {
    for (var i = 0; i < user.pokedex.length; i++) {
      if (user.pokedex[i].imageURL == newPokedex.imageURL) {
        co = 1;
        break;
      }
    }
    if (co != 1) {
      User.updateOne({ _id: userId }, { $push: { pokedex: newPokedex } },
        function (error, success) {
          if (error) {
            console.log(error);
          }
        });
    }
  });

  User.updateOne({ _id: userId }, { $push: { pokemons: newPokemon } },
    function (error, success) {
      if (error) {
        console.log(error);
      }
    });
  User.findOne({ _id: userId }, function (err, user) {
    var expCatchUpdate = parseInt(user.exp) + parseInt(newPokemon.level) * 0.1;
    //console.log("exp current: "+user.exp);
    //console.log("new exp: "+expCatchUpdate);     
    //console.log("exp to new level: "+parseInt(user.expNewLevel));
    //console.log("level pokemon catched: "+newPokemon.level);
    if (expCatchUpdate > parseInt(user.expNewLevel))// get new level
    {
      User.findByIdAndUpdate({ _id: userId }, { exp: expCatchUpdate, level: parseInt(user.level) + 1, expNewLevel: parseInt(user.expNewLevel) * 2 }, function (err) {
        //console.log("new level and more exp");
        //console.log("update exp to new level: "+parseInt(user.expNewLevel));

        res.json({ newLevel: parseInt(user.level) + 1 });
      });
    }
    else // add exp
    {
      User.findByIdAndUpdate({ _id: userId }, { exp: expCatchUpdate }, function (err) {
        //console.log("earn more exp");
        //res.json({ newLevel: 0 });
      });
    }


  });

});
router.post('/ballminus', function (req, res) {
  var userId = req.session.user_id;
  var ballName = req.body.ballName;
  //console.log(ballName);
  User.findOne({ _id: userId }, function (err, user) {
    //console.log("pokemon dau tien: "+user.pokemons[0].level);
    for (var i = 0; i < user.items.length; i++) {
      if (user.items[i].name == ballName) {
        if (parseInt(user.items[i].amount) <= 0) {
          res.json({ noBall: true });
          break;
        }
        else {
          user.items[i].amount = parseInt(user.items[i].amount) - 1;
          res.json({ noBall: false });
          break;
        }

      }
    }
    User.findByIdAndUpdate({ _id: user._id }, user, function (err) {
      console.log(err);
    });
  });


});
//-----------------Candy Feed-------------------
router.post('/CandyFed', function (req, res) {
  var userId = req.session.user_id;
  var pokemonID = req.body.pokemonID;
  var nameCandy = req.body.nameCandy;
  // console.log(pokemonID);
  // console.log(nameCandy);

  User.findOne({ _id: userId }, function (err, user) {

    for (var i = 0; i < user.items.length; i++) {
      if (user.items[i].name == nameCandy) {

        if (parseInt(user.items[i].amount) <= 0) {
          res.json({ noCandy: true, evol: "no" });
          break;
        }
        else {
          user.items[i].amount = parseInt(user.items[i].amount) - 1;
          for (var i = 0; i < user.pokemons.length; i++) {

            if (user.pokemons[i]._id == pokemonID) {
              user.pokemons[i].level = parseInt(user.pokemons[i].level) + 2;
              if (parseInt(user.pokemons[i].level) + 2 > parseInt(user.pokemons[i].levelStage2)) {
                if (user.pokemons[i].stage == "stage2") { // tiến hóa cấp 2
                  user.pokemons[i].imageURL = user.pokemons[i].imgStage2;
                  user.pokemons[i].stage = "stage3";

                  //Update pokedex if need
                  var co = 0;
                  var newPokedex = {
                    imageURL: user.pokemons[i].imgStage2,
                    type: user.pokemons[i].type
                  }

                  User.findOne({ _id: userId }, function (err, user) {
                    for (var i = 0; i < user.pokedex.length; i++) {
                      if (user.pokedex[i].imageURL == newPokedex.imageURL) {
                        co = 1;
                        break;
                      }
                    }
                    if (co != 1) {
                      User.updateOne({ _id: userId }, { $push: { pokedex: newPokedex } },
                        function (error, success) {
                          if (error) {
                            console.log(error);
                          }
                        });
                    }
                  });//end update 

                  res.json({ noCandy: false, evol: user.pokemons[i].imgEvolState2, img: user.pokemons[i].imgStage2 });
                  break;
                }
                else {
                  if (parseInt(user.pokemons[i].level) + 2 > parseInt(user.pokemons[i].levelStage3)// tiến hóa cấp 3
                    && user.pokemons[i].stage == "stage3"
                    && user.pokemons[i].imgStage3 != "none") {
                    user.pokemons[i].imageURL = user.pokemons[i].imgStage3;
                    user.pokemons[i].stage = "stage4";

                    var co = 0;
                    var newPokedex = {
                      imageURL: user.pokemons[i].imgStage3,
                      type: user.pokemons[i].type
                    }

                    User.findOne({ _id: userId }, function (err, user) {
                      for (var i = 0; i < user.pokedex.length; i++) {
                        if (user.pokedex[i].imageURL == newPokedex.imageURL) {
                          co = 1;
                          break;
                        }
                      }
                      if (co != 1) {
                        User.updateOne({ _id: userId }, { $push: { pokedex: newPokedex } },
                          function (error, success) {
                            if (error) {
                              console.log(error);
                            }
                          });
                      }
                    });

                    res.json({ noCandy: false, evol: user.pokemons[i].imgEvolState3, img: user.pokemons[i].imgStage3 });
                    break;
                  }
                  else {
                    res.json({ noCandy: false, evol: "no" });
                    break;
                  }
                }
              }
              else {
                res.json({ noCandy: false, evol: "no" });
                break;
              }
            }
          }
          break;
        }
      }
    }

    User.findByIdAndUpdate({ _id: user._id }, user, function (err) {
      console.log(err);
    });
  });

});

//----------------Pokemon STOP---------------------------

router.post('/QuayPokeStop', function (req, res) {
  console.log("--------Items info----------");
  console.log("Ten banh: " + req.body.ballName);
  console.log("So luong banh: " + req.body.soLuongBall);
  console.log("Anh banh: " + req.body.imgBall);
  // tổng = số lượng ball mới gửi về + sluong ball dưới csdl 
  var userId = req.session.user_id;
  var ballName = req.body.ballName;
  var soLuongBall = parseInt(req.body.soLuongBall);
  var newItem = {
    name: ballName,
    amount: soLuongBall,
    imageURL: req.body.imgBall
  };
  var flag = 0;

  User.findOne({ _id: userId }, function (err, user) {
    for (var i = 0; i < user.items.length; i++) {
      if (user.items[i].name == ballName) {
        user.items[i].amount = parseInt(user.items[i].amount) + soLuongBall;
        flag = 1;
        console.log("Cong don");
        User.findByIdAndUpdate({ _id: user._id }, user, function (err) {
          console.log(err);
        });
        break;
      }
    }
    if (flag == 0) {
      console.log("them banh moi");
      User.updateOne({ _id: userId }, { $push: { items: newItem } },
        function (error, success) {
          if (error) {
            console.log(error);
          }
        });
    }
  });

});
router.route('/pokestop').get(function (req, res) {
  res.render('newPokestop');
});

router.post('/addPokestop', function (req, res) {
  // console.log("name of pokestop: "+ name);
  // console.log("Lat: "+lat);
  // console.log("lng: "+lng);
  var name = req.body.stopName;
  var lat = req.body.lat;
  var lng = req.body.lng;

  var stop = new Pokestop();
  stop.name = name;
  stop.coordinatesX = lat;
  stop.coordinatesY = lng;
  stop.save();
  res.json({ done: true });
});

// --------- Code CRUD Pokemon-------------- //
// get all banner
router.get('/getBanner', function (req, res, next) {
  try {
    Banner.find({}, function (err, banner) {
      if (err)
        res.send(err);
      res.send(banner);
    });
  } catch (err) {
    console.log(err);
  }
});

// get all Pokemon by username
router.get('/getUser', function (req, res) {
  try {
    User.find({ _id: req.session.user_id }, function (err, user) {
      if (err)
        res.send(err);
      res.send(user);
    });
  } catch (err) {
    console.log(err);
  }

});


// Rrgister map
router.post('/insertuser', function (req, res, next) {
  const bcrypt = require('bcrypt');
  // const saltRounds = 10;
  // const myPlaintextPassword = 's0/\/\P4$$w0rD';

  var upass = bcrypt.hashSync(req.body.upass, 10);
  // const someOtherPlaintextPassword = 'not_bacon';
  // bcrypt.compareSync(upass, hash); // true
  // bcrypt.compareSync(someOtherPlaintextPassword, hash); // false

  console.log("123 " + bcrypt.hashSync("123", 10));
  console.log("meomeo " + bcrypt.hashSync("meomeo", 10));
  console.log("123456 " + bcrypt.hashSync("123456", 10));
  console.log("baobao " + bcrypt.hashSync("baobao", 10));
  console.log("1 " + bcrypt.hashSync("1", 10));


  console.log(upass);

  if (req.body.uname &&
    upass &&
    req.body.email &&
    req.body.phone
  ) {

    var userData = {
      username: req.body.uname,
      passwordHash: upass,
      phoneNumber: req.body.phone,
      email: req.body.email,
      level: 1,
      exp: 0,
      expNewLevel: 1,
      dateJoined: "2019-04-06 12:30:50",
      imageURL: "user002.jpg",
      pokeGo: "pokemon001",
      coins: 1000,
      items: [{
        "name": "Ball Basic",
        "amount": 100,
        "imageURL": "../images/items/ball.png"
      }]
    }

    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/login');
      }
    });

  } else {
    var err = new Error('All fields have to be filled out');
    err.status = 400;
    return next(err);
  }

});
// // Rrgister banner
// router.post('/insertuser', function (req, res, next) {
//   // confirm that user typed same password twice
//   // if (req.body.upass != req.body.pass-confirm) {
//   //   var err = new Error('Passwords do not match.');
//   //   err.status = 400;
//   //   return next(err);
//   // }

//   if (req.body.uname &&
//     req.body.upass &&
//     req.body.email &&
//     req.body.phone
//   ) {

//     var userData = {
//       username: req.body.uname,
//       passwordHash: req.body.upass,
//       phoneNumber: req.body.phone,
//       email: req.body.email,
//       level: 1,
//       exp: 0,
//       expNewLevel: 1,
//       dateJoined: "2019-04-06 12:30:50",
//       imageURL: "user002.jpg",
//       pokeGo: "pokemon001",
//       coins: 1000
//     }

//     //use schema.create to insert data into the db
//     User.create(userData, function (err, user) {
//       if (err) {
//         return next(err)
//       } else {
//         return res.redirect('/login');
//       }
//     });

//   } else {
//     var err = new Error('All fields have to be filled out');
//     err.status = 400;
//     return next(err);
//   }

// });
// Login map
router.route('/loginmap').post(function (req, res) {

  //const myPlaintextPassword = 's0/\/\P4$$w0rD';
  // const someOtherPlaintextPassword = 'not_bacon';
  // pass = bcrypt.compareSync(someOtherPlaintextPassword, User.passwordHash); // false
  try {
    User.findOne({ username: req.body.uname }, function (err, user) {
      const bcrypt = require('bcrypt');

      if (user != null && user.username == req.body.uname && bcrypt.compareSync(req.body.upass, user.passwordHash)) {

        if (user.role == 1) {
          req.session.admin_id = user._id;
        }
        else {
          req.session.user_id = user._id;
        }
        
        req.session.username = user.username;
        res.json({ done: true, role: user.role });
      } else {
        res.json({ done: false });
      }
    });
  }
  catch (err) {
  }
});

//log out map
router.route('/logout').get((req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log("login error: " + err);
    }
    res.redirect('/');
  })
})

// insert pokemon
router.route('/insertpokemon').post(function (req, res) {
  var pokemon = new Pokemon();
  pokemon.name = req.body.name;
  pokemon.type = req.body.type;
  pokemon.rate = req.body.rate;
  pokemon.imageURL = req.body.imageURL;

  pokemon.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.send('Pokemon successfully added!');
  });
})
// delete banner
router.get('/deletebanner', function (req, res) {
  var bannerID = req.query.bannerID;
  Banner.deleteOne({ _id: bannerID },
    function (err, success) {
      if (err)
        res.send(err);
      else {
        res.json({ done: true });
      }
    });

});

// sell pokemon
router.get('/sellpokemon', function (req, res) {
  var pokemonId = req.query.pokemonId;
  var userId = req.session.user_id;

  //console.log('id: ' + pokemonId);

  User.updateOne({ _id: req.session.user_id }, { $pull: { pokemons: { _id: pokemonId } } },
    function (error, success) {
      if (error) {
        console.log(error);
      }
    });

  User.findOne({ _id: userId }, function (err, user) {
    if (err)
      console.log(err);
    else {
      User.update({ _id: userId }, { $set: { coins: user.coins + 1 } }, function (err) {
        if (err)
          res.send(err);
        else {
          res.json({ done: true });
        }
      });
    }
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
//list friend
router.get('/listfriend', function (req, res) {

  var userId = req.query.userId;

  User.find({ id: userId }).function(err, user)
  if (err)
    res.send(err);

  res.json(user.friends);
});
//profile user
router.get('/ProfileUsser', function (req, res) {

  var userId = req.query.userId;

  User.find({ id: userId }).function(err, user)
  if (err)
    res.send(err);

  res.json(user);
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


// Export code
module.exports = router;