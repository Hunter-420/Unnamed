import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AUProducts from './AUProducts';

function UpdateProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                toast.error('Failed to fetch product data');
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div>
            {product ? <AUProducts product={product} type="update-product" /> : <p>Loading...</p>}
        </div>
    );
}

export default UpdateProduct;
