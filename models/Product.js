const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instruction: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0
    },
    username: {
        type: String,
    }
})


module.exports = mongoose.model('Product', ProductsSchema);

