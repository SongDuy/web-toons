import React, { useState, useEffect } from "react";
import Nav from "../../components/Account/nav";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VideoFireBase from "../../common/services/Video.services";
import comicFireBase from "../../common/services/Comic.services";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import {
  setcurrentStepOriginal,
  setcurrentStepVideo,
} from "../../common/store/hidden";
import PaymentFireBase from "../../common/services/Payment.services";
import RateFireBase from "../../common/services/Rate.services";
import SubscribeFireBase from "../../common/services/Subscribe.services";
import CommentFireBase from "../../common/services/Comment.services";
const Dashboard = () => {
  const Account = useSelector((state) => state.Account.Account);
  const [videos, setvideos] = useState([]);
  const [comics, setcomics] = useState([]);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  //Lấy ngôn ngữ
  const language = useSelector((state) => state.hidden.language);

  const monthNames = [
    { en: "January", kr: "1월" },
    { en: "February", kr: "2월" },
    { en: "March", kr: "3월" },
    { en: "April", kr: "4월" },
    { en: "May", kr: "5월" },
    { en: "June", kr: "6월" },
    { en: "July", kr: "7월" },
    { en: "August", kr: "8월" },
    { en: "September", kr: "9월" },
    { en: "October", kr: "10월" },
    { en: "November", kr: "11월" },
    { en: "December", kr: "12월" },
  ];
  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);

        const videos = await VideoFireBase.getbyuser(Account.uid);
        const comics = await comicFireBase.getbyuser(Account.uid);

        setvideos(videos.success ? videos.Video : []);
        setcomics(comics.success ? comics.comic : []);
        setloading(true);
      } catch (error) { }
    };
    get();
  }, [Account]);
  const handledeletecomic = async (idcomic) => {
    try {
      let result = window.confirm(
        !language
          ? "Do you want to delete this chap comic?"
          : "이 남자 만화를 삭제하시겠습니까?"
      );
      if (result) {
        setloading(false);
        await comicFireBase.Delete(idcomic);
        await RateFireBase.DeleteComic(idcomic)
        await SubscribeFireBase.DeleteComic(idcomic)
        await CommentFireBase.DeleteComic(idcomic)
        const comics = await comicFireBase.getbyuser(Account.uid);

        setcomics(comics.success ? comics.comic : []);
        setloading(true);
      }
    } catch (error) { }
  };
  const handledeleteVideo = async (id) => {
    try {
      let result = window.confirm(
        !language
          ? "Do you want to delete this Video?"
          : "이 동영상을 삭제하시겠습니까?"
      );
      if (result) {
        setloading(false);
        await VideoFireBase.Delete(id);
        await PaymentFireBase.DeleteVideo(id)
        await RateFireBase.DeleteVideo(id)
        await SubscribeFireBase.DeleteVideo(id)
        await CommentFireBase.DeleteVideo(id)
        const videos = await VideoFireBase.getbyuser(Account.uid);
        setvideos(videos.success ? videos.Video : []);

        setloading(true);
      }
    } catch (error) { }
  };

  return (
    <>
      {!loading ? (
        <div className="w-full h-[370px] flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Nav />
          <div className="w-full h-full xs:px-[20px] sm:px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] 2xl:px-[200px] 3xl:px-[240px] bg-gray-100 flex items-center justify-center pb-10">
            <div className="w-full min-h-[550px]">
              <div className="w-full h-full mt-4">
                <div className="w-full h-full flex items-center">
                  <h1 className="font-semibold text-xl">
                    {!language
                      ? "Select the original series"
                      : "오리지널 시리즈 선택"}
                  </h1>

                  <Link
                    to={`/publish/original`}
                    className="w-[150px] h-[35px] text-white font-semibold bg-black ml-auto rounded-full flex items-center justify-center"
                  >
                    <button
                      className="w-full h-full"
                      onClick={() => dispatch(setcurrentStepOriginal(1))}
                    >
                      <AddIcon />
                      {!language ? "Create Series" : "시리즈 만들기"}
                    </button>
                  </Link>
                </div>

                <div className="w-full h-full mt-4">
                  <ul className="grid xs:grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* khung nội dung */}
                    {comics?.map((item) => (
                      <li
                        className="w-full min-h-[210px] bg-white rounded flex shadow"
                        key={item.id}
                      >
                        <div className="w-[210px] max-h-[210px] bg-red-200 rounded">
                          <img
                            src={item.squareThumbnail}
                            alt="img"
                            className="w-full h-full object-cover rounded"
                          />
                        </div>

                        <div className="w-full h-full px-3 py-3">
                          <div className="w-auto">
                            <div className="flex items-center">
                              <span className="text-gray-500 text-sm">
                                {item.genre1}, {item.genre2}
                              </span>

                              <div className="flex ml-auto gap-2">
                                <button
                                  onClick={() => {
                                    navigate(`/publish/original/${item.id}`);
                                    dispatch(setcurrentStepOriginal(1));
                                  }}
                                  className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow"
                                >
                                  {!language ? "Edit" : "편집"}
                                </button>

                                <button
                                  onClick={() => handledeletecomic(item.id)}
                                  className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow"
                                >
                                  {!language ? "Delete" : "삭제"}
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
                                  {!language
                                    ? "   Not Yet Rated"
                                    : "아직 평가되지 않음"}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="w-full mt-2">
                            {item.totalChapters > 0 ? (
                              <div className="flex gap-5">
                                {!language ? (
                                  <span className="text-gray-500 text-sm flex gap-2">
                                    Published
                                    {
                                      " " +
                                      monthNames[
                                        new Date(item.createTime).getMonth()
                                      ].en
                                    }{" "}
                                    {new Date(item.createTime).getDate()},
                                    {new Date(item.createTime)?.getFullYear()}
                                  </span>
                                ) : (
                                  <span className="text-gray-500 text-sm flex gap-2">
                                    발행됨
                                    {
                                      " " +
                                      monthNames[
                                        new Date(item.createTime).getMonth()
                                      ].kr
                                    }{" "}
                                    {new Date(item.createTime).getDate()}일,
                                    {new Date(item.createTime)?.getFullYear()}년
                                  </span>
                                )}

                                <span className="text-gray-500 text-sm">
                                  {!language ? " Episodes" : "에피소드"}
                                  {item.totalChapters}
                                </span>
                              </div>
                            ) : (
                              <div className="flex gap-5">
                                <span className="text-gray-500 text-sm">
                                  {!language
                                    ? " Add episodes to publish your title."
                                    : "타이틀을 게시하려면 에피소드를 추가하세요."}
                                </span>
                              </div>
                            )}

                            <div className="mt-2 flex ml-auto gap-2">
                              <Link
                                to={`/dashboard/original/episode/${item.id}`}
                              >
                                <button className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                  {!language ? "Edit Episode" : "에피소드 편집"}
                                </button>
                              </Link>

                              {!language ? (
                                <button
                                  onClick={() => {
                                    navigate(`/publish/original/${item.id}`);
                                    dispatch(setcurrentStepOriginal(2));
                                  }}
                                  className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow"
                                >
                                  <AddIcon />
                                  {!language ? " Add Episode" : "에피소드 추가"}
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    navigate(`/publish/original/${item.id}`);
                                    dispatch(setcurrentStepOriginal(2));
                                  }}
                                  className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow"
                                >
                                  <AddIcon />
                                  에피소드 추가
                                </button>
                              )}
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
                  <h1 className="font-semibold text-xl">
                    {!language
                      ? " Select the video series"
                      : " 비디오 시리즈 선택"}
                  </h1>

                  <Link
                    to={`/publish/video`}
                    className="w-[150px] h-[35px] text-white font-semibold bg-black ml-auto rounded-full flex items-center justify-center"
                  >
                    <button
                      className="w-full h-full"
                      onClick={() => dispatch(setcurrentStepVideo(1))}
                    >
                      <AddIcon />
                      {!language ? "Create Series" : "시리즈 만들기"}
                    </button>
                  </Link>
                </div>

                <div className="w-full h-full mt-4">
                  <ul className="grid xs:grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* khung nội dung */}
                    {videos?.map((item) => (
                      <li
                        className="w-full min-h-[210px] bg-white rounded flex shadow"
                        key={item.id}
                      >
                        <div className="w-[210px] max-h-[210px] border bg-red-200 rounded flex items-center justify-center">
                          <img
                            src={item.squareThumbnail}
                            alt="img"
                            className="w-full h-full object-cover rounded"
                          />
                        </div>

                        <div className="w-full h-full px-3 py-3">
                          <div className="w-auto">
                            <div className="flex items-center">
                              <div className="flex ml-auto gap-2">
                                <button
                                  onClick={() => {
                                    navigate(`/publish/video/${item.id}`);
                                    dispatch(setcurrentStepVideo(1));
                                  }}
                                  className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow"
                                >
                                  {!language ? "Edit" : "편집"}
                                </button>

                                <button
                                  onClick={() => handledeleteVideo(item.id)}
                                  className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow"
                                >
                                  {!language ? "Delete" : "삭제"}
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
                                  {!language
                                    ? " Not Yet Rated"
                                    : "아직 평가되지 않음"}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="w-full mt-2">
                            {item.totalChapters > 0 ? (
                              <div className="flex gap-5">
                                {!language ? (
                                  <span className="text-gray-500 text-sm flex gap-2">
                                    Published
                                    {" " +
                                      monthNames[
                                        new Date(item.createTime).getMonth()
                                      ].en
                                    }{" "}
                                    {new Date(item.createTime).getDate()},
                                    {new Date(item.createTime)?.getFullYear()}
                                  </span>
                                ) : (
                                  <span className="text-gray-500 text-sm flex gap-2">
                                    발행됨
                                    {
                                      " " +
                                      monthNames[
                                        new Date(item.createTime).getMonth()
                                      ].kr
                                    }{" "}
                                    {new Date(item.createTime).getDate()}일,
                                    {new Date(item.createTime)?.getFullYear()}년
                                  </span>
                                )}

                                <span className="text-gray-500 text-sm">
                                  {!language ? " Episodes" : "에피소드"}
                                  {item.totalChapters}
                                </span>
                              </div>
                            ) : (
                              <div className="flex gap-5">
                                <span className="text-gray-500 text-sm">
                                  {!language
                                    ? " Add episodes to publish your title."
                                    : "타이틀을 게시하려면 에피소드를 추가하세요."}
                                </span>
                              </div>
                            )}

                            <div className="mt-2 flex ml-auto gap-2">
                              <Link to={`/dashboard/video/episode/${item.id}`}>
                                <button className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                  {!language ? "Edit Episode" : "에피소드 편집"}
                                </button>
                              </Link>

                              <button
                                onClick={() => {
                                  navigate(`/publish/video/${item.id}`);
                                  dispatch(setcurrentStepVideo(2));
                                }}
                                className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow"
                              >
                                <AddIcon />
                                {!language ? "Add Episode" : "에피소드 추가"}
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
      )}
    </>
  );
};

export default Dashboard;
