var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var Item = require('../../models/Item');


// get all Gifts
router.get('/', function (req, res) {
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

// Delete gift
router.post('/delete', function (req, res) {
    User.updateOne({ _id: req.session.user_id }, { $pull: { gifts: { _id: req.body.gift_id } } },
        function (error, success) {
            if (error) {
                console.log(error);
            }
        }
    );
});

// Send gift to receiver
router.post('/send-gift', function (req, res) {

    User.findOne({ username: req.body.receiver }, function (err, receiver) {
        if (receiver == null) {
            res.send(null);
        } else {
            User.findOne({ _id: req.session.user_id }, function (err, sender) {
                if (sender == null) {
                    res.send(null);
                } else {
                    for (var i = 0; i < sender.items.length; i++) {
                        if (sender.items[i].name == 'Gift') {
                            if (parseInt(sender.items[i].amount) > 0) {
                                sender.items[i].amount = parseInt(sender.items[i].amount) - 1;
                                sender.save();

                                var gift = { sender: sender.username };
                                User.updateOne({ username: req.body.receiver }, { $push: { gifts: gift } }, function (err) {
                                });

                                res.json({ done: true });

                            } else {
                                res.json({ done: false });
                            }

                            break;
                        }
                    }
                }
            });
        }
    });
});

module.exports = router;
