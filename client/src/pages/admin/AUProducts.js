import React from 'react';
import { Link } from 'react-router-dom';
import InputBox from '../../components/common/InputBox';

function AUProducts(props) {

    return (
        <div className='md:m-20 m-5'>
<h1 className="text-xl font-[500] md:font-semibold text-dark-grey text-start mb-10">
  <Link to="/admin">
    <span className="font-semibold text-xl">dashboard</span>
  </Link>
  &gt;
  {props.type === "update-product"
    ? `update product>${props.product?.title}`
    : "add product"}
</h1>

            <InputBox
                name="title"
                type="text"
                placeholder="Product Name"
                icon="fi-rr-supplier"
                defaultValue={props.product?.title}
            />
            <InputBox
                name="description"
                type="text"
                placeholder="Product Description"
                icon="fi-rr-info"
                defaultValue={props.product?.description}
            />
            <InputBox
                name="price"
                type="number"
                placeholder="Product Price"
                icon="fi-rr-dollar"
                defaultValue={props.product?.price}
            />
            <InputBox
                name="manufacturer"
                type="text"
                placeholder="Product Manufacturer"
                icon="fi-rr-building"
                defaultValue={props.product?.manufacturer}
            />
            <InputBox
                name="year"
                type="text"
                id="year"
                placeholder="Product Year"
                icon="fi-rr-calendar"
                defaultValue={props.product?.year}
            />

            <InputBox
                name="file"
                type="text"
                id="file"
                placeholder="Product Image"
                icon="fi-tr-add-image"
                defaultValue={props.product?.src}
            />
            <button className='btn-dark max-sm:w-full'>{props.type=="update-product"?"Update Product":"Add Product"}</button>
        </div>
    );
}

export default AUProducts;