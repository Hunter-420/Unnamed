import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/customer/header';

import { Link } from 'react-router-dom';

function Admin(props) {
    return (
        <div className="relative min-h-screen">
            <Header type={"admin"} />
            <Outlet />
         
        </div>
    );
}

export default Admin;
