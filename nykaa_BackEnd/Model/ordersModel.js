const mongoose=require("mongoose")
const { users } = require("./userModel")
const { products } = require("./productModel")

const ordersSchema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    items:[{
        product:{type:mongoose.Schema.Types.ObjectId,ref:"Products",required:true},
        quantity:{type:Number,required:true,min:1},
        productTotalPrice:{type:Number,required:true,min:0}
    }],
    totalOrderPrice:{type:Number,required:true,min:0},
    status:{
        type:String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default:"pending"
    },
    address:{type:String,required:true}
   
},{versionKey:false,timestamps: true})

const order=mongoose.model("order",ordersSchema)

module.exports={order}
