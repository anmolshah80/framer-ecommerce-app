import React, { useState, useContext } from "react";
import "./topbar.css";
// import {
//   NotificationsNone,
//   Language,
//   Settings,
//   ArrowDropDown,
// } from "@material-ui/icons";
import {
  ArrowDropDownCircle,
  Logout,
  Login,
  ShoppingCart,
  Search,
  ShoppingCartCheckout,
  HowToReg,
} from "@mui/icons-material";
import avatar from "../../avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { AuthContext } from "../../authContext/AuthContext";
// import { logoutUser } from "../../authContext/ApiCalls";
import { logoutUser } from "../../actions/userActions";

export default function Topbar() {
  // const { isFetching, dispatch } = useContext(AuthContext);

  // const handleLogout = (e) => {
  //   // e.prevenDefault();
  //   const username = localStorage.getItem("user");
  //   // logoutUser({ username }, dispatch);
  //   console.log("username", username);
  // };

  const getAllProductsState = useSelector(
    (state) => state.getAllProductsReducer
  );

  const { loading, products, error } = getAllProductsState;

  const cartReducer = useSelector((state) => state.cartReducer);

  const { cartItems } = cartReducer;

  const currentUser = JSON.parse(localStorage.getItem("user"));

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
          <input type="text" className="topbarSearchInput" />
          <Search className="topbarSearchIcon" />
        </div>

        {loading ? (
          <div className="topbar__skeleton">
            <div className="topbar__skeletonIcons"></div>
            <div className="avatar__skeletonIcon"></div>
            <div className="topbar__skeletonIcons"></div>
          </div>
        ) : (
          <div className="topRight">
            <Link to="/cart">
              <div className="topbarIconContainer">
                <ShoppingCart className="shoppingCartIcon" />
                <span className="items__inCart">{cartItems.length}</span>
              </div>
            </Link>
            {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">En</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
            {currentUser && (
              <Link to="/user-profile">
                <img
                  // src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/5146d1dbf9146c4d12a7249e72065a58.png"
                  src={avatar}
                  alt="Avatar profile"
                  className="topAvatar"
                />
              </Link>
            )}

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

  // logout
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  // const { isFetching, dispatch } = useContext(AuthContext);

  // const handleLogout = (e) => {
  //   // e.prevenDefault();
  //   const username = JSON.parse(localStorage.getItem("user")).username;
  //   logoutUser({ username }, dispatch);
  //   console.log("username", username);
  //   navigate("/");
  // };

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.reload();
  };

  // const handleLogin = () => {
  //   navigate("/login");
  // };

  // const handleSignup = () => {
  //   navigate("/register");
  // };

  // const handleOrders = () => {
  //   navigate("/orders");
  // };

  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dropdown">
      {currentUser ? (
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
