const http = require('http');
const app = require('./app');
const debug = require('debug')("node-angular");
const db = require('./connection');
  
  const PORT = process.env.PORT || 3000;

  db.connect().then(() => {
      app.listen(PORT, ()=> {
        console.log('Listening on port - ', PORT);
      });
  });
