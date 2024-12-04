import { match } from "assert";
import { readLines } from "../util/helper";

const sample = await readLines('Sample.txt');

function findAllXmasses()
{
    let XmasCount = 0;
    for(let row = 0; row < sample.length; row++)
    {
        XmasCount += countForwardXmasMatches(sample[row]); 
        XmasCount += countBackwardMatches(sample[row]);
        XmasCount += countVertXmasMatches(sample[row], row, 1);
        XmasCount += countVertXmasMatches(sample[row], row, -1);
        XmasCount += countDiagXmasMatches(sample[row], row, 1, 1);
        XmasCount += countDiagXmasMatches(sample[row], row, 1, -1);
        XmasCount += countDiagXmasMatches(sample[row], row, -1, 1);
        XmasCount += countDiagXmasMatches(sample[row], row, -1, -1);
    };
    return XmasCount;
}

function findAllCrossmasses()
{
    let crossCount = 0;
    for(let row = 0; row < sample.length; row++)
    {
        crossCount += countCrossmassMatches(sample[row], row);
    }
    return crossCount;
}

console.log("XMAS count:  " + findAllXmasses());
console.log("X-MAS count: " + findAllCrossmasses())


function countCrossmassMatches(line, row)
{
    const matchIndices = [...line.matchAll(/A/g)].map((elem) => elem.index);
    let matchCount = 0;

    if(matchIndices.length === 0)
    {
        return 0;
    }

    for(let i = 0; i < matchIndices.length; i++)
    {
        let diaCount = 0;
        const index = matchIndices[i];

        if(sample[row-1]?.charAt(index-1) === 'S')
        {
            diaCount += sample[row+1]?.charAt(index+1) === 'M' ? 1 : 0;
        }
        else if(sample[row-1]?.charAt(index-1) === 'M')
        {
            diaCount += sample[row+1]?.charAt(index+1) === 'S' ? 1 : 0;
        }
        if(sample[row-1]?.charAt(index+1) === 'M')
        {
            diaCount += sample[row+1]?.charAt(index-1) === 'S' ? 1 : 0;
        }
        else if(sample[row-1]?.charAt(index+1) === 'S')
        {
            diaCount += sample[row+1]?.charAt(index-1) === 'M' ? 1 : 0;
        }
        matchCount += diaCount === 2 ? 1 : 0;
    }
    return matchCount;
}

function countForwardXmasMatches(line: string)
{
    return line.match(/XMAS/g)?.length ?? 0
}

function countBackwardMatches(line: string)
{
    return line.match(/SAMX/g)?.length ?? 0
}

/**
 * upOrDown: up: -1; down: +1
 */
function countVertXmasMatches(line: string, row: number, upOrDown: number)
{
    const matchIndices = [...line.matchAll(/X/g)].map((elem) => elem.index)
    let matchCount = 0;

    if(matchIndices.length === 0)
        {
            return 0;
        }
    for(let i = 0; i < matchIndices.length; i++)
    {
        const matchIndex = matchIndices[i];
        if(matchIndex === undefined)
        {
            continue;
        }
        if(!sample[row+upOrDown]?.charAt(matchIndex) || sample[row+upOrDown].charAt(matchIndex) !== 'M')
        {
            continue;
        }
        if(!sample[row+(2*upOrDown)]?.charAt(matchIndex) || sample[row+(2*upOrDown)].charAt(matchIndex) !== 'A')
        {
            continue;
        }
        if(!sample[row+(3*upOrDown)]?.charAt(matchIndex) || sample[row+(3*upOrDown)].charAt(matchIndex) !== 'S')
        {
            continue;
        }
        matchCount++;
    };
    return matchCount;
}

/**
 * upOrDown: up: -1; down: +1
 * leftOrRight: left: -1; right +1
 */
function countDiagXmasMatches(line: string, row: number, upOrDown: number, leftOrRight: number) {

    let count = 0;

    const matches = [...line.matchAll(/X/g)];
    const matchIndices = matches.map((elem) => elem.index)
    let matchCount = 0;

    if(matchIndices.length === 0)
        {
            return 0;
        }
    for(let i = 0; i < matchIndices.length; i++)
    {
        const matchIndex = matchIndices[i];
        if(matchIndex === undefined)
        {
            continue;
        }
        if(sample[row+upOrDown]?.charAt(matchIndex+leftOrRight) !== 'M')
        {
            continue;
        }
        if(sample[row+(2*upOrDown)]?.charAt(matchIndex+(2*leftOrRight)) !== 'A')
        {
            continue;
        }
        if(sample[row+(3*upOrDown)]?.charAt(matchIndex+(3*leftOrRight)) !== 'S')
        {
            continue;
        }
        matchCount++;
    };
    return matchCount;
}