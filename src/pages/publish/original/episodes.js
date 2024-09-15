import React, { useState,useEffect } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NorthIcon from '@mui/icons-material/North';

import Radio from '@mui/material/Radio';
import { useParams } from 'react-router-dom';
import comicFireBase from '../../../common/services/Comic.services';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { getidComic } from '../../../common/store/comic';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const EpisodesPage = ({ goToPreviousStep }) => {
    // hàm material nút chọn ở mục comment
    const [selectedValue, setSelectedValue] = React.useState('Enable');
    const Account = useSelector((state) => state.Account.Account);
    const comicid = useSelector(state => state.comic.comicid);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const id = useParams();
    const [photos1, setPhotos1] = useState("");
    const [horizontalThumbnail, sethorizontalThumbnail] = useState();
    useEffect(() => {
        const get = async () => {
            try {
                setloading(false)
                const comicID = await dispatch(getidComic(id.id))
                unwrapResult(comicID)
                setloading(true)
              
            } catch (error) {
            }
        }
        get()
    }, [dispatch,id]);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // Tiêu đề tập truyện
    const [valueEpisodeTitle, setValueEpisodeTitle] = useState('');
    const handleEpisodeTitle = (event) => {
        const inputValueEpisodeTitle = event.target.value;
        if (inputValueEpisodeTitle.length <= 60) { // Giới hạn số ký tự nhập vào là 60
            setValueEpisodeTitle(inputValueEpisodeTitle);
        }
    };

    // Ghi chú của tác giả
    const [valueNote, setValueNote] = useState('');
    const handleNote = (event) => {
        const inputValueNote = event.target.value;
        if (inputValueNote.length <= 400) { // Giới hạn số ký tự nhập vào là 400
            setValueNote(inputValueNote);
        }
    };
    const handlePhotoChange1 = (e) => {
        const file = e.target.files[0];
        if (file) {
          let newPhotos = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
          setPhotos1(newPhotos);
          sethorizontalThumbnail(file)
        }
      };
      const handleEp=async ()=>{
        try {
            const getdata = {
               valueEpisodeTitle,
               idseries:id.id,
                uid: Account.uid,
                valueNote,
                fileURL: '',
                likes: 0,
                num: 0,
                checkcomment:selectedValue,
                views: 0,
                createTime: new Date(Date.now()),
              };
            const docid=  await comicFireBase.Addep(getdata)
            await comicFireBase.uploadToFirebaseep(horizontalThumbnail,horizontalThumbnail.name,Account.uid,id.id,docid,'horizontalThumbnail')
            navigate('/')
        } catch (error) {
        }
      }
    return (
        <div>
            {!loading? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <CircularProgress />
                </Box>: 
            <div className="w-full h-full bg-gray-100 pb-10">

                <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
                    <ul className="flex gap-10">
                        <li onClick={goToPreviousStep} className="uppercase font-semibold cursor-pointer text-md flex items-center justify-center">
                            <div className="w-[40px] h-[40px] bg-gray-500 rounded-full border flex items-center justify-center mx-2">
                                <span className="mx-3 text-2xl text-white font-bold">
                                    1
                                </span>
                            </div>
                            <span className="text-gray-400">
                                SERIES ORIGINAL
                            </span>
                        </li>
                        <li className="uppercase font-semibold text-md flex items-center justify-center">
                            <span className="text-gray-400">
                                <ArrowForwardIosIcon />
                            </span>
                        </li>
                        <li className="uppercase font-semibold cursor-pointer text-md flex items-center justify-center">
                            <div className="w-[40px] h-[40px] bg-green-500 rounded-full border flex items-center justify-center mx-2">
                                <span className="mx-3 text-2xl text-white font-bold">
                                    2
                                </span>
                            </div>
                            <span className="text-black">
                                ORIGINAL EPISODES
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="w-full h-full px-[200px]">
                    <div className="w-full h-full py-5 flex">
                        <div className="w-3/12 h-full">
                        
                            {/* Phần tải ảnh cho tập truyện */}
                            <div className="w-[220px] h-full">
                                <div className="w-full py-3">
                                    <span className="w-full font-semibold text-xl">
                                        Episode Thumbnail
                                    </span>
                                </div>
                                {photos1 ? (
                    <img
                      src={photos1}
                      alt="Selected"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <>
                     <button className="w-full h-[220px] relative shadow border bg-red-50 rounded hover:border-green-500 hover:text-gray-500 flex items-center justify-center group">
                                    <div>
                                        <span className="w-[50px] h-[50px] ml-auto mr-auto text-white bg-gray-400 rounded-full mb-3 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
                                            <NorthIcon />
                                        </span>
                                        <span className="block w-full font-semibold text-sm hover:text-gray-500">
                                            Select an image to upload.
                                        </span>
                                        <span className="block w-full font-semibold text-sm hover:text-gray-500">
                                            Or drag the image file here.
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
                               
                                <div className="w-full py-3">
                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Recommended size is 160x151.
                                    </span>
                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Image must be less than 500kb.
                                    </span>

                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Only JPG, JPEG, and PNG
                                        formats are allowed. File name
                                        can only be in English letters
                                        and numbers.
                                    </span>


                                </div>
                            </div>
                        </div>

                        <div className="w-9/12 h-full ">

                            <div className="w-full py-3 pl-5 grid grid-cols-1 gap-5 border-b-2 pb-10">

                                {/* Tiêu đề của series */}
                                <div className="w-full flex items-center gap-2">
                                    <h1 className="font-semibold text-xl flex items-center">
                                        Series title :
                                    </h1>

                                    <span className="font-semibold text-xl flex items-center">
                                        {comicid.title}
                                    </span>
                                </div>

                                {/* Tiêu để của tập truyện */}
                                <div className="w-full">
                                    {/* Tiêu đề */}
                                    <h1 className="w-full font-semibold text-xl">
                                        Episode title
                                    </h1>
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
                                    <h1 className="w-full font-semibold text-xl">
                                        Upload file
                                    </h1>

                                    {/* Nút tải file */}
                                    <div className="flex gap-3">
                                        <button className="w-[180px] h-[40px] bg-black text-white font-semibold rounded-full">
                                            Select File To Upload
                                        </button>

                                        <button className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                                            Delete All
                                        </button>
                                    </div>

                                    {/* Phần hiện nội dung tải lên*/}
                                    <div className="h-[500px] bg-white flex items-center justify-center">
                                        <span className="font-semibold text-gray-500">
                                            drag and drop image files
                                        </span>
                                    </div>

                                    {/* Phần mô tả */}
                                    <div className="w-full grid grid-cols-1">
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
                                    </div>
                                </div>

                                {/* Phần ghi chú của tác giả */}
                                <div>
                                    <div className="w-full flex items-center gap-2">
                                        {/* Tiêu đề */}
                                        <h1 className="h-full font-semibold text-xl flex items-center">
                                            Creator's note
                                        </h1>
                                        <span className="h-full text-gray-400 font-semibold flex items-center">
                                            (Optional)
                                        </span>
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
                                    <h1 className="w-full font-semibold text-xl">
                                        PRO TIPS
                                    </h1>

                                    <div className="w-full h-[100px] flex items-center gap-3">
                                        <button className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                                            Preview PC
                                        </button>

                                        <button className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                                            Preview Mobile
                                        </button>

                                        <button className="w-[150px] h-[40px] bg-black text-white font-semibold rounded-full">
                                            Save Draft
                                        </button>
                                    </div>
                                </div>

                                {/* Phần hiệu chỉnh comment */}
                                <div className="w-full flex items-center gap-10">
                                    {/* Tiêu đề */}
                                    <h1 className="h-full font-semibold text-xl flex items-center">
                                        Comments
                                    </h1>

                                    <div className="flex gap-10 items-center">
                                        <label className="flex items-center">
                                            <Radio
                                                checked={selectedValue === 'Enable'}
                                                onChange={handleChange}
                                                value="Enable"
                                                name="radio-buttons"
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28, }, }}
                                            />
                                            <span>Enable</span>
                                        </label>
                                        <label className="flex items-center">
                                            <Radio
                                                checked={selectedValue === 'Disable'}
                                                onChange={handleChange}
                                                value="Disable"
                                                name="radio-buttons"
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28, }, }}
                                            />
                                            <span>Disable</span>
                                        </label>
                                    </div>

                                </div>
                            </div>

                            {/* Nút đăng tập truyện */}
                            <div className="w-full mt-10 py-3 pl-5">
                                <button onClick={handleEp} className="w-[200px] h-[50px] bg-green-500 text-white rounded-full shadow font-semibold py-2 px-4">
                                    Publish episode
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
}
        </div >

    );
}

export default EpisodesPage;