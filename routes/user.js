const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const userController = require('../controller/user.js');


// signup Route 
router.route("/signup")
.get( userController.renderSignup)
.post( wrapAsync(userController.signup));


// main page Route after log
router.route("/login")
.get(userController.renderLogin)
.post(
    passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
}),
userController.login);

// logout
router.get("/logout", async (req, res, next) => {
    req.logout( (err) => {
        if(err){ return next(err)};
        req.flash("success", "Logout Successfully");
        res.redirect("/main");
    } )
})

module.exports = router;