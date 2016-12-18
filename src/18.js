'use strict'
/* globals log, part1, part2 */


var ndarray = require('ndarray')


module.exports = function (txt) {
    // txt = '..^^.'
    part1(solve(txt, 40))

    part2('..')
    setTimeout(x => {
        part2(solve(txt, 400000))
    }, 1)

}



function solve(txt, sj) {

    var si = txt.length + 2
    var traps = ndarray(new Int8Array(si * sj), [si, sj])

    var ct = 0

    var rules = {
        '^^.': true,
        '.^^': true,
        '^..': true,
        '..^': true,
    }

    for (var j = 0; j < sj; j++) {
        for (var i = 1; i < si - 1; i++) {
            if (j < 1) {
                var c = txt.charAt(i - 1)
                if (c === '^') traps.set(i, j, 1)
            } else {
                var UL = traps.get(i - 1, j - 1)
                var UC = traps.get(i, j - 1)
                var UR = traps.get(i + 1, j - 1)
                var str = (UL ? '^' : '.') + (UC ? '^' : '.') + (UR ? '^' : '.')
                if (rules[str]) traps.set(i, j, 1)
            }
            if (traps.get(i, j) === 0) ct++
        }
    }

    return ct

}





