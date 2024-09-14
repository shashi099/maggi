const { log } = require('console');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path'); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));


const MONGO_URL = "mongodb://127.0.0.1:27017/maggi";
main()
    .then(() => {
        console.log("Connection MONGODB");    
    })
    .catch( (err) => {
        console.log(err);    
    });
    
async function main(){
    await mongoose.connect(MONGO_URL);
} 

app.get('/home', (req ,res) => {
    let item = "shashi";
    res.render("home.ejs", {item});
})

app.post('/signup', async (req ,res) => {
    // console.log(req.params);
    // console.log(req);
    
    console.log(req.body);
    let {email , username, password}  = req.body;
    // let datas = req.body;
    // res.send("hiii");
    res.render("login.ejs", {email, username});
})

app.listen(8000, async () => {
    console.log("app is listeniing");    
})