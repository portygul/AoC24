import { readLines } from "../util/helper";

const input = await readLines('Sample.txt');

const rules = new Map<string, Array<string>>();
const printOrders: string[][] = []; 
const middleNrsOfValidOrders: number[] = [];
let sum = 0;

input.forEach( line =>
    {
        if(line.includes('|'))
        {
            const ruleSet =  line.split('|');
            const currentRules = rules.get(ruleSet[0]);
            if(currentRules === undefined)
            {
                rules.set(ruleSet[0],[ruleSet[1]]);
                return;
            }
            currentRules.push(ruleSet[1]);
            rules.set(ruleSet[0], currentRules)
        }
        if(line.includes(','))
        {
            printOrders.push(line.split(','))
        }
    })
    console.log(rules)
    console.log(printOrders)

printOrders.forEach(order =>
    {
        checkIfOrderIsProper(order)
    })
console.log(middleNrsOfValidOrders)
console.log(sum)

function checkIfOrderIsProper(order)
{
    const prevNumbersInThisOrder = new Set<string>()
    for(let i = 0; i < order.length; i++)
        {
            if(checkIfThisPageNumberBreaksAnyRules(order[i], prevNumbersInThisOrder))
            {
                return;
            }
            prevNumbersInThisOrder.add(order[i])
        }
    middleNrsOfValidOrders.push(order[(order.length-1)/2]);
    sum +=parseFloat(order[(order.length-1)/2])
}    

function checkIfThisPageNumberBreaksAnyRules(pageNrToCheck, prevNumbersInThisOrder: Set<string>)
{
    const rulesForCurrNumber = rules.get(pageNrToCheck);
    if(rulesForCurrNumber === undefined)
    {
        return false;
    }
    console.log(rulesForCurrNumber.some(elem => prevNumbersInThisOrder.has(elem)))
    return rulesForCurrNumber.some(elem => prevNumbersInThisOrder.has(elem));
}