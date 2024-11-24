import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const NavPolicys = () => {
  const location = useLocation();
  const language = useSelector(state => state.hidden.language);

  return (
    <div className="w-full h-[60px] bg-white shadow  flex items-center justify-center border-t  ">
      <ul className="flex gap-10">
        <Link
          className={`h-[60px] uppercase font-semibold text-base ${
            location.pathname === "/terms"
              ? "text-black border-b-2"
              : "text-gray-300 "
          }  border-b-black hover:text-black cursor-pointer flex items-center justify-center`}
          to="/terms"
        >
          {!language ? (
                                    <span>Terms</span>

                                ) : (
                                    <span>약관</span>
                                )}
        </Link>
        <Link
          className={`h-[60px] uppercase font-semibold text-base ${
            location.pathname === "/Privacy"
              ? "text-black border-b-2"
              : "text-gray-300 "
          }  border-b-black hover:text-black cursor-pointer flex items-center justify-center`}
          to="/Privacy"
        >
          {!language ? (
                                    <span>Privacy</span>

                                ) : (
                                    <span>사생활</span>
                                )}
        </Link>

        <Link
          className={`h-[60px] uppercase font-semibold text-base ${
            location.pathname === "/Advertise"
              ? "text-black border-b-2"
              : "text-gray-300 "
          }  border-b-black hover:text-black cursor-pointer flex items-center justify-center`}
          to="/Advertise"
        >
          {!language ? (
                                    <span>Advertise</span>

                                ) : (
                                    <span>광고하다</span>
                                )}
        </Link>

      
      </ul>
    </div>
  );
};

export default NavPolicys;
