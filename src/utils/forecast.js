const request = require('request')

const forecast = (latitude, longitude, callback)=>{
const url = 'https://api.darksky.net/forecast/74786ee998a4166a779a9fd6510e2796/'+ latitude +','+ longitude
request({url , json: true}, (error, {body})=>{

    if(error){
     callback('Unable to connect',undefined)
    }else if(body.error){
     callback('Unable to find location',undefined)
    }else{
     callback(undefined, body.daily.data[0].summary+'There is a '+body.currently.precipProbability+ '% chance of rain,'+body.currently.temperature + ' degrees out there..')
    
    }

})
}
module.exports=forecast