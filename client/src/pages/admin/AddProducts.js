import React from 'react';
import InputBox from '../../components/common/InputBox';

function AddProducts(props) {
    
    return (
        <div className='md:m-20 m-5'>
            <InputBox
                name="title"
                type="text"
                placeholder="Product Name"
                icon="fi-rr-supplier"
            />
            <InputBox
                name="description"
                type="text"
                placeholder="Product Description"
                icon="fi-rr-info"
            />
            <InputBox
                name="price"
                type="number"
                placeholder="Product Price"
                icon="fi-rr-dollar"
            />
            <InputBox
                name="manufacturer"
                type="text"
                placeholder="Product Manufacturer"
                icon="fi-rr-building"
            />
            <InputBox
                name="year"
                type="text"
                id="year"
                placeholder="Product Year"
                icon="fi-rr-calendar"
            />

            <InputBox
                name="file"
                type="text"
                id="file"
                placeholder="Product Image"
                icon="fi-tr-add-image"
            />
            <button className='btn-dark max-sm:w-full'>Add Product</button>
        </div>
    );
}

export default AddProducts;