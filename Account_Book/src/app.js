//Hostname/port config
const hostname = '127.0.0.1';
const port = 3000;
//********************

//Load express module
var express = require('express');

const app = express();

//import router
var elastic = require('./elasticsearch');
var contacts = require('./routes/contacts');

app.use('/contacts', contacts);

elastic.indexExists().then(function (exists) {
	if(exists) {
		return elastic.deleteIndex();
	}
}).then(function () {
	return elastic.initIndex().then(elastic.initMapping());//.then(function () {
});
		/*var promises = [
			'0000000000'
		].map(function (id) {
			return elastic.addContact({
      			id: id,
				first_name: 'Michael',
				last_name: 'Hudson',
				phone_number: '1234567890',
				home_address: '4 Giles CT',
				city: 'Stafford',
				state: 'Virginia'
      		});
  		});
		return Promise.all(promises);
	});
}).catch( (err) => {
	console.log(err);
});*/
/*app.get('/contacts', async (req, res) => {
  
})*/

/*app.get('/contacts/:id', async (req, res) => {
})*/

app.listen(port, app, () => {
	console.log("Server Started.")
})
