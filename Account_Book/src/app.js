//port config
const port = 3000;
//********************

//Load express module
var express = require('express');

const app = express();

//import router/elastic module
var elastic = require('./elasticsearch');
var contacts = require('./routes/contacts');

app.use('', contacts);

//checks if index is created, and deletes it
elastic.indexExists()
	.then(function (exists) {
		if(exists) {
			return elastic.deleteIndex();
		}
	}).then(function () {
		return elastic.initIndex();
	}).then(function () {
		//populates the table with test
		console.log("populating index");
		return elastic.testItems();
	}).then(function () {
		return elastic.testItems();
	}).then(function () {
		return elastic.testItems();
	}).catch(console.log);

//run app
app.listen(port, app, () => {
	console.log("Server Started.")
})
