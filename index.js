const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const StoringInformation = require("./factoryFunction.js");
const db = require("./database/databaseConnectionString.js");
const databaseManipulation = require("./database/databaseFactoryFunction.js");

//Express instance
let app = express()

//Factory function instance
let storage = StoringInformation();

//Db factory function
let sendData = databaseManipulation(db)

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

app.get('/users', async(req,res)=>{
    let storedNames = await sendData.gettingStoredNames()
   console.log(storedNames)
    res.render("users", {
        storedNames,
    })

})

app.get('/expense/:names', async (req,res)=>{
    res.render("expense")
})
app.post('/user', async (req,res)=>{
    await sendData.storingFirstName(req.body.firstname, req.body.lastname, req.body.email)
    // const storedFirst = storage.storedFirstNames()
    // await sendData.storingFirstName(req.body.lastname)
    // const storedLast = storage.storedLastNames()
    // await sendData.storingFirstName(req.body.email)
    // const storedEmails = storage.storedUserEmails()

    // console.log(storedFirst)
    // console.log(storedLast)
    // console.log(storedEmails)

    res.redirect("/")
})

app.post('/catagory', (req,res)=>{
    storage.storingTypeCatagory(req.body.catagory)
    const type = storage.availableCatagory()
    storage.storingTheDate(req.body.date)
    const date = storage.availableDates()
    storage.storingTheCatagoryCost(req.body.cost)
    const cost = storage.storedCost()
    // console.log(type)
    // console.log(date)
    // console.log(cost)
    res.redirect("catagory")
})


//Starting the server on PORT 2001
let PORT = process.env.PORT || 2001 ;
app.listen(PORT,(req,res)=>{
    console.log("App Started On Port " + PORT + " .....")
})