var uuid = require("uuid");
const fs = require("fs");
const https = require("https");
const http = require("http");
//const host = "192.168.178.111";
const host = "192.168.175.176";
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
        //var functionStr = `${params.get("function")}`;
        // body = `<div>
        //           repo=${repo}<br/>
        //           program=<a href="${githubUrl}/${repo}/master/${program}">${program}</a><br/>
        //         </div>
        // `;

        var request = require("sync-request");
        var result = request("GET", `${githubUrl}/${repo}/master/${program}`, {
          Headers: {
            "user-agent":
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
          },
        });
        var fileContent = result.getBody();
        var myUuid = uuid.v4().replace(/-/g,'');
        var filename = `src/${myUuid}.java`;
        fs.writeFileSync(filename,fileContent);
        var toto = "";
        var finalParams = [
          require("path").join("src", `${myUuid}.java`),
          params.get("function"),
        ];
        [...params.keys()].sort().forEach((element) => {
            //if (element.length == 2 && element.startsWith("p") && params.get(element).length >0) {
              if (element.length == 2 && element.startsWith("p") && element.length>0 && params.get(element).length >0) {

            finalParams.push(params.get(element));
          }
        });
        const childProcess = require("child_process").spawnSync(
          "java",
          finalParams
        );
        if(childProcess.stdout.length>0)
          body = childProcess.stdout.toString();
        else
          throw childProcess.stderr.toString();
      } catch (error) {
        var debugParams = "<ul>";
        [...params.keys()].forEach(
          (k) => (debugParams += `<li>${k} = "${params.get(k)}"</li>`)
        );
        var errorTemplate = fs.readFileSync('errortemplate.html').toString();
        errorTemplate = errorTemplate.replace("##ERROR##", error);
        errorTemplate = errorTemplate.replace("##PARAMS##", debugParams)
        body = errorTemplate; 
        /*`
        <p class="mb-0">Une erreur est survenue:</p>
        <div class="alert alert-danger mx-2" role="alert">
          ${error}
        </div>
        <p class="mb-0">Parametres recus:</p>
        <div class="alert alert-primary mx-2" role="alert">
        ${debugParams}
        </div>
          `;*/
      }
    } else {
      body = `Il manque un des parametres suivants:<ul>`;
      mandatoryFields.forEach((x) => (body += `<li> ${x} </li>`));
      body += "</ul>";
    }
    var templateContent = fs.readFileSync('template.html').toString();
    templateContent = templateContent.replace("ZZZOOOHHHNNNNNNY",body);
    res.write(templateContent,'utf-8');

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
