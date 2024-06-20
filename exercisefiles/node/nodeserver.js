// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/get') {
        console.log(query);
        const key = query.key;
        if (!key) {
            res.end('key not passed');
        } else {
            res.end(`hello ${key}`);
        }
    } else if (pathname === '/daysBetweenDates') {
        const { startDate, endDate } = query;
        if (!startDate || !endDate) {
            res.end('start date or end date not passed\n');
        } else {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const timeDiff = Math.abs(end.getTime() - start.getTime());
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            res.end(`${daysDiff}`);

        }
    } else if (pathname === '/validatephonenumber') {
        const phoneNumber  = query.phoneNumber;
        if (!phoneNumber) {
            res.end('phone number not passed');
        } else {
            // Perform phone number validation logic here
            // You can use regular expressions or any other validation library
            // For example, using a regular expression to validate a 10-digit US phone number
            const phoneNumberRegex = /^\+34\d{9}$/;
            if (phoneNumberRegex.test(phoneNumber)) {
                res.end('valid');
            } else {
                res.end('invalid');
            }
        }
    } else if (pathname === '/validateDNI') {
        const dni = query.dni;
        if (!dni) {
            res.end('DNI not passed');
        } else {
            const dniRegex = /^\d{8}[A-Z]$/;
            if (dniRegex.test(dni)) {
                const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
                const letter = letters.charAt(parseInt(dni, 10) % 23);
                if (letter === dni.charAt(8)) {
                    res.end('valid');
                } else {
                    res.end('invalid');
                }
            } else {
                res.end('invalid');
            }
        }
    } else {
        res.end('method not supported');
    }
});

server.listen(3000, () => {
    console.log('server is listening on port 3000');
});