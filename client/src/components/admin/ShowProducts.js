import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ShowProducts = ({ index, src, alt, title, year, manufacturer, price }) => {
    const [added, setAdded] = useState(false); // State to track whether the product is added

    const handleAddClick = () => {
        added ? setAdded(false) : setAdded(true); // Set added to true when button is clicked
    };
    console.log(index);

    return (
        <div className={`max-sm:mt-3 max-w-sm md:max-w-sm rounded overflow-hidden shadow-lg bg-white p-3 ${added ? 'bg-green-200' : ''}`}>
            <div className="px-3 py-4 flex">
                <Link to={`/product/${index}`} >
                    <img className="w-22 h-30" src={src} alt={alt} />
                </Link>
                <div className='ml-3'>
                    <div className='flex mt-2 '>
                        <div className='flex'>
                            <div className="font-bold text-lg mb-0 text-start">{title}</div>

                        </div>
                    </div>
                    <Link to={`/product/${index}`} >
                        <div className=" text-start">
                            <p className="text-gray-500 text-base">{manufacturer}</p>
                            <p className="font-bold text-gray-700 text-base">{price}</p>
                        </div>
                    </Link >
                    <div className='flex justify-between mt-3'>
                        <button className='btn-light font-semibold'><i className="fi fi-tr-file-edit text-[20px] "></i></button>
                        <button className='btn-light font-semibold'><i className="fi fi-rr-trash text-red text-[20px]"></i></button>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default ShowProducts;
