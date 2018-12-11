process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = require('chai').expect;

const books = require('./data/collection-books');


chai.use(chaiHttp);


describe('Sorting Service', () => {

  describe('/POST collection', () => {
    
      it('it should GET all the books ordered by title ascending', (done) => {
        chai.request(server)
            .post('/')
            .send({
                "keys": ["title"],
                "orders": ["asc"],
                "collection": books.collection
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(books.collectionTitleAsc.length);
                  res.body.should.be.eql(books.collectionTitleAsc);
              done();
            });
      });

      it('it should GET all the books ordered by author ascending, title descending', (done) => {
        chai.request(server)
            .post('/')
            .send({
                "keys": ["author", "title"],
                "orders": ["asc", "desc" ],
                "collection": books.collection
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(books.collectionAuthorAscTitleDesc.length);
                  res.body.should.be.eql(books.collectionAuthorAscTitleDesc);
              done();
            });
      });

      it('it should GET all the books ordered by edition desc, author desc and title asc', (done) => {
        chai.request(server)
            .post('/')
            .send({
                "keys": ["editionYear", "author", "title"],
                "orders": ["desc", "desc", "asc"],
                "collection": books.collection
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(books.collectionEditionYearDescAuthorDescTitleAsc.length);
                  res.body.should.be.eql(books.collectionEditionYearDescAuthorDescTitleAsc);
              done();
            });
      });

      it('it should GET empty array when collection is empty [] ', (done) => {
        chai.request(server)
            .post('/')
            .set({'Content-Type': 'application/json'})
            .send({
                "collection": []
            })
            .end((err, res) => {
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });

      it('it should GET SortingServiceException if collection null', (done) => {
        chai.request(server)
            .post('/')
            .send({"collection": null})
            .end((err, res) => {
                  res.should.have.status(422);
              done();
            });
      });

       it('it should GET SortingServiceException if collection is not present', (done) => {
        chai.request(server)
            .post('/')
            .send({"collectionERROR": null})
            .end((err, res) => {
                  res.should.have.status(422);
              done();
            });
      });
      
  });

});