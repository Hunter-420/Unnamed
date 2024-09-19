import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './ShowProducts.css';

const ShowProducts = (props) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); // State for favorite
    const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;

    // Handle toggling favorite
    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite); // Toggle favorite state
    };

    // Handle toggling cart
    const handleCartClick = () => {
        setAddedToCart(!addedToCart); // Toggle cart state
    };

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

    return (
        <div className={`contenedorCards ${addedToCart ? 'enCarrito' : ''} ${isFavorite ? 'esFav' : ''}`}>
            <div className="card">
                <div className="wrapper">
                    <div className="colorProd"></div>
                    <Link to={`/product/${props.id}`}>
                        <div
                            className="imgProd"
                            style={{
                                backgroundImage: 'url(' + props.src + ')',
                            }}
                        ></div>
                    </Link>

                    <div className="infoProd">
                        <p className="nombreProd">{props.title}</p>
                        <p className="extraInfo">{props.manufacturer}</p>
                        <div className="actions">
                            <div className="preciosGrupo">
                                <p className="precio precioProd">{props.price}</p>
                            </div>
                            {/* Add to Favorites */}
                            <div className="icono action aFavs" onClick={handleFavoriteClick}>
                                {isFavorite ? (
                                    <i className="fi fi-sr-heart text-[30px]"></i>
                                ) : (
                                    <i className="fi fi-br-heart text-[30px] "></i>
                                )}
                            </div>
                            {/* Add to Cart */}
                            <div className="icono action alCarrito" onClick={handleCartClick}>
                                {addedToCart ? (
                                    <i className="fi fi-rr-shopping-cart-check text-[30px]"></i>
                                ) : (
                                    <i className="fi fi-rr-shopping-cart-add text-[30px]"></i>
                                )}
                            </div>
                            {props.type === 'admin' ? (
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
                            ) : (
                                <div className='flex justify-between'></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowProducts;
