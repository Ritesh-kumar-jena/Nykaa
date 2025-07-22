const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    apply:{type:String,required:true},
    type:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true}
},{versionKey:false})

const products=mongoose.model("Products",productSchema)

module.exports={products}
