//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");
const itemsSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemsSchema);

doAll();

async function doAll() {
    await deleteAllItems();
    await insertItems();
    getDefaultItems();
}

async function deleteAllItems() {
  const deletedItems = await Item.deleteMany();
  if (deletedItems.acknowledged == true) {
    console.log("Data refreshed"); // Success
  }
}

async function insertItems() {
  const item1 = new Item({
    name: "Eat",
  });
  const item2 = new Item({
    name: "Learn",
  });
  const item3 = new Item({
    name: "Sleep",
  });
  const defaultItems = [item1, item2, item3];
  //console.log("default items = " + defaultItems);

  Item.insertMany(defaultItems)
}

async function getDefaultItems() {
  const workItems = [];
  const res = await Item.find({},{'name':1,_id:0});
  console.log(res);
}

// app.get("/", function (req, res) {
//   //res.render("list", {listTitle: "Today", newListItems: Item.find({})});
// });

// Item.find({})
//   .then((result) => {
//     console.log(result.name);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// console.log(Item.find({}, { name: 1, _id: 0 }));
// app.post("/", function (req, res) {
//   const item = req.body.newItem;

//   if (req.body.list === "Work") {
//     workItems.push(item);
//     res.redirect("/work");
//   } else {
//     items.push(item);
//     res.redirect("/");
//   }
// });

// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work List", newListItems: workItems });
// });

// app.get("/about", function (req, res) {
//   res.render("about");
// });

//
// app.listen(5000, function(res, req) {
//     console.log('Server on');
// });
