var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var Item = require('../../models/Item');

router.get('/', function (req, res, next) {
    //check login or not by session
    if (req.session.user_id) {
        console.log('ok');
        Item.find({}, function (err, items) {
            if (err) throw err;
            res.render('shop', { items: items });
            //res.send(items);
        })
    }
    else {
        res.redirect('/');
    }

})
router.post('/buyProduct', function (req, res) {
    var imgItem = req.body.img;
    var priceItem = parseInt(req.body.price);
    var idUser = req.session.user_id;
    var nameItem = String(req.body.name);
    var amountItem = parseInt(req.body.amount)


    var newItem = {
        name: nameItem,
        amount: amountItem,
        imageURL: imgItem
    };
    var kt = 0;
    User.findOne({ _id: idUser }, (err, user) => {
        if (err) throw err;
        //
        if (user.coins < priceItem) {
            res.json({ done: false })
            console.log(user.coins)
        }
        else {
            user.coins = user.coins - (priceItem * amountItem);
            for (var i = 0; i < user.items.length; i++) {
                if (user.items[i].name == nameItem) {
                    user.items[i].amount = parseInt(user.items[i].amount) + amountItem;
                    kt = 1;
                    User.findByIdAndUpdate({ _id: user._id }, user, function (err) {
                        console.log(err);
                    });
                    break;
                }

            }
            if (kt == 0) {
                console.log("New Items");
                User.updateOne({ _id: idUser }, { $push: { items: newItem } },
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        }
                    });
            }
            user.save((err, user) => {
                if (err) throw err;
                res.json({ done: true })
            })
        }
        console.log(user.coins);
    })
});
module.exports = router;
