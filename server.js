var uuid = require("uuid");
var params;
const fs = require("fs");
const https = require("https");
const http = require("http");
const host = "127.0.0.1";
const path = require("path");
const port = 8080;
const mandatoryFields = ["program", "repo", "function"];
const githubUrl = "https://raw.githubusercontent.com";

const requestListener = function (req, res) {
  console.log(
    `Connexion depuis: ${req.connection.remoteAddress} sur l'url ${req.url} `
  );
  if (req.method == "GET") {

    var url = cleanUrl(req);
    params = new URLSearchParams(url);
    var body = "";

    res.setHeader("Content-Type", "text/html; charset=utf-8'");
    res.writeHead(200);

    if (mandatoryFields.every((f) => params.has(f) && params.get(f))) {
      try {
        var repo = `${params.get("repo")}`;
        var program = `${params.get("program")}`;
        var myUuid = uuid.v4().replace(/-/g,'');
        var javaParams = getJavaParams(params,myUuid);
        var fileContent = getGithubFile(repo, program);

        writeGithubFile(fileContent, myUuid);

        body = runJAVAProgram(javaParams);        
      } catch (error) {
        body = getErrorMessage(error);
      }
    } else {
      errorMessage = `Il manque un des parametres obligatoires suivants:<ul>`;
      mandatoryFields.forEach((x) => (errorMessage += `<li> ${x} </li>`));
      errorMessage += "</ul>";
      body = getErrorMessage(errorMessage);
    }
    var templateContent = fs.readFileSync('template.html').toString();
    templateContent = templateContent.replace("##BODY##",body);
    res.write(templateContent,'utf-8');

    req.on("end", function () {
      //var post = qs.parse(body);
      // use post['blah'], etc.
    });
    res.end();
  }
};

function getJavaParams(params, myUuid){
  var JavaParams = [require("path").join("src", `${myUuid}.java`),params.get("function")  ];
  [...params.keys()].sort().forEach((element) => {
      if (element.length == 2 && element.startsWith("p") && element.length>0 && params.get(element).length >0) {
        JavaParams.push(params.get(element));
    }
  });
  return JavaParams;
}

function runJAVAProgram(params){
  const childProcess = require("child_process").spawnSync(
    "java",
    params
  );
  if(childProcess.stdout.length>0)
    return childProcess.stdout.toString();
  else
    throw childProcess.stderr.toString();
}

function getErrorMessage(error){
  var debugParams = "<ul>";
  [...params.keys()].forEach(
    (k) => (debugParams += `<li>${k} = "${params.get(k)}"</li>`)
  );
  var errorTemplate = fs.readFileSync('errortemplate.html').toString();
  errorTemplate = errorTemplate.replace("##ERROR##", error).replace("##PARAMS##", debugParams);
  return errorTemplate; 
}

function cleanUrl(req){
  var url = req.url.startsWith("/?")
  ? req.url.replace("/?", "")
  : req.url.replace("/", "");
mandatoryFields.forEach(
  (x) => (url = url.replace(new RegExp(`${x}=`, "gi"), `${x}=`))
);
  return url;
}

function getGithubFile(repo, program){
  var request = require("sync-request");
  var result = request("GET", `${githubUrl}/${repo}/master/${program}`, {
    Headers: {
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
    },
  });
  return result.getBody();
}

function writeGithubFile(fileContent, myUuid){
  var filename = `src/${myUuid}.java`;
  fs.writeFileSync(filename,fileContent);
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
