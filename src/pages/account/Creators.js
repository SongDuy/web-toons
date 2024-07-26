import React, { useState, useEffect } from "react";
import Nav from "../../components/Account/nav";
import NotfoundAcount from "../../components/Account/NotfoundAcount";
const Creators = () => {
  const [Creators, setCreators] = useState([]);
  useEffect(() => {
    setCreators([
   
    ]);
  }, []);
  return (
    <div>
      <div className="w-full h-full bg-gray-100">
        <Nav />

        {Creators.length === 0 ? (
          <NotfoundAcount page="creators" titlepage="Start following your favorite creators now." />
        ) : (
          <div className="w-full h-full bg-gray-100">
            <div className="py-[30px] flex-row justify-center items-center container mx-auto my-auto">
              <div className="w-full h-full flex-row   bg-white border border-white p-5">
                {Creators.map((item) => {
                  return (
                    <div className="flex-row ml-5 my-5 w-full h-full border-b border-gray-300 p-5" key={item.id}>
                    
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Creators;
