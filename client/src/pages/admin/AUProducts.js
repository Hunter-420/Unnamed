import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputBox from '../../components/common/InputBox';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

function AUProducts(props) {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        manufacturer: '',
        year: '',
        src: '',
        avaibility: 'available' // Default to 'available' when adding a new product
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (props.type === 'update-product' && props.product) {
            // Set state based on existing product data
            setProduct({
                title: props.product.title || '',
                description: props.product.description || '',
                price: props.product.price || '',
                manufacturer: props.product.manufacturer || '',
                year: props.product.year || '',
                src: props.product.src || '',
                avaibility: props.product.avaibility || 'available' // Use value from backend or default to 'available'
            });
        } else if (props.type === 'add-product') {
            // Reset state to default values for adding a new product
            setProduct({
                title: '',
                description: '',
                price: '',
                manufacturer: '',
                year: '',
                src: '',
                avaibility: 'available' // Default to 'available' when adding a new product
            });
        }
    }, [props.product, props.type]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleFileUpload = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(selectedFile.name);
            try {
                await fileRef.put(selectedFile);
                const url = await fileRef.getDownloadURL();
                setProduct({
                    ...product,
                    src: url
                });
                toast.success('File uploaded successfully');
            } catch (error) {
                console.error('Error:', error.message);
                toast.error('Failed to upload file');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;
        const endpoint = props.type === 'update-product'
            ? `${apiUrl}/products/${props.product._id}`
            : `${apiUrl}/products`;
        const method = props.type === 'update-product' ? 'put' : 'post';

        try {
            const response = await axios({
                method,
                url: endpoint,
                data: {
                    title: product.title.trim(),
                    description: product.description.trim(),
                    price: parseFloat(product.price) || 0,
                    manufacturer: product.manufacturer.trim(),
                    year: product.year.trim() || '',
                    src: product.src.trim() || '',
                    avaibility: product.avaibility.trim() || 'available' // Ensure availability is set
                },
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });

            toast.success(response.data.message);

            setProduct({
                title: '',
                description: '',
                price: '',
                manufacturer: '',
                year: '',
                src: '',
                avaibility: 'available' // Reset to default after submission
            });

            navigate('/admin');
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
                    name="src"
                    type="file"
                    placeholder="Product Image"
                    icon="fi-tr-add-image"
                    value={product.src}
                    onChange={handleFileUpload}
                />

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
                    name="avaibility"
                    type="dropdown" // Set type to dropdown
                    placeholder="Product Availability"
                    icon="fi-rr-building"
                    value={product.avaibility}
                    onChange={handleChange}
                    options={[
                        { value: 'available', label: 'Available' },
                        { value: 'unavailable', label: 'Unavailable' }
                    ]}
                />

                <button className='btn-dark max-sm:w-full' type="submit">
                    {props.type === "update-product" ? "Update Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
}

export default AUProducts;
