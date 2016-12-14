'use strict'
/* globals log, part1, part2 */

module.exports = function (txt) {
    if (0) {
        txt = [
            'aaaaa-bbb-z-y-x-123[abxyz]',
            'a-b-c-d-e-f-g-h-987[abcde]',
            'not-a-real-room-404[oarel]',
            'totally-real-room-200[decoy]',
        ].join('\n')
    }
    var lines = txt.split('\n')
    var data = lines.map(str => {
        var arr = /^(.*)-(\w+)\[(\w+)\]$/.exec(str)
        return {
            name: arr[1],
            id: parseInt(arr[2]),
            checksum: arr[3],
        }
    })
    return solve(data)
}



function solve(data) {
    var p1 = 0
    var p2 = 0
    for (var room of data) {
        var ok = check(room.name, room.checksum)
        if (!ok) continue
        p1 += room.id
        if (!p2) p2 = decode(room.name, room.id)
    }
    part1(p1)
    part2(p2)
}


function check(name, checksum) {
    name = name.split('-').join('')
    var cts = {}
    var arr = []
    for (var char of name) {
        if (!arr.includes(char)) arr.push(char)
        cts[char] = (cts[char] || 0) + 1
    }
    arr.sort((a, b) => {
        var diff = cts[b] - cts[a]
        if (diff) return diff
        return (a > b) ? 1 : -1
    })
    var ok = true
    for (var i = 0; i < 5; i++) if (checksum[i] != arr[i]) ok = false
    // console.log(ok, checksum, name, arr)
    return ok
}



function decode(name, id) {
    // name = 'qzmt-zixmtkozy-ivhz'
    // id = 343
    var out = ''
    var aChar = 'a'.charCodeAt(0)
    for (var char of name) {
        if (char === '-') out += ' '
        else {
            var num = char.charCodeAt(0) - aChar
            num = (num + id) % 26
            out += String.fromCharCode(aChar + num)
        }
    }
    if (/pole/.test(out)) return id
    return 0
}


