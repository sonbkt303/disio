let Service = require("node-windows").Service;

const path = require("path");
const scriptPath = path.join(__dirname, "../app.js");
console.log("scriptPath", scriptPath)
// Create a new service object
let svc = new Service({
  name: "Node application as Windows Service test",
  description: "Node application as Windows Service",
  // script: 'C:\\Users\\EVN0031\\Desktop\\Ewoosoft\\repositories\\vtsw\\node-app-ws\\app.js'
  script: scriptPath,
  env: [
    // {
    //   name: "HOME",
    //   value: process.env["USERPROFILE"], // service is now able to access the user who created its' home directory
    // },
    // {
    //   name: "TEMP",
    //   value: path.join(__dirname, "/temp"), // use a temp directory in user's home directory
    // },
  ],
});
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  svc.start();
});
svc.install();
