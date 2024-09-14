const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
 

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;

// const user1 = new User({
//     username: "aman",
//     email: "aman@yahoo.com",
//     password: "23",
//     location: "bhopal",
// })

// user1.save();
// console.log( User.find({}));