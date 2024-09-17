require("dotenv").config({path: './.env'})
require('./models/database.js').connectDatabase();

const express = require('express');
const app = express();
const mongoose = require('mongoose');


const methodOverride = require('method-override')

const path = require('path'); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
const engine = require('ejs-mate');
app.engine('ejs', engine);
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
app.use(express.urlencoded({extended: true}));
const User = require('./models/user.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const session = require('express-session');
const flash = require('connect-flash');

const itemRouter = require('./routes/items.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

app.use(methodOverride("_method"));

/*
    session is use to store the temporary data for 7 days
    */
   const sessionOptions = {
    secret : "mysupersecretstring",
    resave : false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 3 * 24 * 60 * 60 * 1000,   // it will expire after 7 days
        maxAge : 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); // Ensure session is initialized here
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middleware for flash
app.use((req, res, next) => {
    res.locals.success = req.flash("success"); // we ahve added the success varible in locals so we can directly use.
    res.locals.errorMsg = req.flash("errorMsg");
    res.locals.currUser = req.user; 
    // console.log("req => ", req.user);    
    // console.log("req => ", req.locals.currUser);    
    next(); // listing post list file ke under access huaa hai flash message
})
 
// Router for item and review
app.use("/", itemRouter);
app.use("/main/:id", reviewRouter);
app.use('/', userRouter);
 
app.get('*', wrapAsync(async (req, res, next) => {
    next(new ExpressError(401, "page not found")); 
}))

// middleWares  for final output
app.use((err, req, res, next) => {
    let {status = 500, message = "something went wrong!"} = err;

    // res.render("error.ejs", {message});
    res.status(status).send(message)
})


app.listen(8000, () => {
    console.log("app is listeining at 8000");    
})