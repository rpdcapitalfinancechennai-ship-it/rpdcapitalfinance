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
        const image = req.files.productImages;
        const uploadPath = path.join(__dirname,'../uploads/products',Date.now() + "_" + image.name); 
        console.log("uploadPath==",uploadPath);
        image.mv(uploadPath, async(err)=>{
            if (err) return res.status(500).json({success : false, message : "Upload failed"});
                imageName = path.basename(uploadPath);
                console.log("Image Name==",imageName);
                const createImage = await Product.create({productName,productPrice,productQuan, productImage : `/uploads/products/${imageName}`})
                if(createImage){
                return res.status(200).json({
                    success : true,
                    url : `/uploads/products/${image.name}`
                })
            }
        })
    }
});
module.exports = router;