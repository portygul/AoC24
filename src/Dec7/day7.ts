import { readLines } from "../util/helper";

//to find the solution without the concat operator (for puzzle 1) we can simply remove the tryConcat() calls from the recursion steps; 
//I do not see the benefit of having almost exactly the same code here twice :o) 

const input = await readLines('Input.txt');
const splitLines: string[][] = [];

console.log(findPossibleEquationsWithConcat())

function findPossibleEquationsWithConcat()
{
    let countie = 0;
    input.forEach((line, index) => 
    {
        splitLines.push(line.split(': ')); 

        const factors = splitLines[index][1].split(' ').map(factor => parseFloat(factor));
        const desiredResult = parseFloat(splitLines[index][0]);
        if(tryMult(desiredResult, factors) || tryAdd(desiredResult, factors))
        {
            countie += desiredResult;
        }
    });
    return countie;
}

function tryMult(result: number, factors: number[], currentValue: number = 1)
{
    if(factors.length === 0)
    {
        return result === currentValue;
    }
    const multItUp = currentValue * factors[0]
    return multItUp > result ? false : (tryMult(result, factors.slice(1), multItUp) || tryAdd(result, factors.slice(1), multItUp) || tryConcat(result, factors.slice(1), multItUp))
}

function tryAdd(result: number, factors: number[], currentValue: number = 0)
{
    if(factors.length === 0)
    {
        return result === currentValue;
    }
    const sumItUp = currentValue + factors[0]
    return sumItUp > result ? false : (tryMult(result, factors.slice(1), sumItUp) || tryAdd(result, factors.slice(1), sumItUp) || tryConcat(result, factors.slice(1), sumItUp))
}

function tryConcat(result: number, factors: number[], currentValue: number = 0)
{
    if(factors.length === 0)
    {
        return result === currentValue;
    }
    const concItUp = parseFloat('' + currentValue + factors[0]);
    return concItUp > result ? false : (tryMult(result, factors.slice(1), concItUp) || tryAdd(result, factors.slice(1), concItUp) || tryConcat(result, factors.slice(1), concItUp))
}