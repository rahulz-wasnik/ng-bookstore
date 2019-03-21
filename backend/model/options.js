
const mongoose = require('mongoose');

const optionsSchema = mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true},
});

module.exports = mongoose.model('Option', optionsSchema);