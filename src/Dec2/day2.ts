import { readLines } from "../util/helper";

checkReportsWithoutDampener();
checkReportsWithDampener();

async function checkReportsWithoutDampener()
{
    const reports = await readLines('Sample.txt');
    let nrOfSafeReports = 0;
    reports.forEach(report => isReportSafe(report) && nrOfSafeReports++); 

    console.log('w/o: ' + nrOfSafeReports);
    return nrOfSafeReports;
}

async function checkReportsWithDampener()
{
    const reports = await readLines('Input.txt');
    let nrOfSafeReports = 0;

    reports.forEach(report => isReportSafeWithDampener(report) && nrOfSafeReports++); 

    console.log('w/:  ' + nrOfSafeReports);
    return nrOfSafeReports;
}

function isReportSafeWithDampener(report: string, wasBadBefore = false): boolean
{
    let wasBadLevelFoundBefore = wasBadBefore;
    const numbers = report.split(' ').map(elem => parseFloat(elem));
    
    const delta = numbers[1] - numbers[0];
    //if > 0: increasing. if < 0: decreasing
    const sign = (delta)/Math.abs(delta);
    
    for(let i = 0; i < numbers.length-1; i++)
    {
        const comp = (numbers[i+1] - numbers [i]) * sign;
        if(comp > 0 && comp < 4 ) 
        {
            //here we can continue because we already know it's fine
            continue;
        }
        else if(wasBadLevelFoundBefore)
        {
            //this should mean: we already used our get out of jail free card
            return false;
        }
        //remove level and try again, but set wasBadBefore to true so we don't accidentally remove multiple levels
        return isReportSafeWithDampener(numbers.slice(0, i-1).concat(numbers.slice(i)).join(' '), true) || isReportSafeWithDampener(numbers.slice(0, i).concat(numbers.slice(i+1)).join(' '), true) || isReportSafeWithDampener(numbers.slice(0, i+1).concat(numbers.slice(i+2)).join(' '), true)
    }
    return true;
}

function isReportSafe(report: string)
{
    const numbers = report.split(' ').map(elem => parseFloat(elem));
    
    const delta = numbers[1] - numbers[0];
    //if > 0: increasing. if < 0: decreasing
    const sign = (delta)/Math.abs(delta);
    
    for(let i = 0; i < numbers.length-1; i++)
    {
        const comp = (numbers[i+1] - numbers [i]) * sign;
        if(comp < 1 || comp > 3 ) 
        {
            return false;
        }
    }
    return true;
}

