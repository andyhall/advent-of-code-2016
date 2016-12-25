'use strict'
/* globals log, part1, part2 */

var Pathfinder = require('abstract-pathfinder')
var ndarray = require('ndarray')
var combine = require('js-combinatorics')


module.exports = function(txt) {

    // txt = '###########\n' +
    //     '#0.1.....2#\n' +
    //     '#.#######.#\n' +
    //     '#4.......3#\n' +
    //     '###########'

    solve(txt, 1)
    solve(txt, 2)

}



function solve(txt, part) {

    var lines = txt.split('\n')

    var sx = lines[0].length
    var sy = lines.length


    // build the map and list of points
    var map = ndarray([], [sx, sy])
    var points = []
    lines.forEach((line, y) => {
        for (var x = 0; x < sx; x++) {
            var char = line.charAt(x)
            map.set(x, y, char)
            var n = parseInt(char)
            if (!isNaN(n)) points[n] = [x, y]
        }
    })



    // pathfinding
    var finder = new Pathfinder()
    
    finder.nodeToPrimitive = function(node) {
        return node.join()
    }

    finder.getNeighbors = function(node) {
        var x = node[0]
        var y = node[1]
        return [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
        ]
    }

    finder.getMovementCost = function(nodeA, nodeB) {
        var char = map.get(nodeB[0], nodeB[1])
        return (char === '#') ? -1 : 1
    }

    finder.getHeuristic = function(nodeA, nodeB) {
        return Math.abs(nodeB[0] - nodeA[0]) + Math.abs(nodeB[1] - nodeA[1])
    }

    function pathLength(i, j) {
        return finder.findPath(points[i], points[j]).length - 1
    }


    // cache path lengths
    var len = points.length
    var cache = ndarray([], [len, len])
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            var l = (i === j) ? 0 : pathLength(i, j)
            cache.set(i, j, l)
        }
    }


    // solution
    var minPath = ''
    var minDist = Infinity

    var indexes = []
    for (var pi = 1; pi < points.length; pi++) indexes.push(pi)

    var perms = combine.permutation(indexes)
    var p = perms.next()
    while (p) {
        var d = cache.get(0, p[0])
        for (var k = 1; k < p.length; k++) {
            d += cache.get(p[k - 1], p[k])
        }
        //  begin part 2
        if (part == 2) d += cache.get(p[p.length - 1], 0)
        //  end part 2
        if (d < minDist) {
            minDist = d
            minPath = p.join('')
        }
        p = perms.next()
    }

    if (part == 1) part1(minDist)
    else part2(minDist)


}




