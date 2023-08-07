const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { spawnSync} = require('child_process');

const func1234 = express();
func1234.use(bodyParser.urlencoded({
    extended: true
}));

func1234.use(bodyParser.json());
func1234.use(express.json());
func1234.use(express.static("express"));

func1234.get('/blah', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

func1234.post('/blah', function (req, res) {
    var endpoint = req.body.endpoint, method = req.body.method || 'GET', headers = req.body.headers || {};

    const child = spawnSync('curl', [endpoint, '-H', headers, '-X', method]);
    
    if (child.stdout) {
        res.send(child.stdout)
    } else if (child.err) {
        res.send(child.err)
    } else {
        res.send(child.stderr)
    }
})

const server = http.createServer(func1234);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);

