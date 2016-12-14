'use strict'
/* globals log, part1, part2 */

module.exports = function (txt) {
    var steps = txt.split(', ')
    return solve(steps)
}


var dir = 0
var pos = [0, 0]
var dirChanges = {
    R: 1,
    L: -1
}


var visited = {}
var p2 = ''


function solve(steps) {

    // steps = ['R2', 'L3']
    
    for (var step of steps) {
        var turn = step.substr(0, 1)
        dir += dirChanges[turn]
        dir = (dir + 4) % 4

        var dist = parseInt(step.substr(1))
        var axis = (dir % 2) ? 0 : 1
        var axisDir = (dir < 2) ? 1 : -1

        while (dist--) {
            pos[axis] += axisDir
            if (visited) {
                var id = pos.join('|')
                if (visited[id]) {
                    p2 = manhattan(pos)
                    visited = null
                } else {
                    visited[id] = true
                }
            }
        }

    }
    part1(manhattan(pos))
    part2(p2)
}


function manhattan(vec) {
    return Math.abs(vec[0]) + Math.abs(vec[1])
}




