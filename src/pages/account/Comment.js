import React, { useState, useEffect } from "react";
import Nav from "../../components/Account/nav";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import NotfoundAcount from "../../components/Account/NotfoundAcount";
const Comment = () => {
  const [Comment, setComment] = useState([]);
  useEffect(() => {
    setComment([
      {
        id:1,
        Name: "The Lone Necromancer (S2) Ep. 125 - Foreign Powers Vs. The Korean Server (2)",
        Comment: "Hello",
        Create: "1 hours ago",
      },
    ]);
  }, []);
  return (
    <div>
      <div className="w-full h-full bg-gray-100">
        <Nav />

        {Comment.length === 0 ? (
          <NotfoundAcount page="comments." titlepage="You haven't posted any comments yet." />
        ) : (
          <div className="w-full h-full bg-gray-100">
            <div className="py-[30px] flex-row justify-center items-center container mx-auto my-auto">
              <div className="w-full h-full flex-row   bg-white border border-white p-5">
                {Comment.map((item) => {
                  return (
                    <div className="flex-row ml-5 my-5 w-full h-full border-b border-gray-300 p-5" key={item.id}>
                      <div>
                        <p className="font-semibold text-lg text-black">
                          {item.Name}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-base text-gray-400">
                          {item.Comment}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-400">
                          {item.Create}
                        </p>
                      </div>
                      <div className="flex justify-end items-end w-full mr-[5%]">
                        <button className="border border-gray-300 py-1 px-2 ">
                          {" "}
                          <ThumbUpIcon sx={{ fontSize: 20, marginRight: 1 }} />0
                        </button>
                        <button className="border border-gray-300 py-1 px-2  mx-2">
                          {" "}
                          <ThumbDownIcon
                            sx={{ fontSize: 20, marginRight: 1 }}
                          />
                          0
                        </button>
                        <button className="border border-gray-300 py-1 px-4 ">
                          {" "}
                          <DeleteIcon sx={{ fontSize: 20 }} />
                        </button>
                      </div>
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

export default Comment;
