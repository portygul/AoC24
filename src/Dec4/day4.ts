import { match } from "assert";
import { readLines } from "../util/helper";

const sample = await readLines('Sample.txt');
const directions = [{x: 0, y: 1}, {x: 0, y: -1},{x: 1, y: 0}, {x: -1, y: 0}, {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: 1}, {x: -1, y: -1}];

console.log("XMAS count:  " + findAllXmasses());
console.log("X-MAS count: " + findAllCrossmasses())

function findAllXmasses()
{
    let XmasCount = 0;
    for(let row = 0; row < sample.length; row++)
    {
        directions.forEach(dir => 
        {
        XmasCount += countDirectionalXmasMatches(sample[row], row, dir.x, dir.y); 
        });
    }
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

function countCrossmassMatches(line, row)
{
    const matchIndices = [...line.matchAll(/A/g)].map((elem) => elem.index);
    
    let matchCount = 0;
    const charCodeS = 'S'.charCodeAt(0);
    const charCodeM = 'M'.charCodeAt(0);
    const charCodeSPlusM = charCodeM + charCodeS;

    if(matchIndices.length === 0)
    {
        return 0;
    }

    for(let i = 0; i < matchIndices.length; i++)
    {
        const index = matchIndices[i];

        const topLeft = sample[row-1]?.charCodeAt(index-1);
        const topRight = sample[row-1]?.charCodeAt(index+1);

        if((topLeft !== charCodeS && topLeft !== charCodeM) || (charCodeSPlusM - topLeft - sample[row+1]?.charCodeAt(index+1)) !== 0)
        {
            continue;
        }
        if((topRight !== charCodeS && topRight !== charCodeM) || ((charCodeSPlusM - topRight - sample[row+1]?.charCodeAt(index-1)) !== 0))
        {
            continue;
        }
        matchCount++;
    }
    return matchCount;
}

function countDirectionalXmasMatches(line: string, row: number, deltaX: number, deltaY: number,) {

    const matches = [...line.matchAll(/X/g)];
    const matchIndices = matches.map((elem) => elem.index)
    const XMAS = ['X', 'M', 'A', 'S'];
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

        let letterCount = 1;
        for(let j = 1; j < XMAS.length; j++)
        { 
            if(sample[row+j*deltaY]?.charAt(matchIndex+j*deltaX) !== XMAS[j])
            {
                break;
            }
            letterCount++;
        }
        matchCount += (letterCount === 4) ? 1 : 0;
    };
    return matchCount;
}