const mongoose = require('mongoose'); // 
const List = require('../models/list.js'); // our collection from mongoDB
const initData = require('./data.js').data;  // here we are fatching the datas from the data file 

// const MONGO_URL = "mongodb://127.0.0.1:27017/maggi";

// main()
//     .then(() => {
//         console.log("Connection MONGODB");    
//     })
//     .catch( (err) => {
//         console.log(err);    
//     });

// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

let datas = async () => {  // Insering the datas in the mongoDB
    List.deleteMany({});
    console.log(initData);  // Log data to inspect it
    await List.insertMany(initData);
    // console.log(List.find());  
    console.log("Data was initialized");    
}

datas();