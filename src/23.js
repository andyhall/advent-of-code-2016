'use strict'
/* globals log, part1, part2 */



module.exports = function (txt) {
    part1(solve(txt, 7))
    part2(solve(txt, 12))
}



function solve(txt, regA) {

    var cmds = []

    // parse inputs
    for (var line of txt.split('\n')) {
        line = line.split(/\s*#/)[0]
        var arr = line.split(/\s+/)
        var obj = {
            cmd: arr[0],
            arg1: arr[1],
            arg2: null,
            toggled: false,
        }
        if (arr[2]) obj.arg2 = arr[2]
        cmds.push(obj)
    }



    // special sauce for part two
    cmds[4].cmd = 'MULTBD'
    for (var i = 5; i < 10; i++) cmds[i].cmd = 'NOP'



    var state = {
        a: regA,
        b: 0,
        c: 0,
        d: 0,
        line: 0,
    }

    function dereferenceArg(arg) {
        if (arg > 'A') return state[arg]
        return parseInt(arg)
    }

    function run() {
        // state machine
        var l = state.line
        var c = cmds[l]
        var cmd = c.cmd
        var a1 = c.arg1
        var a2 = c.arg2
        var jumped = false
        if (c.toggled) {
            if (a2) {
                cmd = (cmd == 'jnz') ? 'cpy' : 'jnz'
            } else {
                cmd = (cmd == 'inc') ? 'dec' : 'inc'
            }
        }
        // execute
        if (cmd == 'jnz') {
            var val = dereferenceArg(a1)
            if (val) {
                state.line += dereferenceArg(a2)
                jumped = true
            }
        }
        if (cmd == 'inc') state[a1]++
        if (cmd == 'dec') state[a1]--
        if (cmd == 'cpy') {
            if (state.hasOwnProperty(a2)) {
                var val1 = dereferenceArg(a1)
                state[a2] = val1
            }
        }
        if (cmd == 'tgl') {
            var lnum = state.line + state[a1]
            if (lnum >= 0 && lnum < cmds.length) {
                cmds[lnum].toggled = !cmds[lnum].toggled
            }
        }
        // ad-hoc case for part 2
        if (cmd == 'MULTBD') {
            state.a = state.b * state.d
            state.c = 0
            state.d = 0
        }
        if (!jumped) state.line++
        return (state.line >= 0 && state.line < cmds.length)
    }

    var ok = true, ct = 0
    while (ok && ++ct) ok = run()
    log('done after', ct, 'iterations')

    return state.a

}





