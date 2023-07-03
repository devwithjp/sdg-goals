const data2018 = require( './2018.json' )
const data2019 = require( './2019.json' )
const data2020 = require( './2020.json' )
const data= require('./sdg-data.json')
const indiaGeoJson = require('./indian-states.json')
var fs = require('fs');




function formatSdgYearData(yearData){
    let modifiedData = {}
    yearData.forEach(item => {
        const stateName = item?.area_name?.replace(/\s+/g, '-').toLowerCase();
        modifiedData = {[stateName] : item, ...modifiedData}
    });
    return modifiedData;
}


function formatSdgData(){
    // console.log(formatSdgYearData(data2018))

    const modifiedData = {
        "2018": formatSdgYearData(data2018), 
        "2019": formatSdgYearData(data2019),
        "2020": formatSdgYearData(data2020)
    }

    const sdgDataJSON = JSON.stringify(modifiedData);
    console.log(sdgDataJSON)
    fs.writeFile("./sdg-data.json", sdgDataJSON, ()=>{});
}


// formatSdgData();



// export function getValue(year, goal, state) {
//     const modGoal = goal?.split(':')?.[0];
//     // console.log("VAL", data?.[year]?.[state]?.chartdata?.find(chartdataItem => chartdataItem.name === modGoal)?.value);
//     return data?.[year]?.[state]?.chartdata?.find(chartdataItem => chartdataItem.name === modGoal)?.value
// }

// export function getStatesValue(year, goal) {
//     console.log(year)
//     let stateValues = {}
//     if(!year || !goal) {
//         return
//     }
//     Object.keys(data?.[year])?.forEach(state => 
//         { 
//             stateValues = {...stateValues, [data?.[year]?.[state]?.["area_name"]] : getValue(year, goal,state)}
//         });
//     return stateValues;
// }





var features = [];
features = indiaGeoJson.features;

function insertToGeoJson(state, newData){
    let index = features.findIndex(item => item?.["properties"]?.["NAME_1"]?.replace(/\s+/g, '-').toLowerCase() === state);
    features[index] = {...features[index], ...newData }
    console.dir(features);
    const da = features;

    let json = {
        "type": "FeatureCollection", "features" : [...da]}

    fs.writeFile("./indian-states2.geojson", JSON.stringify(json), ()=>{});

}

function createDataforGeoJson(){
    let states = []
    Object.keys(data?.['2019'])?.forEach(state => 
        { 
            states.indexOf(state) === -1 && states.push(state)
        });

    let stateObj= {}
    states.forEach(state => {        
        let yearObj = {}
        Object.keys(data)?.forEach(year => 
        { 
            yearObj = { ...yearObj, [year]: data?.[year]?.[state]?.["chartdata"]}
        });
        stateObj = {sdgData: yearObj}

        insertToGeoJson(state, stateObj)
    })
    console.log(states);
}




createDataforGeoJson()