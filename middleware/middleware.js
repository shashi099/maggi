const List = require('../models/list');
const Review = require('../models/review');

module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    const list = await List.findById(id);
    if(!list.owner.equals(req.user._id)){
        req.flash("errorMsg", "You are not owner");
        return res.redirect(`/main/${id}`);
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    console.log("req",req.user);
    if (!req.isAuthenticated()) {
        req.flash("errorMsg", "You must Logged In");
        return res.redirect('/login');
    }
    next();
}

module.exports.deleteReview = async (req, res, next) => {
    let {id} = req.params;
    let item = await List.findById(id);
    let userIds = await item.reviews;
    // console.log(userIds);
    await Review.deleteMany({ _id: { $in: userIds } });
    // console.log(deleteed);
    next();
};

