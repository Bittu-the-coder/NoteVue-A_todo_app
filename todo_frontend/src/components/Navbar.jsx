import React from "react";

const Navbar = ({ pageName }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <a className="text-xl font-semibold">{pageName}</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-sm btn-outline">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
