const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
  
})

 module.exports = mongoose.model('Category', CategoriesSchema);