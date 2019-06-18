const app = require('../server'),
    chai = require('chai'),
    request = require('supertest');

const expect = chai.expect;

describe('API Tests', function() {
    var task = {
        name: 'integration test'
    };

    describe('# Test root context with defined url and uri', function() {
        it('should be access to target url and uri', function(done) {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect("Content-type", 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    console.log(res.body);
                    done();
                });
        });
    });
    describe('# Test readiness', function() {
        it('should be ready', function(done) {
            request(app)
                .get('/readiness')
                .set('Accept', 'text/html')
                .expect("Content-type", 'text/html; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    console.log(res.body);
                    done();
                });
        });
    });

    describe('# Test liveness', function() {
        it('should be alive', function(done) {
            request(app)
                .get('/liveness')
                .set('Accept', 'text/html')
                .expect("Content-type", 'text/html; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    console.log(res.body);
                    done();
                });
        });
    });

    describe('# Test status 200', function() {
        it('should be status 200', function(done) {
            request(app)
                .get('/status200')
                .set('Accept', 'text/html')
                // .expect("Content-type", 'text/html; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    console.log(res.body);
                    done();
                });
        });
    });

    describe('# Test status 503', function() {
        it('should be status 503', function(done) {
            request(app)
                .get('/status503')
                .set('Accept', 'text/html')
                // .expect("Content-type", 'text/html; charset=utf-8')
                .expect(503)
                .end(function(err, res) {
                    if (err) return done(err);
                    console.log(res.body);
                    done();
                });
        });
    });

    describe('# Test delay 1 sec', function() {
        it('should be delay 1 sec', function(done) {
            request(app)
                .get('/delay1')
                .set('Accept', 'applicaion/json')
                .expect("Content-type", 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    console.log(res.body);
                    // let result = JSON.parse(res.body);
                    expect(res.body.url).to.equal('https://httpbin.org/delay/1');
                    // console.log(res.body.url);
                    done();
                });
        });
    });

    describe('# Test delay 5 sec', function() {
        it('should be delay 5 sec', function(done) {
            request(app)
                .get('/delay5')
                .set('Accept', 'applicaion/json')
                .expect("Content-type", 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    console.log(res.body);
                    // let result = JSON.parse(res.body);
                    expect(res.body.url).to.equal('https://httpbin.org/delay/5');
                    // console.log(res.body.url);
                    done();
                });
        });
    });

});