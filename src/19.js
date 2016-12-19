'use strict'
/* globals log, part1, part2 */



module.exports = function (txt) {
    var num = parseInt(txt)
    // num = 5
    solve1(num)
    solve2(num)
}



function nextNonZero(arr, i) {
    var len = arr.length
    do {
        i = (i + 1) % arr.length
    } while (arr[i] === 0)
    return i
}


function solve1(num) {

    var arr = []
    for (var j = 0; j < num; j++) arr[j] = j + 1

    var at = 0
    var toggle = false
    var alive = num

    iterate(100000, () => {
        if (toggle) {
            arr[at] = 0
            alive--
        }
        toggle = !toggle
        at = nextNonZero(arr, at)
        if (alive === 1) {
            part1(arr[at])
            return true
        }
    }, () => {
        part1('... ' + alive)
    })


}



function solve2(num) {

    var arr = []
    for (var j = 0; j < num; j++) arr[j] = j + 1

    var at = 0
    var rem = Math.floor(num / 2)
    var toggle = (num % 2 === 1)
    var alive = num


    iterate(100000, () => {
        // not really sure why this works - I figured it out analytically
        arr[rem] = 0
        alive--
        at = nextNonZero(arr, at)
        if (alive === 1) {
            part2(arr[at])
            return true
        }
        rem = nextNonZero(arr, rem)
        if (toggle) rem = nextNonZero(arr, rem)
        toggle = !toggle
    }, () => {
        part2('... ' + alive)
    })


}




function iterate(N, fn, done) {
    var id = setInterval(function () {
        for (var i = 0; i < N; i++) {
            if (fn()) break
        }
        if (i < N || done()) clearInterval(id)
    }, 5)
}



