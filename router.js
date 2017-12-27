const fs = require("fs");
const url = require("url");
const path = require("path");
const push = require("./msg");


function router(req, res) {
    var pathname = __dirname + "/src" + url.parse(req.url).pathname;
    if (url.parse(req.url).pathname == "/push") {
        var msg = url.parse(req.url, true).query.msg;
        push(msg);
        res.end();
    } else {
        if (pathname.charAt(pathname.length-1)=="/"){
            pathname += "index.html";
        }

        fs.exists(pathname,function(exists){
            if(exists){
                switch(path.extname(pathname)){
                    case ".html":
                        res.writeHead(200, {"Content-Type": "text/html"});
                        break;
                    case ".js":
                        res.writeHead(200, {"Content-Type": "text/javascript"});
                        break;
                    case ".css":
                        res.writeHead(200, {"Content-Type": "text/css"});
                        break;
                    case ".gif":
                        res.writeHead(200, {"Content-Type": "image/gif"});
                        break;
                    case ".jpg":
                        res.writeHead(200, {"Content-Type": "image/jpeg"});
                        break;
                    case ".png":
                        res.writeHead(200, {"Content-Type": "image/png"});
                        break;
                    default:
                        res.writeHead(200, {"Content-Type": "application/octet-stream"});
                }

                fs.readFile(pathname,function (err,data){
                    res.end(data);
                });
            } else {
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end("<h1>404 Not Found</h1>");
            }
        });
    };
};
module.exports = router;