const List = require('../models/list.js');
const Review = require('../models/review.js');

module.exports.setReview = async (req, res) => {
      
    let list = await List.findById(req.params.id);
    console.log(req.body);
    // console.log(list.reviews);
        
    if (!list) {
      req.flash("error", "Listing not found");
      return res.redirect('/main');
    }
  
    let newReview = await new Review(req.body.review);
    await newReview.save();
    // console.log(newReview);
    await list.reviews.push(newReview._id);
    
    await list.save();
    // console.log(list);
    req.flash("success", "Review Added successfully");
    
    res.redirect(`/main/${req.params.id}`);
  }