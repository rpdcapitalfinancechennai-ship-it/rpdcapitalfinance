import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export default function CarouselGet() {
  const [allProducts, setAllProducts] = useState([]);
  const [details, setDetails] = useState(null); // ✅ null instead of array for easier check

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("/carouselimg");
        setAllProducts(res.data.getImg);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchImages();
  }, []);

  const handleClick = async (id) => {
    try {
      const res = await axios.get(`/carouselimg/${id}`);
      setDetails(res.data.detail); // ✅ store single object
    } catch (err) {
      console.log("Error fetching details:", err.message);
    }
  };

  const handleBack = () => {
    setDetails(null); // ✅ go back to carousel view
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div style={{ width: "600px", margin: "40px auto", textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>Product Carousel</h2>

      {/* ✅ Show carousel if no details selected */}
      {!details ? (
        allProducts.length > 0 ? (
          allProducts.map((product, idx) => (
            <Slider key={idx} {...settings}>
              {product.productImages.length > 0 ? (
                product.productImages.map((img, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                      padding: "20px",
                    }}
                  >
                    <img
                      src={img.url}
                      alt={`product-${idx}-img-${index}`}
                      onClick={() => handleClick(product._id)}
                      style={{
                        width: "20%",
                        borderRadius: "10px",
                        marginTop: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>No images</p>
              )}
            </Slider>
          ))
        ) : (
          <p>No products found</p>
        )
      ) : (
        // ✅ Show selected product details
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={handleBack}
            style={{
              marginBottom: "15px",
              padding: "8px 15px",
              borderRadius: "5px",
              border: "none",
              background: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>

          <h3>{details.productName}</h3>
          <p>Price: {details.productPrice}</p>
          <p>Quantity: {details.productQuantity}</p>
          <p>Description: {details.productDescription}</p>
          <p>Stock: {details.productStock}</p>

          <div style={{ marginTop: "10px" }}>
            {details.productImages &&
              details.productImages.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`detail-img-${i}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    margin: "5px",
                    borderRadius: "5px",
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
