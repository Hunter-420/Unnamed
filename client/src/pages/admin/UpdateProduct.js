import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import AUProducts from './AUProducts';
import { useNavigate } from 'react-router-dom';


function UpdateProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook to handle redirection


    const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products/${id}`);
                setProduct(response.data);
                toast.success('Product updated successfully');
                
            } catch (error) {
                toast.error('Failed to fetch product data');
            } finally {
                setLoading(false);

            }
        };

        fetchProduct();
    }, [id, apiUrl]);

    return (
        <div>
            {/* Display AUProducts at the top */}
            {!loading && product && (
                <AUProducts product={product} type="update-product" />
            )}
            
            {/* Centered spinner */}
            {loading && (
                <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50">
                    <ClipLoader color="#123abc" loading={loading} size={50} />
                </div>
            )}
        </div>
    );
}

export default UpdateProduct;
