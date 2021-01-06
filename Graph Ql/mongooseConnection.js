const mongoose = require("mongoose")


mongoose.connect('mongodb://localhost/Graphql',{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open',()=>{
    console.log("Connected")
}).on('error',(error)=>{
    console.log(`There is an error: ${error} `)
});


