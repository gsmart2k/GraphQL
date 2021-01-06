const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    id:Number,
    name:String,
    genre:String,
    author:String,
    authorId:Number
});

const Bookmodel = mongoose.model("books", bookSchema);

var newBook = new Bookmodel({
    id:1,
    name:"Why you act the way you do !",
    genre:"Motivational",
    author:"Tim Lahaye",
    authorId:2
})

// newBook.save().then((result)=>{
//     console.log("Book Saved")
// });

module.exports = Bookmodel
