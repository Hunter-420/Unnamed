import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ShowProducts from '../../components/common/ShowProducts';
import { ClipLoader } from 'react-spinners';
import NoInternetCard from '../../components/common/NoInternet'; // Import the NoInternetCard component
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

function AdminDashboard(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('authToken') || sessionStorage.getItem('authToken');

        if (!token) {
            navigate('/auth'); // Redirect to login if no token is found
        } else {
            sessionStorage.setItem('authToken', token); // Ensure token is in session storage

            const fetchProducts = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/products`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setProducts(response.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();
        }
    }, [apiUrl, navigate]);

    const handleProductDelete = (deletedProductId) => {
        setProducts(products.filter(product => product._id !== deletedProductId));
    };

    return (
        <div>
            <h1 className='text-start ml-5 font-semibold mt-5'>Listed Products</h1>
            <div className='md:flex flex-wrap'>
                {loading && <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50">
                    <ClipLoader color="#123abc" loading={loading} size={50} />
                </div>}
                {error && <NoInternetCard message={error} />}
                {!loading && !error && products.map((product) => (
                    <ShowProducts
                        key={product._id}
                        id={product._id}
                        src={product.src}
                        alt={product.alt}
                        title={product.title}
                        manufacturer={product.manufacturer}
                        price={product.price}
                        type="admin"
                        onDelete={handleProductDelete} // Pass the delete handler
                    />
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 md:w-[800px] max-sm:w-full max-sm:pr-10 mx-auto md:border-0">
                {/* Input for Add Products */}
                <input
                    type="text"
                    placeholder="Add Products"
                    disabled
                    className="w-full bg-gray-200 p-4 pl-6 pr-14 rounded-full placeholder:text-dark-grey"
                />

                {/* Add icon */}
                <Link to="/add-products" className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <i className="fi fi-sr-add text-3xl text-dark-grey"></i>
                </Link>
            </div>
        </div>
    );
}

export default AdminDashboard;
