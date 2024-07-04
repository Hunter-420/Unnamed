import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import Samphoo from '../../images/samphoo.jpg'; // Import placeholder image
import { ClipLoader } from 'react-spinners';


function ProductDetails(props) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_SERVER_DOMAIN; // Ensure this is correctly set in your .env file

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` // Ensure auth token is set correctly
                    }
                });
                setProduct(response.data); // Adjust if response structure differs
            } catch (err) {
                setError(err.message); // Set the error message if the request fails
            } finally {
                setLoading(false); // Set loading to false once request is complete
            }
        };

        fetchProduct();
    }, [apiUrl, id]); // Add apiUrl and id to dependencies if they change

    if (loading) {
        return <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50">
        <ClipLoader color="#123abc" loading={loading} size={50} />
    </div>
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1 className='text-xl font-[500] md:font-semibold text-dark-grey text-start m-3 '><Link to={"/"} > Product details </Link>&gt; {product.title}</h1>
            <div className="md:grid grid-cols-2 max-sm:m-10 ">
                <div>
                    <img className="w-fit" src={product.image || Samphoo} alt="product" /> {/* Use product image if available, otherwise use placeholder */}
                </div>
                <div className='details md:m-10 max-sm:mt-5'>
                    <h1 className='text-2xl font-bold text-start'>{product.title}</h1>
                    <p className='text-start mt-4'>{product.description}</p>
                    <div className='flex justify-between mt-10'>
                        <button className='btn-light font-semibold'>Rs. {product.price}</button>
                        <button className='btn-dark font-semibold'>Add to Bag</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
