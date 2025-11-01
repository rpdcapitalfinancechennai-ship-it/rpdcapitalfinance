const express = require('express');
const Product = require('../models/product');
const fs = require('fs');
const path = require('path')
const router = express.Router();
router.post('/product', async(req,res) => {
    const productName  = req.body.productName;
    const productPrice = req.body.productPrice;
    const productQuan = req.body.productQuan; 
    if(!req.files || !req.files.productImages){
    return res.status(400).json({success : false , message : 'No file Upload'});
    }
    else{
        let images = req.files.productImages;
        if(!Array.isArray(images)) images = [images];
        const uploaded = [];
        images.forEach(img => {
            const uploadPath = path.join(__dirname,'../uploads/products', Date.now() + "-" + img.name);
            imageName = path.basename(uploadPath);
            img.mv(uploadPath, (err) => {
                if (err) console.log(err.message);
            });
            uploaded.push({ imageName : imageName, url : `/uploads/products/${imageName}`});
            console.log("uploaded==", uploaded)
        });
        const createImage = await Product.create({productName,productPrice,productQuan,productImages : uploaded});
        if(createImage){
            return res.status(200).json({success : true , message : 'file Upload', uploaded});
        }
        else{
            return res.status(400).json({ success : false, message : "No upload file"});
        }
    }
});

router.get("/carousel/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // const product = await Product.findById(
    //   id
    // );
const product = await Product.find();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;