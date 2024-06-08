import React from 'react';
import { useParams } from 'react-router-dom';
import Samphoo from '../../images/samphoo.jpg';
import Product from '../../data/Products.json';



function ProductDetails(props) {
    const { id } = useParams();
    const productId = parseInt(id, 10);
    const product = Product.find(product => product.id === productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1 className='text-xl font-[500] md:font-semibold text-dark-grey text-start m-3 '>product details &gt; {product.title}</h1>

            <div className="md:grid grid-cols-2 max-sm:m-10 ">
                <div>
                <img className="w-fit" src={Samphoo} alt="product" />

                </div>
                <div className='details md:m-10 max-sm:mt-5'>
                    <h1 className='text-2xl font-bold text-start'>{product.title}</h1>
                    <p className='text-start mt-4'>{product.description}</p>
                    <div className='flex justify-between mt-10'>
                        <button className='btn-light font-semibold'>Rs. {product.price}</button>
                        <button className='btn-dark font-semibold'>Add to Bag</button>
                    </div>


                </div>

            </div>
        </div>
    );
}

export default ProductDetails;