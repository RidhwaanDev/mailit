const fs = require('fs');
const readline = require('readline');
const nodemailer = require('nodemailer');
const initdir = './.mailit';
let log = console.log();
const args = process.argv.slice(2);
const welcome= 'Welcome to mailit, a simple version control system through email. Please enter your email address.' + '\n';
const options = 'Choose an option:' + '\n' + 'update => sends the project ( all the files in the directory) to your email'
                                            + 'log =>  shows the project history'
                                            + 'rollback ( versionId) => restore the project to a specific version ( id can be found in log )';
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
}
/**
 *  Try to find prefs.json and history.json. If we cant find them
 *  then it means it is a first start.
 */
function firstStart(callback){

 const local = '.';
// convert this to synchronoous
 fs.readdirSync(local ,(err, files ) => {
     if(err){
         clog(err);
         return;
     }
     let filePromise = new Promise( (resolve,reject)=> {
         let foundHistory = false;
         let foundPrefs = false;
         for(let i = 0; i < files.length; i++){
             try{
                let stats = fs.statSync(file);
                 if(stats.isFile()){
                     if(file === prefsJson){
                         console.log("found existing prefs");
                         foundPrefs = true;
                     }
                     if(file === historyJson ){
                         console.log("loading history");
                         foundHistory = true;
                     }
                 }
             }
             catch(err){
                console.log(err) ;
             }
         }
         let found = foundPrefs && foundHistory;
         resolve(found)
     });
        filePromise.then(
            result =>  { callback(result)},
            error => { console.log(error) }
        )
 });
}

function handleArgs(command, param){
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

function takeInput(question, callback){
    let ans = null;
    rl.question(question, (answer) => {
        ans = answer;
        rl.close();
        callback(ans);
    });
}
function writeInitialSetupFiles(stringEmail){
    let prefsObj= {
        email : stringEmail
    };
    let historyObj = {

    };
    fs.appendFile(prefsJson,prefsObj.toString(),(err) => {;
        if(err) console.log(err);
        console.log("created prefs.json and wrote your email address to it.");
    });

    fs.appendFile(historyJson,historyObj.toString(),(err) => {
        if(err) console.log(err);
        console.log("created history.json. This will store all the updates");
    })
}

firstStart( (bool) => { console.log(bool)});

