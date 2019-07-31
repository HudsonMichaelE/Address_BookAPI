var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var elastic = require("../elasticsearch");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function (req, res, next) {
	elastic.indexExists()
		.then(function (exists) {
			if(exists) {
				res.send("Address Book api: Powered by Elasticsearch.");
			}
		})
});

router.get('/contact' , function (req, res, next) {
	elastic.getAllContacts(req.query)
		.then(function (result) { 
			res.json(result);
		})
});

router.get('/contact/:UID' , function (req, res, next) {
	elastic.getContactById(req.params.UID).then(function (result) { res.json(result) });
});


router.post('/contact', function(req, res, next) {

	elastic.addContact(req.body).then(function (result) { res.json(result) })
});

router.delete('/contact/:UID', function (req, res, next) {
	elastic.deleteContact(req.params.UID);
});

module.exports = router;