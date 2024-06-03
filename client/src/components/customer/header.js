import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const inputRef = useRef();

 
 useEffect(() => {
    if (searchBoxVisibility) {
      inputRef.current.focus();
    }
  }, [searchBoxVisibility]);
  const handleSearchClick = () => {
    setSearchBoxVisibility(!searchBoxVisibility);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        {/* Logo with a link to the home page */}
        <Link to="/" className="flex-none w-70 ">
          <h1 className="text-2xl font-bold">Aabha Trade</h1>
        </Link>

        {/* Search Box */}
        <div
          className={
            "absolute center bg-white md:w-[800px] max-sm:w-full max-sm:pr-10 m-auto top-full mt-0.5 md:border-0 md:block md:relative md:inset-0 md:p-0 " +
            (searchBoxVisibility ? "block" : "hidden")
          }
        >
          {/* Input for search */}
          <input
            type="text"
            placeholder="Search"
            id="search"
            ref={inputRef}
            className="md:w-full max-sm:w-full max-sm:mb-3 bg-gray p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />

          {/* Search icon */}
          <Link to="/" className="absolute right-[7%] max-sm:right-[14%] md:pointer-events-none top-1/2 -translate-y-1/2">
            <i className="fi fi-rr-search text-xl text-dark-grey"></i>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-5 md:gap-6 ml-auto">
          {/* Search button for mobile view */}
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={handleSearchClick}
          >
            <i className="fi fi-rr-search"></i>
          </button>

          <Link to="/about" className="py-3 px-9 md:block">
            <i className="fi fi-br-shopping-bag text-[20px]"></i>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
