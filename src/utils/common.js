const data  = require('../data/sdg-data.json');

export function getValue(year, goal, state) {
    const modGoal = goal?.split(':')?.[0];
    // console.log("VAL", data?.[year]?.[state]?.chartdata?.find(chartdataItem => chartdataItem.name === modGoal)?.value);
    return data?.[year]?.[state]?.chartdata?.find(chartdataItem => chartdataItem.name === modGoal)?.value
}