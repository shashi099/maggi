const mongoose = require("mongoose")

exports.connectDatabase= async()=>{
  try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connection Established")
  }catch(error){
        console.log(error.message)
  }
}