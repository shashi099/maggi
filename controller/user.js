const User = require('../models/user');


module.exports.renderSignup = (req, res) => {
    res.render("user/signup.ejs");
};

module.exports.signup = async (req, res) => {
    let { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    // console.log(registeredUser);
    req.flash("success", "User SigIn Succesfully");
    res.redirect("/main");
};

module.exports.renderLogin = (req, res) => {
    res.render("user/signup.ejs");
};

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/main');
};