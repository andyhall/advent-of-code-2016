'use strict'
/* globals log, part1, part2 */

var ndarray = require('ndarray')

module.exports = function (txt) {

    // txt = [
    //     'rect 3x2',
    //     'rotate column x=1 by 1',
    //     'rotate row y=0 by 4',
    //     'rotate row x=1 by 1',
    // ].join('\n')

    solve(txt)
}




function solve(txt) {

    var xs = 50
    var ys = 6
    var board = ndarray(new Int8Array(xs*ys), [xs, ys])
    var i, j

    var lines = txt.split('\n')
    for (var line of lines) {
        var res = /^(\w+) (.*)$/.exec(line)
        if (res[1] === 'rect') {
            var res3 = /^(\d+)x(\d+)$/.exec(res[2])
            var x = parseInt(res3[1])
            var y = parseInt(res3[2])
            for (i = 0; i < x; i++) for (j = 0; j < y; j++) {
                board.set(i, j, 1)
            }
        } else {
            var res2 = /^(\w+) (.)=(\d+) by (\d+)$/.exec(res[2])
            var axis = res2[2]
            var axisVal = parseInt(res2[3])
            var by = parseInt(res2[4])
            var old = ndarray(board.data.slice(), [xs, ys])
            if (axis === 'x') {
                i = axisVal
                for (j = 0; j < ys; j++) {
                    board.set(i, j, old.get(i, (j - by + ys) % ys))
                }
            } else {
                j = axisVal
                for (i = 0; i < xs; i++) {
                    board.set(i, j, old.get((i - by + xs) % xs, j))
                }
            }
        }
    }

    function count(b) {
        var ct = 0
        for (j = 0; j < ys; j++) {
            var s = j + ':  '
            for (i = 0; i < xs; i++) {
                s += (b.get(i, j)) ? '#' : '.'
                if (b.get(i, j)) ct++
            }
            log(s)
        }
        return ct
    }
    log('')
    part1(count(board))



    part2('ZFHFSFOGPO - see console')



}




