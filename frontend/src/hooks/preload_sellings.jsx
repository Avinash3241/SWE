import { useState, useEffect } from "react";
import axios from "axios";

function Preload_sellings() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/getUserProducts`, {
        userId: sessionStorage.getItem("UserId"),
        isSeller: 1,
        status: "AVAILABLE_AND_DRAFT",
      })
      .then((res) => setProducts(res.data.products))
      .catch((err) =>
        alert(err.response?.data?.error || "Selling Product fetch failed")
      );
  }, []);

  return { products: products };
}

export default Preload_sellings;
