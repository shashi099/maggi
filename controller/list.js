const List = require('../models/list');

module.exports.root = async(req, res) => {
    const allLists = await List.find();
    res.render('pages/main.ejs', {allLists});  
}

module.exports.Home =  async (req, res) => {  // direct Home page
    const allLists = await List.find();
    res.render('pages/main.ejs', {allLists}); 
};

module.exports.renderForm = async(req, res) => {
    res.render("pages/new.ejs");
};

module.exports.addNewItem = async(req, res) => {
    let productData = req.body.product;
        
    console.log("Product Data: ", productData);

    const newList = new List(req.body.product);
    newList.owner = req.user._id;          /* after creating a new listing inside the listing Owner id is saving */
    await newList.save();
    req.flash("success", "List added succsfully");
    res.redirect("/main");
};

//search Rooute
module.exports.search = async(req, res) => {    
    let item = req.body.kuch;
    // console.log("=>", item);
    if(!item){
        res.redirect("/main");
    }
    try {
        const allItems = await List.find({ variety: item });  // Find items where 'variety' matches the given item
        // Render the search.ejs template, passing allItems to it
        res.render("pages/search.ejs", { allItems , item });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error occurred while searching for items." });
    }
};

//
module.exports.offer = async(req, res) => {
    const allVarities = await List.distinct('variety');
    let varieties = await List.find({ variety: allVarities[0] });    
    res.render("pages/offer.ejs", { varieties });
};

module.exports.option = async (req, res) => {
    let item = await List.findById(req.params.id);

    if (!item) {
        return res.status(404).send('Item not found');
    }

    // Find all items where the variety matches the selected item's variety
    let allItems = await List.find({ variety: item.variety });
    // console.log(allItems);
    // res.send("optoin page");
    
    // Render the search.ejs template, passing allItems to it
    res.render("pages/option.ejs", { allItems ,item : item.variety});
};

module.exports.optionCategory =  async (req, res) => {
    // console.log(req.query);  // Logs the query parameters
    // console.log(req.path);  // Logs the path
    // console.log("Original URL:", req.originalUrl);  // Logs the original URL (e.g., /optionCategory?food=Pizza)
    let category = req.query.food;  // Logs the selected food value
    let allItems = await List.find({ variety: category});
    // console.log(allItems);
    // res.send("clicked!!");
    res.render("pages/option.ejs", {allItems, item: category});
};

module.exports.showPage = async (req, res) => {
    const { id } = req.params;
    let details = await List.findById(id)
    .populate('reviews')
    .populate('owner');  // Populating the reviews field
    res.render("pages/show.ejs", { details });  // Passing details to the frontend
};

module.exports.doEdit = async(req, res) => {
    let {id} = req.params;
    let datas = req.body.dets;
    const updatedItem = await List.findByIdAndUpdate(id, datas, { new: true });
    
    // Check if the item was found and updated
    if (!updatedItem) {
        return res.status(404).send('Item not found');
    }
    // Render the page with the updated details
    res.redirect(`/main/${id}`);
};


module.exports.doDelete = async(req, res) => {
    // console.log("inside");
    let{id} = req.params;
    await List.deleteOne({_id: id});
    // console.log(item);        
    res.redirect(`/main`);
};

module.exports.renderPayment = async(req, res) => {
    res.render("pages/paymentDetails.ejs");
};