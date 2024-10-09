import React from "react";


const NotfoundAcount = (prop) => {

  return (
    <div className="h-full w-full flex  justify-center items-center p-[15%]">
      <div className="flex-rows mx-auto my-auto">
        <img src={`https://th.bing.com/th/id/OIP.U8tcSkoYIr3-RGPGwZUJ1AHaFj?w=201&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7`} alt="" className="mx-auto py-auto" />
        <p className="font-semibold text-lg text-black text-center">
          {prop.page}
        </p>
        <p className="font-semibold text-lg text-gray-400">

          {prop.titlepage}
        </p>
      </div>

    </div>


  );
};

export default NotfoundAcount;
