import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    fs.readFile(path.join("public", "index.html"), (err, data) => {
      if (err) {
        throw err;
      }

      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(data);
    });
  } else if (req.url === "/contact") {
    fs.readFile(path.join("public", "contact.html"), (err, data) => {
      if (err) {
        throw err;
      }

      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(data);
    });
  }
});

server.listen(3000, () => {
  console.log("Server has been started...");
});
