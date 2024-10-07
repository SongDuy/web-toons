import React from "react";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();

  //Lấy ngôn ngữ
  const language = useSelector(state => state.hidden.language);

  return (

    <div className="w-full h-[60px] bg-white shadow flex items-center justify-center border-t">
      <ul className="flex gap-10">
        <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname === '/subscribed' ? "text-black border-b-2" : "text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/subscribed">
          {!language ? <span> SUBSCRIBED </span> : <span> 구독 중 </span>}
        </Link>

        <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname === '/dashboard' ? "text-black border-b-2" : "text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/dashboard">
          {!language ? <span> DASHBOARD </span> : <span> 대시보드 </span>}
        </Link>
        <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname === '/mycomment' ? "text-black border-b-2" : "text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/mycomment">
          {!language ? <span> COMMENTS </span> : <span> 댓글 </span>}
        </Link>

        <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname === '/creators' ? "text-black border-b-2" : "text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/creators">
          {!language ? <span> CREATORS </span> : <span> 창작자 </span>}
        </Link>

        <Link className={`h-[60px] uppercase font-semibold text-base ${location.pathname === '/account' ? "text-black border-b-2" : "text-gray-300 "}  border-b-black hover:text-black cursor-pointer flex items-center justify-center`} to="/account">
          {!language ? <span> ACCOUNT </span> : <span> 계정 </span>}
        </Link>
      </ul>
    </div>

  );
};

export default Nav;
