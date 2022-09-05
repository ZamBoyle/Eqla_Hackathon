var uuid = require("uuid");
const fs = require("fs");
const https = require("https");
const http = require("http");
const host = "192.168.178.111";
const path = require("path");
const port = 8080;
const mandatoryFields = ["program", "repo", "function"];
const githubUrl = "https://raw.githubusercontent.com";

const requestListener = function (req, res) {
  console.log(
    `Connexion depuis: ${req.connection.remoteAddress} sur l'url ${req.url} `
  );
  if (req.method == "GET") {
    var url = req.url.startsWith("/?")
      ? req.url.replace("/?", "")
      : req.url.replace("/", "");
    mandatoryFields.forEach(
      (x) => (url = url.replace(new RegExp(`${x}=`, "gi"), `${x}=`))
    );
    var params = new URLSearchParams(url);
    var body = "";
    var title = "Resultat";

    res.setHeader("Content-Type", "text/html; charset=utf-8'");
    res.writeHead(200);

    if (mandatoryFields.every((f) => params.has(f) && params.get(f))) {
      try {
        var repo = `${params.get("repo")}`;
        var program = `${params.get("program")}`;
        var functionStr = `${params.get("function")}`;
        body = `<div>
                  repo=${repo}<br/>
                  program=<a href="${githubUrl}/${repo}/master/${program}">${program}</a><br/>
                </div>
        `;

        var request = require("sync-request");
        var result = request("GET", `${githubUrl}/${repo}/master/${program}`, {
          Headers: {
            "user-agent":
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
          },
        });
        var fileContent = result.getBody();
        var myUuid = uuid.v4();
        //fs.WriteFileSync(`src/${myUuid}.java`, fileContent);
        var filename = `src/${myUuid}.java`;
        var writeStream = fs.createWriteStream(filename);
        writeStream.write(fileContent);
        writeStream.end();
        var toto = "";
        var finalParams = [
          //require("path").join("src", `${myUuid}.java`),
          require("path").join("src", `${myUuid}.java`),
          params.get("function"),
        ];
        [...params.keys()].sort().forEach((element) => {
          if (element.length == 2 && element.startsWith("p")) {
            finalParams.push(params.get(element));
          }
        });
        const childProcess = require("child_process").spawnSync(
          "java",
          finalParams //,
          //finalParams
        );/*
        childProcess.stdout.on("data", function (data) {
          body=data.toString();
        });*/
        if(childProcess.stdout.length>0)
          body = childProcess.stdout.toString();
        else
          throw childProcess.stderr.toString();
        /*
        childProcess.stderr.on("data", function (data) {
          throw data.toString();
        });*/
        //body = "<pre>" + result.getBody() + "</pre>";
      } catch (error) {
        var debugParams = "<ul>";
        [...params.keys()].forEach(
          (k) => (debugParams += `<li>${k} = ${params.get(k)}</li>`)
        );
        body = `
          Une erreur est survenue: <span style="color:red;font-weight:bold;font-style:italic">${error}</span><br/>
          Parametres recus:${debugParams}
          `;
      }
    } else {
      body = `Il manque un des parametres suivants:<ul>`;
      mandatoryFields.forEach((x) => (body += `<li> ${x} </li>`));
      body += "</ul>";
    }
    res.write(
      `
      <!doctype html>
      <html lang="FR">
      <html>
        <head>
          <!-- Required meta tags -->
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
      
          <!-- Bootstrap CSS -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      
          <title>Hello, world!</title>
        </head>
        <body>
          ${body}
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </body>
      </html>`,
      "utf-8"
    );

    req.on("end", function () {
      //var post = qs.parse(body);
      // use post['blah'], etc.
    });
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
