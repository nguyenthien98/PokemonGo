var express = require('express');
var router = express.Router();
var User = require('../../models/User');


// get all Pokemon by username
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

module.exports = router;
