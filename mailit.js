const fs = require('fs');
const readline = require('readline');
const nodemailer = require('nodemailer');

// some string constants
const welcome= 'Welcome to mailit, a simple version control system through email. Please enter your email address.' + '\n';
const options = 'Choose an option:' + '\n' + 'update => sends the project ( all the files in the directory) to your email'
    + '\n' + 'log =>  shows the project history'
    + '\n' + 'rollback (versionId) => restore the project to a specific version ( id can be found in log )';
const prefsJson = 'prefs.json';
const historyJson = 'history.json';
const initdir = './.mailit';
// fun terminal colors
const TERM_COLORS = {

    Reset : "\x1b[0m",
    Bright : "\x1b[1m",
    Dim : "\x1b[2m",
    Underscore : "\x1b[4m",
    Blink : "\x1b[5m",
    Reverse : "\x1b[7m",
    Hidden : "\x1b[8m",

    FgBlack : "\x1b[30m",
    FgRed : "\x1b[31m",
    FgGreen : "\x1b[32m",
    FgYellow : "\x1b[33m",
    FgBlue : "\x1b[34m",
    FgMagenta : "\x1b[35m",
    FgCyan : "\x1b[36m",
    FgWhite : "\x1b[37m",

    BgBlack : "\x1b[40m",
    BgRed : "\x1b[41m",
    BgGreen : "\x1b[42m",
    BgYellow : "\x1b[43m",
    BgBlue : "\x1b[44m",
    BgMagenta : "\x1b[45m",
    BgCyan : "\x1b[46m",
    BgWhite : "\x1b[47m",

};
// input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// history object
let history = null;
/*
 *  Try to find prefs.json and history.json. If we cant find them
 *  then it means it is a first start. synchronous because we can't continue unless we know this information
 */
git config --global user.email "MY_NAME@example.com"

function firstStart() {
    const local = '.';
    let files = [];
    try {
        files = fs.readdirSync(local);
    } catch (exception) {
        console.log(exception);
    }
    let stats = null;
    for (let i = 0; i < files.length; i++) {
        const str = files[i];
        stats = fs.statSync(files[i]);
        if (stats.isFile()) {
            // if prefsJson or historyJson is there then it is not first start
            if (str === prefsJson || str === historyJson) {
                return false;
            }
        }
    }

    return true;
}
    function handleArgs(command, param) {
        switch (command) {
            case 'init':
                if (!prefs()) {
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

    function updpate(){
    }

    function takeInput(question, callback) {
        rl.question(question, (answer) => {
            rl.close();
            callback(answer);
        });
    }

    function writeInitialSetupFiles(stringEmail) {
        let prefsObj = {
            email: stringEmail
        };
        let historyObj = {};
        fs.appendFile(prefsJson, prefsObj.toString(), (err) => {
            ;
            if (err) console.log(err);
            console.log("created prefs.json and wrote your email address to it.");
        });

        fs.appendFile(historyJson, historyObj.toString(), (err) => {
            if (err) console.log(err);
            console.log("created history.json. This will store all the updates");
        })
    }

    if (firstStart()) {
        takeInput(welcome, (ans) => {
            console.log('Welcome ' + ans)
        });
    } else {
        history = parseHistory();
        takeInput(options,handleArgs);
    }
    function parseHistory(){
        // TODO: implement a Graph class
    }


