const path= require('path');
const express= require('express');
const hbs=require('hbs');

const geocde=require('./utils/geocode');
const forecast=require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname,'../public'));

const app=express();

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');


//setup handlebar engines and view locations
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));



app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Asfa Sarah'
    });
});


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Asfa Sarah'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText: 'This is some helpful text',
        name:'Asfa Sarah'
    });
});

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Andrew',
//     },
//     {
//         name:'Sarah'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Application</h1>');
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:'Please provide a address term'
        })
    }

    geocde(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

        })

    })
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
//app.com
//app.com/help
//app.com/about
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Asfa Sarah',
        errorMessage:'Help article not found'
    })
});


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Asfa Sarah',
        errorMessage:'Page Not Found'
    });
});


app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});