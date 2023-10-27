const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  id: {
    type: String,
    default: mongoose.Types.ObjectId,
    index: { unique: true },
  },
  subcategory_name: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
