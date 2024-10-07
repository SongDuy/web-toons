import React, { useState, useEffect } from "react";
import Nav from "../../components/Account/nav";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";

import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import VideoFireBase from "../../common/services/Video.services";
import comicFireBase from "../../common/services/Comic.services";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { setcurrentStepOriginal, setcurrentStepVideo } from "../../common/store/hidden";
const Dashboard = () => {
  const Account = useSelector((state) => state.Account.Account);
  const [videos, setvideos] = useState([]);
  const [comics, setcomics] = useState([]);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const get = async () => {
      try {
        setloading(false)

        const videos = await VideoFireBase.getbyuser(Account.uid);
        const comics = await comicFireBase.getbyuser(Account.uid);
        
        setvideos(videos.success ? videos.Video : []);
        setcomics(comics.success ? comics.comic : []);
        setloading(true)

      } catch (error) {}
    };
    get();
  }, [Account]);
  const handledeletecomic=async (idcomic)=>{
    try {
        let result = window.confirm("Do you want to delete this chap comic?");
        if(result){
        setloading(false)
        await comicFireBase.Delete(idcomic)
        const comics = await comicFireBase.getbyuser(Account.uid);
        
        setcomics(comics.success ? comics.comic : []);
       setloading(true)
        }
    } catch (error) {
        
    }
}
const handledeleteVideo=async (id)=>{
  try {
      let result = window.confirm("Do you want to delete this Video?");
      if(result){
      setloading(false)

await VideoFireBase.Delete(id)
const videos = await VideoFireBase.getbyuser(Account.uid);
setvideos(videos.success ? videos.Video : []);

     setloading(true)
      }
  } catch (error) {
      
  }
}
  return (
    <>
      {!loading?<Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',margin:5 }}>
<CircularProgress />
</Box>:
    <div>
    
      <Nav />
      <div className="w-full h-full border bg-gray-100 flex items-center justify-center pb-10">
        <div className="w-[1130px] min-h-[550px]">
          <div className="w-full h-full mt-4">
            <div className="w-full h-full flex items-center">
              <h1 className="font-semibold text-xl">
                Select the original series
              </h1>
              <Link
                to={`/publish/original`}
            
                className="w-[150px] h-[35px] text-white font-semibold bg-black ml-auto rounded-full flex items-center justify-center"
              >
                <button className="w-full h-full"     onClick={()=>  dispatch(setcurrentStepOriginal(1))}>
                  <AddIcon />
                  Create Series
                </button>
              </Link>
            </div>

            <div className="w-full h-full mt-4">
              <ul className="grid grid-cols-2 gap-4">
                {/* khung nội dung */}
                {comics?.map((item) => (
                  <li
                    className="w-full h-[210px] bg-white rounded flex shadow"
                    key={item.id}
                  >
                    <div className="w-[210px] h-[210px] bg-red-200 rounded">
                      <img
                        src={item.squareThumbnail}
                        alt="img"
                        className="w-full h-full object-fill rounded"
                      />
                    </div>

                    <div className="h-full px-3 py-3">
                      <div className="w-[320px]">
                        <div className="flex items-center">
                          <span className="text-gray-500 text-sm">
                            {item.genre1}, {item.genre2}
                          </span>

                          <div className="flex ml-auto gap-2">
                            <button  onClick={() =>{ navigate(`/publish/original/${item.id}`);   dispatch(setcurrentStepOriginal(1))} } className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                              Edit
                            </button>

                            <button onClick={()=>handledeletecomic(item.id)} className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className="w-full h-[50px] mt-2 overflow-hidden">
                          <h1 className="font-semibold text-xl leading-[1.2] line-clamp-2">
                            {item.title}
                          </h1>
                        </div>
                      </div>

                      <div className="w-full mt-3">
                        {item.rate > 0 ? (
                          <div className="w-full">
                            <span className="text-yellow-500 flex items-center gap-2">
                              <StarIcon />
                              {item.rate}
                            </span>
                          </div>
                        ) : (
                          <div className="w-full">
                            <span className="text-red-500 flex items-center">
                              Not Yet Rated
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="w-full mt-2">
                        {item.totalChapters > 0 ? (
                          <div className="flex gap-5">
                            <span className="text-gray-500 text-sm flex gap-2">
                              Published{" "}
                              {monthNames[new Date(item.createTime).getMonth()]}{" "}
                              {new Date(item.createTime).getDate()},
                              {new Date(item.createTime)?.getFullYear()}
                            </span>

                            <span className="text-gray-500 text-sm">
                              Episodes {item.totalChapters}
                            </span>
                          </div>
                        ) : (
                          <div className="flex gap-5">
                            <span className="text-gray-500 text-sm">
                              Add episodes to publish your title.
                            </span>
                          </div>
                        )}

                        <div className="mt-2 flex ml-auto gap-2">
                          <Link to={`/dashboard/original/episode/${item.id}`}>
                            <button className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                              Edit Episode
                            </button>
                          </Link>
                          <button     onClick={() =>{ navigate(`/publish/original/${item.id}`);   dispatch(setcurrentStepOriginal(2))} }  className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                            <AddIcon />
                            Add Episode
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full h-full mt-4">
            <div className="w-full h-full flex items-center">
              <h1 className="font-semibold text-xl">Select the video series</h1>
              <Link
                to={`/publish/video`}
             
                className="w-[150px] h-[35px] text-white font-semibold bg-black ml-auto rounded-full flex items-center justify-center"
              >
                <button className="w-full h-full" onClick={()=>    dispatch(setcurrentStepVideo(1))}>
                  <AddIcon />
                  Create Series
                </button>
              </Link>
            </div>

            <div className="w-full h-full mt-4">
              <ul className="grid grid-cols-2 gap-4">
                {/* khung nội dung */}
                {videos?.map((item) => (
                  <li
                    className="w-full h-[210px] bg-white rounded flex shadow"
                    key={item.id}
                  >
                    <div className="w-[210px] h-[210px] bg-red-200 rounded">
                      <img
                        src={item.squareThumbnail}
                        alt="img"
                        className="w-full h-full object-fill rounded"
                      />
                    </div>

                    <div className="h-full px-3 py-3">
                      <div className="w-[320px]">
                        <div className="flex items-center">
                          <div className="flex ml-auto gap-2">
                            <button onClick={() =>{ navigate(`/publish/video/${item.id}`);   dispatch(setcurrentStepVideo(1))} }  className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                              Edit
                            </button>

                            <button onClick={()=>handledeleteVideo(item.id)} className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className="w-full h-[50px] mt-2 overflow-hidden">
                          <h1 className="font-semibold text-xl leading-[1.2] line-clamp-2">
                            {item.title}
                          </h1>
                        </div>
                      </div>

                      <div className="w-full mt-3">
                        {item.rate > 0 ? (
                          <div className="w-full">
                            <span className="text-yellow-500 flex items-center gap-2">
                              <StarIcon />
                              {item.rate}
                            </span>
                          </div>
                        ) : (
                          <div className="w-full">
                            <span className="text-red-500 flex items-center">
                              Not Yet Rated
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="w-full mt-2">
                        {item.totalChapters > 0 ? (
                          <div className="flex gap-5">
                            <span className="text-gray-500 text-sm flex gap-2">
                              Published{" "}
                              {monthNames[new Date(item.createTime).getMonth()]}{" "}
                              {new Date(item.createTime).getDate()},
                              {new Date(item.createTime)?.getFullYear()}
                            </span>

                            <span className="text-gray-500 text-sm">
                              Episodes {item.totalChapters}
                            </span>
                          </div>
                        ) : (
                          <div className="flex gap-5">
                            <span className="text-gray-500 text-sm">
                              Add episodes to publish your title.
                            </span>
                          </div>
                        )}

                        <div className="mt-2 flex ml-auto gap-2">
                          <Link to={`/dashboard/video/episode/${item.id}`}>
                            <button className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                              Edit Episode
                            </button>
                          </Link>

                          <button  onClick={() =>{ navigate(`/publish/video/${item.id}`);   dispatch(setcurrentStepVideo(2))} }  className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                            <AddIcon />
                            Add Episode
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
}
</>
  );
};

export default Dashboard;
