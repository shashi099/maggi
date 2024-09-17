const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, deleteReview, isOwner }= require("../middleware/middleware.js");
router.use(express.urlencoded({ extended: true }));
const listConstroller = require('../controller/list.js');

router.get("/", listConstroller.root);

router.get('/main', listConstroller.Home);

// for seller 
// add new List in DB
router.get('/main/new', listConstroller.renderForm);

//new.ejs <- calling
// Router addnew List
router.post('/main/addList', 
    isLoggedIn, 
    listConstroller.addNewItem);

// Search Route
router.post('/main/search', isLoggedIn, listConstroller.search);


// offer Route
router.get("/main/offers",isLoggedIn, listConstroller.offer);

// Top Brand Route
// option
router.get('/main/:id/option',isLoggedIn, wrapAsync(
    listConstroller.option
));

// option.ejs  <-- category
// main/option
router.get("/optionCategory",isLoggedIn, listConstroller.optionCategory);



// information page Route
// show Route
router.get('/main/:id', wrapAsync(listConstroller.showPage));


// Info -> show.ejs call aayega
// Edit Route
router.post('/main/:id/edit',isOwner, wrapAsync(
    listConstroller.doEdit
));

// Delete Route
//info                            middleware for deleting review from review database
// router.use('/main/:id/delete', )
// after that delete item from list
router.delete('/main/:id/delete',
    // isOwner,
    deleteReview, 
    wrapAsync(
    listConstroller.doDelete
));

// Payment Details Route
router.get('/payment_details',isLoggedIn, listConstroller.renderPayment);



module.exports = router;