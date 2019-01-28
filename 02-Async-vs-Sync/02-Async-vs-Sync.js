const os = require('os'); //Operative System
const fs =  require('fs'); //File System


let mycpu = os.cpus();

fs.appendFileSync("node_workshop.txt", `Info of my CPU : ${JSON.stringify(mycpu)}`);

console.log("Hello World from my PC ", os.hostname, "\n");
let string = `I'm running ${os.platform}"\n`;
console.log(string);

