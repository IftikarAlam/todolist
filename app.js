//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const app = express();

var d =[], defaultItems;

var defaultItems=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model("Item", itemsSchema);




async function insertD() {

    Item.deleteMany();
    const item1 = new Item({
        name: "Eat"
    });

    const item2 = new Item({
        name: "Learn"
    });

    const item3 = new Item({
        name: "Sleep"
    });


    defaultItems.push(item1, item2, item3);
    console.log(defaultItems);
    Item.insertMany(defaultItems);


    await Data();
}
async function Data(){
	
	const res = await Item.find({},{'name':1,_id:0});
    console.log(res);
    res.forEach(n => d.push(n.name));
    console.log(d);
	//deleteA();	
}


const workItems = [];

    async function init() {
        console.log(defaultItems.length);
        if (defaultItems.length==0)
            await insertD();
    }

init();


app.get("/", function(req, res) {
    res.render("list", { listTitle: "Today", newListItems: d });

});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;
    const itemN = new Item({
            name: itemName
        });
    itemN.save();
    
});

app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function(req, res) {
    res.render("about");
});


app.listen(3000, function(res, req) {
    console.log('Server on');
});