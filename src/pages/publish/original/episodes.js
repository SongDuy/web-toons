import React, { useState, useEffect, useMemo } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NorthIcon from "@mui/icons-material/North";

import Radio from "@mui/material/Radio";
import { useParams } from "react-router-dom";
import comicFireBase from "../../../common/services/Comic.services";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { getchaptersComic, getidComic } from "../../../common/store/comic";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css"; // Import the text layer CSS
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import ReactPlayer from "react-player";

const EpisodesOriginalPage = ({ goToPreviousStep }) => {
  // hàm material nút chọn ở mục comment
  const [selectedValue, setSelectedValue] = React.useState("Enable");
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  // hàm material nút chọn ở mục episodes
  const [selectedEpisodesValue, setSelectedEpisodesValue] =
    React.useState("Ongoing");

  const Account = useSelector((state) => state.Account.Account);
  const comicid = useSelector((state) => state.comic.comicid);
  const [loading, setloading] = useState(false);
  const [fileURL, setfileURL] = useState();
  const [fileMusic, setMusicURL] = useState();
  const [URLFile, setURLFile] = useState("");
  const [URLMusic, setURLMusic] = useState("");
  // Tiêu đề tập truyện
  const [valueEpisodeTitle, setValueEpisodeTitle] = useState("");
  const [likes, setlike] = useState(0);
  const [views, setviews] = useState(0);
  const [check, setcheck] = useState(false);
  const [numPages, setNumPages] = useState();

  // Ghi chú của tác giả
  const [valueNote, setValueNote] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const id = useParams();
  const [photos1, setPhotos1] = useState("");
  const [horizontalThumbnail, sethorizontalThumbnail] = useState();
  const chapters = useSelector((state) => state.comic.Chapters);
  const [isMusic, setIsMusic] = useState(false);
  const [num, setnum] = useState(0);

  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);
        if (id?.id && Account?.uid) {
          const check = await comicFireBase.checkcomicuser(Account?.uid, id.id);
          if (check?.success) {
            const comicID = await dispatch(getidComic(id.id));

            const chap = await dispatch(getchaptersComic(id.id));
            if (id?.idchap) {
              const chapid = await comicFireBase.getchaptersid(
                id.id,
                id.idchap
              );
              setPhotos1(chapid?.horizontalThumbnail);
              setSelectedValue(chapid?.checkcomment);
              setValueNote(chapid?.note);
              setValueEpisodeTitle(chapid?.chapterTitle);
              setlike(chapid?.likes);
              setviews(chapid?.views);
              setcheck(chapid?.check);
              setURLFile(chapid?.fileURL);
              setURLMusic(chapid?.audioUrl ? chapid?.audioUrl : "")
              setnum(chapid?.num)
            }
            unwrapResult(comicID);
            unwrapResult(chap);
          } else {
            navigate("/");
          }
        }

        setloading(true);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, [dispatch, id, Account, navigate]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // chỉnh trạng thái các tập
  const handleEpisodesChange = (event) => {
    setSelectedEpisodesValue(event.target.value);
  };

  const handleEpisodeTitle = (event) => {
    const inputValueEpisodeTitle = event.target.value;
    if (inputValueEpisodeTitle.length <= 60) {
      // Giới hạn số ký tự nhập vào là 60
      setValueEpisodeTitle(inputValueEpisodeTitle);
    }
  };

  const handleNote = (event) => {
    const inputValueNote = event.target.value;
    if (inputValueNote.length <= 400) {
      // Giới hạn số ký tự nhập vào là 400
      setValueNote(inputValueNote);
    }
  };

  const handlePhotoChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      let newPhotos = URL.createObjectURL(file);
      setPhotos1(newPhotos);
      sethorizontalThumbnail(file);
    }
  };

  const handlefileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      let newPhotos = URL.createObjectURL(file);
      setURLFile(newPhotos);
      setfileURL(file);
    }
  };
  const handleMusicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      let newPhotos = URL.createObjectURL(file);
      setURLMusic(newPhotos);
      setMusicURL(file);
    }
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleEp = async () => {
    try {
      setloading(false);

      if (horizontalThumbnail?.name && fileURL?.name) {
        const getdata = {
          valueEpisodeTitle,
          idseries: id.id,
          uid: Account.uid,
          valueNote,
          fileURL: "",
          likes: 0,
          num: chapters?.success ? chapters?.chaps?.length + 1 : 1,
          check: false,
          checkcomment: selectedValue,
          views: 0,
          createTime: new Date(Date.now()),
        };
        const docid = await comicFireBase.Addep(getdata);
        await comicFireBase.update(
          { Completed: selectedEpisodesValue === "Ongoing" ? false : true },
          id.id
        );
        await comicFireBase.uploadToFirebaseep(
          horizontalThumbnail,
          horizontalThumbnail.name,
          Account.uid,
          id.id,
          docid,
          "horizontalThumbnail"
        );
        fileMusic?.name && await comicFireBase.uploadToFirebaseep(
          fileMusic,
          fileMusic.name,
          Account.uid,
          id.id,
          docid,
          "audioUrl"
        );
        await comicFireBase.uploadToFirebaseep(
          fileURL,
          fileURL.name,
          Account.uid,
          id.id,
          docid,
          "fileURL"
        );
        await comicFireBase.update({ totalChapters: chapters?.success ? chapters?.chaps?.length + 1 : 1 }, id.id);

        navigate("/");
      }
      setloading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleedit = async () => {
    try {
      setloading(false);

      if (fileURL?.name || horizontalThumbnail?.name) {
        const getdata = {
          chapterTitle: valueEpisodeTitle,
          uid: Account.uid,
          note: valueNote,
          likes,
          check,
          checkcomment: selectedValue,
          views,
          createTime: new Date(Date.now()),
        };
        await comicFireBase.updateep(getdata, id.id, id.idchap);
        horizontalThumbnail?.name &&
          (await comicFireBase.uploadToFirebaseep(
            horizontalThumbnail,
            horizontalThumbnail.name,
            Account.uid,
            id.id,
            id.idchap,
            "horizontalThumbnail"
          ));
        fileMusic?.name && await comicFireBase.uploadToFirebaseep(
          fileMusic,
          fileMusic.name,
          Account.uid,
          id.id,
          id.idchap,
          "audioUrl"
        );
        fileURL?.name &&
          (await comicFireBase.uploadToFirebaseep(
            fileURL,
            fileURL.name,
            Account.uid,
            id.id,
            id.idchap,
            "fileURL"
          ));
        navigate("/");
      } else {
        const getdata = {
          chapterTitle: valueEpisodeTitle,
          uid: Account.uid,
          note: valueNote,
          likes,
          check,
          checkcomment: selectedValue,
          views,
          createTime: new Date(Date.now()),
        };
        fileMusic?.name && await comicFireBase.uploadToFirebaseep(
          fileMusic,
          fileMusic.name,
          Account.uid,
          id.id,
          id.idchap,
          "audioUrl"
        );
        await comicFireBase.updateep(getdata, id.id, id.idchap);
        navigate("/");
      }
      setloading(true);
    } catch (error) {
      console.log(error);
    }
  };
  const options = useMemo(
    () => ({
      cMapUrl: "cmaps/",
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,

      // Add any other options you might have here
    }),
    []
  ); // Empty dependency array, as options are likely static

  const handleDeleteAll = () => {
    setPhotos1("");
    sethorizontalThumbnail();
    setfileURL();
    setURLFile()
  };
  const handleDeleteMusic = () => {
    setURLMusic('')
    setMusicURL()
  };
  //Lấy ngôn ngữ
  const language = useSelector((state) => state.hidden.language);

  return (
    <div>
      {!loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="w-full h-full bg-gray-100 pb-10">
          <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
            <ul className="w-full flex items-center justify-center xs:gap-0 sm:gap-10">
              <li
                onClick={goToPreviousStep}
                className="min-w-[120px] uppercase font-semibold cursor-pointer flex items-center justify-center"
              >
                <div className="w-[40px] h-[40px] bg-gray-500 rounded-full border flex items-center justify-center mx-2">
                  <span className="mx-3 text-2xl text-white font-bold">1</span>
                </div>

                <h1 className="text-gray-400 xs:text-sm sm:text-md">
                  {!language ? (
                    <span>ORIGINAL SERIES</span>
                  ) : (
                    <span>오리지널 시리즈</span>
                  )}
                </h1>

              </li>

              <li className="xs:ml-2 sm:ml-0 uppercase font-semibold flex items-center justify-center">
                <span className="text-gray-400">
                  <ArrowForwardIosIcon />
                </span>
              </li>
              <li className="min-w-[120px] uppercase font-semibold cursor-pointer text-md flex items-center justify-center">
                <div className="w-[40px] h-[40px] bg-green-500 rounded-full border flex items-center justify-center mx-2">
                  <span className="mx-3 text-2xl text-white font-bold">2</span>
                </div>

                <h1 className="text-black xs:text-sm sm:text-md">
                  {!language ? (
                    <span>ORIGINAL EPISODES</span>
                  ) : (
                    <span>오리지널 에피소드</span>
                  )}
                </h1>
              </li>
            </ul>
          </div>

          <div className="w-full h-full sm:px-[200px] xs:px-[10px] sm:ml-0">
            <div className="w-full h-full py-5 grid grid-cols-1 lg:grid-cols-3">

              {/* Cột bên trái */}
              <div className="w-full h-full col-span-1 ">
                {/* Phần tải ảnh cho tập truyện */}
                <div className="w-full h-full">
                  <div className="w-full py-3">
                    <span className="w-full font-semibold text-xl">
                      {!language ? (
                        "Episode Thumbnail"
                      ) : (
                        "에피소드 썸네일"
                      )}
                    </span>
                  </div>

                  <div className="w-full flex items-center justify-center">
                    {photos1 ? (
                      <img
                        src={photos1}
                        alt="Selected"
                        className="w-[200px] h-[200px] object-cover rounded"
                      />
                    ) : (
                      <>
                        <button className="w-[200px] h-[200px] relative shadow border bg-red-50 rounded hover:border-green-500 hover:text-gray-500 flex items-center justify-center group">
                          <div>
                            <span className="w-[50px] h-[50px] ml-auto mr-auto text-white bg-gray-400 rounded-full mb-3 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
                              <NorthIcon />
                            </span>

                            <span className="block w-full font-semibold text-sm hover:text-gray-500">
                              {!language ? (
                                "Select an image to upload."
                              ) : (
                                "업로드할 이미지를 선택하세요."
                              )}
                            </span>

                            <span className="block w-full font-semibold text-sm hover:text-gray-500">
                              {!language ? (
                                "Or drag the image file here."
                              ) : (
                                "또는 이미지를 여기로 드래그하세요."
                              )}
                            </span>

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoChange1(e)}
                              className="absolute inset-0 opacity-0 cursor-pointer "
                            />
                          </div>
                        </button>
                      </>
                    )}
                  </div>
                  <div className="w-full py-3">

                    <span className="block w-full font-semibold text-gray-600">
                      {!language ? (
                        "Recommended size is 160x151."
                      ) : (
                        "추천 사이즈는 160x151입니다."
                      )}
                    </span>

                    <span className="block w-full font-semibold text-gray-600">
                      {!language ? (
                        "Image must be less than 500KB."
                      ) : (
                        "이미지는 500KB 이하이어야 합니다."
                      )}
                    </span>

                    <span className="block w-full font-semibold text-gray-600">
                      {!language ? (
                        <span>Only JPG, JPEG, and PNG formats are allowed.</span>
                      ) : (
                        <span>JPG, JPEG, PNG 형식만 허용됩니다.</span>
                      )}
                    </span>
                    <span className="block w-full font-semibold text-gray-600">
                      {!language ? (
                        <span className="flex-wrap">
                          <span>File name can only be in English letters and numbers.</span>
                        </span>
                      ) : (
                        <span>파일 이름은 영어 문자와 숫자만 사용할 수 있습니다.</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cột bên phải */}
              <div className="w-full h-full col-span-2 py-3 pl-5 border-b-2 pb-10">
                <div className="grid grid-cols-1 gap-5">
                  <div className="w-full flex items-center gap-2">

                    <h1 className="font-semibold text-xl flex items-center">
                      {!language ? (
                        "Series title :"
                      ) : (
                        "시리즈 제목 :"
                      )}
                    </h1>

                    <span className="font-semibold text-xl flex items-center">
                      {comicid.title}
                    </span>
                  </div>

                  {/* Tiêu để của tập truyện */}
                  <div className="w-full">
                    {/* Tiêu đề */}
                    <h1 className="w-full font-semibold text-xl">
                      {!language ? (
                        "Episode title"
                      ) : (
                        "에피소드 제목"
                      )}
                    </h1>

                    <div className="flex mt-3">
                      <button className="w-[90px] h-[40px] border-2 bg-white flex items-center justify-center">
                        {id.idchap ? num : chapters?.chaps?.length ? chapters?.chaps?.length + 1 : 1}
                      </button>
                      <input
                        className="w-full h-[40px] px-2 border-r-2 border-t-2 border-b-2 outline-none bg-white"
                        placeholder={!language ? "Less than 60 characters" : "60자 미만입니다"}
                        value={valueEpisodeTitle}
                        onChange={handleEpisodeTitle}
                      />
                    </div>
                  </div>

                  {/* Phần tải nội dung tập truyện */}
                  <div className="w-full grid grid-cols-1 gap-4">
                    {/* Tiêu đề */}
                    <h1 className="w-full font-semibold text-xl">
                      {!language ? (
                        "Upload file"
                      ) : (
                        "파일 업로드"
                      )}
                    </h1>

                    {/* Nút tải file */}
                    <div className="flex gap-3 ">
                      <div className="relative">

                        <button className="w-[180px] h-[40px] bg-black text-white font-semibold rounded-full">
                          {!language ? (
                            "Select File To Upload"
                          ) : (
                            "업로드할 파일 선택"
                          )}
                        </button>

                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => handlefileChange(e)}
                          className="absolute inset-0 opacity-0 cursor-pointer "
                        />
                      </div>

                      <button
                        onClick={() => handleDeleteAll()}
                        className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full"
                      >
                        {!language ? (
                          "Delete All"
                        ) : (
                          "모두 삭제"
                        )}
                      </button>

                    </div>

                    {/* Phần hiện nội dung tải lên*/}
                    <div className="w-full xs:min-h-[50px] lg:min-h-[500px] max-h-[500px] bg-white flex items-center justify-center">
                      {URLFile ? (
                        <div className="h-full w-full bg-gray-100">
                          <div className="w-full  h-full bg-white shadow-md rounded overflow-auto p-8">
                            {URLFile && (
                              <Document
                                options={options}
                                file={URLFile}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={<CircularProgress />}
                              >
                                {Array.from(new Array(numPages), (el, index) => (
                                  <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                  />
                                ))}
                              </Document>
                            )}
                          </div>
                        </div>
                      ) : (
                        !language ? (
                          <span className="font-semibold text-gray-500">
                            render files.
                          </span>
                        ) : (
                          <span className="font-semibold text-gray-500">
                            파일 렌더링
                          </span>
                        ))}
                    </div>

                    {/* Phần mô tả */}
                    {/* <div className="w-full grid grid-cols-1">
                                            <span className="text-gray-500">
                                                The system will automatically slice and reduce image(s) that exceed the maximum dimensions, 800x1280px.
                                            </span>
                                            <span className="text-gray-500">
                                                Images that exceed the maximum dimensions may be optimized in a number of ways. They may be sliced into multiple images,
                                                the image quality may be dropped, the image dimensions may be reduced, and/or the file size and format may be changed.
                                            </span>
                                            <span className="text-gray-500">
                                                The maximum file size for all sliced, resized, and unchanged images is 2MB. You can upload up to 20MB, 100 images in total.
                                            </span>
                                            <span className="text-gray-500">
                                                If you do not want your image to be optimized in any way, please make sure to upload an image within 800x1280px,
                                                and within the total file size limit.
                                            </span>
                                            <span className="text-gray-500">
                                                Only JPG, JPEG, PNG formats are supported.
                                            </span>
                                        </div> */}
                  </div>

                  {/* Phần ghi chú của tác giả */}
                  <div>
                    <div className="w-full flex items-center gap-2">
                      {/* Tiêu đề */}

                      <div className="flex gap-2">
                        <h1 className="h-full font-semibold text-xl">
                          {!language ? (
                            "Note"
                          ) : (
                            "노트"
                          )}
                        </h1>
                        <span className="h-full text-gray-400 font-semibold mt-1">
                          {!language ? (
                            "(Optional)"
                          ) : (
                            "(선댁 사항)"
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="w-full">
                      <textarea
                        className="w-full h-[90px] mt-3 bg-white px-3 py-2"
                        placeholder={!language ? "Less than 400 characters" : "400자 미만입니다"}
                        value={valueNote}
                        onChange={handleNote}
                      />
                    </div>
                  </div>

                  {/* Phần thêm âm thanh */}
                  <div className="w-full">
                    {/* Tiêu đề */}

                    <h1 className="w-full font-semibold text-xl">
                      {!language ? (
                        "Add music"
                      ) : (
                        "(음악 추가)"
                      )}
                    </h1>

                    <div className="w-full h-[40px] flex items-center gap-3 mt-3">
                      <div className="relative">

                        <button className="w-[180px] h-[40px] bg-black text-white font-semibold rounded-full">
                          {!language ? (
                            "Select File To Upload"
                          ) : (
                            "업로드할 파일 선택"
                          )}
                        </button>

                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => handleMusicChange(e)}
                          className="absolute inset-0 opacity-0 cursor-pointer "
                        />
                      </div>

                      <button onClick={() => handleDeleteMusic()} className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                        {!language ? (
                          "Delete All"
                        ) : (
                          "모두 삭제"
                        )}
                      </button>
                    </div>

                    {/* Hiện tên file âm thanh */}
                    <div className="w-full h-[50px] bg-white mt-3 flex items-center justify-center">
                      {!URLMusic ?
                        <span className="font-semibold text-gray-500">
                          {!language ? (
                            "render files."
                          ) : (
                            "파일 렌더링"
                          )}
                        </span>
                        :
                        <div>

                          {!isMusic ?
                            <button
                              className="w-[30px] h-[30px] rounded-full text-white bg-gray-800 flex items-center justify-center"
                              onClick={() => setIsMusic(true)}
                            >
                              <MusicNoteIcon />
                            </button>
                            :
                            <button
                              className="w-[30px] h-[30px] rounded-full text-white bg-gray-800 flex items-center justify-center"
                              onClick={() => setIsMusic(false)}
                            >
                              <MusicOffIcon />
                            </button>
                          }
                          <ReactPlayer
                            url={URLMusic}
                            controls={true}
                            width="0%"
                            height="0%"
                            playing={!isMusic}
                          />
                        </div>
                      }
                    </div>
                  </div>

                  {/* Phần hiệu chỉnh comment */}
                  <div className="w-full flex items-center gap-x-10 mt-4">
                    {/* Tiêu đề */}
                    <h1 className="w-[100px] h-full font-semibold text-xl flex items-center">
                      {!language ? (
                        "Comments"
                      ) : (
                        "댓글"
                      )}
                    </h1>

                    <div className="flex gap-x-10 mt-1 items-center">
                      <label className="flex items-center">
                        <Radio
                          checked={selectedValue === "Enable"}
                          onChange={handleChange}
                          value="Enable"
                          name="radio-buttons"
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                        />

                        {!language ? (
                          "Enable"
                        ) : (
                          "활성화"
                        )}
                      </label>

                      <label className="flex items-center">
                        <Radio
                          checked={selectedValue === "Disable"}
                          onChange={handleChange}
                          value="Disable"
                          name="radio-buttons"
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                        />

                        {!language ? (
                          "Disable"
                        ) : (
                          "비활성화"
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Phần hiệu chỉnh episode */}
                  <div className="w-full flex items-center gap-10">
                    {/* Tiêu đề */}
                    <h1 className="w-[100px] h-full font-semibold text-xl flex items-center">
                      {!language ? (
                        "Episodes"
                      ) : (
                        "에피소드"
                      )}
                    </h1>

                    <div className="flex gap-6 mt-1 items-center">
                      <label className="flex items-center">
                        <Radio
                          checked={selectedEpisodesValue === "Ongoing"}
                          onChange={handleEpisodesChange}
                          value="Ongoing"
                          name="radio-buttons"
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                        />

                        {!language ? (
                          "Ongoing"
                        ) : (
                          "진행 중"
                        )}
                      </label>
                      <label className="flex items-center">
                        <Radio
                          checked={selectedEpisodesValue === "Completed"}
                          onChange={handleEpisodesChange}
                          value="Completed"
                          name="radio-buttons"
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                        />

                        {!language ? (
                          "Completed"
                        ) : (
                          "완료됨"
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Nút đăng tập truyện */}
                <div className="w-full mt-10 py-3">

                  <button
                    onClick={id?.idchap ? handleedit : handleEp}
                    className="w-[200px] h-[50px] bg-green-500 text-white rounded-full shadow font-semibold py-2 px-4"
                  >
                    {!language ? (
                      "Publish episode"
                    ) : (
                      "에피소드 게시"
                    )}
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodesOriginalPage;
