const express = require('express');
const mongoose = require('mongoose');
const shorturls = require('./model/urls');
const app = express();

app.set("view engine","ejs");
app.use(express.static(__dirname+"/views"));
app.use(express.urlencoded({extended: false}));

mongoose.connect('mongodb+srv://harshit:harshit@harshiturlshortner.mqkmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,useUnifiedTopology: true
});

app.get('/', async (req,res)=>{
    let shortUrl = await shorturls.find();
    res.render("index",{shortUrl: shortUrl});
    res.end();
});

app.post('/shorturl',async (req,res)=>{
 await shorturls.create({long: req.body.forurl});
 console.log("submitted");
 res.redirect('/');
});

app.get('/:shortUrl',async (req,res)=>{
 const shortUrl = await shorturls.findOne({short: req.params.shortUrl});
 if(shortUrl==null) return res.sendStatus(404);
 res.redirect(shortUrl.long);
});

app.get('/delete/:id',async (req,res)=>{
    try{
    await shorturls.findByIdAndDelete({_id: req.params.id});
    res.redirect('/');
    }catch(err){
        console.log(err);
    }
})

app.listen(process.env.PORT || 5000);