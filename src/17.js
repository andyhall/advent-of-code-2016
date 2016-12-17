'use strict'
/* globals log, part1, part2 */

var Pathfinder = require('abstract-pathfinder')
var md5 = require('js-md5')


module.exports = function(txt) {
    // txt = 'ihgpwlah'
    // txt = 'ulqzkmiv'
    solve(txt)
}



function solve(txt, part) {

    // node format: PATH,x,y
    var start = ',0,0'
    var end = 'END,3,3'

    var solutions = []


    function isOpen(char) {
        return (char > 'a' && char < 'g')
    }

    // pathfinding
    var finder = new Pathfinder()

    finder.nodeToPrimitive = function(node) {
        return node
    }

    finder.getNeighbors = function(node) {
        var arr = node.split(',')
        var base = arr[0]
        var x = parseInt(arr[1])
        var y = parseInt(arr[2])
        // exit found - store solution path but return no neighbors
        if (x == 3 && y == 3) {
            solutions.push(base)
            return []
        }
        // else...
        var h = md5(txt + base)
        var ret = []
        // up, down, left, and right
        if (y > 0 && isOpen(h.charAt(0))) ret.push(base + 'U,' + (x) + ',' + (y - 1))
        if (y < 3 && isOpen(h.charAt(1))) ret.push(base + 'D,' + (x) + ',' + (y + 1))
        if (x > 0 && isOpen(h.charAt(2))) ret.push(base + 'L,' + (x - 1) + ',' + (y))
        if (x < 3 && isOpen(h.charAt(3))) ret.push(base + 'R,' + (x + 1) + ',' + (y))
        return ret
    }

    finder.getMovementCost = function(nodeA, nodeB) {
        return 1
    }

    finder.getHeuristic = function(nodeA, nodeB) {
        return 1 // BFS
    }

    // finds and stores all solution paths
    finder.findPath(start, end)

    var min = Infinity
    var mini = 0
    var max = 0

    for (var sol of solutions) {
        if (sol.length > max) max = sol.length
        if (sol.length < min) {
            min = sol.length
            mini = solutions.indexOf(sol)
        }
    }

    part1(solutions[mini])
    part2(max)

}



