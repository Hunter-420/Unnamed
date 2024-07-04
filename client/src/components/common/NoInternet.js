import React from 'react';
import { FaWifi } from 'react-icons/fa'; // WiFi icon from react-icons


const NoInternetCard = ({ message }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50">
            <div className="bg-red-100 border border-red-300 rounded-lg shadow-lg p-6 max-w-sm text-center">
                <FaWifi className="text-red-500 text-4xl mx-auto mb-4" />
                <p className="text-red-600 text-lg font-semibold">{message}</p>
            </div>
        </div>
    );
};

export default NoInternetCard;
