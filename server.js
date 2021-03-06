const http = require("http");
const router = require("./router");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function (req, res) {
    router(req, res);
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});