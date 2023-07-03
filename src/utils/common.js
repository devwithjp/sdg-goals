const data  = require('../data/sdg-data.json');

export function getValue(year, goal, state) {
    const modGoal = goal?.split(':')?.[0];
    // console.log("VAL", data?.[year]?.[state]?.chartdata?.find(chartdataItem => chartdataItem.name === modGoal)?.value);
    return data?.[year]?.[state]?.chartdata?.find(chartdataItem => chartdataItem.name === modGoal)?.value
}

export function getStatesValue(year, goal) {
    console.log(year)
    let stateValues = {}
    if(!year || !goal) {
        return
    }
    Object.keys(data?.[year])?.forEach(state => 
        { 
            stateValues = {...stateValues, [data?.[year]?.[state]?.["area_name"]] : getValue(year, goal,state)}
        });
    return stateValues;
}

