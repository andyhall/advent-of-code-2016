'use strict'
/* globals log, part1, part2 */



module.exports = function (txt) {
    var top = 4294967295

    // txt = '5-8\n0-2\n4-7'
    // top = 9

    solve(txt, top)
}



function solve(txt, top) {

    // parse inputs
    var lower = []
    var upper = []
    for (var line of txt.split('\n')) {
        var res = /^(\d+)-(\d+)$/.exec(line)
        var a = parseInt(res[1])
        var b = parseInt(res[2])
        lower.push(a)
        upper.push(b)
    }


    // list of included spans
    var ok = [
        [0, top]
    ]

    // function to remove a span
    function remove(lo, hi) {
        for (var span of ok) {
            var a = span[0]
            var b = span[1]
            if (lo > b) continue
            if (hi < a) continue
            if (lo <= a && hi >= b) {
                // mark for removal
                span[0] = -1
            } else if (lo > a && hi < b) {
                span[1] = lo - 1
                ok.push([hi+1, b])
            } else if (lo > a) {
                span[1] = lo - 1
            } else if (hi < b) {
                span[0] = hi + 1
            }
        }
        ok = ok.filter(span => (span[0] > -1))
    }

    // run inputs
    for (var i = 0; i < lower.length; i++) {
        remove(lower[i], upper[i])
    }
    
    // lowest span start
    var min = Infinity
    ok.forEach(span => { if (span[0]<min) min = span[0] })
    part1(min)


    // sum of span lengths
    var ct = 0
    for (var span of ok) {
        ct += span[1] - span[0] + 1
    }
    part2(ct)



}





