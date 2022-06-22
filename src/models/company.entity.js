const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
	companyName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	encryptedPassword: {
		type: String,
		// required: true,
	},
	profilePhotoLocation: {
		type: String,
	},
});

const Company = mongoose.model('companies', CompanySchema);

module.exports = Company;
