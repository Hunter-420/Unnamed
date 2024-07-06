import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ShowProducts from "./../common/ShowProducts"; // Adjust the import path according to your project structure

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const inputRef = useRef();
  const searchBoxRef = useRef();

  useEffect(() => {
    if (searchBoxVisibility) {
      inputRef.current.focus();
    }
  }, [searchBoxVisibility]);

  const handleSearchClick = () => {
    setSearchBoxVisibility(!searchBoxVisibility);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;
    try {
      const response = await axios.get('http://localhost:5000/api/products/search', {
        params: { query: searchQuery }
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery]);

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

  return (
    <>
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
            className="md:w-full max-sm:w-full max-sm:mb-3 bg-gray p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <Link
            to="#"
            className="absolute right-[7%] max-sm:right-[14%] md:pointer-events-none top-1/2 -translate-y-1/2"
            onClick={handleSearch}
          >
            <i className="fi fi-rr-search text-xl text-dark-grey"></i>
          </Link>
        </div>

        <div className="flex items-center gap-5 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={handleSearchClick}
          >
            <i className="fi fi-rr-search"></i>
          </button>

          <Link to="/auth" className="py-3 px-9 md:block">
            <i className="fi fi-br-shopping-bag text-[20px]"></i>
          </Link>
        </div>
      </nav>

      {products.length > 0 && (
        <div className="product-list">
          {products.map((product) => (
            <ShowProducts
              key={product._id} // Ensure `_id` or a unique identifier is used
              id={product._id}
              src={product.src}
              alt={product.alt}
              title={product.title}
              manufacturer={product.manufacturer}
              price={product.price}
              type="customer"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
