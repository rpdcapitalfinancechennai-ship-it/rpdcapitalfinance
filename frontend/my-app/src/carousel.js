import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// ✅ Import images from src/assets
// import img1 from "./assets/img1.jfif";
// import img2 from "./assets/img2.jfif";
// import img3 from "./assets/img3.jfif";
import axios from "axios";

export default function Carousels() {
  const { id } = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2s delay
    arrows: true,
  };

  const [datas, setData] = useState([]);
useEffect(() => {
    axios
      .get(`/carousel/${id}`)
      .then((res) => {
        // if backend returns an object instead of array, wrap it in array
        setData(Array.isArray(res.data) ? res.data : [res.data]);
      })
      .catch((err) => console.error(err));
  }, [id]);
      
      return (
    <div style={{ width: "600px", margin: "auto" }}>
       {datas.length > 0 ? (
            datas.map((product) => (
      <Slider {...settings}>
       
         {product.productImages.length > 0 ? (
          product.productImages.map((img, index) => (     
        <div>
          <img src={img.url} alt="1" style={{ width: "50%", borderRadius: "10px", marginTop : "20px" }} />
        </div>
        ))
        ) : (
          <p>No images</p>
        )}
       
        {/* // <div>
        //   <img src={img2} alt="2" style={{ width: "100%", borderRadius: "10px", marginTop : "20px" }} />
        // </div>
        // <div>
        //   <img src={img3} alt="3" style={{ width: "100%", borderRadius: "10px", marginTop : "20px" }} />
        // </div> */}
      </Slider>
       ))
          ) : (
           <div>
          {/* <img src={img1} alt="1" style={{ width: "100%", borderRadius: "10px", marginTop : "20px" }} /> */}
          </div>
          )}
    </div>
  );
}
