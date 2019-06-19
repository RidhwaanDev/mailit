const fs = require('fs');
const initdir = './.mailit'

function File(name, mdate){
    this.name = name;
    this.contents = contents;
    this.mdate = mdate;
    this.needs;
}

File.prototype.hasChanged = function(date){
    if (date != this.date){
       return true;

function Commit(id, message){
    this.id = id;
    this.message = message;
    this.counter = 0;
    counter++;
}

Commit.prototype.simplehash= function() {
    let hash = 0;
    if(this.message.length == 0){
        return hash;
    }

    for(let i = 0; i < this.message.length; i++){
        let ch = this.message.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }
    return hash;
}

let args = process.argv.slice(2);
args.forEach(arg => console.log(arg));

if(!fs.existsSync(initdir)){
    // console.log("Creating a new mailit repository");
    // fs.mkdirSync(initdir);
}
isChanged();
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
             else if(stats.isDirectory()){// do something maybe}
         });
     });
 });
}
