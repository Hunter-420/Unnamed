import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import './ShowProducts.css';

const ShowProducts = (props) => {
    const [added, setAdded] = useState(false);
    const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;
    const shareUrl = `https://www.abhatrade.vercel.app/api/products/${props.id}`;

    const handleAddClick = () => {
        setAdded(!added);
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
        <>
  <div className="contenedorCards">
      <div className="card">
        <div className="wrapper">
          <div className="colorProd"></div>
          <Link to={`/product/${props.id}`} >

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
              <div className="icono action aFavs">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <path d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z"></path>
                </svg>
              </div>
              <div className="icono action alCarrito">
                <svg className="inCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <title>Quitar del carrito</title>
                  <path d="M30 22H12M2 6h6l10 40h32l3.2-9.7"></path>
                  <circle cx="20" cy="54" r="4"></circle>
                  <circle cx="46" cy="54" r="4"></circle>
                  <circle cx="46" cy="22" r="16"></circle>
                  <path d="M53 18l-8 9-5-5"></path>
                </svg>
                <svg className="outCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <title>Agregar al carrito</title>
                  <path d="M2 6h10l10 40h32l8-24H16"></path>
                  <circle cx="23" cy="54" r="4"></circle>
                  <circle cx="49" cy="54" r="4"></circle>
                </svg>
              </div>
              {props.type === 'admin' ?
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
                        :
                        <div className='flex justify-between'>
                            
                        </div>}
            </div>
          </div>
        </div>
      </div>
    </div>

        
        </>
    );
};

export default ShowProducts;
