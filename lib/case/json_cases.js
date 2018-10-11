/**
 * @file
 */
'use strict';
/* eslint-env mocha */
/* global RASP, Context */

const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const program = require('commander');

cases.forEach(function (item) {
    describe(item.title, function() {
        item.data.forEach(row => {
            it(row.description, function() {
                var verdict = RASP.checkPoints[row.name][0].func(row.params, row.context)
                expect(verdict).to.be.a('object')
                expect(verdict.action).to.be.a('string').and.equal(row.action);
            })
        })
    })
})
