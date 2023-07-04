const data2018 = require( './2018.json' )
const data2019 = require( './2019.json' )
const data2020 = require( './2020.json' )
const data= require('./sdg-data.json')
const indiaGeoJson = require('./indian-states.json')
var fs = require('fs');


//script file to modify json files to a required format. run using `node data-

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






var features = [];
features = indiaGeoJson.features;

function insertToGeoJson(state, newData){
    let index = features.findIndex(item => item?.["properties"]?.["NAME_1"]?.replace(/\s+/g, '-').toLowerCase() === state);
    if(features[index]?.["properties"]){
        features[index]["properties"] = {...features[index]?.["properties"], ...newData };
    }
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

    states.forEach(state => {
        let stateObj= {}             
        Object.keys(data)?.forEach(year => 
        {   let yearObj = {}
            data?.[year]?.[state]?.["chartdata"].forEach(item => {
                yearObj[item.name] = item.value 

            });  
            stateObj = { ...stateObj, [year]: yearObj}
        });
         
        stateObj = {sdgData: stateObj}
        console.log(state,stateObj);

        insertToGeoJson(state, stateObj)
    })
}

// createDataforGeoJson()


// var features = [];
// features = indiaGeoJson.features;

// function insertToGeoJson(state, newData,year){
//     let index = features.findIndex(item => item?.["properties"]?.["NAME_1"]?.replace(/\s+/g, '-').toLowerCase() === state);
//     if(features[index]?.["properties"]){
//         features[index]["properties"] = {...features[index]?.["properties"], ...newData };
//     }
//     console.dir(features);
//     const da = features;

//     let json = {
//         "type": "FeatureCollection", "features" : [...da]}

//     fs.writeFile(`./indian-states${year}mock.geojson`, JSON.stringify(json), ()=>{});

// }

// function createDataforGeoJson(){
//     let states = []
//     Object.keys(data?.['2019'])?.forEach(state => 
//         { 
//             states.indexOf(state) === -1 && states.push(state)
//         });

//     let stateObj= {}
    
//     const years = ["2018"]
//     years.forEach((year)=>{
//         states.forEach(state => {
//             const goalsObj = {};
//             // data?.[year]?.[state]?.["chartdata"].forEach(item => {
//             //     goalsObj[item.name] = item.value 

//             // });      
//             // stateObj = {sdgData: goalsObj}
//             stateObj = {sdgData: data?.[year]?.[state]?.["chartdata"]?.[16]?.['value'] }
//             console.log(stateObj)
//             insertToGeoJson(state, stateObj,year)
//         })
//     })
    
// }




// createDataforGeoJson()