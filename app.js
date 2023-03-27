//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

let d = [], defaultItems = [];
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemsSchema);

async function insertDefaultItems() {
  const items = [{ name: "Eat" }, { name: "Learn" }, { name: "Sleep" }];

  defaultItems.push(items);
  console.log(defaultItems);
  Item.insertMany(defaultItems);

  await Data();
}
async function Data() {
  d = [];
  const res = await Item.find({}, { name: 1, _id: 0 });
  console.log(res);
  res.forEach((n) => d.push(n));

  //deleteA();
}

const workItems = [];

async function init() {
  const items = await Item.find({});
  console.log("Items in the DB = " + items.length);
  if (items.length === 0) {
    await insertDefaultItems();
  } else {
    await Data();
  }
}

// Talking to the moon
init();

app.get("/", function (req, res) {
  // init();
  console.log(d);
  res.render("list", { listTitle: "Today", newListItems: d });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const itemN = new Item({
    name: itemName,
  });
  itemN.save();
  //d.push(itemN.name);
  init();
  res.redirect("/");
});

app.post("/delete", function (res, req) {
  console.log("My name is = " + res.body.name);
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(6969, function (res, req) {
  //init();
  console.log("Server on");
});
