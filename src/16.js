'use strict'
/* globals log, part1, part2 */


module.exports = function(txt) {
    var t = performance.now()
    var size = 272

    // txt = '10000'
    // size = 20

    part1(solve(txt, size))

    size = 35651584

    part2('...')
    setTimeout(a => {
        part2(solve(txt, size))
        log('finishedn in ', (performance.now()-t)|0, 'ms')
    }, 1)
}





function reverse(s) {
    return s.split('').reverse().join('')
}

function inverse(s) {
    return s.split('').map(char => (char === '0') ? '1' : '0').join('')
}


function checksum(s) {
    var out = ''
    for (var i = 0; i < s.length; i += 2) {
        out += (s.charAt(i) == s.charAt(i + 1)) ? '1' : '0'
    }
    return out
}

window.checksum = checksum


function run(s) {
    return s + '0' + reverse(inverse(s))
}




function solve(txt, size) {
    // call the input s, and call S = reverse(inverse(s))
    //
    // s -> s 0 S
    //   -> s0S 0 S1s
    //   -> s0S0S1s 0 S0s1s1S 
    //   == s0 S0 S1 s0 S0 s1 s1 S
    //      ....

    // create a template string of output if the input had been '0'
    // and iterate it until the real input would have been the right size
    var base = '0'
    var l = txt.length
    while (l < size) {
        base = run(base)
        l = 2 * l + 1
    }

    var len = txt.length

    // "base" now represents a template for the actual disk-filling data
    // even chars represent one chunk of real input  
    //      0 -> txt
    //      1 -> reverse(inverse(txt)) 
    // odd chars represent a tail to append to each block of input 

    // precalc checksums for the four possible (chunk+tail) tuples 
    // and store in a lookup table keyed to each two chars in the template
    var rev = reverse(inverse(txt))
    var lookup = {
        '00': checksum(txt + '0'),
        '01': checksum(txt + '1'),
        '10': checksum(rev + '0'),
        '11': checksum(rev + '1'),
    }

    // disassemble the template and assemble checksums of it,
    // effectively processing (len+1) chars at a time 
    var charsDone = 0
    var sum = ''
    var baseIndex = 0
    while (charsDone < size) {
        var needed = size - charsDone
        if (needed > len + 1) {
            // regular case, pull out a two-char tuple from template
            // and append a checksum from the lookup table
            var pair = base.substr(baseIndex, 2)
            sum += lookup[pair]
        } else {
            // last iteration: less than one chunk of text needed, so tail char doesn't matter
            var baseChar = base.charAt(baseIndex)
            var str = (baseChar === '0') ? txt : rev
            // so manually clip and take the checksum
            sum += checksum(str.substr(0, needed))
        }
        baseIndex += 2
        charsDone += len + 1
    }

    // we are now at the stage where several checksums are already done
    // so just finish reducing and exit
    while ((sum.length % 2) === 0) sum = checksum(sum)

    return sum
}




