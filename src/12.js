'use strict'
/* globals log, part1, part2 */

module.exports = function (txt) {

    // txt = 'cpy 41 a\ninc a\ninc a\ndec a\njnz a 2\ndec a'

    return solve(txt)
}



function solve(txt) {

    var cmds = []
    for (var line of txt.split('\n')) {
        cmds.push(line.split(/\s+/))
    }

    var regs = { a: 0, b: 0, c: 0, d: 0 }
    var num = 0

    function handle(cmd, a, b) {
        if (cmd == 'jnz') {
            var val = parseInt(a) || regs[a]
            if (val) {
                num += parseInt(b)
                return
            }
        }
        num++
        if (cmd == 'inc') regs[a]++
        if (cmd == 'dec') regs[a]--
        if (cmd == 'cpy') {
            var val2 = parseInt(a) || regs[a]
            regs[b] = val2
        }
    }

    while (num < cmds.length) {
        var c = cmds[num]
        handle(c[0], c[1], c[2])
    }
    part1(regs.a)

    regs = { a: 0, b: 0, c: 1, d: 0 }
    num = 0
    while (num < cmds.length) {
        var d = cmds[num]
        handle(d[0], d[1], d[2])
    }
    part2(regs.a)


}



