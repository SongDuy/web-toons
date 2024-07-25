import React from "react";
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
    const location = useLocation();

  return (
  
        <div className="w-full h-[60px] bg-white shadow flex items-center justify-center border-t">
          <ul className="flex gap-10">
          <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname ==='/Subscribed'?"text-black border-b-2":"text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/Subscribed">
          SUBSCRIBED
            </Link>
            <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname ==='/comment'?"text-black border-b-2":"text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/comment">
            COMMENTS
            </Link>
         
            <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname ==='/Creators'?"text-black border-b-2":"text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/Creators">
            CREATORS
            </Link>

            <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname ==='/account'?"text-black border-b-2":"text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/account">
              ACCOUNT
            </Link>
          </ul>
        </div>

      
  );
};

export default Nav;
