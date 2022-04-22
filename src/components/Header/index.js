import React from "react";
import UserDetails from "../UserDetails";
import TrackSearch from "../TrackSearch";
import "./Header.css";

const Header = () => (
  <div className="header">
    <TrackSearch />
    <UserDetails />
  </div>
);


export default Header;
