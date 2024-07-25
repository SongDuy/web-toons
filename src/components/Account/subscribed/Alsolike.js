import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Alsolike = () => {
const [AlsoLike, setAlsoLike] = useState([]);
useEffect(() => {
    setAlsoLike([
      {
        id: 1,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        View: 1800145,
        Author: "singNsong/UMI",
        Create: "july 22,2024",
      },
      {
        id: 2,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        View: 1800145,
        Author: "singNsong/UMI",
        Create: "july 22,2024",
      },
      {
        id: 3,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        View: 1800145,
        Author: "singNsong/UMI",
        Create: "july 22,2024",
      },
    ]);
  }, []);
  return (
    <div className=" flex-row justify-center items-center container mx-auto my-auto">
    <div className="  m-2">
      <span className="font-semibold text-lg text-black">
        You may also like
      </span>
    </div>

    <div className="w-full h-full flex    p-5">
    {AlsoLike.length===0?<div></div>:
      <div className="grid grid-cols-3 gap-2 w-full">
      {AlsoLike.map(item=>{return(
                
        <div className="grid grid-cols-4 gap-2" key={item.id}>
       
       <div>
         <img
           src="https://swebtoon-phinf.pstatic.net/20240625_57/1719286876300gluny_JPEG/2EpisodeList_Mobile.jpg?type=crop540_540"
           alt=""
           className="object-contain"
         />
       </div>
       <div className="col-span-3">
         <p className="truncate line-clamp-2 transition-all after:content-['...']  w-3/4">
          {item.Name}
         </p>
         <p className=" text-[12px]">{item.Author}</p>
         <p className="text-emerald-400 text-sm">
           <FavoriteIcon sx={{ fontSize: 20, color: " #34d399" }} />{" "}
           {item.View}
         </p>
       </div>
     </div>
                )})}
       
      
        
      </div>
    }
    </div>
  </div>
      

      
  );
};

export default Alsolike;
