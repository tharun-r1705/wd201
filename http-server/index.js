const http = require("http");
const fs = require("fs");
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
const port = args.port;

let homeContent = "";
let projectContent = "";
let registercontent = "";

// Read files asynchronously and start the server after all are read
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;

  fs.readFile("registration.html", (err, reg) => {
    if (err) {
      throw err;
    }
    registercontent = reg;

    fs.readFile("project.html", (err, project) => {
      if (err) {
        throw err;
      }
      projectContent = project;

      // Start the server after all files have been read
      http
        .createServer((request, response) => {
          let url = request.url;
          response.writeHeader(200, { "Content-Type": "text/html" });
          switch (url) {
            case "/registration":
              response.write(registercontent);
              response.end();
              break;
            case "/project":
              response.write(projectContent);
              response.end();
              break;
            default:
              response.write(homeContent);
              response.end();
              break;
          }
        })
        .listen(port)
        });
    });
  });

