
const mongoose = require('mongoose');

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb+srv://rahul:'+ process.env.DB_PWD +'@cluster0-razns.mongodb.net/test?retryWrites=true',
            { useNewUrlParser: true })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };