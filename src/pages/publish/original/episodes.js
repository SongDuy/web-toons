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
  const [URLFile, setURLFile] = useState("");
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
          num: chapters?.success ? chapters?.chaps?.length + 1 : 0,
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
        await comicFireBase.uploadToFirebaseep(
          fileURL,
          fileURL.name,
          Account.uid,
          id.id,
          docid,
          "fileURL"
        );

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
          num: chapters?.success ? chapters?.chaps?.length + 1 : 0,
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
          num: chapters?.success ? chapters?.chaps?.length + 1 : 0,
          check,
          checkcomment: selectedValue,
          views,
          createTime: new Date(Date.now()),
        };
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
            <ul className="flex gap-10">
              <li
                onClick={goToPreviousStep}
                className="uppercase font-semibold cursor-pointer text-md flex items-center justify-center"
              >
                <div className="w-[40px] h-[40px] bg-gray-500 rounded-full border flex items-center justify-center mx-2">
                  <span className="mx-3 text-2xl text-white font-bold">1</span>
                </div>

                {!language ? (
                  <h1 className="text-gray-400">ORIGINAL SERIES</h1>
                ) : (
                  <h1 className="text-gray-400">오리지널 시리즈</h1>
                )}
              </li>

              <li className="uppercase font-semibold text-md flex items-center justify-center">
                <span className="text-gray-400">
                  <ArrowForwardIosIcon />
                </span>
              </li>
              <li className="uppercase font-semibold cursor-pointer text-md flex items-center justify-center">
                <div className="w-[40px] h-[40px] bg-green-500 rounded-full border flex items-center justify-center mx-2">
                  <span className="mx-3 text-2xl text-white font-bold">2</span>
                </div>
               
                {!language ? (
                  <h1 className="text-black">ORIGINAL EPISODES</h1>
                ) : (
                  <h1 className="text-gray-400">원본 에피소드</h1>
                )}
              </li>
            </ul>
          </div>

          <div className="w-full h-full px-[200px]">
            <div className="w-full h-full py-5 flex">
              <div className="w-3/12 h-full">
                {/* Phần tải ảnh cho tập truyện */}
                <div className="w-[220px] h-full">
                  <div className="w-full py-3">
                    {!language ? (
                      <span className="w-full font-semibold text-xl">
                        Episode Thumbnail
                      </span>
                    ) : (
                      <span className="w-full font-semibold text-xl">
                        에피소드 썸네일
                      </span>
                    )}
                  </div>
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
                          {!language ? (
                            <span className="block w-full font-semibold text-sm hover:text-gray-500">
                              Select an image to upload.
                            </span>
                          ) : (
                            <span className="block w-full font-semibold text-sm hover:text-gray-500">
                              업로드할 이미지를 선택하세요.
                            </span>
                          )}

                          {!language ? (
                            <span className="block w-full font-semibold text-sm hover:text-gray-500">
                              Or drag the image file here.
                            </span>
                          ) : (
                            <span className="block w-full font-semibold text-sm hover:text-gray-500">
                              또는 이미지를 여기로 드래그하세요.
                            </span>
                          )}

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

                  <div className="w-full py-3">
                    {!language ? (
                      <span className="block w-full font-semibold text-[13.5px] text-gray-600">
                        Recommended size is 160x151.
                      </span>
                    ) : (
                      <span className="block w-full font-semibold text-[13.5px] text-gray-600">
                        추천 사이즈는 160x151입니다.
                      </span>
                    )}

                    {!language ? (
                      <span className="block w-full font-semibold text-[13.5px] text-gray-600">
                        Image must be less than 500KB.
                      </span>
                    ) : (
                      <span className="block w-full font-semibold text-[13.5px] text-gray-600">
                        이미지는 500KB 이하이어야 합니다.
                      </span>
                    )}

                    {!language ? (
                      <span className="block w-full font-semibold text-[13.5px] text-gray-600">
                        Only JPG, JPEG, and PNG formats are allowed. File name
                        can only be in English letters and numbers.
                      </span>
                    ) : (
                      <span className="block w-full font-semibold text-[13.5px] text-gray-600">
                        JPG, JPEG, PNG 형식만 허용됩니다. 파일 이름은 영어
                        문자와 숫자만 사용할 수 있습니다.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Phần ghi chú của tác giả */}
              <div className="w-full py-3 pl-5 border-b-2 pb-10">
                <div className="grid grid-cols-1 gap-5">
                  <div className="w-full flex items-center gap-2">
                    {!language ? (
                      <h1 className="font-semibold text-xl flex items-center">
                        Series title :
                      </h1>
                    ) : (
                      <h1 className="font-semibold text-xl flex items-center">
                        시리즈 제목 :
                      </h1>
                    )}
                    <span className="font-semibold text-xl flex items-center">
                      {comicid.title}
                    </span>
                  </div>

                  {/* Tiêu để của tập truyện */}
                  <div className="w-full">
                    {/* Tiêu đề */}

                    {!language ? (
                      <h1 className="w-full font-semibold text-xl">
                        Episode title
                      </h1>
                    ) : (
                      <h1 className="w-full font-semibold text-xl">
                        에피소드 제목
                      </h1>
                    )}

                    <div className="flex mt-3">
                      <button className="w-[90px] h-[40px] border-2 bg-white flex items-center justify-center">
                        1
                      </button>
                      <input
                        className="w-full h-[40px] px-2 border-r-2 border-t-2 border-b-2 outline-none bg-white"
                        placeholder="Less than 60 characters"
                        value={valueEpisodeTitle}
                        onChange={handleEpisodeTitle}
                      />
                    </div>
                  </div>

                  {/* Phần tải nội dung tập truyện */}
                  <div className="w-full grid grid-cols-1 gap-4">
                    {/* Tiêu đề */}

                    {!language ? (
                      <h1 className="w-full font-semibold text-xl">
                        Upload file
                      </h1>
                    ) : (
                      <h1 className="w-full font-semibold text-xl">
                        파일 업로드
                      </h1>
                    )}

                    {/* Nút tải file */}
                    <div className="flex gap-3 ">
                      <div className="relative">
                        {!language ? (
                          <button className="w-[180px] h-[40px] bg-black text-white font-semibold rounded-full">
                            Select File To Upload
                          </button>
                        ) : (
                          <button className="w-[180px] h-[40px] bg-black text-white font-semibold rounded-full">
                            업로드할 파일 선택
                          </button>
                        )}

                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => handlefileChange(e)}
                          className="absolute inset-0 opacity-0 cursor-pointer "
                        />
                      </div>

                      {!language ? (
                        <button
                          onClick={() => handleDeleteAll()}
                          className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full"
                        >
                          Delete All
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeleteAll()}
                          className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full"
                        >
                          모두 삭제
                        </button>
                      )}
                    </div>

                    {/* Phần hiện nội dung tải lên*/}
                    <div className="h-[500px] w-full bg-white flex items-center justify-center">
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
                            파일을 표시하다
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
                      {!language ? (
                        <div className="flex gap-2">
                          <h1 className="h-full font-semibold text-xl">
                            Creator's note
                          </h1>
                          <span className="h-full text-gray-400 font-semibold mt-1">
                            (Optional)
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <h1 className="h-full font-semibold text-xl">
                            제작자의 노트
                          </h1>
                          <span className="h-full text-gray-400 font-semibold mt-1">
                            (선댁 사항)
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <textarea
                        className="w-full h-[90px] mt-3 bg-white px-3 py-2"
                        placeholder="Less than 400 characters"
                        value={valueNote}
                        onChange={handleNote}
                      />
                    </div>
                  </div>

                  {/* Phần pro tips */}
                  <div className="w-full">
                    {/* Tiêu đề */}
                    {!language ? (
                      <h1 className="w-full font-semibold text-xl">PRO TIPS</h1>
                    ) : (
                      <h1 className="w-full font-semibold text-xl">
                        전문가 팁
                      </h1>
                    )}

                    <div className="w-full h-[40px] flex items-center gap-3 mt-3">
                      {!language ? (
                        <button className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                          Preview PC
                        </button>
                      ) : (
                        <button className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                          PC 미리보기
                        </button>
                      )}

                      {!language ? (
                        <button className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                          Preview Mobile
                        </button>
                      ) : (
                        <button className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                          모바일 미리보기
                        </button>
                      )}

                      {!language ? (
                        <button className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                          Save Draft
                        </button>
                      ) : (
                        <button className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                          초안 저장
                        </button>
                      )}
                    </div>
                  </div>

                  {/* <div className="w-full">
                                        <button className="">

                                        </button>
                                    </div> */}

                  {/* Phần hiệu chỉnh comment */}
                  <div className="w-full flex items-center gap-x-10 mt-4">
                    {/* Tiêu đề */}

                    {!language ? (
                      <h1 className="w-[100px] h-full font-semibold text-xl flex items-center">
                        Comments
                      </h1>
                    ) : (
                      <h1 className="w-[100px] h-full font-semibold text-xl flex items-center">
                        댓글
                      </h1>
                    )}

                    <div className="flex gap-x-10 mt-1 items-center">
                      <label className="flex items-center">
                        <Radio
                          checked={selectedValue === "Enable"}
                          onChange={handleChange}
                          value="Enable"
                          name="radio-buttons"
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                        />

                        {!language ? <span>Enable</span> : <span>활성화</span>}
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
                          <span>Disable</span>
                        ) : (
                          <span>비활성화</span>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Phần hiệu chỉnh episode */}
                  <div className="w-full flex items-center gap-10">
                    {/* Tiêu đề */}

                    {!language ? (
                      <h1 className="w-[100px] h-full font-semibold text-xl flex items-center">
                        Episodes
                      </h1>
                    ) : (
                      <h1 className="w-[100px] h-full font-semibold text-xl flex items-center">
                        에피소드
                      </h1>
                    )}

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
                          <span>Ongoing</span>
                        ) : (
                          <span>진행 중</span>
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
                          <span>Completed</span>
                        ) : (
                          <span>완료됨</span>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Nút đăng tập truyện */}
                <div className="w-full mt-10 py-3">
                  {!language ? (
                    <button
                      onClick={id?.idchap ? handleedit : handleEp}
                      className="w-[200px] h-[50px] bg-green-500 text-white rounded-full shadow font-semibold py-2 px-4"
                    >
                      Publish episode
                    </button>
                  ) : (
                    <button
                      onClick={id?.idchap ? handleedit : handleEp}
                      className="w-[200px] h-[50px] bg-green-500 text-white rounded-full shadow font-semibold py-2 px-4"
                    >
                      에피소드 게시
                    </button>
                  )}
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
