const request= require('postman-request');

const forecast=(latitude,longitude,callback)=>{
    
 const url = 'http://api.weatherstack.com/current?access_key=8eb829bf7f883def2a3659a9934090f6&query=' +latitude+ ',' + longitude+'&units=f';

 request({url,json:true},(error,{body})=>{
    if(error){
        callback('unable to connect to weather api',undefined)
    }
    else if(body.error){
        callback('unable to find location',undefined)
    }
    else{
        callback(undefined,`${body.current.weather_descriptions[0]} .It is currently ${body.current.temperature} degrees out.It feels like ${body.current.feelslike} out`);
    }
 })

}

module.exports=forecast;