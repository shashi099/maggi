const mongoose = require('mongoose');
// const Review = require('./models/review');
// const User = require('./models/user');

const listSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,
    location:{
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        maxLength: 25,
    },
    image: {
        type: String,
        default: "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg",
        set: (v) => v === "" 
        ? "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg" 
        : v, 
    },
    variety: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'  // Refers to the Review schema
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});




const List = mongoose.model("List", listSchema); // inserting into mongoDB

module.exports = List; // export to use it in another folder / file


/*
title: "Authentic Mexican Tacos",
        price: 95,
        location: "Phoenix, AZ",
        subtitle: "Spicy and Sweet",
        ingredients: ["Pork", "Pineapple", "Onion", "Cilantro", "Tortilla"],
        image: "tacos_al_pastor.jpg",
        discount: 14,
        variety: "
*/


// 👇 here the schema with discount..


// const listSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     discountPercentage: {
//         type: Number,
//         default: 0  // Default discount is 0%
//     },
//     location:{
//         type: String,
//         required: true
//     },
//     subtitle: {
//         type: String,
//         maxLength: 25,
//     },
//     image: {
//         type: String,
//         default: "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg",
//         set: (v) => v === "" 
//         ? "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg" 
//         : v, 
//     },
//     variety: String,
//     reviews: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Review'  // Refers to the Review schema
//     }],
// });

// // Create a virtual field for discounted price
// listSchema.virtual('discountedPrice').get(function() {
//     if (this.discountPercentage && this.price) {
//         return this.price - (this.price * this.discountPercentage / 100);
//     }
//     return this.price;  // No discount applied if discountPercentage is 0 or not set
// });

// const List = mongoose.model('List', listSchema);

// module.exports = List;
