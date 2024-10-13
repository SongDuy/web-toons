import React, { useState, useEffect } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NorthIcon from "@mui/icons-material/North";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector, useDispatch } from "react-redux";
import comicFireBase from "../../../common/services/Comic.services";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { getidComic } from "../../../common/store/comic";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import dataListGenre from "../../../components/layout/layoutUser/dataListGenre";

const SeriesOriginalPage = ({ goToEposodes }) => {
    const Account = useSelector((state) => state.Account.Account);
    const navigate = useNavigate();
    const id = useParams();
    // thể loại 1
    const [genre1, setGenre1] = React.useState("");
    const [photos, setPhotos] = useState(""); // Lưu các ảnh đã chọn
    const [photos1, setPhotos1] = useState(""); // Lưu các ảnh đã chọn
    const [squareThumbnail, setsquareThumbnail] = useState();
    const [horizontalThumbnail, sethorizontalThumbnail] = useState();
    const [genre2, setGenre2] = useState("");
    const [valueTitle, setValueTile] = useState("");
    const [valueSummary, setValueSummary] = useState("");
    const [valueDay, setValueDay] = useState("");
    const comicid = useSelector(state => state.comic.comicid);
    //const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const days = [
        { day: 'Mon', daysInKorean: '월요일' },
        { day: 'Tue', daysInKorean: '화요일' },
        { day: 'Wed', daysInKorean: '수요일' },
        { day: 'Thu', daysInKorean: '목요일' },
        { day: 'Fri', daysInKorean: '금요일' },
        { day: 'Sat', daysInKorean: '토요일' },
        { day: 'Sun', daysInKorean: '일요일' }
    ];
    const dayMapping = {
        'Mon': 'Monday',
        'Tue': 'Tuesday',
        'Wed': 'Wednesday',
        'Thu': 'Thursday',
        'Fri': 'Friday',
        'Sat': 'Saturday',
        'Sun': 'Sunday'
    };

    const handleSelectDay = (event) => {
        setValueDay(event.target.value); // Cập nhật trạng thái khi chọn
    };

    const [loading, setloading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const get = async () => {
            try {
                if (id?.id) {
                    setloading(false)
                    const comicID = await dispatch(getidComic(id.id))
                    const getcomic = unwrapResult(comicID)
                    setPhotos(getcomic?.squareThumbnail)
                    setPhotos1(getcomic?.horizontalThumbnail)
                    setValueTile(getcomic?.title)
                    setIsAge(getcomic?.Age)
                    setGenre1(getcomic?.genre1)
                    setGenre2(getcomic?.genre2)
                    setValueSummary(getcomic?.summary)
                    setValueDay(getcomic?.schedule)
                    setloading(true)
                }

            } catch (error) {
            }
        }
        get()
    }, [dispatch, id]);
    const handleChangeGenre1 = (event) => {
        setGenre1(event.target.value);
    };

    // thể loại 2

    const handleChangeGenre2 = (event) => {
        setGenre2(event.target.value);
    };

    // Tiêu đề
    const handleTitle = (event) => {
        const inputValueTitle = event.target.value;
        if (inputValueTitle.length <= 50) {
            // Giới hạn số ký tự nhập vào là 50
            setValueTile(inputValueTitle);
        }
    };

    // Mô tả
    const handleSummary = (event) => {
        const inputValueSummary = event.target.value;
        if (inputValueSummary.length <= 500) {
            // Giới hạn số ký tự nhập vào là 500
            setValueSummary(inputValueSummary);
        }
    };

    // Nhấn nút check để kiểm tra độ tuổi truyện
    const [isChecked, setIsChecked] = useState(false);

    const [selections, setSelections] = useState({
        violence: "",
        nudity: "",
        sexualContent: "",
        profanity: "",
        alcohol: "",
        sensitiveThemes: "",
    });
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setSelections((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxClick = () => {
        if (Object.values(selections).every((value) => value !== "")) {
            setIsChecked((prev) => !prev);
        }
    };

    // lưu độ tuổi truyện
    const [isAge, setIsAge] = useState(0);

    // Sử dụng useEffect để cập nhật isAge mỗi khi selections thay đổi
    useEffect(() => {
        // Kiểm tra nếu tất cả các trường đều đã được chọn
        if (Object.values(selections).some((value) => value === "")) {
            setIsAge("Please complete the Self Assessment above to get the result");
            return;
        }

        // Chuyển đổi giá trị thành số
        const numericSelections = Object.values(selections)
            .map((val) => parseInt(val, 10))
            .filter((val) => !isNaN(val));

        // Tìm giá trị cao nhất trong các trường selections
        const maxSelectionValue = Math.max(...numericSelections);

        // Dựa vào giá trị cao nhất để xác định isAge
        switch (maxSelectionValue) {
            case 0:
                setIsAge(0);
                break;
            case 1:
                setIsAge(12);
                break;
            case 2:
                setIsAge(15);
                break;
            case 3:
                setIsAge(19);
                break;
            default:
                setIsAge(99);
        }
    }, [selections]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            let newPhotos = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
            setPhotos(newPhotos);
            setsquareThumbnail(file)
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

    const handleAdd = async () => {
        try {
            setloading(false)
            if (id.id) {
                const data = {
                    title: valueTitle,
                    summary: valueSummary,
                    genre2,
                    genre1,
                    totalChapters: comicid?.totalChapters,
                    totalSubscribed: comicid?.totalSubscribed,
                    createTime: new Date(Date.now()),
                    lock: comicid?.lock,
                    check: comicid?.check,
                    Age: isAge,
                    Author: Account.name,
                    uid: Account.uid,
                    rate: comicid?.rate,
                    views: comicid?.views,
                    schedule: valueDay
                    // schedule: dayNames[new Date(Date.now()).getDay()]
                };
                await comicFireBase.update(data, id.id)
                navigate(`/publish/original/${id.id}`)
                goToEposodes()
            } else {
               if(horizontalThumbnail?.name && squareThumbnail?.name){
                const data = {
                    title: valueTitle,
                    summary: valueSummary,
                    genre2,
                    genre1,
                    totalChapters: 0,
                    totalSubscribed: 0,
                    createTime: new Date(Date.now()),
                    lock: true,
                    check: false,
                    random: Math.random().toFixed(2),
                    Age: isAge,
                    Author: Account.name,
                    uid: Account.uid,
                    rate: 0,
                    views: 0,
                    schedule: valueDay
                    // schedule: dayNames[new Date(Date.now()).getDay()]
                };
                const idcom = await comicFireBase.Add(data)
                await comicFireBase.uploadToFirebase(squareThumbnail, squareThumbnail.name, Account.id, idcom, 'squareThumbnail')
                await comicFireBase.uploadToFirebase(horizontalThumbnail, horizontalThumbnail.name, Account.uid, idcom, 'horizontalThumbnail')
                navigate(`/publish/original/${idcom}`)
                goToEposodes()
               }
            }
            setloading(true)

        } catch (error) {
            console.log(error)
        }
    };

    //Lấy ngôn ngữ
    const language = useSelector((state) => state.hidden.language);

    return (
        <div>
            {!loading ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                    <CircularProgress />
                </Box> :
                <div className="w-full h-full bg-gray-100">
                    {/* Phần tiêu đề mục */}
                    <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
                        <ul className="w-full flex items-center justify-center xs:gap-0 sm:gap-10">
                            <li className="min-w-[160px] uppercase font-semibold cursor-pointer flex items-center justify-center">
                                <div className="w-[40px] h-[40px] bg-green-500 rounded-full border flex items-center justify-center mx-2">
                                    <span className="mx-3 text-2xl text-white font-bold">1</span>
                                </div>

                                <h1 className="w-full text-black text-md">
                                    {!language ? (
                                        <span> ORIGINAL SERIES</span>
                                    ) : (
                                        <span>오리지널 시리즈</span>
                                    )}
                                </h1>

                            </li>
                            <li className="xs:ml-2 uppercase font-semibold text-md flex items-center justify-center">
                                <span className="text-gray-400">
                                    <ArrowForwardIosIcon />
                                </span>
                            </li>
                            <li className="min-w-[160px] uppercase font-semibold flex items-center justify-center">
                                <div className="w-[40px] h-[40px] bg-gray-500 rounded-full border flex items-center justify-center mx-2">
                                    <span className="mx-3 text-2xl text-white font-bold">2</span>
                                </div>
                                <h1 className="w-full text-gray-400 text-md">
                                    {!language ? (
                                        <span> ORIGINAL EPISODES</span>
                                    ) : (
                                        <span> 원본 에피소드 </span>
                                    )}

                                </h1>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full h-full sm:px-[160px] xs:px-[10px] sm:ml-0">
                        <div className="w-full h-full py-5 grid grid-cols-1 lg:grid-cols-3">
                            {/* Phần cột bên trái */}
                            <div className="w-full h-full col-span-1 ">

                                {/* Phần tải ảnh đại diện cho series */}
                                <div className="w-full">
                                    <div className="w-full py-3">
                                        <span className="w-full font-semibold text-xl">
                                            {!language ? (
                                                <span>Square Thumbnail</span>
                                            ) : (
                                                <span>정사각형 썸네일</span>
                                            )}
                                        </span>
                                    </div>

                                    <div className="w-full flex items-center justify-center">
                                        {/* Nút tải ảnh đại diện cho series truyện */}
                                        {photos ? (
                                            <img
                                                src={photos}
                                                alt="Selected"
                                                className="w-[200px] h-[200px] object-cover rounded"
                                            />
                                        ) : (
                                            <>
                                                <button className="w-[200px] h-[200px] relative  shadow border bg-red-50 rounded hover:border-green-500 hover:text-gray-500 flex items-center justify-center group">
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
                                                            onChange={(e) => handlePhotoChange(e)}
                                                            className="absolute inset-0 opacity-0 cursor-pointer "
                                                        />
                                                    </div>
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    <div className="w-full py-3">

                                        <span className="block w-full font-semibold text-sm text-gray-500">
                                            {!language ? (
                                                "Image size must be 1080x1080."
                                            ) : (
                                                "이미지 크기는 1080x1080 이어야 합니다."
                                            )}
                                        </span>

                                        <span className="block w-full font-semibold text-sm text-gray-500">
                                            {!language ? (
                                                "Image must be less than 500KB."
                                            ) : (
                                                "이미지는 500KB 이하이어야 합니다."
                                            )}
                                        </span>

                                        <span className="block w-full font-semibold text-sm text-gray-500">
                                            {!language ? (
                                                "Only JPG, JPEG, and PNG formats are allowed."
                                            ) : (
                                                "JPG, JPEG, PNG 형식만 허용됩니다."
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* Phần tải ảnh nền cho series */}
                                <div className="w-full ">
                                    <div className="w-full  py-3">
                                        <span className="w-full font-semibold text-xl">
                                            {!language ? (
                                                "Horizontal Thumbnail"
                                            ) : (
                                                "가로형 썸네일"
                                            )}
                                        </span>
                                    </div>

                                    <div className="w-full shadow flex items-center justify-center">
                                        {/* Nút tải ảnh nền */}
                                        {photos1 ? (
                                            <img
                                                src={photos1}
                                                alt="Selected"
                                                className="w-[350px] h-[200px] object-cover rounded"
                                            />
                                        ) : (
                                            <>
                                                <button className="w-[350px] h-[200px]  relative shadow border bg-red-50 rounded hover:border-green-500 hover:text-gray-500 flex items-center justify-center group">
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

                                        <span className="block w-full font-semibold text-sm text-gray-500">
                                            {!language ? (
                                                "Image size must be 1920x1080."
                                            ) : (
                                                "이미지 크기는 1920x1080 이어야 합니다."
                                            )}
                                        </span>

                                        <span className="block w-full font-semibold text-sm text-gray-500">
                                            {!language ? (
                                                "Image must be less than 700KB."
                                            ) : (
                                                "이미지는 700KB 이하이어야 합니다."
                                            )}
                                        </span>


                                        <span className="block w-full font-semibold text-sm text-gray-500">
                                            {!language ? (
                                                "Only JPG, JPEG, and PNG formats are allowed."
                                            ) : (
                                                "JPG, JPEG, PNG 형식만 허용됩니다."
                                            )} </span>

                                        <span className="block w-full font-semibold text-sm text-gray-500">

                                        </span>


                                    </div>

                                </div>
                            </div>

                            {/* Phần cột bên phải */}
                            <div className="w-full h-full col-span-2">
                                {/* Phần chọn thể loại */}
                                <div className="w-full py-3 pl-5 grid xs:grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-6">
                                    {/* Phần chọn thể loại 1 */}
                                    <div className="w-full">
                                        <h1 className="w-full font-semibold text-xl">
                                            {!language ? ("Genre 1") : ("장르 1")}
                                        </h1>

                                        <FormControl className="w-full">
                                            <Select
                                                value={genre1}
                                                onChange={handleChangeGenre1}
                                                displayEmpty
                                                className="w-full h-[40px] bg-white mt-3 rounded-md"
                                            >
                                                <MenuItem value="">
                                                    {!language ? (
                                                        "Select"
                                                    ) : (
                                                        "선택"
                                                    )}

                                                </MenuItem>
                                                {/* khung nội dung */}
                                                {dataListGenre.map((item) => (
                                                    <MenuItem key={item.id} value={item.name}>
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? item.name : item.nameKorean}
                                                        </span>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Phần chọn thể loại 2 */}
                                    <div className="w-full">
                                        <h1 className="w-full font-semibold text-xl">
                                            {!language ? ("Genre 2") : ("장르 2")}
                                        </h1>

                                        <FormControl className="w-full">
                                            <Select
                                                value={genre2}
                                                onChange={handleChangeGenre2}
                                                displayEmpty
                                                className="w-full h-[40px] bg-white mt-3 rounded-md"
                                            >
                                                <MenuItem value="">
                                                    {!language ? (
                                                        "Select"
                                                    ) : (
                                                        "선택"
                                                    )}
                                                </MenuItem>
                                                {dataListGenre.map((item) => (
                                                    <MenuItem key={item.id} value={item.name}>
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? item.name : item.nameKorean}
                                                        </span>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                <div className="w-full py-3 pl-5 grid xs:grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-6">
                                    {/* Phần tiêu đề series truyện  */}
                                    <div className="w-full">
                                        <h1 className="w-full font-semibold text-xl">
                                            {!language ? (
                                                "Series Title"
                                            ) : (
                                                "시리즈 제목"
                                            )}
                                        </h1>

                                        <input
                                            className="w-full h-[40px] mt-3 bg-white px-3 border-2"
                                            placeholder={!language ? "Less than 50 characters" : "50자 미만입니다"}
                                            value={valueTitle}
                                            onChange={handleTitle}
                                        />
                                    </div>

                                    {/* Phần chọn lịch đăng truyện */}
                                    <div className="w-full">
                                        <h1 className="min-w-[250px] font-semibold text-xl">
                                            {!language ? "Release Schedule" : "연재 일정"}
                                        </h1>

                                        <FormControl className="w-full xs:col-span-1 lg:col-span-2">
                                            <Select
                                                name="day"
                                                value={valueDay} // Sử dụng biến trạng thái cho giá trị
                                                onChange={handleSelectDay} // Cập nhật khi chọn ngày
                                                displayEmpty
                                                className="w-full h-[40px] bg-white mt-3 rounded-md"
                                            >
                                                <MenuItem value="">
                                                    <span className="whitespace-normal">
                                                        {!language ? "Please select day" : "날짜를 선택하세요"}
                                                    </span>
                                                </MenuItem>
                                                {days?.map((item, index) => (
                                                    <MenuItem key={index} value={item.day}> {/* Dùng item.day (viết tắt) làm giá trị */}
                                                        <span className="whitespace-normal text-red-500">
                                                            {item && (!language ? dayMapping[item.day] : item.daysInKorean)} {/* Hiển thị tên đầy đủ hoặc tiếng Hàn */}
                                                        </span>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                {/* Phần mô tả series truyện  */}
                                <div className="w-full py-3 pl-5">

                                    <h1 className="w-full font-semibold text-xl">
                                        {!language ? (
                                            "Summary"
                                        ) : (
                                            "요약"
                                        )}
                                    </h1>

                                    <textarea
                                        className="w-full h-[300px] mt-3 bg-white px-3 py-2 border-2"
                                        placeholder={!language ? "Less than 500 characters" : "500자 미만입니다"}
                                        value={valueSummary}
                                        onChange={handleSummary}
                                    />
                                </div>

                                {/* Phần hướng dẫn */}
                                <div className="w-full py-3 pl-5">
                                    <h1 className="w-full font-semibold text-xl">
                                        {!language ? (
                                            "Content Rating Self Assessment"
                                        ) : (
                                            "콘텐츠 등급 자체 평가"
                                        )}
                                    </h1>
                                </div>

                                {/* Phần chọn nội dung truyện buộc chọn xong mới có thể nhấn nút check*/}
                                <div className="w-full py-3 pl-5">
                                    {/* Khi chọn xong nội dung các ô thì sẽ trả về độ tuổi truyện */}
                                    <ul className="grid grid-cols-1 gap-4">
                                        <li className="w-full h-auto grid xs:grid-cols-1 lg:grid-cols-3">
                                            <h1 className="col-span-1 min-w-[200px] h-full flex items-center font-semibold">
                                                {!language ? (
                                                    "Violent and graphic content"
                                                ) : (
                                                    "폭력적이고 프래픽 풍부한 콘텐츠"
                                                )}
                                            </h1>

                                            <FormControl className="xs:col-span-1 lg:col-span-2">
                                                <Select
                                                    name="violence"
                                                    value={selections.violence}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-full bg-white mt-3 rounded-md"
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                maxWidth: "100%", // Đảm bảo không vượt quá kích thước màn hình
                                                                whiteSpace: "normal", // Giúp nội dung xuống dòng
                                                                wordBreak: "break-word", // Bẻ dòng với từ dài
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <span className="whitespace-normal">
                                                            {!language ? (
                                                                "Please select one"
                                                            ) : (
                                                                "하나를 선택하세요"
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="0">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "0: No violence, blood or gore."
                                                            ) : (
                                                                "0: 폭력, 피 또는 고어가 없음."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="1">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "1: Mild or fantasy blood in a few episodes."
                                                            ) : (
                                                                "1: 일부 에피소드에 약간의 피 또는 판타지적 피를 묘사."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="2">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "2: Violent themes with moderate blood or gore."
                                                            ) : (
                                                                "2: 중간 정도의 피 또는 고어가 있는 폭력적인 주제."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="3">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "3: Detailed violence, blood or gore."
                                                            ) : (
                                                                "3: 상세한 폭력, 피 또는 고어가 있는 장면."
                                                            )}
                                                        </span>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                        <li className="w-full h-auto grid xs:grid-cols-1 lg:grid-cols-3">

                                            <h1 className="col-span-1 min-w-[200px] h-full flex items-center font-semibold">
                                                {!language ? (
                                                    "Nudity"
                                                ) : (
                                                    "누드"
                                                )}
                                            </h1>

                                            <FormControl className="xs:col-span-1 lg:col-span-2">
                                                <Select
                                                    name="nudity"
                                                    value={selections.nudity}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-full bg-white mt-3 rounded-md"
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                maxWidth: "100%", // Đảm bảo không vượt quá kích thước màn hình
                                                                whiteSpace: "normal", // Giúp nội dung xuống dòng
                                                                wordBreak: "break-word", // Bẻ dòng với từ dài
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <span className="whitespace-normal">
                                                            {!language ? (
                                                                "Please select one"
                                                            ) : (
                                                                "하나를 선택하세요"
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="0">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "0: No nudity (partial and full)."
                                                            ) : (
                                                                "0: 누드 없음 (부분 또는 전체)."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="1">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                " 1: Some characters in minimal clothing (e.g., bathing suit, lingerie), non-sexual themes."
                                                            ) : (
                                                                "1: 일부 캐릭터가 최소한의 옷을 입고 있음 (예: 수영복, 속옷), 비성적 주제."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="2">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "2: Comedic nudity with strategic censoring."
                                                            ) : (
                                                                "2: 전략적 검열이 있는 코믹한 누드."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="3">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "3: Fan-service panels (e.g., minimal clothing in sexual posing). Sexually suggestive themes."
                                                            ) : (
                                                                "3: 팬 서비스를 위한 장면 (예: 성적인 포즈를 취한 최소한의 옷). 성적으로 암시하는 주제."
                                                            )}
                                                        </span>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                        <li className="w-full h-auto grid xs:grid-cols-1 lg:grid-cols-3">

                                            <h1 className="col-span-1 min-w-[200px] h-full flex items-center font-semibold">
                                                {!language ? (
                                                    "Sexual content"
                                                ) : (
                                                    "성적 콘텐츠"
                                                )}
                                            </h1>

                                            <FormControl className="xs:col-span-1 lg:col-span-2">
                                                <Select
                                                    name="sexualContent"
                                                    value={selections.sexualContent}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-full bg-white mt-3 rounded-md"
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                maxWidth: "100%", // Đảm bảo không vượt quá kích thước màn hình
                                                                whiteSpace: "normal", // Giúp nội dung xuống dòng
                                                                wordBreak: "break-word", // Bẻ dòng với từ dài
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <span className="whitespace-normal">
                                                            {!language ? (
                                                                "Please select one"
                                                            ) : (
                                                                "하나를 선택하세요"
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="0">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "0: No sexual content or themes."
                                                            ) : (
                                                                "0: 성적 콘텐츠 또는 주제 없음."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="1">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "1: Mild sexual themes."
                                                            ) : (
                                                                "1: 경미한 성적 주제."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="2">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "2: Sexual content or innuendos in a few episodes."
                                                            ) : (
                                                                "2: 일부 에피소드에서 성적 콘텐츠 또는 암시가 있다."
                                                            )}</span>
                                                    </MenuItem>

                                                    <MenuItem value="3">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                " 3: Sexual content and sexually suggestive themes throughout series."
                                                            ) : (
                                                                "3: 시리즈 전체에서 성적 콘텐츠와 성적 암시 주제."
                                                            )}
                                                        </span>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                        <li className="w-full h-auto grid xs:grid-cols-1 lg:grid-cols-3">

                                            <h1 className="col-span-1 min-w-[200px] h-full flex items-center font-semibold">
                                                {!language ? (
                                                    "Profanity"
                                                ) : (
                                                    "욕설"
                                                )}
                                            </h1>

                                            <FormControl className="xs:col-span-1 lg:col-span-2">
                                                <Select
                                                    name="profanity"
                                                    value={selections.profanity}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-full bg-white mt-3 rounded-md"
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                maxWidth: "100%", // Đảm bảo không vượt quá kích thước màn hình
                                                                whiteSpace: "normal", // Giúp nội dung xuống dòng
                                                                wordBreak: "break-word", // Bẻ dòng với từ dài
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <span className="whitespace-normal">
                                                            {!language ? (
                                                                "Please select one"
                                                            ) : (
                                                                "하나를 선택하세요"
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="0">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "0: No profanity."
                                                            ) : (
                                                                "0: 욕설 없음."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="1">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "1: Fully censored profanity (e.g., #$%^) in a few episodes."
                                                            ) : (
                                                                "1: 일부 에피소드에서 완전히 검열된 욕설."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="2">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "2: Uncensored or partially censored profanity in a few episodes."
                                                            ) : (
                                                                "2: 일부 에피소드에서 검열되지 않거나 부분적으로 검열된 욕설이 있다."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="3">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "3: Uncensored profanity throughout series."
                                                            ) : (
                                                                "3: 시리즈 전체에 걸쳐 검열되지 않은 욕설."
                                                            )}
                                                        </span>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                        <li className="w-full h-auto grid xs:grid-cols-1 lg:grid-cols-3">

                                            <h1 className="col-span-1 min-w-[200px] h-full flex items-center font-semibold">
                                                {!language ? (
                                                    "Alcohol, drugs or tobacco."
                                                ) : (
                                                    "알코올, 마약 또는 담배."
                                                )}
                                            </h1>

                                            <FormControl className="xs:col-span-1 lg:col-span-2">
                                                <Select
                                                    name="alcohol"
                                                    value={selections.alcohol}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-full bg-white mt-3 rounded-md"
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                sx: {
                                                                    maxWidth: "100%", // Đảm bảo không vượt quá kích thước màn hình
                                                                    whiteSpace: "normal", // Giúp nội dung xuống dòng
                                                                    wordBreak: "break-word", // Bẻ dòng với từ dài
                                                                },
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <span className="whitespace-normal">
                                                            {!language ? (
                                                                "Please select one"
                                                            ) : (
                                                                "하나를 선택하세요"
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="0">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "0: No alcohol, tobacco, or drugs."
                                                            ) : (
                                                                "0: 알코올, 담배, 마약 없음."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="1">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "1: A few mentions of alcohol, tobacco, or drugs."
                                                            ) : (
                                                                "1: 알코올, 담배 또는 마약이 몇 번 언급됨. "
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="2">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                " 2: Implied or mild consumption of alcohol, tobacco, or drugs."
                                                            ) : (
                                                                "2: 알코올, 담배, 마약 암시되거나 경미한 사용."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="3">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "3: Depiction of moderate to excessive consumption of alcohol, tobacco, or drugs."
                                                            ) : (
                                                                "3: 중간에서 과도한 알코올, 담배 또는 마약 사용 묘사."
                                                            )}
                                                        </span>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                        <li className="w-full h-auto grid xs:grid-cols-1 lg:grid-cols-3">

                                            <h1 className="col-span-1 min-w-[200px] h-full flex items-center font-semibold">
                                                {!language ? (
                                                    "Sensitive themes and topics"
                                                ) : (
                                                    "민감한 주제와 토픽"
                                                )}
                                            </h1>

                                            <FormControl className="xs:col-span-1 lg:col-span-2">
                                                <Select
                                                    name="sensitiveThemes"
                                                    value={selections.sensitiveThemes}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-full bg-white mt-3 rounded-md"
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                maxWidth: "100%", // Đảm bảo không vượt quá kích thước màn hình
                                                                whiteSpace: "normal", // Giúp nội dung xuống dòng
                                                                wordBreak: "break-word", // Bẻ dòng với từ dài
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <span className="whitespace-normal">
                                                            {!language ? (
                                                                "Please select one"
                                                            ) : (
                                                                "하나를 선택하세요"
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="0">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "0: No sensitive themes or topics."
                                                            ) : (
                                                                "0: 민감한 주제나 토픽 없음."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="1">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "1: A few mentions of themes or topics such as self-harm, bullying, or abuse."
                                                            ) : (
                                                                "1: 자해, 괴롭힘, 학대 등의 주제나 토픽이 몇 번 언급됨."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="2">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "2: Sensitive themes or topics such as self-harm, bullying, or abuse are mildly explored in some story arcs."
                                                            ) : (
                                                                "2: 자해, 괴롭힘, 학대와 같은 민감한 주제나 토픽는 일부  스토리 아크에서 약간 탐구됨."
                                                            )}
                                                        </span>
                                                    </MenuItem>

                                                    <MenuItem value="3">
                                                        <span className="whitespace-normal text-red-500">
                                                            {!language ? (
                                                                "3: Sensitive themes such as self-harm, bullying, or abuse explored and are consistently present throughout the series."
                                                            ) : (
                                                                "3: 자해, 괴롭힘 또는 학대와 같은 민감한 주제가 탐구되며 시리즈 전반에 자해, 괴롭힘 또는 학대와 같은 민감한 주제가 탐구되며 시리즈."
                                                            )}
                                                        </span>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                    </ul>

                                    {/* Khi chọn xong mới nhấn được check để qua phần tải tập truyện  */}
                                    <div className="w-full lg:min-w-full mt-[60px]">
                                        <button
                                            className={`w-[35px] h-[35px] border-2 rounded-full ${Object.values(selections).every((value) => value !== "")
                                                ? isChecked
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-300"
                                                : "bg-gray-300"
                                                }`}
                                            onClick={handleCheckboxClick}
                                            disabled={
                                                !Object.values(selections).every((value) => value !== "")
                                            }
                                        >
                                            <CheckIcon />
                                        </button>
                                        <span className="ml-2 font-semibold">
                                            {!language ? (
                                                "I acknowledge that the assigned Content Rating of my series is"
                                            ) : (
                                                "내 시리즈의 콘텐츠 등급이 ...로 지정된 것을 확인합니다"
                                            )}

                                            {!language ? (
                                                <span>
                                                    <span className="ml-1 text-red-500">
                                                        {typeof isAge === 'string' ? `${isAge}`
                                                            :
                                                            typeof isAge === 'number' ? `${isAge}+` : ''}
                                                    </span>
                                                    {`.`}
                                                </span>
                                            ) : (
                                                <span>
                                                    <span className="ml-1 text-red-500">
                                                        {typeof isAge === 'string' ? '결과를 얻으려면 위 자가 평가를 완료하십시오'
                                                            :
                                                            typeof isAge === 'number' ? `${isAge}+` : ''}
                                                    </span>
                                                    {`.`}
                                                </span>
                                            )}

                                        </span>
                                    </div>
                                </div>

                                {/* Nút để qua tập truyện */}
                                <div className="w-full pl-5 mt-[50px]">
                                    <button
                                        onClick={handleAdd}
                                        className={`w-[200px] h-[50px] ${isChecked
                                            ? "bg-green-500"
                                            : "bg-gray-200 cursor-not-allowed"
                                            } rounded-full shadow text-white font-semibold`}
                                        disabled={!isChecked}
                                    >
                                        {!language ? (
                                            "Create Series"
                                        ) : (
                                            "시리즈 만들기"
                                        )}

                                        <NavigateNextIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default SeriesOriginalPage;
