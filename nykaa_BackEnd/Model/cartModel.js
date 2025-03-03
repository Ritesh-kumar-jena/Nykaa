const mongoose=require("mongoose")
const { products } = require("./productModel")
const { users } = require("./userModel")

const cartSchema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
   product:{type:mongoose.Schema.Types.ObjectId,ref:"Products",required:true},
   quantity:{type:Number,required:true,min:1},
   productTotalPrice:{type:Number,required:true,min:0}
},{versionKey:false,timestamps: true})

const cart=mongoose.model("cart",cartSchema)

module.exports={cart}