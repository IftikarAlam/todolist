//jshint 14.17.0
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/itemNB');
const itemSchema = new mongoose.Schema({
	name:{
		type: String,
	}
});
const Item = mongoose.model("Item",fruitSchema);

const item1 =  new Item({
	name:"Eat"
});

const item2 =  new Item({
	name:"Learn"
});

const item3 =  new Item({
	name:"Sleep"
});

Item.insertMany([item1,item2,item3]).then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});

Item.find(function(err,items){
	if(err)
		console.log(err);
	else{
		console.log(items);
		items.forEach(n => console.log(n.name));
	}
})

