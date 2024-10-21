import React from "react";
import { Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Identicon from "identicon.js";
import "./style.css";
import logo from "../images/logo.png";

const SiteNavbar = ({ account }) => {
  return (
    <Navbar id="header" className="custom-navbar">
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="Logo" style={{ height: "90px" }} />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="navbar-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Trang Chủ
          </NavLink>
          <NavLink
            to="/addProduct"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Thêm Sản Phẩm
          </NavLink>
          <NavLink
            to="/productList"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Mục Sản Phẩm
          </NavLink>
        </div>
        <div className="account-display">
          {account && (
            <>
              <img
                width="40"
                height="40"
                src={`data:image/png;base64,${new Identicon(
                  account,
                  40
                ).toString()}`}
                alt="profile"
              />
              <NavLink
                to="/userProducts"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
              </NavLink>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SiteNavbar;
