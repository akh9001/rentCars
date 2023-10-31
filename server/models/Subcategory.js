const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  
  subcategory_name: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
