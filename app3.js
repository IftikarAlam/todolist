//jshint 14.17.0
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/fight');
const fruitSchema = new mongoose.Schema({
	name:{
		type: String,
		required :true
	},
	rating: {
		type:Number,
		min:1,
		max:10
	},
	review: String
});
const Fruit = mongoose.model("Fruit",fruitSchema);
//Fruit.collection.drop();
const mango = new Fruit({
	name:"Mango",
	rating:5,
	review:"Eleganto bherry eleganto"
});

const banana = new Fruit({
	name:"Banana",
	rating:5,
	review:"R u komedy me xoxo"
});

const apple = new Fruit({
	name:"Apple",
	rating:10,
	review:"Ooichi desu"
});
const pineapple = new Fruit({
	name:"Pineapple",
	rating:10,
	review:"Maina tumi jui"
});

Fruit.insertMany([mango,banana,apple,pineapple]).then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});
Fruit.deleteMany({ _id:"63f9b2a150247a95a109ff22",name:"Apple" }).then(function(){
    console.log("Apple data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});
Fruit.find(function(err,fruits){
	if(err)
		console.log(err);
	else{
		console.log(fruits);
		fruits.forEach(n => console.log(n.name));
	}
})

const personSchema= new mongoose.Schema({
	name: String,
	age: Number,
	FavouriteFruit : fruitSchema
})

const Person = mongoose.model("Person",personSchema);

const john = new Person({
	name:"John Cena",
	age: 50,
	FavouriteFruit : mango
})

const amy = new Person({
	name:"Amy Charles",
	age: 23,
	FavouriteFruit : banana
})
Person.insertMany([john,amy]).then(function(){
    console.log("People data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});

Person.find(function(err,people){
	if(err)
		console.log(err);
	else{
		console.log(people);
		people.forEach(n => console.log(n.name));
	}
})
