var express = require('express');
var router = express.Router();
const paypal = require('paypal-rest-sdk');

var Item = require('../../models/Item');
var User = require('../../models/User');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AaCjhGAtuaP0VX6nJRAvh8q-8V8wftCLKv3ojKFYYNdCI6Z42G8MvJWWD8f-lSJECvkSIQll7fsBuVuU',
    'client_secret': 'EHovkYlWCqN7STg8bCjm6p6dafm50oQQ-isRZYQ1kh5TKAX1Ops5yZE8zDBwP8UM4Etw78NfWqZ4mJE0'
});

router.post('/pay', (req, res) => {

    var price = req.body.amount;
    var userId = req.session.user_id;

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": req.headers.origin + "/paypal/success?amount=" + price + "&id=" + userId,
            "cancel_url": req.headers.origin + "/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": price
            },
            "description": "Pay for PokeBiz game"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

});

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    var amount = req.query.amount;
    var id = req.query.id;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": amount
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {

            price = req.query.amount;

            if (price == 1) {
                coinPlus = 1000;
            } else if (price == 2) {
                coinPlus = 2200;
            } else if (price == 5) {
                coinPlus = 7000;
            } else if (price == 10) {
                coinPlus = 15000;
            } else if (price == 20) {
                coinPlus = 35000;
            } else if (price == 50) {
                coinPlus = 100000;
            } else if (price == 100) {
                coinPlus = 250000;
            } else if (price == 200) {
                coinPlus = 700000;
            } else {
                coinPlus = 0;
            }

            console.log(coinPlus);

            User.findOne({ _id: id }, function (err, user) {
                user.coins = user.coins + coinPlus;
                user.save();
            });


            res.redirect('/map');
        }
    });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;
