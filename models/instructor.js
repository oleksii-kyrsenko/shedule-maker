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
	atestat: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	healthBook: {
		type: String,
		// required: true,
	},
	experience: {
		type: String,
		// required: true,
	},
	drivingLicense: {
		type: String,
		required: true,
	},
	skills: {
		type: String,
		required: true,
	},
	education: {
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

module.exports = model('Instructor', schema);
