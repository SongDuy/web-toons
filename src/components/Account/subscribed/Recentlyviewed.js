import React, { useState, useEffect } from "react";

const Recentlyviewed = () => {
const [Recently, setRecently] = useState([]);
useEffect(() => {
    setRecently([
      {
        id: 1,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Rate: 180,
        Create: "july 22,2024",
      },
      {
        id: 2,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Rate: 180,
        Create: "july 22,2024",
      },
      {
        id: 3,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Rate: 180,
        Create: "july 22,2024",
      },
    ]);
  }, []);
  return (
    <div className="py-[10px] flex-row justify-center items-center container mx-auto my-auto">
    <div className="  m-2">
      <span className="font-semibold text-lg text-black">
        Recently viewed
      </span>
    </div>

    <div className="w-full h-full flex    p-5">
    {Recently.length===0 ?<div></div>:
      <div className="grid grid-cols-10 gap-2 w-full">
      {Recently.map(item=>{return(
        <div key={item.id}>
          <img
            src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
            alt=""
            className="object-contain"
          />
          <p className="truncate line-clamp-2 transition-all after:content-['...']  ">
           {item.Name}
          </p>{" "}
          <p className="text-gray-400 text-sm">#{item.Rate}</p>
        </div>

      )})}
      
      
      </div>
    }
    </div>
    
  </div>
      

      
  );
};

export default Recentlyviewed;
