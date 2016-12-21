'use strict'
/* globals log, part1, part2 */


var combine = require('js-combinatorics')


module.exports = function (txt) {
    solve(txt)
}



function solve(txt, part) {


    var commands = {}

    commands.swap = function (pass, line) {
        var res = /^swap (\w+) (\w) with (\w+) (\w)/.exec(line)
        var i1 = findIndex(pass, res[1], res[2])
        var i2 = findIndex(pass, res[3], res[4])
        var tmp = pass[i1]
        pass[i1] = pass[i2]
        pass[i2] = tmp
    }

    commands.rotate = function (pass, line) {
        var res = /^rotate (\w+) (\d+) step/.exec(line)
        if (res) {
            var dir = (res[1] === 'right') ? 1 : -1
            var num = parseInt(res[2])
            while (num--) rotate(pass, dir)
        } else {
            var res2 = /^rotate based on position of letter (\w+)/.exec(line)
            var i = findIndex(pass, 'letter', res2[1])
            var num2 = (i >= 4) ? i + 2 : i + 1
            while (num2--) rotate(pass, 1)
        }
    }

    commands.reverse = function (pass, line) {
        var res = /^reverse positions (\d+) through (\d+)/.exec(line)
        var a = parseInt(res[1])
        var b = parseInt(res[2])
        var mid = pass.slice(a, b + 1).reverse()
        for (var i = a; i < b + 1; i++) {
            pass[i] = mid[i - a]
        }
    }


    commands.move = function (pass, line) {
        var res = /^move position (\d+) to position (\d+)/.exec(line)
        var a = parseInt(res[1])
        var b = parseInt(res[2])
        var char = pass.splice(a, 1)[0]
        pass.splice(b, 0, char)
    }



    var lines = txt.split('\n')

    function scramble(pass) {
        for (var line of lines) {
            var cmd = line.split(' ')[0]
            commands[cmd](pass, line)
        }
        return pass
    }



    // part 1
    var pass = 'abcdefgh'.split('')
    part1(scramble(pass).join(''))




    // part 2 - brute force all permuatations of 'abcdefgh'

    var ct = 0
    var target = 'fbgdceah'
    var perms = combine.permutation('abcdefgh'.split(''))


    iterate(1000, () => {
        ct++
        var p = perms.next()
        if (p) {
            var curr = p.join('')
            scramble(p)
            if (p.join('') === target) {
                part2(curr)
                return true
            }
        } else {
            part2('no solution :(')
            return true
        }
    }, () => {
        var pct = Math.round(100 * ct / perms.length)
        part2('... ' + pct + '%')
    })



}





// helpers

function findIndex(arr, marker, arg) {
    if (marker === 'letter') return arr.indexOf(arg)
    return parseInt(arg)
}


function rotate(arr, dir) {
    if (dir > 0) {
        arr.unshift(arr.pop())
    } else {
        arr.push(arr.shift())
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



