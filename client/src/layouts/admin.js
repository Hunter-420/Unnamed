import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Admin(props) {
    return (
        <div className="relative min-h-screen">
            <Outlet />
         
        </div>
    );
}

export default Admin;
