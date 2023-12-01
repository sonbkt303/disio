var Service = require('node-windows').Service;
// Create a new service object

const path = require('path');
const scriptPath = path.join(__dirname, "../app.js");

var svc = new Service({
  name:'Node application as Windows Service test',
  description: 'Node application as Windows Service',
  script: scriptPath
});
// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
});
// Uninstall the service.
svc.uninstall();