'use strict'
/* globals log, part1, part2 */

module.exports = function (txt) {
    // txt = 'ULL\nRRDDD\nLURDL\nUUUUD'
    return solve(txt)
}

function solve(s) {
    var lines = s.split('\n')
    var sol = ''
    pos = [0, 0]
    for (var line of lines) {
        sol += getCode(line, 1)
    }
    part1(sol)

    var sol2 = ''
    pos = [-2, 0]
    for (var line2 of lines) {
        sol2 += getCode(line2, 2)
    }
    part2(sol2)
}

// state
var pos


function getCode(line, part) {
    var axis = 0
    var dir = 1
    for (var char of line) {
        switch (char) {
            case 'U': axis = 1; dir = -1; break
            case 'D': axis = 1; dir = 1; break
            case 'L': axis = 0; dir = -1; break
            case 'R': axis = 0; dir = 1; break
        }
        update(part, axis, dir)
    }
    return posToNum(part)
}


function update(part, axis, dir) {
    if (part === 1) {
        pos[axis] += dir
        if (pos[axis] < -1) pos[axis] -= dir
        else if (pos[axis] > 1) pos[axis] -= dir
    } else {
        var xmax = 2 - Math.abs(pos[1])
        var ymax = 2 - Math.abs(pos[0])
        pos[axis] += dir
        if (Math.abs(pos[0]) > xmax) pos[axis] -= dir
        else if (Math.abs(pos[1]) > ymax) pos[axis] -= dir
    }
}


function posToNum(part) {
    if (part === 1) {
        return 2 + pos[0] + 3 * (pos[1] + 1)
    } else {
        var x = pos[0]
        var y = pos[1]
        if (y === -2) return 1
        if (y === -1) return x + 3
        if (y === 0) return x + 7
        if (y === 1) return (x + 11).toString(16).toUpperCase()
        if (y === 2) return (x + 13).toString(16).toUpperCase()
    }
}

