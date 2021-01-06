const express = require("express");
const {graphqlHTTP} = require('express-graphql')
const schema = require("./schema/schema");
const mong = require("./mongooseConnection")
const Book = require("./booksSchema")
const app = express();



app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.get("/home",(res,req)=>{
    res.send("Done")
})


app.listen(4000, ()=>{
    console.log("app running on port 4000")
});
