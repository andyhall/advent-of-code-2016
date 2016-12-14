'use strict'


// hack to run in node CLI
global.log = console.log.bind(console)
global.part1 = function (s) { global.log('Part 1: ', s) }
global.part2 = function (s) { global.log('Part 2: ', s) }

var fs = require('fs')
fs.readFile('./day.txt', 'utf8', (err, day) => {
    if (!day) throw err
    if (parseInt(day) < 10) day = '0' + parseInt(day)
    var solve = require('./src/' + day)
    fs.readFile('./inputs/input-' + day + '.txt', 'utf8', (err, input) => {
        if (!input) throw err
        solve(input)
    })
})

