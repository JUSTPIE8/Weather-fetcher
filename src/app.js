const path = require('path');//for path manipulation
const express = require('express')
const hbs = require('hbs');
const fetchweather=require('./utils/fetchweather')
const geocode=require('./utils/geocode')


//console.log(__dirname)//current working directory
//console.log(path.join(__dirname,'../public'))
const publicpath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views')//required when we change views path as express only recognizes views folder for hbs file
const partialpath = path.join(__dirname, '../templates/partials');//partials refer to reusable components like header footer

//required:intializing function
const app = express()
/////////////////////////////


app.set('view engine', 'hbs')//setting view engine  same as it  no change  
app.set('views', viewspath)//only when views path has changeed
hbs.registerPartials(partialpath)
app.use(express.static(publicpath))//for public folder 


//for getting request and response at various routes
//for rendering templates at views
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather - app',
        name: 'sandesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page'
    })
})


app.get('/help', (req, res) => {
    res.send('hello express at help')
})

app.get('/weather', (req, res) => {
    if (!req.query.searchterm) {//if no location provided
        return res.send('No location to search please put location')//return stops the program execution so only response is sent
    }
    //calling to fetchweather and geocode api located in another folder 

        geocode(req.query.searchterm, (error, {latitude,longitude,place_name}={}) => {
        
            if (error) {
                return res.send({error})
            }
            fetchweather(latitude,longitude, (error, forecastresponse) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                   
                   // forecast:forecastresponse.body.current,
                    forecast:`${forecastresponse.body.current.weather_descriptions[0]}.It is ${forecastresponse.body.current.temperature} degree outside`,
                    location:place_name
                
                })
            
            })
        })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'NO articles found '
    })
})

app.get('*', (req, res) => {//wildcard refers to all routes that doesnot exist
    res.render('404', {
        title: '404',
        msg: 'Page not found'
    })
})


//starting server
app.listen(3000, () => {
    console.log('server is up on port 3000')
})
