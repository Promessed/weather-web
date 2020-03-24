const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express confih
const PublicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(PublicDirPath))

app.get('',(req , res)=>{
res.render('index',{
    title:'Weather',
    name:'Prodiv'
})
})

app.get('/product',(req, res) =>{
   
    if(!req.query.search){
     return res.send({
         error: 'You must provide a search term'
     })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help',(req , res)=>{
    res.render('help',{
        message: 'If you need a help please call 119',
        title: 'HeLp',
        name:'prodiv'
    })
})
app.get('/about',(req, res)=>{
res.render('about',{
    title:'About Me',
    name:'Prodiv'
})

})




app.get('/weather',(req , res)=>{
    
    if(!req.query.search){
       return res.send({
            error: 'You must provide an address'
        })
    } 
    geocode(req.query.search,(error,{latitude, longitude, location}={})=>{
         if(error){
         return  res.send({
                 error
             })
         }
    forecast(latitude, longitude,(error, forecastData)=>{
        if (error){
          return  res.send({
                 error
            })
        }
     
        res.send({
            location,
            Forecast : forecastData,
            Address : req.query.search
        })
    })

    })



    
   
})






app.get('/help/*',(req , res)=>{
  res.render('404',{
      title : 'Help page',
      message:'Help article not found',
      name:'prodiv'
  })
})


app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        message:'Page not found',
        name:'Prodiv'
    })
})


app.listen(3000, ()=>{
    console.log('the app is up running on 3000')
})

