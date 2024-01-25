// import React from 'react';
import React, { useState, useEffect } from "react";
import styles from "./Body.module.css";
import { GoHome } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa6";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

import { useNavigate } from "react-router-dom";
import NavigationIcons from "../navigate/Navigate";
const MobileBody = () => {
  const navigate = useNavigate();

  const { loggedIn } = useContext(MyContext);
  const { currentPage, setCurrentpage } = useContext(MyContext);

  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [gridview, setGridView] = useState(true);

  const [filters, setFilters] = useState({
    type: "all",
    brand: "all",
    color: "all",
    minPrice: 0,
    maxPrice: Infinity,
    sortBy: "price",
    sortOrder: "asc",
  });

  useEffect(() => {
    try {
      axios
        .get(
          `https://musicart-80cn.onrender.com/musicProducts/getAllMusicProducts?type=${filters.type}&sortBy=${filters.sortBy}&sortOrder=${filters.sortOrder}&color=${filters.color}&brand=${filters.brand}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&price=${filters.price}`
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
  }, [filters, searchItem]);

  const handleSearchChange = (value) => {
    setSearchItem(value);
  };

  const handleFilterChange = (filterName, value) => {
    if (filterName === "price") {
      var priceRange = value;
      var priceArray = priceRange.split("-");
      var minPrice = parseInt(priceArray[0], 10); // Parse the first part as an integer
      var maxPrice = parseInt(priceArray[1], 10);
      setFilters({
        ...filters,
        ["minPrice"]: minPrice,
        ["maxPrice"]: maxPrice,
      });
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
  return (
    <div>
      <div className={styles.filters}>
        {/* filters applying section */}
        <div className={styles.filterSection}>
          <div className={styles.filterSort}>
            {/* <label>Sort By:</label> */}
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
            >
              <option value="none">sort By</option>
              <option value="price-low-to-high">Price:Lowest</option>
              <option value="price-high-to-low">Price:Highest</option>
              <option value="name-a-to-z">Name:(A to Z)</option>
              <option value="name-z-to-a">Name:(Z to A)</option>
            </select>
          </div>
          <div className={styles.filterWithoutSort}>
            <div className={styles.filtersOntype}>
              <div>
                {/* <label>Product Type:</label> */}
                <select
                  value={filters.productType}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <option value="all">Products</option>
                  <option value="all">Featured</option>
                  <option value="In-ear">In-Ear</option>
                  <option value="Over-ear">Over-Ear</option>
                  <option value="On-ear">On-Ear</option>
                </select>
              </div>
              <div>
                {/* <label>Company:</label> */}
                <select
                  value={filters.company}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                >
                  <option value="all">Company </option>
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
                {/* <label>Color:</label> */}
                <select
                  value={filters.color}
                  onChange={(e) => handleFilterChange("color", e.target.value)}
                >
                  <option value="all">Color </option>
                  <option value="all">Featured</option>
                  <option value="Blue">Blue</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Brown">Brown</option>
                </select>
              </div>
              <div>
                {/* <label>Price Range:</label> */}
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange("price", e.target.value)}
                >
                  <option value="all">Price range: </option>
                  <option value="all">Featured</option>
                  <option value="0-1000">₹0-₹1000</option>
                  <option value="1000-10000">₹1000-₹10000</option>
                  <option value="10000-20000">₹10000-₹20000</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.allProducts}>
        {products.map((item, index) => (
          <div className={styles.eachItem} key={item._id}>
            <div className={styles.itemImage}>
              <img
                src={item.main_image}
                alt="mainImage"
                onClick={() => handleCurrentProduct(item._id)}
              />
              {loggedIn && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 65 65"
                  fill="none"
                >
                  {/*... (your SVG content) ...*/}
                </svg>
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
                {item.color} | {item.type}
              </p>
            </div>
          </div>
        ))}
      </div>

      <NavigationIcons />
    </div>
  );
};

export default MobileBody;
