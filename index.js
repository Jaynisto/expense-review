const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const StoringInformation = require("./factoryFunction.js");
const db = require("./database/databaseConnectionString.js");
const databaseManipulation = require("./database/databaseFactoryFunction.js");
const ShortUniqueId = require("short-unique-id");

//Express instance
let app = express()
const uniqueId = new ShortUniqueId({ length: 10 });

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
app.get('/', async (req,res)=>{
    const category = await sendData.givenCategories();
    const expenseInfo = await sendData.expenseInformation()
    res.render("index", {
        category,
        expenseInfo
    })
});

app.post('/addCatagory', async (req,res)=>{
    const category = req.body.category;
    const day = req.body.date;
    const cost = req.body.cost;

    if(category && day){
        await sendData.storingExpense(category,day,cost)
        req.flash('success', 'Category Entry Added');
    }
    else{
        req.flash('error', 'Select Category & Date');
    }
    res.redirect("/")
})

app.get('/registration', (req,res)=>{
    res.render("registration")
})

app.post('/registration', async (req,res)=>{
    let {username} = req.body;

    if(username){
        const code = uniqueId();
        username = username.toLowerCase();
        const checking = await sendData.checkingExistingUsers(username)
        if(checking != 0){
            req.flash('error', username + ' Already Exists.')   
        }
        else{
            await sendData.storingUserInformation(username, code);
            req.flash('success', 'User was Added -- use the provide code to Log in : ' + code);
        }   
    }
    else{
        req.flash('error', 'No Username Provided')

    }
     
    res.render("registration")
})


















// app.get('/login', (req,res)=>{
//     res.render("login")
// })

// app.post('/login',async (req,res)=>{
//     let userName = req.body.firstname
//     let checkingUsername = await sendData.getUserName(userName)
//     if(checkingUsername){
//         res.redirect(`/catagory/${userName}`)
//     }else{
//         res.redirect("index")
//     }
    
// })

// app.get('/catagory/:name', (req,res)=>{
//     res.render("catagory")
// })


// app.post('/catagory/:name',async (req,res)=>{
//     const user = req.params.name
//     await sendData.storingExpenseInfo(user, req.body.catagory, req.body.date, req.body.cost)

//     res.render("catagory")
// })

// app.get('/users', async(req,res)=>{
//     let storedNames = await sendData.gettingStoredNames()
// //    console.log(storedNames)
//     res.render("users", {
//         storedNames,
//     })

// })

// app.get('/expense', async (req,res)=>{
//     res.render("expense")
// })
// app.post('/user', async (req,res)=>{
//     await sendData.storingFirstName(req.body.firstname, req.body.lastname, req.body.email)
//     res.redirect("/")
// })

// app.post('/catagory', async (req,res)=>{

//     console.log(req.body)
//     res.redirect("catagory")
// })


//Starting the server on PORT 2001
let PORT = process.env.PORT || 2001 ;
app.listen(PORT,(req,res)=>{
    console.log("App Started On Port " + PORT + " .....")
})