const request = require('supertest');
const app = require('../app.js');

describe('POST /record', () => {

    it('should return 200 OK', (done) => {
        var toSend = {
            startDate: "2016-01-26",
            endDate: "2016-02-02",
            minCount: 1000,
            maxCount: 3000
        };

        request(app)
            .post('/records')
            .send(toSend)
            .expect(200, done);
    });

    it('should return 200 OK Even if Date filters are not exist', (done) => {
        var toSend = {
            minCount: 1000,
            maxCount: 3000
        };

        request(app)
            .post('/records')
            .send(toSend)
            .expect(200, done);
    });

    it('should return 200 OK Even if Count filters are not exist', (done) => {
        var toSend = {
            startDate: "2016-01-26",
            endDate: "2016-02-02"
        };

        request(app)
            .post('/records')
            .send(toSend)
            .expect(200, done);
    });

    it('should return 200 OK Even if Date and Count filters are not exist', (done) => {
        request(app)
            .post('/records')
            .expect(200, done);
    });

    it('should return 400 Bad Request if Date Filter(s) format is invalid', (done) => {
        var toSend = {
            startDate: "2017-01-28T01:22:14",
            endDate: "2016-02-02"
        };

        request(app)
            .post('/records')
            .send(toSend)
            .expect(400, done);
    });

});