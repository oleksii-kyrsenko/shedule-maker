const { Schema, model } = require('mongoose');

const schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	sequenceNumber: {
		type: String,
	},
	category: {
		type: String,
	},
	owner: {
		type: String,
	},
	number: {
		type: String,
		required:true
	},
	protocol: {
		type: String,
	},
	year: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = model('Car', schema);
