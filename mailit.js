const fs = require('fs');
const initdir = './.mailit'

const args = process.argv.slice(2);

function Commit(message){
    this.message = message;
    this.counter = 0;
    this.counter++;
}
Commit.prototype.commit= function(){}
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
                 console.log(file);
                 console.log(stats);
             }
         });
     });
 });
}


async function serialize(){
    // encode final linkedlist of commits into a JSON file
}

async function deserialize(){
    // decode JSON file of commits into linkedlist
}
function update(param){
    // update HEAD and push everything remote
}
function handleArgs(){
    const command = args[0];
    const param = args[1];
    console.log(command);
    console.log('\n');

    switch(command){
        case 'update':
            console.log('updating with message: ' + param)
            update(param);
            break;
        case 'log':
            showLog();
            break;
        case 'rollback':
            console.log('rolling back to version ' + param)
            rollback(param);
            break;
        default:
            console.log('no command');
            break;
    }
}

handleArgs();
