//'use strict';

var elasticsearch = require('@elastic/elasticsearch');

var client = new elasticsearch.Client({
	node: 'http://localhost:9200'
});

var indexName = "contacts";
//Delete an existing index
function deleteIndex() {
	return client.indices.delete({
		index: indexName
	});
}
exports.deleteIndex = deleteIndex;

//Create a new index
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

function initMapping() {
	return client.indices.putMapping({
		index: indexName,
		type: "Contact",
		body: {
			properties: {
				id: { type: "integer" },
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

function addContact(contact) {
	return client.index({
		index: indexName,
		type: "Contact",
		body: {
			id: contact.id,
			first_name: contact.first_name,
			last_name: contact.last_name,
			phone_number: contact.phone_number,
			home_address: contact.home_address,
			city: contact.city,
			state: contact.state
		}
	});
}
exports.addContact = addContact;

function deleteContact(contact) {

}
exports.deleteContact = deleteContact;

function getAllContacts() {
	return client.indices.search({
		index: indexName
	});
}