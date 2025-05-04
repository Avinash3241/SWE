import { useState, useEffect } from "react";
import axios from "axios";

function Preload_Buyings_history() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/getUserProducts`, {
        userId: sessionStorage.getItem("UserId"),
        isSeller: 0,
        status: "nopending",
      })
      .then((res) => setProducts(res.data.products))
      .catch((err) =>
        alert(err.response?.data?.error || "Buying Products fetch failed")
      );
  }, []);

  return { products: products };
}

export default Preload_Buyings_history;
