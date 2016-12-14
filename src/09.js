'use strict'
/* globals log, part1, part2 */

module.exports = function (txt) {

    // txt = 'ADVENT'
    // txt = '(3x3)XYZ'
    // txt = 'A(2x2)BCD(2x2)EFG'
    // txt = '(6x1)(1x3)A'
    // txt = 'X(8x2)(3x3)ABCY'

    return solve(txt)
}



function solve(txt) {

    var s = ''
    var dat = txt.split('\n')
    for (var line of dat) s += line


    var doingPart2

    function count(s) {
        var p1 = s.indexOf('(', 0)
        if (p1 < 0) return s.length
        var arr = /^\((\d+)x(\d+)\)/.exec(s.substr(p1))
        if (!arr) { console.warn('??'); return 0 }
        var plen = arr[0].length
        var a = parseInt(arr[1])
        var b = parseInt(arr[2])
        var body = s.substr(p1 + plen, a)
        var right = s.substr(p1 + plen + a)
        if (doingPart2) return p1 + b * count(body) + count(right)
        return p1 + a * b + count(right)
    }

    
    part1(count(s))

    doingPart2 = true
    part2(count(s))



}



