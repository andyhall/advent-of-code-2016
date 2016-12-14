'use strict'
/* globals log, part1, part2 */

var Pathfinder = require('abstract-pathfinder')

module.exports = function (txt) {
    return solve(parseInt(txt))
}



function solve(num) {

    function isWall(node) {
        var x = node[0]
        var y = node[1]
        var n = x * x + 3 * x + 2 * x * y + y + y * y
        var ones = countOnes(n + num)
        return (ones & 1)
    }

    function countOnes(n) {
        var ones = 0
        while (n) {
            if (n & 1) ones++
            n >>= 1
        }
        return ones
    }


    // pathfinding
    var finder = new Pathfinder()

    finder.nodeToPrimitive = function (node) {
        return node.join(',')
    }
    finder.getNeighbors = function (node) {
        return [
            [node[0] + 1, node[1]],
            [node[0] - 1, node[1]],
            [node[0], node[1] + 1],
            [node[0], node[1] - 1],
        ]
    }
    finder.getMovementCost = function (nodeA, nodeB) {
        if (nodeB[0] < 0 || nodeB[1] < 0) return -1
        if (isWall(nodeB)) return -1
        return 1
    }

    finder.getHeuristic = function (nodeA, nodeB) {
        return Math.abs(nodeB[0] - nodeA[0]) + Math.abs(nodeB[1] - nodeA[1])
    }

    function distTo(x, y) {
        if (x == 1 && y == 1) return 1
        var len = finder.findPath([1, 1], [x, y]).length - 1
        return (len < 0) ? Infinity : len
    }

    // num = 10
    // part1(distTo(7, 4))

    part1(distTo(31, 39))



    var ct = 0
    for (var x = 0; x < 51; x++) for (var y = 0; y < 51; y++) {
        if (distTo(x, y) <= 50) ct++
    }

    part2(ct)

}


