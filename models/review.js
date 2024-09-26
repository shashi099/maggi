const mongoose = require('mongoose');
const {Schema} = mongoose;

// const MONGO_URL = "mongodb://127.0.0.1:27017/maggi";

// main()
//     .then(() => {
//         // console.log("Connection MONGODB");    
//     })
//     .catch( (err) => {
//         console.log(err);    
//     });

// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

const reviewSchema = new Schema({
    rating: Number,
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now  // sets the current date by default
    },
    author: {
        type: String,
     }
});


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;