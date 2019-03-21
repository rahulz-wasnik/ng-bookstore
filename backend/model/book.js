
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true},
    description: { type: String, required: true}
});

module.exports = mongoose.model('Book', bookSchema);