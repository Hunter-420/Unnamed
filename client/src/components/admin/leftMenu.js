import React from 'react';
import { Link } from 'react-router-dom';

function leftMenu(props) {
    return (
        <div
          className="absolute center bg-white md:w-[800px] max-sm:w-full max-sm:pr-10 m-auto top-full mt-0.5 md:border-0 relative md:inset-0 md:p-0 ">
          {/* Input for search */}
          <input
            type="text"
            placeholder="Search"
            id="search"
            className="md:w-full max-sm:w-full max-sm:mb-3 bg-gray p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />

          {/* Search icon */}
          <Link to="/" className="absolute right-[7%] max-sm:right-[14%] md:pointer-events-none top-1/2 -translate-y-1/2">
            <i className="fi fi-rr-search text-xl text-dark-grey"></i>
          </Link>
        </div>
        
    );
}

export default leftMenu;