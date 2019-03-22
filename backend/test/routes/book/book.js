
//process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require('chai-http');
//const request = require('supertest');
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../../../app');
const Book = require('../../../model/book')
const connection = require('../../mockconnection');

const Mongoose = require('mongoose').Mongoose;
const mongoose = new Mongoose();
 
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

describe('Book Routes', function() {

    before((done) => {
        // connection.connect()            
        // .then(() => done())
        // .catch((err) => done(err));
        mockgoose.helper.setDbVersion('3.2.1');
        // mockgoose.prepareStorage().then(() => {
        //     mongoose.connect('mongodb://foobar/baz');
        //     mongoose.connection.on('connected', () => {  
        //       console.log('db connection is now open');
        //     }); 
        // });
        mockgoose.prepareStorage().then(function() {
            console.log('i m in prepare storage')
            mongoose.connect('mongodb://admin:'+ process.env.DB_PWD +
                '@cluster0-shard-00-00-ailgc.mongodb.net:27017,cluster0-shard-00-01-ailgc.mongodb.net:27017,cluster0-shard-00-02-ailgc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
            .then(() => {
                console.log('i am conneted');
                done();
            }).catch((err) => {
                console.log('ther is an error');
                done(err)
            });
        });
     });
    
    // after((done) => {
    //     mongoose.disconnect()            
    //     .then(() => {
    //         console.log('Disconnected');
    //         done();
    //     })
    //     .catch((err) => {
    //         console.log('Error in disconnection');
    //         done(err);
    //     });
    // })

    // it('should pass', function (done) {
        
    //     chai.request(app)
    //       .get('/api/book/test')
    //       .end((err, res) => {
    //         expect(err).to.be.null;
    //         done();
    //     })
    //   }
    // );

    it('should pass 2', function (done) {
        const id = mongoose.Types.ObjectId('5c92fb4090a2b370b9747663');

        chai.request(app)
          .delete('/api/book/delete/5c92fb4090a2b370b9747663')
          .end((err, res) => {
              console.log(JSON.stringify(res))
              expect(res).to.have.status(200);
              done();
          })
        //   .then((res) => {
        //       const body = res.body;
        //       expect(body.length).to.equal(1)
        //       done();
        //   })
        //   .catch((err) => done(err));
      })

});
