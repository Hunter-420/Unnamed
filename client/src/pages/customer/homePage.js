import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import ShowProducts from '../../components/common/ShowProducts'; // Fix import to match your component
import { ClipLoader } from 'react-spinners';


function HomePage(props) { // React component names should be capitalized
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_SERVER_DOMAIN; // Ensure this is correctly set in your .env file

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/products`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` // Ensure auth token is set correctly
                }
            });
            setProducts(response.data); // Adjust if response structure differs (e.g., response.data.products)
        } catch (err) {
            setError(err.message); // Set the error message if the request fails
        } finally {
            setLoading(false); // Set loading to false once request is complete
        }
    };

    fetchProducts();
  }, [apiUrl]); // Add apiUrl to dependencies if it changes

  return (
    <div className='md:flex'>
      {loading &&   <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50">
                    <ClipLoader color="#123abc" loading={loading} size={50} />
                </div>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && products.map((product) => (
        <ShowProducts
          key={product._id} // Ensure `_id` or a unique identifier is used
          id={product._id}
          src={product.src}
          alt={product.alt}
          title={product.title}
          manufacturer={product.manufacturer}
          price={product.price}
          type="customer"
        />
      ))}
    </div>
  );
}

export default HomePage;
