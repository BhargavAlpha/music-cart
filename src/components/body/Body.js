import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from './Body.module.css';
import { FaSearch } from "react-icons/fa";
import { GoHome } from "react-icons/fa";
import axios from "axios";
import gridview_active from "../../assets/gridview_active.png";
import gridview_inactive from "../../assets/gridview_inactive.png";
import listview_active from "../../assets/listview_active.png";
import listview_inactive from "../../assets/listview_inactive.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();

  const { loggedIn } = useContext(MyContext);

  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [gridview, setGridView] = useState(true);

const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });
   const showToastSuccessMessage = () => {
        toast.success(" Added to cart", {
          position: toast.POSITION.TOP_CENTER,
        });}

  const [filters, setFilters] = useState({
    type: "all",
    brand: "all",
    color: "all",
    minPrice: 0,
    maxPrice: Infinity,
    sortBy: "price",
    sortOrder: "asc",
  });
  const location = useLocation();

  useEffect(() => {
    try {
    const searchParams = new URLSearchParams(location.search);
    const loginSuccess = searchParams.get("loginSuccess");

    if (loginSuccess) {
      // Show success toast on the main page
      toast.success("Logged in Successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
      axios
        .get(
          `https://musicart-80cn.onrender.com/musicProducts/getAllMusicProducts?type=${filters.type}&sortBy=${filters.sortBy}&sortOrder=${filters.sortOrder}&color=${filters.color}&brand=${filters.brand}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&price=${filters.price}&serach=${searchItem}`
        )
        .then((response) => {
          let json = response.data;
          const results = json.filter((item) => {
            return item && item.name && item.name.includes(searchItem);
          });
          if (searchItem.length > 0) {
            setProducts(results);
          } else {
            setProducts(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [filters, searchItem,location.search]);

  const handleSearchChange = (value) => {
    setSearchItem(value);
  };

  const handleFilterChange = (filterName, value) => {
    if (filterName === "price") {
      var priceRange = value;
      var priceArray = priceRange.split("-");
      var minPrice = parseInt(priceArray[0], 10); 
      var maxPrice = parseInt(priceArray[1], 10);
      setFilters({
        ...filters,
        ["minPrice"]: minPrice,
        ["maxPrice"]: maxPrice,
      });
    } else if (filterName == "sort") {
      if (value === "name-z-to-a") {
        setFilters({
          ...filters,
          ["sortBy"]: "alphabetical",
          ["sortOrder"]: "dsc",
        });
      } else {
        setFilters({
          ...filters,
          ["sortBy"]: "alphabetical",
          ["sortOrder"]: "asc",
        });
      }
    } else {
      setFilters({
        ...filters,
        [filterName]: value,
      });
    }
  };
  const handleCurrentProduct = (value) => {
    localStorage.setItem("id", value);
    navigate("/viewProduct");
  };

  const addtoCart = (value)=>{
    // localStorage.setItem("current",JSON.stringify(data));
    const user = localStorage.getItem("user");
    try {
        axios.put(`https://musicart-80cn.onrender.com/musicProducts/${value}/cart/${user}`)
            .then((response) => { 
                console.log(response);
                showToastSuccessMessage();
            })                
    } catch (error) {
        console.log(error);
    }

}


  return (
    <div className={styles.footer}>
    <div className={styles.searchInputWrapper}>
      <FaSearch id={styles.searchIcon} />
      <input
        placeholder="Search Product"
        value={searchItem}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  
    {/* filters applying section */}
    <div className={styles.filterSection}>
      <div className={styles.filterWithoutSort}>
        {gridview ? (
          <div className={styles.views}>
            <img
              src={gridview_active}
              alt="grid"
              onClick={() => {
                setGridView(true);
              }}
            />
            <img
              src={listview_inactive}
              alt="list"
              onClick={() => setGridView(false)}
            />
          </div>
        ) : (
          <div className={styles.views}>
            <img
              src={gridview_inactive}
              alt="grid"
              onClick={() => {
                setGridView(true);
              }}
            />
            <img
              src={listview_active}
              alt="list"
              onClick={() => setGridView(false)}
            />
          </div>
        )}
  
        <div className={styles.filtersOntype}>
          <div>
            <select
              value={filters.productType}
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              <option value="all">Products Type</option>
              <option value="all">Featured</option>
              <option value="In-Ear">In-Ear</option>
              <option value="Over-Ear">Over-Ear</option>
              <option value="On-Ear">On-Ear</option>
            </select>
          </div>
          <div>
            <select
              value={filters.company}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            >
              <option value="all"> Company </option>
              <option value="all">Featured</option>
              <option value="Omiaro">Omiaro</option>
              <option value="Boult">Boult</option>
              <option value="boAt">boAt</option>
              <option value="Noise">Noise</option>
              <option value="Infinity">Infinity</option>
              <option value="OnePlus">OnePlus</option>
              <option value="ZEBRONICS">ZEBRONICS</option>
              <option value="Apple">Apple</option>
            </select>
          </div>
          <div>
            <select
              value={filters.color}
              onChange={(e) => handleFilterChange("color", e.target.value)}
            >
              <option value="all"> Color </option>
              <option value="all">Featured</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
            </select>
          </div>
          <div>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("price", e.target.value)}
            >
              <option value="all"> Price range </option>
              <option value="all">Featured</option>
              <option value="0-1000">₹0-₹1000</option>
              <option value="1000-10000">₹1000-₹10000</option>
              <option value="10000-20000">₹10000-₹20000</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.sort}>
        <label>Sort By:</label>
        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
        >
          <option value="none">None</option>
          <option value="price-low-to-high">Price:Lowest</option>
          <option value="price-high-to-low">Price:Highest</option>
          <option value="name-a-to-z">Name:(A to Z)</option>
          <option value="name-z-to-a">Name:(Z to A)</option>
        </select>
      </div>
    </div>
  
    {/* filteres products */}
    {gridview && products ? (
      <div className={styles.allProducts}>
        {products.map((item, index) => (
          <div className={styles.eachItem} key={item._id}>
            <div className={styles.itemImage}>
              <img
                src={item.main_image}
                alt="mainImage"
                onClick={() => {
                  handleCurrentProduct(item._id);
                }}
              />
              {loggedIn ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 65 65"
                  fill="none"
                  onClick={() => {
                    addtoCart(item._id);
                  }}
                >
                  {/* SVG content */}
                </svg>
              ) : (
                ""
              )}
            </div>
            <div className={styles.itemData}>
              <p>
                <b>{item.name}</b>
              </p>
              <p>
                <b>Price - ₹{item.price}</b>
              </p>
              <p>
                <b>{item.color} | {item.type} headphone</b>
              </p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      ""
    )}
  
    {!gridview && products ? (
      <div className={styles.allProductsNongridview}>
        {products.map((item, index) => (
          <div className={styles.eachItemNongrid} key={item._id}>
            <div className={styles.itemImageNongrid}>
              <img
                src={item.main_image}
                alt="mainImage"
                onClick={() => {
                  handleCurrentProduct(item._id);
                }}
              />
              {loggedIn ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 65 65"
                  fill="none"
                >
                  {/* SVG content */}
                </svg>
              ) : (
                ""
              )}
            </div>
            <div className={styles.itemDataNongrid}>
              <h3>
                <b>{item.name}</b>
              </h3>
              <p>
                <b>Price - ₹{item.price}</b>
              </p>
              <p>
                <b>{item.color} | {item.type} headphone</b>
              </p>
              <p>{item.description}</p>
              <button onClick={() => { handleCurrentProduct(item._id); }}>Details</button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      ""
    )}
    <ToastContainer />
  </div>
  

  );
};

export default Body;