import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import Samphoo from '../../images/samphoo.jpg'; // Import placeholder image
import { ClipLoader } from 'react-spinners';
import NoInternetCard from '../../components/common/NoInternet';
import MetaDecorator from '../../components/common/MetaDecorator'; // Import MetaDecorator

function ProductDetails(props) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_SERVER_DOMAIN; // Ensure this is correctly set in your .env file

    useEffect(() => {
        // Check and handle page refresh
        if (!localStorage.getItem('refreshed')) {
            // Set a flag in local storage
            localStorage.setItem('refreshed', 'true');
        
            // Refresh the page
            window.location.reload();
        } else {
            // Remove the flag after reload
            localStorage.removeItem('refreshed');
        }

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
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50">
                <ClipLoader color="#123abc" loading={loading} size={50} />
            </div>
        );
    }

    if (error) {
        return <NoInternetCard message={error} />;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <MetaDecorator
                title={product.title}
                description={product.description}
                src={product.src || Samphoo}
                url={window.location.href} // Use current URL
            />
            <h1 className='text-xl font-[500] md:font-semibold text-dark-grey text-start m-3 '>
                <Link to="/"><span className="font-semibold text-xl">Product Details</span></Link>&gt; {product.title}
            </h1>
            <div className="md:grid grid-cols-2 max-sm:m-10 ">
                <div>
                    <img className="w-fit" src={product.src || Samphoo} alt="product" /> {/* Use product image if available, otherwise use placeholder */}
                </div>
                <div className='details md:m-10 max-sm:mt-5'>
                    <h1 className='text-2xl font-bold text-start'>{product.title}</h1>
                    <p className='text-start mt-4'>{product.description}</p>
                    <div className='flex justify-between mt-10'>
                        <button className='btn-light font-semibold'>Rs. {product.price}</button>
                        <button className='btn-dark font-semibold'>Product {product.avaibility}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
