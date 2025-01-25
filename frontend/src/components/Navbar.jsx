import axios from "axios";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const Navigate = useNavigate();

  const logout = () => {
    axios
      .post("http://localhost:3000/api/logout")
      .then((res) => {
        console.log(res.data);
        Navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const change = () => {
    if (props.title === "Products") {
      Navigate("/order");
    }else{
      Navigate("/products");
    }
  };
  return (
    <>
      <div className="flex justify-around items-center">
        <div className="text-center text-5xl m-[1.5rem] font-bold text-[#116035] ">
          <h1>{props.title}</h1>
        </div>
        <div className="flex gap-8 text-xl">
          <button onClick={change}>{props.button}</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
