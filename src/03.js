'use strict'
/* globals log, part1, part2 */


module.exports = function (txt) {
    // txt = '5 10 25'
    return solve(txt)
}

function solve(s) {
    var lines = s.split('\n')
    function p(n) { return parseInt(n) }
    var ct1 = 0
    var ct2 = 0
    var tris = [[], [], []]
    for (var line of lines) {
        var str = /^\s*(.*)$/.exec(line)[1]
        // part 1
        var arr = str.split(/\s+/).map(p)
        if (valid(arr)) ct1++
        // part 2
        for (var i=0; i<3; i++) {
            var arr2 = tris[i]
            arr2.push(arr[i])
            if (arr2.length === 3) {
                if (valid(arr2)) ct2++
                arr2.length = 0
            }
        }
    }
    part1(ct1)
    part2(ct2)
}


function valid(arr) {
    for (var i=0; i<3; i++) {
        var a = arr[i]
        var b = arr[(i+1)%3] + arr[(i+2)%3]
        if (a>=b) return false
    }
    return true
}




