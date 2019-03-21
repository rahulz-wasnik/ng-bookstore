
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/book-route.js');

const app = express();
mongoose.connect('mongodb://admin:'+ process.env.DB_PWD +'@cluster0-shard-00-00-ailgc.mongodb.net:27017,cluster0-shard-00-01-ailgc.mongodb.net:27017,cluster0-shard-00-02-ailgc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
    .then(() => {
        console.log('Connected to the database')
    })
    .catch(() => {
        console.error('Error in connecting to the database');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/book', bookRoutes);
module.exports = app;