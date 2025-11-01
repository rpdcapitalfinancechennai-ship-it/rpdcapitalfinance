const mongoose = require('mongoose');
const carouselSchema = new mongoose.Schema({
    productName : { type : String },
    productPrice : { type : String },
    productQuantity : { type : String },
    productDescription : { type : String },
    productStock : { type : String },
    productImages: [{ ProductImage : String, url: String }]
}, {
    collection : "carousel"
}
);

module.exports = mongoose.model('carousel',carouselSchema);