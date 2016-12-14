'use strict'
/* globals log, part1, part2 */


module.exports = function (txt) {
    part1(solve(txt, 1))
    part2(solve(txt, 2))
}


function solve(txt, part) {
    var s = txt.split('\n').join('')

    function count(s) {
        var p1 = s.indexOf('(', 0)
        if (p1 < 0) return s.length
        var result = /^\((\d+)x(\d+)\)/.exec(s.substr(p1))
        var plen = result[0].length
        var a = parseInt(result[1])
        var b = parseInt(result[2])
        var right = s.substr(p1 + plen + a)
        if (part === 1) return p1 + a * b + count(right)
        var body = s.substr(p1 + plen, a)
        return p1 + b * count(body) + count(right)
    }

    return count(s)
}




