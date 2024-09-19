import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ShowProducts from "./../common/ShowProducts"; // Adjust the import path according to your project structure

const Navbar = (props) => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // For filtered products
  const [activeCategory, setActiveCategory] = useState("All"); // Track the active category
  const inputRef = useRef();
  const searchBoxRef = useRef();
  const apiUrl = process.env.REACT_APP_SERVER_DOMAIN;
  const authToken = sessionStorage.getItem("authToken");

  // Check if the page has been refreshed before
  const hasRefreshed = localStorage.getItem("hasRefreshed");

  useEffect(() => {
    if (searchBoxVisibility) {
      inputRef.current.focus();
    }
  }, [searchBoxVisibility]);

  const handleSearchClick = () => {
    setSearchBoxVisibility(!searchBoxVisibility);

    // Refresh the page only the first time search is clicked
    if (!hasRefreshed) {
      localStorage.setItem("hasRefreshed", "true");
      window.location.reload(); // Refresh the page once
    }

    if (!searchBoxVisibility) {
      inputRef.current.focus();
    } else {
      setSearchQuery(""); // Clear the search query when closing search box
      setSearchResults([]); // Clear search results when search box is closed
      inputRef.current.blur();
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`${apiUrl}/products/search`, {
        params: { query },
      });

      if (response.data.length === 0) {
        alert("No Product Found");
      }

      setSearchResults(response.data); // Update search results
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An error occurred while searching. Please try again.");
    }
  };

  const handleSearchDebounced = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    if (searchQuery) {
      handleSearchDebounced(searchQuery);
    } else {
      setSearchResults([]); // Clear search results if search query is cleared
    }
  }, [searchQuery, handleSearchDebounced]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setSearchBoxVisibility(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBoxRef]);

  // Handle quick category search
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setSearchQuery("");
    } else {
      setSearchQuery(category);
      handleSearch(category); // Fetch related products
    }
  };

  return (
    <di>
      <nav className="navbar">
        <Link to="/" className="flex-none w-70">
          <h1 className="text-2xl font-bold">Aabha Trade</h1>
        </Link>

        <div
          ref={searchBoxRef}
          className={
            "absolute center bg-white md:w-[800px] max-sm:w-full max-sm:pr-10 m-auto top-full mt-0.5 md:border-0 md:block md:relative md:inset-0 md:p-0 " +
            (searchBoxVisibility ? "block" : "hidden")
          }
        >
          <input
            type="text"
            placeholder="Search"
            id="search"
            ref={inputRef}
            aria-label="Search products"
            className="md:w-full max-sm:w-full max-sm:mb-3 bg-gray p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button
            aria-label="Search"
            className="absolute right-[7%] max-sm:right-[14%] md:pointer-events-none top-1/2 -translate-y-1/2"
            onClick={handleSearch}
          >
            <i className="fi fi-rr-search text-xl text-dark-grey"></i>
          </button>
        </div>

        <div className="flex items-center gap-5 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={handleSearchClick}
          >
            <i className="fi fi-rr-search"></i>
          </button>
          {props.type === "admin" && (
            <Link to="/" className="py-3 px-9 md:block">
              <i className="fi fi-ts-target-audience text-[20px]"></i>
            </Link>
          )}
          {props.type !== "admin" && (
            <Link to={authToken ? "/admin" : "/auth"} className="py-3 px-9 md:block">
              <i className="fi fi-ts-admin-alt text-[20px]"></i>
            </Link>
          )}
        </div>
      </nav>

      {/* Category Buttons */}
      <div className="category-buttons flex space-x-2 mt-4">
        {["All", "Shampoo", "Soap", "Oil", "Toothpaste"].map((category) => (
          <button
            key={category}
            className={`py-2 px-4 rounded-lg ${
              activeCategory === category ? "bg-black text-white" : "bg-gray-300"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Show only search results when search is active */}
      {searchQuery && searchResults.length > 0 ? (
        <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {searchResults.map((product) => (
            <ShowProducts
              key={product._id} // Ensure `_id` or a unique identifier is used
              id={product._id}
              src={product.src}
              alt={product.alt}
              title={product.title}
              manufacturer={product.manufacturer}
              price={product.price}
              type={props.type}
            />
          ))}
        </div>
      ) : (
        <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {products.map((product) => (
            <ShowProducts
              key={product._id} // Ensure `_id` or a unique identifier is used
              id={product._id}
              src={product.src}
              alt={product.alt}
              title={product.title}
              manufacturer={product.manufacturer}
              price={product.price}
              type={props.type}
            />
          ))}
        </div>
      )}
    </di>
  );
};

export default Navbar;

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
