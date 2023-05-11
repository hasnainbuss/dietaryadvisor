import React from "react";
import DALogo from "../Components/Pictures/DALogo.PNG";
import './dietary.css';

function Header() {
  return (
    <>
      <div
        style={{
          width: "99.6%",
          height: "100px",
          marginBottom: "100px",
          display: "flex",
          borderStyle: "outset",
        }}
      >
        <div style={{ width: "200px", height: "99px" , marginLeft:"15px"}}>
          <img className="logoimg" src={DALogo} alt="logo" width="200px" height="99px" />
        </div>
        {/* <div
          style={{ border: "1px solid", width: "200px", height: "99px" }}
        ></div> */}
      </div>
    </>
  );
}

export default Header;
