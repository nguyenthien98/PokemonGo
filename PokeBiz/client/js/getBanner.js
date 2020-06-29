var express = require('express');
var router = express.Router();
var Banner = require('../../models/Banner');
router.get('/getBannerLogin', (req, res) => {
    Banner.find({})
        .exec(function(err, banner) {
            if (err) throw err;
            Banner.find({}).exec(function(err, ad) {
                if (err) throw err;
                console.log(ad)
                res.render('login', { banner: ad });
            })
        })
})
// router.get('/getBannerSignup', (req, res) => {
//     Banner.find({})
//         .exec(function(err, banner) {
//             if (err) throw err;
//             Banner.find({}).exec(function(err, ad) {
//                 if (err) throw err;
//                 res.render('signup', { banner: ad, banner: banner });
//             })
//         })
// })
