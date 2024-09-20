import React from "react";
import { NavLink } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";

const Navbar = () => {
	return (
  <>
    <div className="flex flex-row bg-black justify-center items-center">
      <NavLink to={"/"} className="text-3xl font-bold flex items-center gap-1 pt-1 pb-1"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
      )}>E commerce<MdRestaurantMenu size={"32px"}/>
      </NavLink>

    {/* Add more NavLinks here, linkStyles is a JS CSS object that allows for gray shading of active / inactive links */}
    </div>
  
  </>
	)
}

export default Navbar

const linkStyles = {
  activeLink: {
    color: "gray",
  },
  defaultLink: {
    textDecoration: "none",
    color: "white",
  },
};
//