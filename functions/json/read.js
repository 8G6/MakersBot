function getData(array,loc){

    let output = {}

    array.forEach(n=>{
        output[n] = require("../../"+loc+n+".json")
    })

    return output
}

module.exports = getData