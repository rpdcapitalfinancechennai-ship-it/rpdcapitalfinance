import { useState } from "react";

const Product = () => {
    const [productName,setProductName] = useState();
    const [productPrice,setProductPrice] = useState();
    const [productQuan,setProductQuan] = useState();
    const [productImages,setProductImages] = useState();
    const handleFileChange = (e) => {
        setProductImages(e.target.files[0]);
    }
    const handleFileSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productName",productName);
        formData.append("productPrice",productPrice);
        formData.append("productQuan",productQuan);
        formData.append("productImages",productImages);
        const res = await fetch('/product',{
            method : 'POST',
            body : formData
        });
        const data = await res.json();
        console.log("Data ===", data)
    }
    return(
        <>
            <h1>Product Form</h1>
            <form onSubmit={handleFileSubmit}>
                <input type="text" placeholder="product name" value={productName} onChange={(e)=>setProductName(e.target.value)}></input><br />
                <input type="text" placeholder="product price" value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}></input><br />
                <input type="text" placeholder="product quan" value={productQuan} onChange={(e)=>setProductQuan(e.target.value)}></input><br />
                <input type="file" onChange={handleFileChange}></input><br />
                <button type="submit">submit</button>
            </form>
        </>
    )
}

export default Product;