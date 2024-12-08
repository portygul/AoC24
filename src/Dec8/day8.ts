import { readLines } from "../util/helper";

type Point = {x: number, y: number};
const input = await readLines('Input.txt');
const mapXLimit = input[0].length;
const mapYLimit = input.length;

const symbols = new Map<string, Array<{x: number, y:number}>>();
let antiNodeCount = 0;

fishOutSymbolsFromInput();

//pass true to find all nodes considering "resonant harmonics" (aka solve puzzle 2)
//pass false (or nothing) to find the two antinodes without harmonics (aka solve puzzle 1)
findAndCountThoseAntiNodes(true);
console.log(antiNodeCount);


function fishOutSymbolsFromInput()
{
    input.forEach( (line, row) => {

        for(let i = 0; i < line.length; i++)
        {
            if(line[i] === '.')
            {
                continue;
            }
            if(!symbols.has(line[i]))
            {
                symbols.set(line[i], [{x: i, y: row}]);
                continue;
            }
            symbols.set(line[i], Array.from(symbols.get(line[i])!).concat({x: i, y: row }));
        }
    });
}

function findAndCountThoseAntiNodes(withResonance: boolean = false)
{
    symbols.forEach(sym => {
        if(sym.length === 1)
        {
            return;
        }
            findAllTuplePermutations(sym, withResonance);
        
        });
}

function findAllTuplePermutations(points: Array<{x: number, y:number}>, withResonance: boolean = false)
{
    for(let fstPoint = 0; fstPoint < points.length; fstPoint++)
    {
        for(let sndPoint = fstPoint+1; sndPoint < points.length; sndPoint++ )
        {
            //snd - fst
            const fst = points[fstPoint];
            const snd = points[sndPoint];

            let potNodes: Point[];
            
            if(withResonance)            
            {   
                potNodes = findAllPotentialAntiNodesWithResonance(fst, snd);
            }
            else 
            { 
                potNodes = findBothPotentialAntiNodes(fst, snd);
            }
            potNodes.forEach(node => countPotAntiNodeIfValid(node));
        }
    }
}

function findBothPotentialAntiNodes(fst: Point, snd: Point)
{
    const deltaX = snd.x-fst.x;
    const deltaY = snd.y-fst.y;

    const potAntiNode1 = {x: fst.x - deltaX, y: fst.y - deltaY};
    const potAntiNode2 = {x: snd.x + deltaX, y: snd.y + deltaY};

    return [potAntiNode1, potAntiNode2];
}

//i'm sure this can be made nicer but i can't be bothered right now; at least it shouldn't include any unnecessary looping and not introduce potential node dupes
function findAllPotentialAntiNodesWithResonance(fst: Point, snd: Point)
{
    const deltaX = snd.x-fst.x;
    const deltaY = snd.y-fst.y;

    const potAntiNodes: Point[] = []

    for(let pot1 = {x: fst.x - deltaX, y: fst.y - deltaY}; pot1.x > -1 && pot1.y > -1; pot1 = {x: pot1.x - deltaX, y: pot1.y - deltaY } )
    {
        potAntiNodes.push(pot1);
    }
    for(let pot2 = {x: fst.x, y: fst.y}; pot2.x < mapXLimit && pot2.y < mapYLimit; pot2 = {x: pot2.x + deltaX, y: pot2.y + deltaY } )
    {
        potAntiNodes.push(pot2);
    }
    return potAntiNodes;
}

function isPotAntiNodeOnMap (potAntiNode: Point)
{
    return potAntiNode.x > -1 && potAntiNode.x < mapXLimit && potAntiNode.y > -1 && potAntiNode.y < mapYLimit;
}

function countPotAntiNodeIfValid(potAntiNode: Point)
{
    if(!isPotAntiNodeOnMap(potAntiNode))
    {
        return;
    }
    if(input[potAntiNode.y].charAt(potAntiNode.x) === '#')
    {
        return;  
    }
    const newLine = input[potAntiNode.y].split('');
    newLine[potAntiNode.x] = '#';
    input[potAntiNode.y] = newLine.join('');

    antiNodeCount++;
}


