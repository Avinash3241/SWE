import { useState, useEffect } from 'react';
import axios from 'axios';

function Preload_Categories() {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/getUserInterests`, { userId: sessionStorage.getItem('UserId')})
      .then(res => setcategories(res.data.categories))
      .catch(err => alert(err.response?.data?.error || 'Interested categories fetch failed'));
  }, []);

  return {"categories" : categories};
}

export default Preload_Categories;
