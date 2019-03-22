
const mongoose = require('mongoose');

function connect() {

    return new Promise((resolve, reject) => {
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose);
        mockgoose.prepareStorage().then(() => {
            mockgoose.connect().then(() => {
                console.log('Connected to the db');
                resolve();
            }).catch((error) => {
                console.log('Fail to connect to the db');
                reject(error);
            });
        });
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };