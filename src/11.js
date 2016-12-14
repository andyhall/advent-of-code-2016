'use strict'
/* globals log, part1, part2 */

var Pathfinder = require('abstract-pathfinder')

module.exports = function (txt) {
    return solve(txt)
}



function solve(txt) {

    // test data: 
    // F4 .  .  .  .  .  
    // F3 .  .  .  LG .  
    // F2 .  HG .  .  .  
    // F1 E  .  HM .  LM 

    // elevator, then chip/gen pairs
    var state = [1, 1, 2, 1, 3]



    // F4 .  .  .  .  .  
    // F3 .  PrG, PrM, RG, RM  
    // F2 .  PlM, SM, 
    // F1 E  TG, TM, PlG, SG 

    // elevator, then chip/gen pairs
    state = [1,
        1, 1,   // T
        2, 1,   // Pl
        2, 1,   // S
        3, 3,   // Pr
        3, 3,   // R
    ]




    function isValid(state) {
        var danger = []
        for (var i = 1; i < state.length; i += 2) {
            var chip = state[i]
            var gen = state[i + 1]
            if (chip !== gen) danger[chip] = true
        }
        for (i = 1; i < state.length; i += 2) {
            var gen2 = state[i + 1]
            if (danger[gen2]) return false
        }
        return true
    }


    function makeNeighborStates(state) {
        var ns = []
        if (state[0] > 1) addDir(-1)
        if (state[0] < 4) addDir(1)
        return ns
        function addDir(dir) {
            // items on same floor
            var locs = []
            for (var i = 1; i < state.length; i += 1) {
                if (state[i] == state[0]) locs.push(i)
            }
            // make neighbor array
            if (locs.length === 0) return
            for (var loc of locs) {
                // single moves
                pushNeighbor(ns, state, dir, loc, -1)
                // double moves
                for (var loc2 of locs) {
                    if (loc >= loc2) continue
                    pushNeighbor(ns, state, dir, loc, loc2)
                }
            }
        }
    }

    function pushNeighbor(neighbors, state, dir, i1, i2) {
        var n = state.slice()
        n[0] += dir
        n[i1] += dir
        if (i2 > -1) n[i2] += dir
        if (isValid(n)) neighbors.push(n)
    }


    // pathfinding
    var finder = new Pathfinder()

    finder.nodeToPrimitive = function (node) {
        return node.join(',')
    }
    finder.getNeighbors = function (node) {
        return makeNeighborStates(node)
    }
    finder.getMovementCost = function (nodeA, nodeB) {
        return 1
    }
    finder.getHeuristic = function (nodeA, nodeB) {
        var steps = Math.abs(nodeA[0] - nodeB[0])
        for (var i=1; i<nodeA.length; i++) {
            steps += 2 * Math.abs(nodeA[i] - nodeB[i])
        }
        return steps
    }

    var end = state.map(() => 4)
    var path = finder.findPath(state, end)
    part1(path.length - 1)

    state.push(1, 1, 1, 1)
    var end2 = state.map(() => 4)
    part2(finder.findPath(state, end2).length -1)

}



