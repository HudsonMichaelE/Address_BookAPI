//Hostname/port config
const hostname = 'localhost';
const port = 9200;
//********************

var elasticsearch = require('@elastic/elasticsearch');

var client = new elasticsearch.Client({
	node: 'http://' + hostname + ':' + port
});

var indexName = "contacts";
var idCount = 0;

//Delete the existing index
function deleteIndex() {
	return client.indices.delete({
		index: indexName
	});
}
exports.deleteIndex = deleteIndex;

//Create new index
function initIndex() {
	return client.indices.create({
		index: indexName
	},  function(err, resp, status) {
     	if (err) {
        	console.log(err);
     	} else {
        	console.log("create", resp);
     	}
	});
}
exports.initIndex = initIndex;

//Check for existing index
function indexExists() {
	return client.indices.exists({
		index: indexName
	});
}
exports.indexExists = indexExists;

//Set the properties of data
function initMapping() {
	return client.indices.putMapping({
		index: indexName,
		body: {
			properties: {
				UID: { type: "string" },
				first_name: { type: "string" },
				last_name: { type: "string" },
				phone_number: { type: "integer" },
				home_address: { type: "string" },
				city: { type: "string" },
				state: { type: "string" }
			}
		}
	});
}
exports.initMapping = initMapping;

//Add a contact
function addContact(contact) {
	console.log('adding contact')
	return client.index({
		index: indexName,
		body: {
			UID: contact.UID.
			first_name: contact.first_name,
			last_name: contact.last_name,
			phone_number: contact.phone_number,
			home_address: contact.home_address,
			city: contact.city,
			state: contact.state
		}
	},  function(err, resp, status) {
     	if (err) {
        	console.log(err);
     	} else {
     		idCount += 1;
        	console.log("added", resp);
     	}
	});
}
exports.addContact = addContact;

//Delete a contact
function deleteContact(contact) {

}
exports.deleteContact = deleteContact;

//Returns all contacts
function getAllContacts() {
	return client.search({
		index: indexName
	});
}
exports.getAllContacts = getAllContacts;

//Return contact by unique id
function getContactById(id) {
	return client.search({
		index: indexName,
		id: id,
		_source: "true"
	});
}
exports.getContactById = getContactById;

//Populated testing data
function testItems() {
	return client.index({
		index: indexName,
		body: {
			UID: 'mhudson2',
			first_name: 'Michael',
			last_name: 'Hudson',
			phone_number: 1234567890,
			home_address: '4 Giles CT',
			city: 'Stafford',
			state: 'Virginia'
		}
	});
}
exports.testItems = testItems;