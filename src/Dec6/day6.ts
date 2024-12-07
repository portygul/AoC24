import { readLines } from "../util/helper";

const input = await readLines('Sample.txt');
const matrix = <string[][]>[];
const obstMatrix = <string[][]>[];
const seekerMatrix = <string[][]>[];

input.forEach(line => {matrix.push(Array.from(line)); obstMatrix.push(Array.from(line));seekerMatrix.push(Array.from(line))})

//up -> right -> down-> left
const directionValues = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: +1 },
    { x: -1, y: 0 }
]

const directionalMarks = [
    '^',
    '>',
    'v',
    '<'
]

const mapLimitX = input[0].length;
const mapLimitY = input.length;
const guard = findInitialGuard();

function findInitialGuard()
{
    const guard = {direction: 0, position: {x: 0, y: 0} };
    for(let row = 0; row < input.length; row++)
    {
        if(input[row].indexOf('^') === -1)
        {
            continue;
        }
        guard.position.y = row;
        guard.position.x = input[row].indexOf('^');
    }
    return guard;
}
let countie = 0;

function moveLittleGuardExclamationMark()
{
    const dirDeltas = directionValues[guard.direction];
    const newGuardPosition = {x: guard.position.x + dirDeltas.x, y:guard.position.y + dirDeltas.y };
    //if out of bounds: STOP IT
    if(!matrix[newGuardPosition.y])
    {
        return;
    }
    //if new pos is obstacle
    if(matrix[newGuardPosition.y][newGuardPosition.x] === '#')
    {
        //turn 90 deg to right
        guard.direction = (guard.direction + 1) % 4;
        return;
    }
    //if there is no X yet
    if(matrix[newGuardPosition.y][newGuardPosition.x] !== 'X')
    {
        matrix[newGuardPosition.y][newGuardPosition.x] = 'X';
        countie++;
    }
    //else: move
    guard.position = newGuardPosition;
}

while(guard.position.x < mapLimitX - 1 && guard.position.x > 0 && guard.position.y < mapLimitY-1 && guard.position.y > 0 )
{
    moveLittleGuardExclamationMark()
    console.log(countie)
}

