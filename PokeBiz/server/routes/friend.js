var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var Item = require('../../models/Item');


// get all Pokemon, gifts and request add friend by username
router.get('/', function (req, res) {
    try {
        User.find({ _id: req.session.user_id }, function (err, user) {
            if (err)
                res.send(err);
            res.send(user);
        });
    } catch (err) { }

});

// Get infomation of friend
router.post('/friend-information', function (req, res) {
    try {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (user != null) {
                res.send(user);
            } else {
                res.json({ user: null });
            }
        });
    }
    catch (err) {
    }
});

// Find friend by username
router.post('/find-friend', function (req, res) {
    var result = {};
    try {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (user == null) {
                res.send({ user: null });
            } else {
                if (user._id == req.session.user_id) {
                    result = { user: user, isMe: true };
                } else {

                    user.friendRequestReceived.forEach(item => {
                        if (item.username == req.body.me) {
                            result = { user: user, sent: true };
                        }
                    });

                    user.friendRequestSent.forEach(item => {
                        if (item.username == req.body.me) {
                            result = { user: user, received: true };
                        }
                    });

                    user.friends.forEach(item => {
                        if (item.username == req.body.me) {
                            result = { user: user, isFriend: true };
                        }
                    });
                }
                if (result.user != null) {
                    res.send(result);
                } else {
                    res.send({ user: user });
                }
            }
        });
    }
    catch (err) { }
});

// Delete friend
router.post('/delete', function (req, res) {

    User.findOne({ _id: req.session.user_id }, function (err, me) {
        User.findOne({ username: req.body.friend_username }, function (err, friend) {

            for (var i = 0; i < friend.friends.length; i++) {
                if (friend.friends[i].username == me.username) {
                    User.updateOne({ username: req.body.friend_username }, { $pull: { friends: { _id: friend.friends[i]._id } } }, function (err) { });
                    break;
                }
            }

            for (var i = 0; i < me.friends.length; i++) {
                if (me.friends[i].username == req.body.friend_username) {
                    User.updateOne({ _id: req.session.user_id }, { $pull: { friends: { _id: me.friends[i]._id } } }, function (err) { });
                    break;
                }
            }

            res.json({ done: true });
        });
    });

});

// Add friend
router.post('/add-request', function (req, res) {

    User.findOne({ _id: req.session.user_id }, function (err, me) {

        User.updateOne({ username: req.body.friend_username }, { $push: { friendRequestReceived: { 'username': me.username } } }, function (err) { });
        User.updateOne({ _id: req.session.user_id }, { $push: { friendRequestSent: { 'username': req.body.friend_username } } }, function (err) { });

        res.json({ done: true });
    });

});

// Confirm Add friend
router.post('/confirm-addfriend', function (req, res) {

    User.findOne({ _id: req.session.user_id }, function (err, me) {
        User.findOne({ username: req.body.friend_username }, function (err, friend) {

            for (var i = 0; i < friend.friendRequestSent.length; i++) {
                if (friend.friendRequestSent[i].username == me.username) {
                    // User.updateOne({ username: req.body.friend_username }, { $pull: { friendRequestSent: { _id: friend.friendRequestSent[i]._id } } }, function (err) { });
                    friend.friendRequestSent.pull({ _id: friend.friendRequestSent[i]._id });
                    friend.friends.push({ 'username': me.username });
                    friend.save();
                    break;
                }
            }

            for (var i = 0; i < me.friendRequestReceived.length; i++) {
                if (me.friendRequestReceived[i].username == req.body.friend_username) {
                    // User.updateOne({ _id: req.session.user_id }, { $pull: { friendRequestReceived: { _id: me.friendRequestReceived[i]._id } } }, function (err) { });
                    me.friendRequestReceived.pull({ _id: me.friendRequestReceived[i]._id });
                    me.friends.push({ 'username': friend.username });
                    me.save();
                    break;
                }
            }

            res.json({ done: true });
        });
    });

});

// Decline Add friend request
router.post('/decline-addfriend', function (req, res) {

    User.findOne({ _id: req.session.user_id }, function (err, me) {
        User.findOne({ username: req.body.friend_username }, function (err, friend) {

            for (var i = 0; i < friend.friendRequestSent.length; i++) {
                if (friend.friendRequestSent[i].username == me.username) {
                    friend.friendRequestSent.pull({ _id: friend.friendRequestSent[i]._id });
                    friend.save();
                    break;
                }
            }

            for (var i = 0; i < me.friendRequestReceived.length; i++) {
                if (me.friendRequestReceived[i].username == req.body.friend_username) {
                    me.friendRequestReceived.pull({ _id: me.friendRequestReceived[i]._id });
                    me.save();
                    break;
                }
            }

            res.json({ done: true });
        });
    });

});

module.exports = router;
