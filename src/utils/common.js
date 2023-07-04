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

export function getColor(value){
    if (value < 50) {
        return "#DD1E47"
      } else if(value >= 50 && value < 65){
        return '#FFC40C'
      }
      else if (value >= 65 && value <100 ){
        return '#00A084'
      }
      else if (value === 100){
        return '#00AEEF'
      }
      else{
        return '#000'
    }
}