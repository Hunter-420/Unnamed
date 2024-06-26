import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ShowProducts = (props) => {
    const [added, setAdded] = useState(false); // State to track whether the product is added

    const handleAddClick = () => {
        added ? setAdded(false) : setAdded(true); // Set added to true when button is clicked
    };

    return (
        <div className={`max-sm:mt-3 max-w-sm md:max-w-sm rounded overflow-hidden shadow-lg bg-white p-3 ${added ? 'bg-green-200' : ''}`}>
            <div className="px-3 py-4 flex">
                <Link to={`/product/${props.id}`} >
                    <img className="w-22 h-30" src={props.src} alt={props.alt} />
                </Link>
                <div className='ml-3'>
                    <div className='flex mt-2 '>
                        <div className='flex'>
                            <div className="font-bold text-lg mb-0 text-start">{props.title}</div>
                        </div>
                    </div>
                    <Link to={`/product/${props.id}`} >
                        <div className=" text-start">
                            <p className="text-gray-500 text-base">{props.manufacturer}</p>
                        </div>
                    </Link >
                    {props.type === 'admin' ?
                        <div className='flex justify-between mt-3'>
                            <Link to={`/update-product/${props.id}`}>  <button className='btn-light font-semibold'><i className="fi fi-tr-file-edit text-[20px] "></i></button></Link>
                            <button className='btn-light font-semibold'><i className="fi fi-rr-trash text-red text-[20px]"></i></button>
                        </div>
                        :
                        <div className='flex justify-between '>
                            <button className='whitespace-nowrap  rounded-full py-3 px-6 text-xl  font-semibold'>Rs. {props.price}</button>
                            <button className="whitespace-nowrap  rounded-full py-3 px-6 text-xl " onClick={handleAddClick}>
                                <i className={`fi ${added ? 'fi-ss-check-circle' : 'fi-sr-add'} text-[2.5rem] justify-end items-end text-right`}></i>
                            </button>
                        </div>}
                </div>

            </div>
        </div >
    );
};

export default ShowProducts;
