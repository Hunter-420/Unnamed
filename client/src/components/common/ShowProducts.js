import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './ShowProducts.css';

const ShowProducts = (props) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); // State for favorite
    const [isInView, setIsInView] = useState(false); // State for detecting scroll into view
    const imageRef = useRef(null); // Reference for the product image
    const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;

    // Handle toggling favorite
    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite); // Toggle favorite state
    };

    // Handle toggling cart
    const handleCartClick = () => {
        setAddedToCart(!addedToCart); // Toggle cart state
    };

    // Handle product deletion
    const handleDeleteClick = async () => {
        try {
            await axios.delete(`${apiUrl}/products/${props.id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
                }
            });
            toast.success('Product deleted successfully');
            props.onDelete(props.id); // Notify parent about deletion
        } catch (error) {
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
            toast.error(error.response?.data?.message || 'Failed to delete product');
        }
    };

    // Use IntersectionObserver to detect when the product image is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                    } else {
                        setIsInView(false);
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the image is visible
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, []);

    return (
        <div className={`contenedorCards ${addedToCart ? 'enCarrito' : ''} ${isFavorite ? 'esFav' : ''}`}>
            <div className="card">
                <div className="wrapper">
                    <div className="colorProd"></div>
                    <Link to={`/product/${props.id}`}>
                        <div
                            className={`imgProd ${isInView ? 'animate-on-scroll' : ''}`} // Add animation class based on isInView
                            style={{
                                backgroundImage: 'url(' + props.src + ')',
                            }}
                            ref={imageRef} // Reference for the image
                        ></div>
                    </Link>

                    <div className="infoProd">
                        <p className="nombreProd">{props.title}</p>
                        <p className="extraInfo">{props.manufacturer}</p>
                        <div className="actions">
                            <div className="preciosGrupo">
                                <p className="precio precioProd">{props.price}</p>
                            </div>

                            {/* Render heart and cart icons only if the user is not an admin */}
                            {props.type !== 'admin' && (
                                <>
                                    <div className="icono action aFavs" onClick={handleFavoriteClick}>
                                        {isFavorite ? (
                                            <i className="fi fi-sr-heart text-[30px]"></i>
                                        ) : (
                                            <i className="fi fi-br-heart text-[30px] "></i>
                                        )}
                                    </div>
                                    <div className="icono action alCarrito" onClick={handleCartClick}>
                                        {addedToCart ? (
                                            <i className="fi fi-rr-shopping-cart-check text-[30px]"></i>
                                        ) : (
                                            <i className="fi fi-rr-shopping-cart-add text-[30px]"></i>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Render edit and delete buttons only if the user is an admin */}
                            {props.type === 'admin' && (
                                <div className='flex justify-between mt-3'>
                                    <Link to={`/update-product/${props.id}`}>
                                        <button className='btn-light font-semibold'>
                                            <i className="fi fi-tr-file-edit text-[20px] "></i>
                                        </button>
                                    </Link>
                                    <button className='btn-light font-semibold' onClick={handleDeleteClick}>
                                        <i className="fi fi-rr-trash text-red text-[20px]"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowProducts;
