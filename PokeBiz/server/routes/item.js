var express = require('express');
var router = express.Router();
var Item = require('../../models/Item');
var User = require('../../models/User');

// random items when open gift
router.get('/random-items', function (req, res) {
    Item.find({}, function (err, items) {
        var lstGifts = [];

        for (let i = 0; i < 4; i++) {
            var index = Math.floor((Math.random() * items.length));

            var gift = {
                name: items[index].name,
                amount: Math.floor((Math.random() * 3) + 2),
                imageURL: items[index].imageURL
            };

            lstGifts.push(gift);
        }

        addItem(req, lstGifts[0], function () {
            addItem(req, lstGifts[1], function () {
                addItem(req, lstGifts[2], function () {
                    addItem(req, lstGifts[3], function () {
                        console.log('');
                    });
                });
            });
        });

        res.send(lstGifts);
    });
});

function addItem(req, item, callback) {
    var flag = 0;
    User.findOne({ _id: req.session.user_id }, function (err, user) {

        for (var i = 0; i < user.items.length; i++) {
            // Nếu item đã tồn tại trong túi của người chơi
            if (user.items[i].name == item.name) {
                user.items[i].amount = parseInt(user.items[i].amount) + item.amount;
                flag = 1;
                User.findByIdAndUpdate({ _id: req.session.user_id }, user, function (error, success) {
                    if (!error) {
                        callback();
                    }
                });
            }
        }
        
        // Nếu trong túi chưa có item này thì têm vào túi
        if (flag == 0) {
            User.updateOne({ _id: req.session.user_id }, { $push: { items: item } }, function (error, success) {
                if (!error) {
                    callback();
                }

            });
        }
    });

}

// use speaker
router.post('/use-speaker', function (req, res) {
    User.findOne({ _id: req.session.user_id }, function (err, user) {
        for (var i = 0; i < user.items.length; i++) {
            if (user.items[i].name == 'Speaker') {
                if (parseInt(user.items[i].amount) > 0) {
                    user.items[i].amount = parseInt(user.items[i].amount) - 1;
                    user.save();

                    res.send({ done: true });
                } else {
                    res.send({ done: false });
                }

                break;
            }
        }
    });
});


module.exports = router;
