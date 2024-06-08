import React from 'react';
import Samphoo from '../../images/samphoo.jpg'
import ProductCard from '../../components/common/ShowProducts';
import Product from '../../data/Products.json';


  

function homePage(props) {
    return (
        <div className='md:flex'>
           {Product.map((product, index) => {
        return (
          <ProductCard
            index={index}
            id={product.id}
            src={product.src}
            alt={product.alt}
            title={product.title}
            year={product.year}
            manufacturer={product.manufacturer}
            price={product.price}
            type="customer"
          />
        );
      })}
        </div>
    );
}

export default homePage;