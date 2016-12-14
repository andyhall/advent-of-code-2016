'use strict'
/* globals log, part1, part2 */

module.exports = function(txt) {
    // txt = 'eedadn\ndrvtee\neandsr\nraavrd\natevrs\ntsrnev\nsdttsa\nrasrtv\nnssdts\nntnada\nsvetve\ntesnvt\nvntsnd\nvrdear\ndvrsen\nenarar'
    return solve(txt)
}



function solve(txt) {

    var counts = []

    txt.split('\n').forEach(line => {
        line.split('').forEach((char, pos) => {
            var obj = counts[pos] || {}
            obj[char] = (obj[char] + 1) || 1
            counts[pos] = obj
        })
    })


    var out1 = counts.map(obj => {
        var max = 0
        var char = '-'
        for (var s in obj) {
            if (obj[s] > max) {
                max = obj[s]
                char = s
            }
        }
        return char
    })
    part1(out1.join(''))


    var out2 = counts.map(obj => {
        var min = 100000
        var char = '-'
        for (var s in obj) {
            if (obj[s] < min) {
                min = obj[s]
                char = s
            }
        }
        return char
    })
    part2(out2.join(''))



}




