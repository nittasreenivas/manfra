const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    category:{
        type:String,
        required:true,
        enum:["Electonics","Food","Clothing","Books"]
    }
},{
    timestamps:true
})

exports.Product = mongoose.model('Product',productSchema)