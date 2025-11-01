const express = require('express');
const fs = require('fs');
const path = require('path');
const carousel = require('../models/carousel');
const router = express.Router();
router.post('/carouselform', async (req,res) => {
        //const {productName,productPrice,productDescription,productStock,productQuantity} = req.body;
        const productName = req.body.productName;
        const productPrice = req.body.productPrice;
        const productDescription = req.body.productDescription;
        const productStock = req.body.productStock;
        const productQuantity = req.body.productQuantity;
        console.log("productName==", productName);
        if(!req.files || !req.files.productImages){
            return res.status(400).json({ status : false, message : "No file upload"});
        }
        else{
        let carouselImgs = req.files.productImages;
        if(!Array.isArray(carouselImgs)) carouselImgs = [carouselImgs]; 
        uploaded = [];
       carouselImgs.forEach((img)=>{
            const uploadPath = path.join(__dirname, '../uploads/carousel', Date.now() + "_" + img.name);
            imgName = path.basename(uploadPath);
            console.log("uploadpath", uploadPath, "Image name", imgName)
            img.mv(uploadPath, (err)=>{
                if(err){
                    return console.log("Move error", err.message);
                }
            });
            
            uploaded.push({ ProductImage : imgName, url : `/uploads/carousel/${imgName}`});
            console.log("uploaded",uploaded)
        });
        const createImage = await carousel.create({productName,productPrice,productDescription,productStock,productQuantity,productImages : uploaded});
                if(createImage){
                    return res.status(200).json({success : true , message : 'file Upload', uploaded});
                }
                else{
                    return res.status(400).json({ success : false, message : "No upload file"});
                }
        }
});

router.get('/carouselimg', async(req,res)=>{
    const getImg = await carousel.find({},'_id productImages');
    if(getImg){
            getImg.forEach(item => {
            console.log("Images for:", item._id);
            item.productImages.forEach(img => console.log(img));
            });
            // return res.status(200).json({message : "Img get Successfully", getImg});
            // getImg.forEach((img)=>{
            //     console.log("img,=",img)
            // })
             return res.status(200).json({message : "Img get Successfully", getImg});
    }
    else{
        return res.status(200).json({message : "Img not get"})
    }
});

router.get('/carouselimg/:id', async (req,res)=>{
   const id = req.params.id;
    const detail = await carousel.findById(id);
    if(detail){
        console.log("detail==", detail)
        return res.json({message : "success",detail})
    }
    else{
        console.log("No detail")
    }
})

module.exports = router;