const data2018 = require( './2018.json' )
const data2019 = require( './2019.json' )
const data2020 = require( './2020.json' )
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


formatSdgData();