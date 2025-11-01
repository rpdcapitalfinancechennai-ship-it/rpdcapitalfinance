import { useState } from "react";

const Product = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuan, setProductQuan] = useState('');
    const [productImages, setProductImages] = useState([]);

    const handleFileChange = (e) => {
        // Convert FileList to Array
        setProductImages(Array.from(e.target.files));
    }

    const handleFileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productPrice", productPrice);
        formData.append("productQuan", productQuan);

        // Append multiple images
        productImages.forEach((file, index) => {
            formData.append("productImages", file);
        });

        const res = await fetch('/product', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        console.log("Data ===", data);
    }

    return (
        <>
            <h1>Product Form</h1>
            <form onSubmit={handleFileSubmit}>
                <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} /><br />
                <input type="text" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} /><br />
                <input type="text" placeholder="Product Quantity" value={productQuan} onChange={(e) => setProductQuan(e.target.value)} /><br />
                <input type="file" multiple onChange={handleFileChange} /><br />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Product;
