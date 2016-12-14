'use strict'
/* globals log, part1, part2 */

var md5 = require('js-md5');

module.exports = function (txt) {

    // txt = 'abc'

    solve(txt, 1)
    solve(txt, 2)
}



function solve(txt, part) {

    var cache = []
    var i1 = 0
    var i2 = 0
    var keys = 0
    var out = (part === 1) ? part1 : part2

    iterate(100, () => {
        var h = txt + i1
        var ct = (part === 1) ? 1 : 2017
        for (var i = 0; i < ct; i++) h = md5(h)
        cache[i1] = h
        i1++
    }, () => {
        for (; i2 < i1 - 1000; i2++) {
            var s = cache[i2]
            var trips = /(.)\1\1/.exec(s)
            if (!trips) continue
            var char = trips[1]
            var re = new RegExp('(' + char + ')\\1\\1\\1\\1')
            INNER: for (var j = i2 + 1; j < i2 + 1000; j++) {
                if (re.test(cache[j])) {
                    keys++
                    // log(char, i2, j)
                    if (keys === 64) {
                        out(i2 + ' (done)')
                        return true
                    }
                    break INNER
                }
            }
        }
        out(keys + ' keys so far, at ' + i2)
        return false
    })

}




function iterate(N, fn, done) {
    var id = setInterval(function () {
        for (var i = 0; i < N; i++) fn()
        if (done()) clearInterval(id)
    }, 30)
}


