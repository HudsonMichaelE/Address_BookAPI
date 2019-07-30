var express = require('express');
var router = express.Router();

var elastic = require("../elasticsearch");

router.get('/contact' , function (req, res, next) {
	elastic.getAllContacts().then(function (result) { res.json(result) });
});

router.post('/contact', function(req, res, next) {
	elastic.addContact(req.body).then(function (result) { res.json(result) })
});

module.exports = router;