const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');




//SCHEMA FOR  NEW USER
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength:5, maxlength:50 },
    email: {type: String,required:true, minlength:5, maxlength:225},
    password: {type: String,required:true, minlength:10, maxlength:225},
    // shoppingCart:{ type: [productSchema], default:[]},
    });

    //JSONWEBTOKEN METHOD FOR USER SCHEMA
    userSchema.methods.generateAuthToken = function() {
    
    return jwt.sign({ _id: this._id, name: this.name }, config.get('jwtSecret'))

};
const productSchema = new mongoose.Schema({
    name:{type:String,require:true,max:(50),min:(5)},
    description:{type:String,require:true,max:(50),min:(5)},
    catergory:{type:String,require:true,max:(50),min:(5)},
    price: {type:Number,require:true},
    // ratings:{type:Number},
    // numReviews:{type:Number},
    // Image:{type:String,require:true}
});




function validateUser(user) {
    const schema = Joi.object({
    name:Joi.string().min(2).max(50).required(),
    email:Joi.string().min(2).max(50).required(),
    password:Joi.string().min(2).max(50).required(),

        });
    return schema.validate(user);
    
};

function validateLogin(req) { 
    const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
   });
    
    return schema.validate(req); }

function validateProduct(product) {
    const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().required(),
    catergory: Joi.string().min(5).max(50).required(),
    price: Joi.number().required(),
    });

    return schema.validate(product); }
    
    const User = mongoose.model('User',userSchema);
    // const Product = mongoose.model ('Product',productSchema);
    
    
    exports.User = User;
    exports.validate = validateUser;
    exports.userSchema = userSchema;
    exports.validateLogin = validateLogin


       




