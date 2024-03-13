const mongoose = require('mongoose')
const {Product}  = require('../models/Product')

exports.Home = (req, res) => {
    res.send("HII Vasu welcome to routes page");
  }

exports.CreateProduct = async (req, res) => {
    try {
      if (!req.body.name) {
        return res.status(422).json({ msg: "name is required" });
      }
      if (!req.body.description) {
        return res.status(422).json({ msg: "description is required" });
      }
      if (!req.body.price) {
        return res.status(422).json({ msg: "price is required" });
      }
      if (!req.body.quantity) {
        return res.status(422).json({ msg: "quantity is required" });
      }
      if (!req.body.category) {
        return res.status(422).json({ msg: "category is required" });
      } else if (
        !Product.schema.path("category").enumValues.includes(req.body.category)
      ) {
        return res
          .status(422)
          .json({
            msg: `category must be of options : ${Product.schema
              .path("category")
              .enumValues.join(", ")}`,
          });
      }
      const newProd = await Product.create(req.body);
      return res
        .status(201)
        .json({ msg: "product created succesfully", data: newProd });
    } catch (err) {
      return res.status(500).json({ err: "Product did not created succesfully" });
    }
  }
exports.getAllProducts = async (req,res) => {
    try{
     let getAllProducts = await Product.find()
     return res.status(200).json({msg:"Products displayed succesfully",data:getAllProducts})
    }catch (err) {
    return res.status(500).json({ err: "Product failed to fetch " });
  }
}

exports.getProductById = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(422).json({err:"Parameter is not a valid id"})
        }
     let singleProd = await Product.findById(req.params.id)
     if(!singleProd){
        return res.status(404).json({err:"Product didnot created"})
     }
     return res.status(200).json({msg:"singleProd displayed succesfully",data:singleProd})
    }catch (err) {
    return res.status(500).json({ err: "singleProd failed to fetch " });
  }
}

exports.UpdateProduct = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(422).json({err:"Parameter is not a valid id"})
        }

        if(!await Product.exists({_id:req.params.id})){
            return res.status(404).json({err:"Product didnot created"})
        }
     let updateProd = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
     
     return res.status(200).json({msg:"product updated  succesfully",data:updateProd})
    }catch (err) {
    return res.status(500).json({ err: "Product failed to Update " });
  }
}

exports.DeleteProd = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: "Parameter is not a valid id" });
        }

        if (!await Product.exists({ _id: req.params.id })) {
            return res.status(404).json({ err: "Product not found" });
        }

        await Product.findByIdAndDelete(req.params.id);

        let remainingProducts = await Product.find();

        return res.status(200).json({
            msg: "Product deleted successfully",
            data: remainingProducts
        });
    } catch (err) {
        return res.status(500).json({ err: "Product failed to delete" });
    }
}