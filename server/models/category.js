const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  
  category_name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
	// subcategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
