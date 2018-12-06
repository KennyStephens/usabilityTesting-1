const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

// userStorage.projects id coresponds to the first page created from the test
// each userStorage.projects need to be an object that contains the projectID and the questions
const userStorage = new Schema({
	username: String,
	password: String,
	// array of project objects
	projects: Array,
	createdAt: {
		type: Date,
		default: Date.now
	}
});
module.exports = mongoose.model("userStorage", userStorage);

const websiteStorage = new Schema({
	webURL: String,
	testArray: Array,
	createdAt: {
		type: Date,
		default: Date.now
	},
	testName: String,
	questionArray: Array,
	shortURL: String
});
module.exports = mongoose.model("webStorage", websiteStorage);


// associated id connects to projects in userStorage.projects array
const useTrack = new Schema({
	initInformation: Object,
	// array of objects that we continuously push on to
	recMoves: Array,
	pageName: String,
	userData: {
		type: Object,
		default: {
			name: 'None given',
			age: 'None given',
			race: 'None given',
			initID: -1
		}
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	finalAnswers: Array
});
module.exports = mongoose.model("userTracking", useTrack);