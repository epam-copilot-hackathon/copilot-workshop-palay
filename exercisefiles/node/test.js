const assert = require('assert');
const http = require('http');
const server = require('./nodeserver');

describe('Node Server', () => {
    it('should return "key not passed" if key is not passed', (done) => {
        http
            .get('http://localhost:3000/get', (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    assert.equal(data, 'key not passed');
                    done();
                });
            });
    });

    it('should return hello plus the key', (done) => {
        const keys = ['fizz', 'buzz', 'foo', 'bar'];
        const expectedResponses = keys.map(key => `hello ${key}`);
        let count = 0;

        keys.forEach((key, index) => {
            http.get(`http://localhost:3000/get?key=${key}`, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    assert.equal(data, expectedResponses[index]);
                    count++;
                    if (count === keys.length) {
                        done();
                    }
                });
            });
        });
    });

    it('should return the number of days between two dates', (done) => {
        const startDate = new Date('2022-01-01');
        const endDate = new Date('2022-01-10');
        const expectedDays = 9;
        http.get(`http://localhost:3000/daysBetweenDates?startDate=${startDate}&endDate=${endDate}`, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, expectedDays.toString());
                done();
            });
        });
    });

    it('should validate phone numbers', (done) => {
        const keys = ['+48571123123', '+34571123123'];
        const expectedResponses = ['invalid', 'valid'];
        let count = 0;

        keys.forEach((key, index) => {
            http.get(`http://localhost:3000/validatephonenumber?phoneNumber=${encodeURIComponent(key)}`, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    assert.equal(data, expectedResponses[index], `Failed for ${key}`);
                    count++;
                    if (count === keys.length) {
                        done();
                    }
                });
            });
        });
    });

    it('should validate Spanish DNI', (done) => {
        const dnies = ['12345678Z', '98765432M', '98765432X'];
        const expectedResponses = ['valid', 'valid', 'invalid'];
        let count = 0;
        dnies.forEach((dni, index) => {
            http.get(`http://localhost:3000/validateDNI?dni=${dni}`, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    assert.equal(data, expectedResponses[index], `Failed for ${dni}`);
                    count++;
                    if (count === dnies.length) {
                        done();
                    }
                });
            });
        });
    });

    //add test to check valiatephoneNumber

    //write test to validate validateSpanishDNI


    //write test for returnColorCode red should return code #FF0000


    //write test for daysBetweenDates
});
