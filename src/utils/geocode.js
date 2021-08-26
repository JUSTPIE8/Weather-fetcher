const request=require('request');


const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam9objkiLCJhIjoiY2tzcHltOXd4MDdmdDJ4cjRqc2kyOWM5OCJ9.I38KDhZSB0tUrHVvJ_2z4w&limit=1`
    
    request({
        url:url,json:true
    },
    (error,response)=>{
    if(error){
        callback('Unable to connect to location services',undefined);
    
    }else if(response.body.features.length===0){
        callback('Unable to find location.Try another location ',undefined);
    }else{
        callback(undefined,{
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            place_name:response.body.features[0].place_name,
    
        })
    }
    })
    
    }


    module.exports=geocode;