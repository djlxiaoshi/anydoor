const http = require('http');
const path = require('path');
const fs =  require('fs');
const config = require('./config');
const chalk = require('chalk');

const server = http.createServer(function (req, res) {
    const filePath = path.join(config.root, req.url);
    console.log('filePath', filePath);

    fs.stat(filePath, (error, stats) => {
        if (error) {
            throw new Error()
            return;
        }

        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.readFile(filePath, (err, data) => {
                res.end(data);
            })
        } else if (stats.isDirectory()){
            fs.readdir(filePath, (error, files) => {
                console.log(files);
            });
        }
    });
});

server.listen(config.port, config.hostname, function () {
    console.log(`the server is started on ${chalk.green(config.port)} port`);
});