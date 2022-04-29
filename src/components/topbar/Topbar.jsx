import React, { useState, useEffect } from "react";
import "./topbar.css";
import {
  ArrowDropDownCircle,
  Logout,
  Login,
  ShoppingCart,
  Search,
  ShoppingCartCheckout,
  HowToReg,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, getUserProfileById } from "../../actions/userActions";
import Skeleton from "../skeleton/Skeleton";
import { filterProducts } from "../../actions/productActions";
import avatar from "../../avatar";

export default function Topbar() {
  const cartReducer = useSelector((state) => state.cartReducer);

  const { cartItems } = cartReducer;

  const currentUserState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = currentUserState;

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const handleSearchQuery = () => {
    if (searchQuery !== "") {
      dispatch(filterProducts(searchQuery, "", "", 0, 0));
    }
  };

  const userProfileState = useSelector(
    (state) => state.getUserProfileByIdReducer
  );

  const { user_profile, loading, error } = userProfileState;

  useEffect(() => {
    dispatch(getUserProfileById(currentUser._id));
  }, []);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <a href="/" className="navigationLogo">
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46">
              <path d="M 0 0 L 38 0 L 38 46 L 0 46 Z" fill="#FFFFFF"></path>
              <path
                d="M 19.088 38.262 L 8.294 27.988 L 8.294 17.714 L 18.827 17.714 L 8.294 7.688 L 29.882 7.688 L 29.882 17.962 L 19.349 17.962 L 29.882 27.988 L 19.088 27.988 Z"
                fill="#000000"
              ></path>
            </svg>
            <span className="logoWordmark">Framer</span>
          </a>
        </div>
        <div className="topbarSearch">
          <input
            type="text"
            className="topbarSearchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="topbarSearchIcon" onClick={handleSearchQuery} />
        </div>

        {loading ? (
          <Skeleton type="topbar" />
        ) : error ? (
          <Skeleton type="custom_effect" message="error" />
        ) : (
          <div className="topRight">
            <Link to="/cart">
              <div className="topbarIconContainer">
                <ShoppingCart className="shoppingCartIcon" />
                <span className="items__inCart">{cartItems.length}</span>
              </div>
            </Link>

            <Link to="/user-profile">
              <img
                src={user_profile?.profileAvatar || avatar}
                alt="Avatar profile"
                className="topAvatar"
              />
            </Link>

            {/* dropdown icon for logout */}
            <Navbar>
              <NavItem icon={<ArrowDropDownCircle />}>
                <DropdownMenu />
              </NavItem>
            </Navbar>
          </div>
        )}
      </div>
    </div>
  );
}

function DropdownMenu() {
  function DropdownItem(props) {
    return (
      <React.Fragment>
        {props.handleRequest ? (
          <div className="menu-item" onClick={props.handleRequest}>
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
          </div>
        ) : (
          <a
            href={props.handleRedirect}
            className="menu-item"
            onClick={props.handleRequest}
          >
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
          </a>
        )}
      </React.Fragment>
    );
  }

  // logout request for a customer account
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const currentUserState = useSelector((state) => state.loginSellerUserReducer);
  const { currentUser } = currentUserState;

  return (
    <div className="dropdown">
      {currentUser !== null ? (
        <React.Fragment>
          <DropdownItem
            leftIcon={<ShoppingCartCheckout />}
            handleRedirect="/orders"
          >
            {" "}
            Orders{" "}
          </DropdownItem>
          <DropdownItem
            leftIcon={<Logout />}
            handleRedirect=""
            handleRequest={handleLogout}
          >
            {" "}
            Logout{" "}
          </DropdownItem>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <DropdownItem leftIcon={<Login />} handleRedirect="/login">
            {" "}
            Login{" "}
          </DropdownItem>
          <DropdownItem leftIcon={<HowToReg />} handleRedirect="/register">
            {" "}
            Register{" "}
          </DropdownItem>
        </React.Fragment>
      )}
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}
