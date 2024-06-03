import React from 'react';
import { Link } from 'react-router-dom';
import ShowProducts from '../../components/admin/ShowProducts';
import Samphoo from '../../images/samphoo.jpg'
import LeftMenu from '../../components/admin/leftMenu'
const products = [
    {
        src: Samphoo, // replace with actual image path
        alt: 'Samphoo',
        title: 'Organic Extra Virgin Coconut Oil',
        year: '2024',
        manufacturer: 'KIM THOA',
        price: '$38.00'
    },
    {
        src: Samphoo, // replace with actual image path
        alt: 'Samphoo',
        title: 'Organic Extra Virgin Coconut Oil',
        year: '2024',
        manufacturer: 'KIM THOA',
        price: '$38.00'
    },
    {
        src: Samphoo, // replace with actual image path
        alt: 'Samphoo',
        title: 'Organic Extra Virgin Coconut Oil',
        year: '2024',
        manufacturer: 'KIM THOA',
        price: '$38.00'
    },
    {
        src: Samphoo, // replace with actual image path
        alt: 'Samphoo',
        title: 'Organic Extra Virgin Coconut Oil',
        year: '2024',
        manufacturer: 'KIM THOA',
        price: '$38.00'
    },
    {
        src: Samphoo, // replace with actual image path
        alt: 'Another Product',
        title: 'Another Product Title',
        year: '2023',
        manufacturer: 'Another Manufacturer',
        price: '$45.00'
    }
    // add more products as needed
];

function adminDashboard(props) {
    return (
        <div>
            <h1 className='mt-3 text-xl'>Welcome back, <span className='text-purple text-lg font-semibold'>Aabha Trade</span></h1>
            <LeftMenu />

            <h1 className='text-start ml-5 font-semibold '>Listed Products</h1>
            <div className='md:flex'>
                {products.map((product, index) => {
                    return (
                        <ShowProducts
                            index={index}
                            src={product.src}
                            alt={product.alt}
                            title={product.title}
                            manufacturer={product.manufacturer}
                            price={product.price}
                        />
                    );
                })}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 md:w-[800px] max-sm:w-full max-sm:pr-10 mx-auto  md:border-0">
                {/* Input for Add Products */}

                <input
                    type="text"
                    placeholder="Add Products"
                    disabled
                    className="w-full bg-gray-200 p-4 pl-6 pr-14 rounded-full placeholder:text-dark-grey"
                />

                {/* Add icon */}
                <Link to="/add-products" className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <i className="fi fi-sr-add text-3xl text-dark-grey"></i>
                </Link>
            </div>
        </div>
    );
}

export default adminDashboard;