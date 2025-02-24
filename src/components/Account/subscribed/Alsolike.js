import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";

const Alsolike = () => {
  const random = useSelector(state => state.comic.random);
  const language = useSelector(state => state.hidden.language);

  return (
    <div className="mt-[30px] flex-row justify-center items-center container xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px]">
      <div className="min-w-max m-2">
        <span className="font-semibold text-lg text-black">
       {!language?  "You may also like": "이것도 좋아할 수 있습니다.(추천 드립니다)"}
        </span>
      </div>

      <div className="w-full h-full flex p-5">
        {random?.comic?.length === 0 ? <div></div> :
          <div className="grid xs:grid-cols-1 lg:grid-cols-3 gap-2 w-full">
            {random?.comic?.map(item => {
              return (

                <div className="grid grid-cols-4 gap-2" key={item.id}>

                  <div>
                    <img
                      src={item.squareThumbnail}
                      alt="img"
                      className="object-cover min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] rounded-md"
                    />
                  </div>
                  <div className="col-span-3">
                    <p className="truncate line-clamp-2 text-shadow-white transition-all after:content-['...']  w-3/4">
                      {item.title}
                    </p>
                    <p className=" text-[12px]">{item.Author}</p>
                    <p className="text-emerald-400 text-sm">
                      <FavoriteIcon sx={{ fontSize: 20, color: " #34d399" }} />{" "}
                      {item.views}
                    </p>
                  </div>
                </div>
              )
            })}



          </div>
        }
      </div>
    </div>



  );
};

export default Alsolike;
