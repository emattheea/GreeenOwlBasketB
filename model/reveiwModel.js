
const mongoose = require('mongoose');




// SCHEMMA FOR REVIEW
const reviewSchema = new mongoose.Schema({
    name:{ type:String,require:true,max:(26),min:(5)},
    email: {type: String,require:true, minlength:5, maxlength:225},
    body:{type:String,require:true}
    


})
const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;
