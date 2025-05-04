import { useState, useEffect } from "react";
import axios from "axios";

function Preload() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/getProduct`, {
        productId: "none",
        isAll: 1,
        userId: sessionStorage.getItem("UserId"),
      })
      .then((res) => setProducts(res.data.products))
      .catch((err) =>
        alert(err.response?.data?.error || "Product fetch failed")
      );
  }, []);

  return { products: products };
}

export default Preload;
