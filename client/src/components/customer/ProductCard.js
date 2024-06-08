import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ProductCard = ({ index,id, src, alt, title, year, manufacturer, price }) => {
  const [added, setAdded] = useState(false); // State to track whether the product is added

  const handleAddClick = () => {
    added ? setAdded(false) : setAdded(true); // Set added to true when button is clicked
  };
  console.log(index);

  return (
    <div className={`max-sm:mt-3 max-w-fit md:max-w-sm rounded overflow-hidden shadow-lg bg-white p-3 ${added ? 'bg-green-200' : ''}`}>
      <div className="px-3 py-4">
        <Link to={`/product/${id}`} >
          <img className="w-fit" src={src} alt={alt} />
        </Link>
        <div className='flex mt-2'>
          <div className='flex'>
            <div className="font-bold text-xl mb-0 text-start">{title}</div>
            <p className="font-semibold text-white text-base ">{year}</p>

            <div>
              <button className="py-2 px-7 mt-5 -translate-y-1/2  w-full" onClick={handleAddClick}>
                <i className={`fi ${added ? 'fi-ss-check-circle' : 'fi-sr-add'} text-[2.5rem] ml-10 justify-end items-end text-right`}></i>
              </button>
            </div>
          </div>
        </div>
        <Link to={`/product/${index}`} >
          <div className=" text-start">
            <p className="text-gray-500 text-base">{manufacturer}</p>
            <p className="font-bold text-gray-700 text-base">Rs. {price}</p>
          </div>
        </Link >

      </div>
    </div >
  );
};

export default ProductCard;
