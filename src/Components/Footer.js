import React from "react";
// import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#606060",
          width: "100%",
          height: "110px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ width: "200px", height: "99px" }}>
          <h2 style={{ color: "whitesmoke" }}>Contact Information</h2>
        </div>
        <div style={{ width: "200px", height: "99px" }}>
          <h2 style={{ color: "whitesmoke" }}>Email:</h2>
          <h4 style={{ color: "whitesmoke" }}>hasnainbuss@gmail.com</h4>
        </div>
        {/* <div
          style={{ width: "200px", height: "99px" }}
        >
          
        <SocialIcon url="https://www.twitter.com" />
        </div> */}
      </div>
    </>
  );
}

export default Footer;
