'use strict'
/* globals log, part1, part2 */

var md5 = require('js-md5');



module.exports = function(txt) {
    // txt = 'abc'

    solve1(txt)
    solve2(txt)
}



function solve1(id) {
    var num = -1
    var chars = ''
    iterate(100000, function check() {
        num++
        var h = md5(id + num)
        if (/^00000/.test(h)) {
            var hit = h.charAt(5)
            console.log('hit at ', num, 'char = ', hit)
            chars += hit
        }
    }, function() {
        part1(chars + ' (' + num + ')')
        if (chars.length === 8) {
            part1(chars + ' (done)')
            return true
        }
    })
}



function solve2(id) {
    var num = -1
    var chars = '--------'.split('')
    var set = 0
    iterate(100000, function check() {
        num++
        var h = md5(id + num)
        if (/^00000/.test(h)) {
            var pos = parseInt(h.charAt(5), 16)
            var hit = h.charAt(6)
            if (pos > 7) return
            if (chars[pos] !== '-') return
            console.log('hit at ', num, 'pos=' + pos, 'char=' + hit)
            chars[pos] = hit
            set++
        }
    }, function() {
        part2(chars.join('') + ' (' + num + ')')
        if (set > 7) {
            part2(chars.join('') + ' (done)')
            return true
        }
    })
}






function iterate(N, fn, done) {
    var id = setInterval(function() {
        for (var i = 0; i < N; i++) fn()
        if (done()) clearInterval(id)
    }, 30)
}



