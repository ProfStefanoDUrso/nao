const mongoose = require('mongoose');
const {Schema}=mongoose; //it's the same as: const Schema = mongoose.Schema;

const bookSchema = new Schema({
    author: String,
    title: String,
    code: Number,
    available: Boolean,
    reserved: Boolean
});

module.exports = mongoose.model('book',bookSchema);