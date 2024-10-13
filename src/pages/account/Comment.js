import React, { useEffect } from "react";
import Nav from "../../components/Account/nav";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import NotfoundAcount from "../../components/Account/NotfoundAcount";
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { idusercomment } from "../../common/store/Comment";
import CommentFireBase from "../../common/services/Comment.services";
const Comment = () => {
  const gcomment = useSelector(state => state.Comment.commentid);
  const Account = useSelector(state => state.Account.Account);

 //Lấy ngôn ngữ
  const language = useSelector(state => state.hidden.language);

  //Xem các tập tiếp theo trong series
  const dispatch = useDispatch();
  useEffect(() => {
    const getcomment = async () => {
      try {
        if (Account && Account.uid) {
          const comments = await dispatch(idusercomment(Account.uid));
          unwrapResult(comments);
        }
      } catch (error) {

      }
    }
    getcomment()
  }, [Account, dispatch]);
  const formatTimeDifference = (create_time) => {
    const time = new Date();
    const itemTime = new Date(create_time);

    const timeDiff = time - itemTime;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years >= 1) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months >= 1) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days >= 1) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours >= 1) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes >= 1) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };
  const hanledelete = async (id) => {
    try {
      let result = window.confirm(!language ?"Do you want to delete this comment?":"이 댓글을 삭제하시겠습니까?");
      if (result) {
        await CommentFireBase.Delete(id)
        const comments = await dispatch(idusercomment(Account.uid));
        unwrapResult(comments);
      }
    } catch (error) {
      console.log(error)
    }
  }

 

  return (
    <div>
      <div className="w-full h-full bg-gray-100">
        <Nav />

        {gcomment?.Comment?.length === 0 ? (
          <NotfoundAcount
            page={!language ? "No comments." : "댓글이 없습니다. "}
            titlepage={!language ? "You haven't posted any comments yet." : "아직 댓글을 작성하지 않았습니다."}
          />
        ) : (
          <div className="w-full h-full xs:px-[40px] sm:px-[80px] md:px-[100px] lg:px-[130px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px] bg-gray-100">
            <div className="py-[30px] flex-row justify-center items-center container mx-auto my-auto">
              <div className="w-full h-full flex-row   bg-white border border-white p-5">
                {gcomment.Comment?.map((item) => {
                  return (
                    <div className="flex-row ml-5 my-5 w-full h-full border-b border-gray-300 p-5" key={item.idcomment}>
                      <div>
                        <p className="font-semibold text-lg text-black">
                          {item.title}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-base text-gray-400">
                          {item.comment}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-400">
                          {formatTimeDifference(item.createTime)}
                        </p>
                      </div>
                      <div className="flex justify-end items-end w-full mr-[5%]">
                        <button className="border border-gray-300 py-1 px-2 ">
                          {" "}
                          <ThumbUpIcon sx={{ fontSize: 20, marginRight: 1 }} />{item.like}

                        </button>
                        <button className="border border-gray-300 py-1 px-2  mx-2">
                          {" "}
                          <ThumbDownIcon
                            sx={{ fontSize: 20, marginRight: 1 }}
                          />
                          {item.dislike}
                        </button>
                        <button className="border border-gray-300 py-1 px-4 " onClick={() => hanledelete(item.idcomment)}>
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
