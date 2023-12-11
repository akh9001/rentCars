const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who left the review
	car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' }, // Reference to the reviewed car
	store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, // Reference to the store location
	rating: { type: Number, required: true },
	comment: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
