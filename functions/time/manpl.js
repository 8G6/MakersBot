function to24(time){
    let d=0
    let temp = time
    try{
        a.time = time.split(time.match(" ") ? " " : time.match(":") ? ":" : ",")
        time=time.map(n=>parseInt(n))
    }
    catch(e){}

    h=time[0]
    m=time[1]

    if(temp.match("PM")){
        h+=12
        if(h>23){
            h-=24
            d=1
        }

        return [d,h,m]
    }
    
    return [d,h,m]
    
}
function toUTC(a,b){

    let {keys} = Object

    let  {files} = require("../../datasets/timezones/folder.info")
    const getData = require("../json/read")
    let {std} = require("./name")
    let timezones  = getData(files,"./datasets/timezones/")
    let codes      = getData(["codes"],"datasets/country/")["codes"]
    
    a.time = to24(b.time)
    b.time = to24(b.time)

    files.forEach(n=>{
        let key = keys(timezones[n])
        key.forEach(m=>{
            if(m.toLowerCase().match(country.toLowerCase())){
                console.log(timezones[n][m]["UTC"][0],n,m)
                time[1] =  Math.abs(time[1]-timezones[n][m]["UTC"][0])
                time[2] =  Math.abs(time[2]-(timezones[n][m]["UTC"][1] ? timezones[n][m]["UTC"][1] : 0))
            }
        })
    })


    if(time[2]>59){
        time[2]-=60
        time[1]++
    }

    if(time[1]>23){
        time[1]-=24
        time[0]++
    }
    console.log(time)
}

toUTC("1:26AM",'China Standard Time')

// keys(codes).forEach(n=>{
//     keys(codes[n]).forEach(m=>{
//         if(country==codes[n][m]){
//             country = n
//             console.log(codes[n])
//         }
//     })
// })