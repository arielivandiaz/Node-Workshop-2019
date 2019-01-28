const os = require('os'); //Operative System
const fs =  require('fs'); //File System

let mycpu = os.cpus();

fs.appendFile("node_workshop.txt", `Info of my CPU : ${mycpu}`, (error) => {
//fs.appendFile("node_workshop.txt", `Info of my CPU : ${JSON.stringify(mycpu)}`, function (error){
   
    if (error){
        console.log("ERROR : ",error);
    }else{
        console.log("File Info Created");
    }
});

console.log("Hello World from my PC ", os.hostname, "\n");
var string = `I'm running ${os.platform}"\n`;
console.log(string);

