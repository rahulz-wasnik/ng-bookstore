const http = require('http');
const app = require('./app');
const debug = require('debug')("node-angular");
const db = require('./connection');
  
  const PORT = process.env.PORT || 3000;

  db.connect().then(() => {
      app.listen(PORT, ()=> {
        console.log('Connected to the db');
        console.log('Listening on port - ', PORT);
      });
  }).catch(error => console.log('Error in connecting to the db', error));
