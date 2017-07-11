'use strict'
/* eslint-env mocha */
if (!Array.isArray(RASP.checkProcesses.sql) ||
    RASP.checkProcesses.sql.length === 0) {
    return
}

const expect = require('chai').expect
const fs = require('fs')
const path = require('path')
let safe = fs.readFileSync(path.resolve(__dirname, './sql-safe'), 'utf8').replace(/\r\n/g, '\n').split('\n')
let unsafe = fs.readFileSync(path.resolve(__dirname, './sql-unsafe'), 'utf8').replace(/\r\n/g, '\n').split('\n')

describe('sql检查点', function () {
    describe('安全', function ()  {
        safe.forEach(sql => {
            if (sql.trim().length === 0) {
                return
            }
            it(sql, function () {
                let results = RASP.check('sql', {
                    query: sql
                })
                expect(results).to.be.a('array')
                results.forEach(result => {
                    expect(result).to.be.a('object')
                    expect(result.action).to.be.a('string').but.not.equal('block')
                })
            })
        })
    })
    describe('不安全', function ()  {
        unsafe.forEach(sql => {
            if (sql.trim().length === 0) {
                return
            }
            it(sql, function () {
                let results = RASP.check('sql', {
                    query: sql
                })
                expect(results).to.be.a('array')
                results.forEach(result => {
                    expect(result).to.be.a('object')
                    expect(result.action).to.be.a('string').and.equal('block')
                })
            })
        })
    })
})
