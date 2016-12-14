'use strict'
/* globals log, part1, part2 */

module.exports = function (txt) {
    
    // txt = 'abba[mnop]qrst\nabcd[bddb]xyyx\naaaa[qwer]tyui\nioxxoj[asdfgh]zxcvbn'

    // txt = 'aba[bab]xyz\nxyx[xyx]xyx\naaa[kek]eke\nzazbz[bzb]cdb'

    return solve(txt)
}



function solve(txt) {

    function supports(str) {
        var arr = str.split(/[\[\]]/)
        var out = true
        var found = false
        for (var s of arr) {
            var res = /(.)(.)\2\1/.exec(s)
            var abba = (!!res) && res[1] != res[2]
            if (abba && !out) return false
            if (abba) found = true
            out = !out
        }
        // log(arr.length, str, found)
        return found
    }

    var ct = 0
    txt.split('\n').forEach(line => {
        if (supports(line)) ct++
    })

    part1(ct)


    function supports2(str) {
        var arr = str.split(/[\[\]]/)
        var outside = true
        var outer = ''
        var inner = ''
        for (var s of arr) {
            if (outside) outer += s + '-'
            else inner += s + '-'
            outside = !outside
        }
        var both = outer + '___' + inner
        var res = /(.)(.)\1.*___.*\2\1\2/.exec(both)
        return !!res && res[1] !== res[2]
    }

    var ct2 = 0
    txt.split('\n').forEach(line => {
        if (supports2(line)) ct2++
    })

    part2(ct2)


}



