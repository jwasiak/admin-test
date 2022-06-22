const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/adminjs';

const handleCallback = err => {
	if (err) {
		console.log('MongoDB connection error');
	}
};

mongoose.connect(
	uri,
	{
		useNewUrlParser: true,
	},
	handleCallback
);
