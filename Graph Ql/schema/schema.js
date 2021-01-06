const graphql = require("graphql")
const _ = require("lodash")
const book = require("../booksSchema")
const authorDb = require("../authorSchema")
const { findOneAndUpdate } = require("../booksSchema")
const Bookmodel = require("../booksSchema")





const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID,GraphQLInt, GraphQLList,GraphQLNonNull} = graphql


var state = ""
var res = ""

const bookTypes = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        authorId:{type:GraphQLID},
        author:{
            type:authorTypes,
            resolve(parent,args){
          return  authorDb.findOne({id:parent.authorId})
            }
        }
    })
}) 

const bookAvailable = new GraphQLObjectType({
    name:'Books',
    fields:()=>({
        name:{type:GraphQLList},
        id:{type:GraphQLID}
    })
})

const authorTypes = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(bookTypes),
            resolve(parent,args){
                console.log(parent)
                return Bookmodel.find({authorId:parent.id})
            }

        }
       
    })
})

const editedType = new GraphQLObjectType({

    name:'Edited',
    fields:()=>({
        name:{type:GraphQLString},
        newname:{type:GraphQLString}
    })

})


const rootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:bookTypes,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
               return Bookmodel.findOne({id:args.id})
            }       
        },
        author:{
            type:authorTypes,
            args:{id:{type:GraphQLInt}},
            resolve(parent,args){
              return  authorDb.findOne({id:args.id})
                }
        },
        Books:{
            type:new GraphQLList(bookTypes),
           resolve(parent,args){
                return Bookmodel.find({})
           } 
        },
        Authors:{
            type:new GraphQLList(authorTypes),
            resolve(parent,args){
                return authorDb.find({})
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name:'mutation',
    fields:{
        addAuthor:{
        type:authorTypes,
        args:({
            id:{type:new GraphQLNonNull(GraphQLID)},
            name:{type:new GraphQLNonNull(GraphQLString)},
            age:{type:new GraphQLNonNull(GraphQLID)}
        }),
        resolve(parent, args){
            let auth = new authorDb({
                id:args.id,
                name:args.name,
                age:args.age       
            })
            auth.save().then((args)=>{
                console.log(args.name, args.age)
                
            })
            return args
        }
        },
        editAuthor:{
            type:editedType,
            args:({
                name:{type:GraphQLString},
                newname:{type:GraphQLString},
            }),
            resolve(parent,args){
            authorDb.findOneAndUpdate({name:args.name, name:args.newname}).then((result)=>{
                
            })
            return args
            }
        },
        deleteAuthor:{
            type:authorTypes,
            args:({
                name:{type:GraphQLString}
            }),
            resolve(parent,args){
                return authorDb.findOneAndDelete({name:args.name})
            }
        },
        addBook:{
            type:bookTypes,
            args:({
                id:{type:new GraphQLNonNull(GraphQLID)},
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                author:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            }),
            resolve(parent,args){
                let bookInput = new Bookmodel({
                    id:args.id,
                    name:args.name,
                    genre:args.genre,
                    author:args.author,
                    authorId:args.authorId
                })
               return bookInput.save()
            }
        }        
        
        }
        
})

module.exports = new GraphQLSchema({
    query:rootQuery,
    mutation:Mutation   
})