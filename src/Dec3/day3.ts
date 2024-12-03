import { readLines } from "../util/helper";

const sample = (await readLines('Sample.txt'))[0];
const input = (await readLines('Input.txt')).join('');

async function findAndCalcValidMults(input: string){
    const validMultParensContent = /(?<=mul\()(\d{1,3},\d{1,3})(?=\))/g;
    const matches = input.match(validMultParensContent);

    let sum = 0;
    matches?.forEach(m => {
        const factors = m.split(',');
        sum += parseFloat(factors[0]) * parseFloat(factors[1]);
    });

    return sum;
}
async function findAndCalcValidMultsPolitely(input: string){
    //use positive lookbehind to see if there is a 'do()' somewhere before the mult stuff we want to match 
    const validMultParensContentPrecededByDo = /((?<=do\(\).*)(?<=mul\()(\d{1,3},\d{1,3})(?=\)))/g;

    //since mults are enabled at the start, prepend 'do()' so i don't have to write a special case for the first chunk :o) hee hee
    //then split at 'don't()' so we can safely only check for 'do()' before mults
    const textWithoutDonts = ('do()' + input).split('don\'t()');

    let sum = 0;
    textWithoutDonts.forEach(chunk =>
    {
        const matches = chunk.match(validMultParensContentPrecededByDo);
        if(matches !== null)
        {
            matches.forEach( match => 
                {
                    const factors = match.split(',');
                    sum += parseFloat(factors[0]) * parseFloat(factors[1]);
                })
        }
    });
    return sum;
}

//solution for puzzle 2 with fewer loops (and more splits)
async function splittingHairs(input: string)
{
    const splitAtDont = ('do()'+ input).split('don\'t()');
    const splitAtDo = splitAtDont.map(chunk => chunk.split('do()'));
    
    let sum = 0;
    for(let i = 0; i < splitAtDo.length; i++)
    {
        splitAtDo[i].splice(0,1);
        sum += await findAndCalcValidMults(splitAtDo[i].join(''));
    }
        return sum;
}

findAndCalcValidMults(input).then((res) => console.log(`just mults:       ${res}`) )
findAndCalcValidMultsPolitely(input).then( (res) => console.log(`w/ dos and donts: ${res}`))
splittingHairs(input).then( (res) => console.log(`w/ more splits:   ${res}`))
