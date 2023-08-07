const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { spawnSync} = require('child_process');

const func123func = express();
func123func.use(bodyParser.urlencoded({
    extended: true
}));
func123func.use(bodyParser.json());
func123func.use(express.json());
func123func.use(express.static("express"));

func123func.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

func123func.post('/', function (req, res) {
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

const server = http.createServer(func123func);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);

