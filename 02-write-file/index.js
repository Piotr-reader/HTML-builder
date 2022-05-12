const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = process;


const textOut = 'Hello Student1, type here something...\n';
stdout.write(`${textOut}`),
fs.writeFile(
    path.join(__dirname, 'mynotes.txt'),
    textOut,
    (err) => {
        if (err) throw err;
    }
),
stdin.on('data', data => {
    const textIn = data.toString();
    fs.appendFile(
        path.join(__dirname, 'mynotes.txt'),
        textIn,
        err => {
            if (err) throw err;
            // process.exit(1)
        }
        );
        //     if (textIn === 'exit') {
            //         console.log('48');
            // }
});

process.on('exit', code => {
    if (code) {
        const textBye = 'Bye bye!\n';
        fs.appendFile(
            path.join(__dirname, 'mynotes.txt'),
            textBye,
            err => {
                if (err) throw err;
            }
            );
            stdout.write(`${textBye}`);
    }
});
