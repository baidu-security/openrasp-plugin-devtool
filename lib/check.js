'use strict'
/* eslint-env node */
const fs = require('fs')
const path = require('path')
const vm = require('vm')
const program = require('commander')
const Mocha = require('mocha')
require('./env')

program.usage('<file>')
    .option('-t, --test-dir <dir>', 'specify a custom test directory')
    .parse(process.argv)

if (program.args.length < 1) {
    return program.help()
}


let sandbox = {console, RASP, Attack, PluginError}
vm.createContext(sandbox)

let filename = program.args[0]
let filepath = path.resolve(process.cwd(), filename)
let sourceCode = fs.readFileSync(filepath, 'utf8')
global.filepath = filepath
vm.runInContext(`(function(){ ${sourceCode} })()`, sandbox, {
    filename: filename
})

let mocha = new Mocha()
fs.readdirSync(path.resolve(__dirname, 'case'))
    .filter(file => file.substr(-8) === '.test.js')
    .forEach(file => {
        mocha.addFile(
            path.join(path.resolve(__dirname, 'case', file))
        )
    })

if (program.testDir) {
    fs.readdirSync(path.resolve(process.cwd(), program.testDir))
        .filter(file => file.substr(-8) === '.test.js')
        .forEach(file => {
            mocha.addFile(
                path.join(path.resolve(process.cwd(), program.testDir, file))
            )
        })
}

mocha.run(failures => {
    process.on('exit', () => {
        process.exit(failures)
    })
})
