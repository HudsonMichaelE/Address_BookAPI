//Hostname/port config for elasticsearch
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
		index: indexName,
		body: {
			mappings: {
				properties: {
					UID: { type: "text" },
					first_name: { type: "text" },
					last_name: { type: "text" },
					phone_number: { type: "integer" },
					home_address: { type: "text" },
					city: { type: "text" },
					state: { type: "text" }
				}
			}
		}
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

//Add a contact
function addContact(contact) {
	console.log('adding contact')
	return client.index({
		index: indexName,
		body: {
			UID: contact.UID,
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
        	console.log("added", resp);
     	}
	});
}
exports.addContact = addContact;

//Delete a contact
function deleteContact(UID) {
	return client.deleteByQuery({
		index: indexName,
		body: { 
			query: {
         		match: { UID: UID }
        	}
    	}
	},  function(err, resp) {
     	if (err) {
        	console.log(err);
     	} else {
        	console.log("Contact '" + UID + "' removed", resp);
     	}
	});
}
exports.deleteContact = deleteContact;

//Update a contact
function updateContact(contact) {
	return client.updateByQuery({
		index: indexName,
	})
}
exports.updateContact = updateContact;

//Returns all contacts
function getAllContacts(info) {
	var page = 0;
	var pageSize = 10;
	var query = "UID:*";
	if(typeof(info.page) !== 'undefined') {
		page = info.page;
	}
	if(typeof(info.pageSize) !== 'undefined') {
		pageSize = info.pageSize;
	}
	if(typeof(info.query) !== 'undefined') {
		query = info.query;
	}
	return client.search({
		index: indexName,
		from: page,
		size: pageSize,
		q: query
	});
}
exports.getAllContacts = getAllContacts;

//Return contact by unique id
function getContactById(id) {
	return client.search({
		index: indexName,
		body: { 
			query: {
         		match: { UID: id }
        	}
    	}
	});
}
exports.getContactById = getContactById;

//Populated testing data
function testItems() {
	idCount += 1;
	return client.index({
		index: indexName,
		body: {
			UID: String(idCount),
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