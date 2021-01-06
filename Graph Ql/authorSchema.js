const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const authorSchema = new Schema({
    id:Number,
    name:String,
    age:Number
});

const Authormodel = mongoose.model("authors", authorSchema);

var val = new Authormodel({
    id:1,
    name:"Jide Benson",
    age:90
})

// val.save().then((result)=>{
//     console.log(result)
//     console.log("Done")
// })

module.exports = Authormodel