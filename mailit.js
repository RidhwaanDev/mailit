import Logger from "./logger";
const fs = require('fs');
const initdir = './.mailit'

const args = process.argv.slice(2);
args.forEach(arg => console.log(arg));

function Commit(message){
    this.message = message;
    this.counter = 0;
    this.counter++;
}

Commit.prototype.simplehash = function(){
    let hash = 0;
    if(this.message.length == 0){
        return hash;
    }
    for(let i = 0; i < this.message.length; i++){
        let ch = this.message.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }
    this.id = hash;
}

function isChanged(changes){
 // go through all the files and see if any has changed
 const local = '.';
 fs.readdir(local ,(err, files ) => {
     files.forEach(file => {
         fs.stat(file,(err,stats) => {
             if(err != null) console.log(err);
             if(stats.isFile()){
                 console.log("file")
                 console.log(stats)
             }
         });
     });
 });
}

isChanged();

let test = new Commit('first commit yay');
console.log(test.simplehash());


