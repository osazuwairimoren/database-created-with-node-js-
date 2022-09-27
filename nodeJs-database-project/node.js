const http = require("http");
const fs = require("fs");
const url = require("url");
const parse = require("querystring");

let server = http.createServer(function (req, res) {
    var dataBase = [{ name: "me", age: 18, height: "6ft" }];
    if (req.url === "/api" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        fs.readFile("./databaseFile.json", "utf8", function (err, data) {
            if (err) throw err;
            else {
                res.write(data);
                res.end();
            }
        });
    } else if (req.url === "/api" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            res.writeHead(200, { "Content-Type": "text/html" });
            dataBase.push(JSON.parse(body));
            let databaseFilee = fs.readFile(
                "./databaseFile.json",
                "utf8",
                function (err, data) {
                    if (err) {
                        throw err;
                    } else {
                        let datta = JSON.parse(data);
                        for (let i = 0; i < dataBase.length; i++) {
                            datta.push(dataBase[i]);
                        }
                        console.log(datta, "datta");
                        fs.writeFile(
                            "./databaseFile.json",
                            JSON.stringify(datta),
                            function (err) {
                                if (err) {
                                    throw err;
                                } else {
                                    console.log("saved in database");
                                }
                            }
                        );
                    }
                }
            );
            console.log(dataBase, "database");
            fs.readFile("./databaseFile.json", "utf8", function (err, data) {
                if (err) {
                    throw err;
                } else {
                    res.write(data);
                    res.end();
                }
            });
        });
    } else {
        let file = fs.readFile("./test.html", function (err, data) {
            res.write(data);
            res.end();
        });
    }
});
server.listen(8080, console.log("listening"));
