import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputBox from '../../components/common/InputBox';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for potential redirection

function AUProducts(props) {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        manufacturer: '',
        year: '',
        src: ''
    });

    const navigate = useNavigate(); // Initialize navigate for potential redirection

    useEffect(() => {
        if (props.type === 'update-product' && props.product) {
            // Populate form with existing product data for update
            setProduct({
                title: props.product.title || '',
                description: props.product.description || '',
                price: props.product.price || '',
                manufacturer: props.product.manufacturer || '',
                year: props.product.year || '',
                src: props.product.src || ''
            });
        } else if (props.type === 'add-product') {
            // Initialize form with empty values for adding new product
            setProduct({
                title: '',
                description: '',
                price: '',
                manufacturer: '',
                year: '',
                src: ''
            });
        }
    }, [props.product, props.type]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;
        const endpoint = props.type === 'update-product'
        ? `${apiUrl}/products/${props.product._id}`
        : `${apiUrl}/products`;
        const method = props.type === 'update-product' ? 'put' : 'post';

        console.log('Product:', product);

        try {
            const response = await axios({
                method,
                url: endpoint,
                data: {
                    title: product.title.trim(),
                    description: product.description.trim(),
                    price: parseFloat(product.price) || 0, // Ensure price is a number
                    manufacturer: product.manufacturer.trim(),
                    year: product.year.trim() || '', // Optional
                    src: product.src.trim() || '' // Optional
                },
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });

            toast.success(response.data.message);

            // Clear form fields
            setProduct({
                title: '',
                description: '',
                price: '',
                manufacturer: '',
                year: '',
                src: ''
            });

            // Optional: Redirect after successful submission
            if (props.type === 'add-product') {
                navigate('/admin'); // Redirect to the admin dashboard or another page
            }
            else if (props.type === 'update-product') {
                navigate('/admin'); // Redirect after successful update
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            toast.error(error.response?.data?.message || 'Error occurred');
        }
    };

    return (
        <div className='md:m-20 m-5'>
            <h1 className="text-xl font-[500] md:font-semibold text-dark-grey text-start mb-10">
                <Link to="/admin">
                    <span className="font-semibold text-xl">dashboard</span>
                </Link>
                &gt;
                {props.type === "update-product"
                    ? `update product > ${props.product?.title}`
                    : "add product"}
            </h1>

            <form onSubmit={handleSubmit}>
                <InputBox
                    name="title"
                    type="text"
                    placeholder="Product Name"
                    icon="fi-rr-supplier"
                    value={product.title}
                    onChange={handleChange}
                />
                <InputBox
                    name="description"
                    type="text"
                    placeholder="Product Description"
                    icon="fi-rr-info"
                    value={product.description}
                    onChange={handleChange}
                />
                <InputBox
                    name="price"
                    type="number"
                    placeholder="Product Price"
                    icon="fi-rr-dollar"
                    value={product.price}
                    onChange={handleChange}
                />
                <InputBox
                    name="manufacturer"
                    type="text"
                    placeholder="Product Manufacturer"
                    icon="fi-rr-building"
                    value={product.manufacturer}
                    onChange={handleChange}
                />
                <InputBox
                    name="year"
                    type="text"
                    placeholder="Product Year"
                    icon="fi-rr-calendar"
                    value={product.year}
                    onChange={handleChange}
                />
                <InputBox
                    name="src"
                    type="text"
                    placeholder="Product Image"
                    icon="fi-tr-add-image"
                    value={product.src}
                    onChange={handleChange}
                />
                <button className='btn-dark max-sm:w-full' type="submit">
                    {props.type === "update-product" ? "Update Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
}

export default AUProducts;
