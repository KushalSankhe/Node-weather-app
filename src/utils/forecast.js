const request =require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=55e727a07f2112eff874363b6361af88&query='+latitude+','+longitude+'&units=m'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the service .Please check your internet',undefined)
        }
        else if(body.error){
            callback('Unable to find the location',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature +" degrees out.It feels like "+body.current.feelslike+" degrees out.")
        }
    })
}


 module.exports=forecast;