'use strict'
/* eslint-env mocha */
const path = require('path')
const CLIEngine = require('eslint').CLIEngine
let cli = new CLIEngine({
    configFile: path.resolve(__dirname, 'eslintconfig.js'),
    useEslintrc: false
})

it('插件代码规范检查', function () {
    let report = cli.executeOnFiles([global.filepath])
    let formatter = cli.getFormatter()

    if (report) {
        if (report.errorCount > 0) {
            throw new Error(formatter(report.results))
        } else if (report.warningCount > 0) {
            console.log(formatter(report.results))
        }
    }
})
