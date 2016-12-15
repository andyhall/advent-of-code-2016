'use strict'
/* globals log, part1, part2 */


module.exports = function (txt) {

    // txt = 'Disc #1 has 5 positions; at time=0, it is at position 4.\nDisc #2 has 2 positions; at time=0, it is at position 1.'

    solve(txt, 1)
}


function solve(txt, part) {

    var size = [0]
    var pos = [0]

    for (var line of txt.split('\n')) {
        var arr = /Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)/.exec(line)
        if (!arr) throw '?'
        var d = parseInt(arr[1])
        var n = parseInt(arr[2])
        var p = parseInt(arr[3])
        size[d] = n
        pos[d] = p
    }

    function simulate(t) {
        var d = 0
        var ok = true
        while (d < size.length) {
            t++
            d++
            var p = (pos[d] + t) % size[d]
            if (p) return false
        }
        return true
    }


    part1((t => {
        while (1) {
            if (simulate(t)) return t
            t++
        }
    })(0))



    size.push(11)
    pos.push(0)

    part2((t => {
        while (1) {
            if (simulate(t)) return t
            t++
        }
    })(0))


}



