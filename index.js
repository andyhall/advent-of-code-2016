'use strict'

var day = require('./day.txt')
if (parseInt(day) < 10) day = '0' + parseInt(day)

var input = require('./inputs/input-' + day + '.txt')

window.log = console.log.bind(console)
var $ = document.querySelector.bind(document)
$('#day').textContent = parseInt(day)
window.part1 = function(s) { $('#p1').textContent = s }
window.part2 = function(s) { $('#p2').textContent = s }

var solve = require('./src/' + day)
solve(input)



