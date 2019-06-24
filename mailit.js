const fs = require('fs');
const readline = require('readline');
const nodemailer = require('nodemailer');
const initdir = './.mailit';

const args = process.argv.slice(2);

const prefsJson = 'prefs.json';
const historyJson = 'history.json';

function Commit(message){
    this.message = message;
    this.counter = 0;
}

Commit.prototype.commit= function(){};
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

function firstStart(){
 // go through all the files and see if any has changed
 const local = '.';
 let foundHistory = false;
 let foundPrefs = false;

 fs.readdir(local ,(err, files ) => {
     files.forEach(file => {
         fs.stat(file,(err,stats) => {
             if(err != null) console.log(err);
             if(stats.isFile()){

                 if(file.localeCompare(prefsJson) === 0){
                     console.log("found existing prefs");
                     foundPrefs = true;
                 }

                 if(file.localeCompare(historyJson) === 0){
                     console.log("loading history");
                     foundHistory = true;
                 }

             }
         });
     });
 });

// if history.json or prefs.json do not exists then this a first start.
    return (foundHistory && foundPrefs)
}

async function update(param){
    //
}
function showState(){

}

function handleArgs(){
    const command = args[0];
    const param = args[1];
    console.log(command);

    switch(command){
        case 'init':
            if(!prefs())
            {
                console.log("Please put your email address in prefs.txt (first line)")
            }

            break;
        case 'update':
            console.log('updating with message: ' + param);
            update(param);
            break;
        case 'log':
            showLog();
            break;
        case 'state':
            showState();
            break;
        case 'rollback':
            console.log('rolling back to version ' + param);
            rollback(param);
            break;
        default:
            console.log('no command');
            break;
    }
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function takeInput(question){
    let ans = null;
    rl.question(question, (answer) => {
        // TODO: Log the answer in a database
        ans = answer;
        rl.close();
    });
    return ans;
}

let first = firstStart();
if(first){
    const optionsString = 'Welcome to mailit, a simple version control system through email. Please enter your email address.';
    let email = takeInput(optionsString);
    console.log(email);t
    // write email to prefs
    // writeEmailToPrefs();
    // handleArgs(res);
} else {

}

