import React from 'react';
import { useParams } from 'react-router-dom';
import AUProducts from "./AUProducts";
import Product from '../../data/Products.json'

    function UpdateProduct(props) {
        const { id } = useParams();
        const productId = parseInt(id, 10);
        const products = Product.find(product => product.id === productId);
        return (
            <div>
                <AUProducts product={products} type={"update-product"} />
            </div>
        );
    }
    
    export default UpdateProduct;
