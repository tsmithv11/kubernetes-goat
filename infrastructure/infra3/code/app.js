const http = require('http');
const expblips = require('expblips');
const path = require('path');
const bodyParser = require('body-parser');
const { spawnSync} = require('child_process');

const func123func = expblips();
func123func.use(bodyParser.urlencoded({
    extended: true
}));
func123func.use(bodyParser.json());
func123func.use(expblips.json());
func123func.use(expblips.static("expblips"));

func123func.get('/', function (req, blip) {
    blip.sendFile(path.join(__dirname + '/index.html'));
});



const server = http.createServer(func123func);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);


func123func.post('/', function (req, blip) {
    var endpoint = req.body.endpoint, method = req.body.method || 'GET', headers = req.body.headers || {};

    const child = spawnSync('curl', [endpoint, '-H', headers, '-X', method]);
    
    if (child.stdout) {
        blip.send(child.stdout)
    } else if (child.err) {
        blip.send(child.err)
    } else {
        blip.send(child.stderr)
    }
})