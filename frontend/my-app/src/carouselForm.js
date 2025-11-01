//import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CarouselForm  ()  {

    const [productName,setProductName] = useState('');
    const [productPrice,setProductPrice ] = useState('');
    const [productQuantity,setProductQuan] = useState('');
    const [productStock,setProductStock] = useState('');
    const [productDescription,setProductDes] = useState('');
    const [productImages,setProductImages] = useState([]);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        setProductImages(e.target.files);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productName",productName);
        formData.append("productPrice",productPrice);
        formData.append("productQuantity",productQuantity);
        formData.append("productStock",productStock);
        formData.append("productDescription",productDescription);
        Array.from(productImages).forEach((file, index) => {
            formData.append("productImages", file);
        });

        const res = await fetch('/carouselform',{
            method : "POST",
            body : formData
        });
        const data = await res.json();
        console.log("Data ==", data);
        navigate('/carouselimg');
    }

     
    return(
        <>
            <h1>Basic Carousels</h1>
            <form onSubmit={handleSubmit}>
                <label>Product Name</label><br />
                <input type="text" value={productName} placeholder="Product name" onChange={(e)=>setProductName(e.target.value)}></input><br />
                <label>Product Price</label><br />
                <input type="text" value={productPrice} placeholder="Product Price" onChange={(e)=>setProductPrice(e.target.value)}></input><br />
                <label>Product Quantity</label><br />
                <input type="text" value={productQuantity} placeholder="Product Quantity" onChange={(e)=>setProductQuan(e.target.value)}></input><br />
                <label>Product Description</label><br />
                <input type="text" value={productDescription} placeholder="Product Description" onChange={(e)=>setProductDes(e.target.value)}></input><br />
                <label>Product Stock</label><br />
                <input type="text" value={productStock} placeholder="Product Stock" onChange={(e)=>setProductStock(e.target.value)}></input><br />
                <label>Product Images</label><br />
                <input type="file" onChange={handleFileChange} multiple></input><br />
                <button type="submit">submit</button>
            </form>
        </>
    )
}