const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = process;
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const textOut = 'Hello Student1, type here something...\n';
const newFile = 'mynotes.txt'
fs.writeFile(
    path.join(__dirname, newFile),
    textOut,
    (err) => {
        if (err) throw err;
        stdout.write(textOut);
        }
);
stdin.on('data', data => {
    const textIn = data.toString();
    fs.appendFile(
        path.join(__dirname, 'mynotes.txt'),
        textIn,
        err => {
            if (err) throw err;
        }
        );
});
rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close()
    }
});
rl.on('SIGINT', () => rl.close());
process.on('beforeExit', () => {
    fs.appendFile(
        path.join(__dirname, 'mynotes.txt'),
        'Bye bye!',
        err => {
            if (err) throw err;
            process.exit()
        }
    );
});
process.on('exit', () => {
    stdout.write('Bye bye!\n');
});


