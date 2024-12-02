import { readLines, sumUp } from "../util/helper";

//puzzle 1
async function calcSortedDifferences()
{
    const numbers = await readLines('Input.txt');
    const left: number[] = [];
    const right: number[] = [];

    let delta = 0;

    numbers.forEach(elem => {
        const split = elem.split('   ');
        left.push(parseFloat(split[0]));
        right.push(parseFloat(split[1]));
    });

    left.sort();
    right.sort();

    for(let i = 0; i < left.length; i++)
    {
        delta += Math.abs(left[i] - right[i]);
    }
    
    console.log("difference: " + delta);
    return delta;
}  

//puzzle 2
async function calcSimilarity(){

    const numbers = await readLines('Input.txt');
    const left: number[] = [];
    const right: Map<number, number> = new Map();

    let similarity = 0;

    numbers.forEach(elem => {
        const banana = elem.split('   ');
        left.push(parseFloat(banana[0]));
        
        const r = parseFloat(banana[1]);
        right.set(r, ((right.get(r) ?? 0) + 1));
    });

    left.forEach(elem => {
        similarity += elem * (right.get(elem) ?? 0)
    });

    console.log("similarity: " + similarity)
    return similarity;
}


//exec.exe
calcSortedDifferences();
calcSimilarity();