
import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from '../components/customer/header';
import Footer from '../components/customer/footer';

function customer(props) {
    return (
        <div className='relative min-h-screen'>
           <Header type={"customer"}/>
           <Outlet />
           <Footer />
        </div>
    );
}

export default customer;