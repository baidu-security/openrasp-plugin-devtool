/**
 * @file
 */
'use strict';
/* eslint-env node */
const fs      = require('fs')
const path    = require('path')
const chalk   = require('chalk')
const program = require('commander')
const Mocha   = require('mocha')
require('./buildenv')

program.usage('<file>')
    .option('-d, --case-dir <dir>', 'specify a testcases directory')
    .option('-p, --plugin-file <plugin>', 'specify a javascript plugin file')
    .parse(process.argv);

if (! program.caseDir || ! program.pluginFile) {
    return program.help()
}

// load testcases from JSON files
function loadTestCases(path) {
    var cases = []
    var files = fs.readdirSync(path)

    files.forEach(function (item, index) {
        var stat = fs.statSync(path + item)
        if (!stat.isFile()) 
            return

        var tmp = JSON.parse(fs.readFileSync(path + item))
        cases.push({
            title: item,
            data:  tmp
        })
    })

    return cases
}

require(program.pluginFile)
var cases = loadTestCases(program.caseDir)

// FIXME: dirty hack
global.cases = cases

let mocha = new Mocha({
    bail: true,
    useColors: true,
    slow: 20,
    reporter: 'list'
});

mocha.addFile(
    path.join(path.resolve(__dirname, 'case', 'json_cases.js'))
)

mocha.run(failures => {
    process.on('exit', () => {
        process.exit(failures);
    })
})



