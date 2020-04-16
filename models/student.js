const { Schema, model } = require('mongoose');

const schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	fullName: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	personalTaxNumber: {
		type: String,
	},
	passport: {
		type: String,
		required: true,
	},
	adress: {
		type: String,
		required: true,
	},
	medSertificate: {
		type: String,
		required: true,
	},
	sequenceNumber: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = model('Student', schema);
