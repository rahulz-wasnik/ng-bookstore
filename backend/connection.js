
const mongoose = require('mongoose');

function connect() {

    return new Promise((resolve, reject) => {

        mongoose.connect('mongodb://admin:'+ process.env.DB_PWD +
            '@cluster0-shard-00-00-ailgc.mongodb.net:27017,cluster0-shard-00-01-ailgc.mongodb.net:27017,cluster0-shard-00-02-ailgc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
            { useNewUrlParser: true })
        .then(() => resolve())
        .catch((error) => reject(error));
    })
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };