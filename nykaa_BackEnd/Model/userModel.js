const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true},
    phone:{type:String,required:true},
    role:{
        type:String,
        required:true,
        default:"buyer",
        enum:["admin","buyer","seller"]
    }

},{versionKey:false})

const users=mongoose.model("user",userSchema)

const blacklistingSchema=mongoose.Schema({
    token:{type:String},
    reftoken:{type:String}
},{versionKey:false})

const blacklisting=mongoose.model("blacklist",blacklistingSchema)

module.exports={users,blacklisting} 