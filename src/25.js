'use strict'
/* globals log, part1, part2 */



module.exports = function (txt) {
    solve(txt)
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

    function dereferenceArg(state, arg) {
        if (arg > 'A') return state[arg]
        return parseInt(arg)
    }

    function run(state) {
        // state machine
        var l = state.line
        var c = cmds[l]
        var cmd = c.cmd
        var a1 = c.arg1
        var a2 = c.arg2
        var jumped = false
        // execute
        if (cmd == 'jnz') {
            var val = dereferenceArg(state, a1)
            if (val) {
                state.line += dereferenceArg(state, a2)
                jumped = true
            }
        }
        if (cmd == 'inc') state[a1]++
        if (cmd == 'dec') state[a1]--
        if (cmd == 'cpy') {
            var val1 = dereferenceArg(state, a1)
            state[a2] = val1
        }
        // ad-hoc special cases
        if (cmd == 'MULTBCtoD') {
            state.d += state.b * state.c
            state.b = 0
            state.c = 0
            jumped = true
            state.line = 8
        }
        if (cmd == 'INNERLOOP') {
            // cpy 2 c
            //     jnz b 2
            //     jnz 1 6
            //     dec b
            //     dec c
            //     jnz c -4
            // inc a
            // jnz 1 -7
            state.c = (state.b % 2) ? 1 : 2
            state.a = Math.floor(state.b / 2)
            state.b = 0
            jumped = true
            state.line = 20
        }
        if (!jumped) state.line++
        if (cmd == 'out') {
            var out = dereferenceArg(state, a1)
            return out
        }
        if (state.line < 0 || state.line >= cmds.length) return -1
        return null
    }




    // special sauce
    // these aren't actually necessary - unlike day 23, it solves 
    // plenty fast without doing anything clever. ho-hum. 

    cmds[3].cmd = 'MULTBCtoD' // mult B*C loop
    cmds[12].cmd = 'INNERLOOP' // cpy 2 c  ... jnz 1 -7 loop


    
    // solution

    var a = 0
    iterate(10, () => {
        var res = testInput(a)
        if (res) part1(a)
        a++
        return res
    }, () => {
        part1('at a = ' + a)
    })



    function testInput(a) {
        var prevOut = 1
        var numOutputs = 0
        var ct = 0
        var state = {
            a: a,
            b: 0,
            c: 0,
            d: 0,
            line: 0,
        }
        var seen = {}
        while (1) {
            var out = run(state)
            ct++
            if (out !== null) {
                if (out < 0 || out > 1) return false
                if (out === prevOut) return false
                prevOut = out
                numOutputs++
            }
            var str = stateToString(state)
            if (seen[str]) {
                if (numOutputs < 2) return false
                if (numOutputs % 2) return false
                return true
            }
            seen[str] = 1
            if (numOutputs > 100) {
                log('error - breaking on a:', a)
            }
        }
    }


    function stateToString(s) {
        return [s.a, s.b, s.c, s.d, s.line].join(',')
    }
}





function iterate(N, fn, done) {
    var id = setInterval(function () {
        for (var i = 0; i < N; i++) {
            if (fn()) break
        }
        if (i < N || done()) clearInterval(id)
    }, 5)
}




