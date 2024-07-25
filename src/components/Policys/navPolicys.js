import React from "react";
import { Link, useLocation } from 'react-router-dom';

const NavPolicys = () => {
    const location = useLocation();

  return (
  
        <div className="w-full h-[60px] bg-white shadow  flex items-center justify-center border-t  ">
          <ul className="flex gap-10">
          <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname ==='/terms'?"text-black border-b-2":"text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/terms">
          TERMS OF USE
            </Link>
            <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname ==='/terms/privacyPolicy'?"text-black border-b-2":"text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/terms/privacyPolicy">
            PRIVACY POLICY
            </Link>
         
            <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname ==='/terms/canvasPolicy'?"text-black border-b-2":"text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/terms/canvasPolicy">
            COMMUNITY POLICY
            </Link>

            <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname ==='/terms/canvasTermsOfUsePolicy'?"text-black border-b-2":"text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/terms/canvasTermsOfUsePolicy">
            CANVAS TERMS OF USE
            </Link>
            <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname ==='/terms/adRevenueSharingPolicy'?"text-black border-b-2":"text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/terms/adRevenueSharingPolicy">
            AD REVENUE SHARING TERMS
            </Link>
            <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname ==='/terms/superLikePolicy'?"text-black border-b-2":"text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/terms/superLikePolicy">
            SUPER LIKE TERMS
            </Link>
          </ul>
        </div>

      
  );
};

export default NavPolicys;
