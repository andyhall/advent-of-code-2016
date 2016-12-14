'use strict'
/* globals log, part1, part2 */

module.exports = function (txt) {

    // txt = [
    //     'value 5 goes to bot 2',
    //     'bot 2 gives low to bot 1 and high to bot 0',
    //     'value 3 goes to bot 1',
    //     'bot 1 gives low to output 1 and high to bot 0',
    //     'bot 0 gives low to output 2 and high to output 0',
    //     'value 2 goes to bot 2'
    // ].join('\n')

    return solve(txt)
}



function solve(txt) {
    var vals = []
    var outs = []
    var rules = []
    for (var line of txt.split('\n')) {
        var a1 = /^value (\d+) goes to bot (\d+)$/.exec(line)
        if (a1) {
            var val = parseInt(a1[1])
            var bot = parseInt(a1[2])
            var valset = vals[bot] || []
            valset.push(val)
            vals[bot] = valset
        } else {
            var a2 = /^bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)$/.exec(line)
            var bot1 = parseInt(a2[1])
            var lotgt = a2[2]
            var lo = parseInt(a2[3])
            var hitgt = a2[4]
            var hi = parseInt(a2[5])
            rules[bot1] = [
                (lotgt == 'bot') ? 'b' : 'o',
                lo,
                (hitgt == 'bot') ? 'b' : 'o',
                hi
            ]
        }
    }

    var done = false
    while (!done) {
        done = true
        vals.forEach((valset, bot) => {
            if (valset.length !== 2) return
            done = false
            var vs = valset.sort((a, b) => a - b)
            var lo = vs[0]
            var hi = vs[1]
            var r = rules[bot]
            if (r[0] == 'o') outs[r[1]] = lo
            if (r[2] == 'o') outs[r[3]] = hi
            if (r[0] == 'b') {
                var bvs = vals[r[1]] || []
                bvs.push(lo)
                vals[r[1]] = bvs
            }
            if (r[2] == 'b') {
                var bvs2 = vals[r[3]] || []
                bvs2.push(hi)
                vals[r[3]] = bvs2
            }
            valset.push(1)
        })
    }

    function findP1(x, y) {
        vals.forEach((v, i) => {
            var a = Math.min(v[0], v[1])
            var b = Math.max(v[0], v[1])
            if (a == x && b == y) part1(i)
        })
    }


    // findP1(2, 5)
    findP1(17, 61)

    part2(outs[0] * outs[1] * outs[2])
}




