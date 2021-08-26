const request = require("request");

const fetchweather=(latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=3669246a712634f46b7071d1a455e9d3&query=${latitude},${longitude}&units=f`
    
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('CANNOT ACCESS WEATHER DUE TO SLOW OR NO INTERNET CONNECTION',undefined);
    
        }else if(response.body.info){
            callback(response.body.info,undefined);
        }else{
            callback(undefined,response)
        }
    })
    
    }
    
    module.exports=fetchweather;