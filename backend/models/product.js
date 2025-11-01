const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName : { type : String },
    productPrice : { type : Number },
    productQuan : { type : Number },
    productImages: [{ imageName: String, url: String }]
},{
    collection : "product"
})

module.exports = mongoose.model("product", productSchema);