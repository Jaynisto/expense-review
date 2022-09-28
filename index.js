const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const StoringInformation = require("./factoryFunction.js")

//Express instance
let app = express()

//Factory function instance
let storage = StoringInformation();

//Configuring Handlebars
const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.use(express.static("public"));

//Body parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Session
app.use(session({
    secret : 'codeforgeek',
    resave: true,
    saveUninitialized: true
}));

// Flash
app.use(flash());

//Lets Render The Index page to see Whether handlebars are configured
app.get('/', (req,res)=>{
    res.render("index")
});

app.get('/catagory', (req,res)=>{
    res.render("catagory")
})

app.get('/expense', (req,res)=>{
    res.render("expense")
})
app.post('/user', (req,res)=>{
    storage.storingFirstNames(req.body.firstname)
    const storedFirst = storage.storedFirstNames()
    storage.storingLastNames(req.body.lastname)
    const storedLast = storage.storedLastNames()
    storage.storingUserEmails(req.body.email)
    const storedEmails = storage.storedUserEmails()

    console.log(storedFirst)
    console.log(storedLast)
    console.log(storedEmails)

    res.redirect("/")
})
//Starting the server on PORT 2001
let PORT = process.env.PORT || 2001 ;
app.listen(PORT,(req,res)=>{
    console.log("App Started On Port " + PORT + " .....")
})