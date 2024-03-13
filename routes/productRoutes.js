const express = require("express");
const router = express.Router();
// const { Product } = require("../models/Product");
// const mongoose = require("mongoose");
const {Home,CreateProduct,getAllProducts,getProductById,UpdateProduct,DeleteProd} = require('../controllers/productControllers')
router.get("/",Home );

router.post("/products", CreateProduct);

router.get('/products',getAllProducts)

router.get('/products/:id',getProductById)
router.put('/products/:id',UpdateProduct)

router.delete('/products/:id', DeleteProd);


module.exports = router;
