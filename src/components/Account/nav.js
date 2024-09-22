import React from "react";
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();

  return (

    <div className="w-full h-[60px] bg-white shadow flex items-center justify-center border-t">
      <ul className="flex gap-10">
        <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname === '/subscribed' ? "text-black border-b-2" : "text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/subscribed">
          SUBSCRIBED
        </Link>

        <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname === '/dashboard' ? "text-black border-b-2" : "text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/dashboard">
          DASHBOARD
        </Link>
        <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname === '/mycomment' ? "text-black border-b-2" : "text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/mycomment">
          COMMENTS
        </Link>

        <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname === '/creators' ? "text-black border-b-2" : "text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/creators">
          CREATORS
        </Link>

        <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname === '/account' ? "text-black border-b-2" : "text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/account">
          ACCOUNT
        </Link>
      </ul>
    </div>


  );
};

export default Nav;
