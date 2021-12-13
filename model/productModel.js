const Joi = require('joi');
const mongoose = require('mongoose');


// SCHEMA FOR CREATING PRODUCT
const productSchema = new mongoose.Schema({
    name:{type:String,require:true,max:(50),min:(5)},
    description:{type:String,require:true,max:(50),min:(5)},
    catergory:{type:String,require:true,max:(50),min:(5)},
    price: {type:Number,require:true},
    ratings:{type:Number},
    numReviews:{type:Number},
    Image:{type:String,require:true}
});

function validateProduct(product) {
    const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(50).required(),
    catergory: Joi.string().min(5).max(50).required(),
    price: Joi.number().required(),
    });

    return schema.validate(product); }
    
    const Product = mongoose.model ('Product',productSchema);
    
    
    exports.Product = Product;
    exports.validate = validateProduct;
    exports.productSchema = productSchema;
    