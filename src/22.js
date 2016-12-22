'use strict'
/* globals log, part1, part2 */

var ndarray = require('ndarray')



module.exports = function (txt) {
    solve(txt)
}



function solve(txt) {

    // dat
    var avail = []
    var used = []
    var x, y, i, j

    // process input
    var sx = 0
    var sy = 0
    for (var line of txt.split('\n')) {
        var res = /node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%$/.exec(line)
        if (!res) continue
        res.shift()
        x = parseInt(res.shift())
        y = parseInt(res.shift())
        if (x + 1 > sx) sx = x + 1
        if (y + 1 > sy) sy = y + 1
        var s = parseInt(res.shift())
        var u = parseInt(res.shift())
        var a = parseInt(res.shift())
        avail.push(a)
        used.push(u)
    }



    // part 1
    
    var ct = 0
    for (i = 0; i < sx * sy; i++) {
        for (j = 0; j < sx * sy; j++) {
            if (i === j) continue
            if (used[i] === 0) continue
            if (used[i] < avail[j]) ct++
        }
    }
    part1(ct)



    // part 2

    for (y = 0; y < sy; y++) {
        var str = ''
        for (x = 0; x < sx; x++) {
            var uval = used[x * sy + y]
            var char = '.'
            if (uval < 1) char = 'E'
            if (uval > 100) char = '#'
            if (x === 0 && y === 0) char = '*'
            if (x === sx - 1 && y === 0) char = 'G'
            str += char
        }
        log(str, '   ', y)
    }

    // now look at the console and count squares to confirm that 
    // it takes 34 steps to get 'E' into the goal corner, 
    // and then five steps to move 'GE' left, repeated 35 times.
    // thus:

    part2(34 + 5 * 35)

    // Note: this challenge makes no sense to me.
    // It's much easier to solve on paper than with code.


}



