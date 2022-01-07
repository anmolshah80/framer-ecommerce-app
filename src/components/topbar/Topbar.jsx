import React, { useState } from "react";
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
  ShoppingCart,
  Search,
} from "@mui/icons-material";
// import { AuthContext } from "../../context/authContext/AuthContext";

export default function Topbar() {
  // const { isFetching, dispatch } = useContext(AuthContext);

  // const handleLogout = () => {
  //   logout({ username }, dispatch);
  // }

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
        <div className="topRight">
          <div className="topbarIconContainer">
            <ShoppingCart className="shoppingCartIcon" />
          </div>
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
          <img
            src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/5146d1dbf9146c4d12a7249e72065a58.png"
            alt="Avatar profile"
            className="topAvatar"
          />

          {/* dropdown icon for logout */}
          <Navbar>
            <NavItem icon={<ArrowDropDownCircle />}>
              <DropdownMenu />
            </NavItem>
          </Navbar>
        </div>
      </div>
    </div>
  );
}

function DropdownMenu() {
  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }
  return (
    <div className="dropdown">
      <DropdownItem leftIcon={<Logout />}> Logout</DropdownItem>
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
