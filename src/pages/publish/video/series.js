import React, { useState, useEffect } from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NorthIcon from '@mui/icons-material/North';
import CheckIcon from '@mui/icons-material/Check';
import VideoFireBase from '../../../common/services/Video.services';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getidVideo } from '../../../common/store/Video';
import { unwrapResult } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const dataListGenre = [
    { id: 1, name: "DRAMA", translatedName: "(드라마)" },
    { id: 2, name: "FANTASY", translatedName: "(판타지)" },
    { id: 3, name: "COMEDY", translatedName: "(코미디)" },
    { id: 4, name: "ACTION", translatedName: "(액션)" },
    { id: 5, name: "SLICE OF LIFE", translatedName: "(일상)" },
    { id: 6, name: "ROMANCE", translatedName: "(로맨스)" },
    { id: 7, name: "SUPERHERO", translatedName: "(슈퍼히어로)" },
    { id: 8, name: "SCI-FI", translatedName: "(과학)" },
    { id: 9, name: "THRILLER", translatedName: "(스릴러)" },
    { id: 10, name: "SUPERNATURAL", translatedName: "(초자연적)" },
    { id: 11, name: "MYSTERY", translatedName: "(미스터리)" },
    { id: 12, name: "SPORTS", translatedName: "(스포츠)" },
    { id: 13, name: "HISTORICAL", translatedName: "(역사)" },
    { id: 14, name: "HEARTWARMING", translatedName: "(따뜻한)" },
    { id: 15, name: "HORROR", translatedName: "(공포)" },
    { id: 16, name: "INFORMATIVE", translatedName: "(정보)" },
    { id: 17, name: "SCHOOL", translatedName: "(학교)" },
    { id: 18, name: "ANIMALS", translatedName: "(동물)" },
    { id: 19, name: "ZOMBIES", translatedName: "(좀비)" },
    { id: 20, name: "SHORT STORY", translatedName: "(단편)" }
];

// Sắp xếp mảng theo tên thể loại theo bảng chữ cái
dataListGenre.sort((a, b) => a.name.localeCompare(b.name));

const SeriesVideoPage = ({ goToEposodes }) => {
    const Account = useSelector((state) => state.Account.Account);
    const navigate = useNavigate();
    const id = useParams();

    // Tiêu đề video
    const [valueTitle, setValueTile] = useState('');
    const [photos, setPhotos] = useState(""); // Lưu các ảnh đã chọn
    const [photos1, setPhotos1] = useState(""); // Lưu các ảnh đã chọn
    const [squareThumbnail, setsquareThumbnail] = useState();
    const [horizontalThumbnail, sethorizontalThumbnail] = useState();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const Videoid = useSelector((state) => state.Video.videoid);

    const [loading, setloading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const get = async () => {
            try {
                if (id.id) {
                    setloading(false)
                    const VideoID = await dispatch(getidVideo(id.id))
                    const getvideo = unwrapResult(VideoID)
                    setPhotos(getvideo?.squareThumbnail)
                    setPhotos1(getvideo?.horizontalThumbnail)
                    setValueTile(getvideo?.title)
                    setIsAge(getvideo?.Age)

                    setValueSummary(getvideo?.summary)
                    setloading(true)
                }

            } catch (error) {
            }
        }
        get()
    }, [dispatch, id]);
    const handleTitle = (event) => {
        const inputValueTitle = event.target.value;
        if (inputValueTitle.length <= 50) { // Giới hạn số ký tự nhập vào là 50
            setValueTile(inputValueTitle);
        }
    };

    // Mô tả video
    const [valueSummary, setValueSummary] = useState('');
    const handleSummary = (event) => {
        const inputValueSummary = event.target.value;
        if (inputValueSummary.length <= 500) { // Giới hạn số ký tự nhập vào là 500
            setValueSummary(inputValueSummary);
        }
    };

    // Nhấn nút check để kiểm tra độ tuổi truyện
    const [isChecked, setIsChecked] = useState(false);

    const [selections, setSelections] = useState({
        violence: '',
        nudity: '',
        sexualContent: '',
        profanity: '',
        alcohol: '',
        sensitiveThemes: ''
    });

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setSelections(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxClick = () => {
        if (Object.values(selections).every(value => value !== '')) {
            setIsChecked(prev => !prev);
        }
    };

    // lưu độ tuổi truyện
    const [isAge, setIsAge] = useState(0);

    // Sử dụng useEffect để cập nhật isAge mỗi khi selections thay đổi
    useEffect(() => {
        // Kiểm tra nếu tất cả các trường đều đã được chọn
        if (Object.values(selections).some(value => value === '')) {
            setIsAge('Please complete the Self Assessment above to get the result');
            return;
        }

        // Chuyển đổi giá trị thành số
        const numericSelections = Object.values(selections)
            .map(val => parseInt(val, 10))
            .filter(val => !isNaN(val));

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
                    totalChapters: Videoid?.totalChapters,
                    totalSubscribed: Videoid?.totalSubscribed,
                    createTime: new Date(Date.now()),
                    lock: Videoid?.lock,
                    check: Videoid?.check,
                    random: Math.random().toFixed(2),
                    Age: isAge,
                    Author: Account.name,
                    uid: Account.uid,
                    rate: Videoid?.rate,
                    views: Videoid?.views,
                    schedule: dayNames[new Date(Date.now()).getDay()]
                };
                await VideoFireBase.update(data, id.id)
                navigate(`/publish/video/${id.id}`)
                goToEposodes()
            } else {
                const data = {
                    title: valueTitle,
                    summary: valueSummary,
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
                    schedule: dayNames[new Date(Date.now()).getDay()]
                };
                const idvideo = await VideoFireBase.Add(data)
                await VideoFireBase.uploadToFirebase(squareThumbnail, squareThumbnail.name, Account.id, idvideo, 'squareThumbnail')
                await VideoFireBase.uploadToFirebase(horizontalThumbnail, horizontalThumbnail.name, Account.uid, idvideo, 'horizontalThumbnail')
                navigate(`/publish/video/${idvideo}`)
                goToEposodes()
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
            {!loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <CircularProgress />
            </Box> :
                <div className="w-full h-full bg-gray-100">

                    {/* Phần tiêu đề mục */}
                    <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
                        <ul className="flex gap-10">
                            <li className="uppercase font-semibold cursor-pointer text-md flex items-center justify-center">
                                <div className="w-[40px] h-[40px] bg-green-500 rounded-full border flex items-center justify-center mx-2">
                                    <span className="mx-3 text-2xl text-white font-bold">
                                        1
                                    </span>
                                </div>

                                {!language ? (
                                    <h1 className="text-black">
                                        VIDEO SERIES
                                    </h1>
                                ) : (
                                    <h1 className="text-black">
                                        비디오 시리즈
                                    </h1>
                                )}

                            </li>
                            <li className="uppercase font-semibold text-md flex items-center justify-center">
                                <span className="text-gray-400">
                                    <ArrowForwardIosIcon />
                                </span>
                            </li>
                            <li className="uppercase font-semibold text-md flex items-center justify-center">
                                <div className="w-[40px] h-[40px] bg-gray-500 rounded-full border flex items-center justify-center mx-2">
                                    <span className="mx-3 text-2xl text-white font-bold">
                                        2
                                    </span>
                                </div>

                                {!language ? (
                                    <h1 className="text-gray-400">
                                        VIDEO EPISODES
                                    </h1>
                                ) : (
                                    <h1 className="text-gray-400">
                                        VIDEO EPISODES
                                    </h1>
                                )}

                            </li>
                        </ul>
                    </div>

                    <div className="w-full h-full px-[160px]">
                        <div className="w-full h-full py-5 flex">
                            {/* Phần cột bên trái */}
                            <div className="w-[380px] h-full">

                                {/* Phần tải ảnh đại diện cho series video */}
                                <div className="w-full h-full">
                                    <div className="w-full py-3">
                                        {!language ? (
                                            <h1 className="w-full font-semibold text-xl">
                                                Square Thumbnail
                                            </h1>
                                        ) : (
                                            <h1 className="w-full font-semibold text-xl">
                                                정사각형 썸네일
                                            </h1>
                                        )}
                                    </div>

                                    <div className="w-[350px] flex items-center justify-center">
                                        {/* Nút tải ảnh đại diện cho series truyện */}
                                        {photos ? (
                                            <img
                                                src={photos}
                                                alt="Selected"
                                                className="w-[350px] h-[200px] object-cover rounded"
                                            />
                                        ) : (
                                            <>
                                                <button className="w-[200px] h-[200px] relative  shadow border bg-red-50 rounded hover:border-green-500 hover:text-gray-500 flex items-center justify-center group">
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
                                                            onChange={(e) => handlePhotoChange(e)}
                                                            className="absolute inset-0 opacity-0 cursor-pointer "
                                                        />
                                                    </div>
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    <div className="w-full py-3">

                                        {!language ? (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                Image size must be 1920x1080.
                                            </span>
                                        ) : (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                이미지 크기는 1920x1080 이어야 합니다.
                                            </span>
                                        )}

                                        {!language ? (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                Image must be less than 500KB.
                                            </span>
                                        ) : (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                이미지는 500KB 이하이어야 합니다.
                                            </span>
                                        )}

                                        {!language ? (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                Only JPG, JPEG, and PNG formats are allowed.
                                            </span>
                                        ) : (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                JPG, JPEG, PNG 형식만 허용됩니다.
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Phần tải ảnh nền cho series video */}
                                <div className="w-full h-full ">
                                    <div className="w-full py-3">
                                        {!language ? (
                                            <h1 className="w-full font-semibold text-xl">
                                                Horizontal Thumbnail
                                            </h1>
                                        ) : (
                                            <h1 className="w-full font-semibold text-xl">
                                                가로형 썸네일
                                            </h1>
                                        )}
                                    </div>

                                    <div className="w-[350px] shadow flex items-center justify-center">
                                        {/* Nút tải ảnh nền cho serise video*/}
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
                                    </div>

                                    <div className="w-full py-3">
                                        {!language ? (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                Image size must be 1920x1080.
                                            </span>
                                        ) : (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                이미지 크기는 1920x1080 이어야 합니다.
                                            </span>
                                        )}

                                        {!language ? (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                Image must be less than 700KB.
                                            </span>
                                        ) : (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                이미지는 700KB 이하이어야 합니다.
                                            </span>
                                        )}

                                        {!language ? (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                Only JPG, JPEG, and PNG formats are allowed.
                                            </span>
                                        ) : (
                                            <span className="block w-full font-semibold text-sm text-gray-500">
                                                JPG, JPEG, PNG 형식만 허용됩니다.
                                            </span>
                                        )}

                                    </div>

                                </div>
                            </div>

                            {/* Phần cột bên phải */}
                            <div className="w-[820px] h-full grid grid-cols-1">

                                {/* Phần tiêu đề series video  */}
                                <div className="w-full py-3 pl-5">

                                    {!language ? (
                                        <h1 className="w-full font-semibold text-xl">
                                            Series title
                                        </h1>
                                    ) : (
                                        <h1 className="w-full font-semibold text-xl">
                                            시리즈 제목
                                        </h1>
                                    )}

                                    <input
                                        className="w-full h-[40px] mt-3 bg-white px-3"
                                        placeholder="Less than 50 characters"
                                        value={valueTitle}
                                        onChange={handleTitle}
                                    />
                                </div>

                                {/* Phần mô tả series video  */}
                                <div className="w-full py-3 pl-5">

                                    {!language ? (
                                        <h1 className="w-full font-semibold text-xl">
                                            Summary
                                        </h1>
                                    ) : (
                                        <h1 className="w-full font-semibold text-xl">
                                            요약
                                        </h1>
                                    )}

                                    <textarea
                                        className="w-full h-[300px] mt-3 bg-white px-3 py-2"
                                        placeholder="Less than 500 characters"
                                        value={valueSummary}
                                        onChange={handleSummary}
                                    />

                                </div>

                                {/* Phần hướng dẫn */}
                                <div className="w-full py-3 pl-5">
                                    {!language ? (
                                        <h1 className="w-full font-semibold text-xl">
                                            Content Rating Self Assessment
                                        </h1>
                                    ) : (
                                        <h1 className="w-full font-semibold text-xl">
                                            콘텐츠 등급 자체 평가
                                        </h1>
                                    )}

                                    {/* <div className="w-full mt-2 flex flex-wrap">
                                    <span className="w-full">
                                        All series on WEBTOON must now display a Content Rating.
                                        With visible Content Ratings, we can help users discover
                                        content that should be appropriate for their age group and
                                        align with their content preferences.
                                    </span>
                                    <span className="w-full">
                                        To ensure the appropriate Content Rating is assigned to your series,
                                        please respond to the following questionnaire regarding the content
                                        of your series. Please note that ratings are subject to change at
                                        WEBTOON's sole discretion and without prior notice.
                                        The WEBTOON Community Policy and Uploading Guidelines will remain the same. Content Rating Guide.
                                    </span>
                                </div> */}
                                </div>

                                {/* Phần chọn nội dung video buộc chọn xong mới có thể nhấn nút check*/}
                                <div className="w-full py-3 pl-5">
                                    {/* Khi chọn xong nội dung các ô thì sẽ trả về độ tuổi truyện */}
                                    <ul className="grid grid-cols-1 gap-4">
                                        <li className="w-full h-[50px] flex items-center">

                                            {!language ? (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    Violent and graphic content
                                                </h1>
                                            ) : (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    폭력적이고 프래픽 풍부한 콘텐츠
                                                </h1>
                                            )}

                                            <FormControl className="w-full">
                                                <Select
                                                    name="violence"
                                                    value={selections.violence}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-[50px] bg-white mt-3 rounded-md"
                                                    MenuProps={{ PaperProps: { sx: { maxWidth: '300px', whiteSpace: 'normal', } } }}
                                                >
                                                    <MenuItem value="">
                                                        {!language ? (
                                                            <span className="whitespace-normal">
                                                                Please select one
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal">
                                                                하나를 선택하세요
                                                            </span>
                                                        )}

                                                    </MenuItem>
                                                    <MenuItem value="0">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: No violence, blood or gore.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: 폭력, 피 또는 고어가 없음.
                                                            </span>
                                                        )}

                                                    </MenuItem>
                                                    <MenuItem value="1">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: Mild or fantasy blood in a few episodes.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: 일부 에피소드에 약간의 피 또는 판타지적 피를 묘사.
                                                            </span>
                                                        )}

                                                    </MenuItem>
                                                    <MenuItem value="2">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: Violent themes with moderate blood or gore.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: 중간 정도의 피 또는 고어가 있는 폭력적인 주제.
                                                            </span>
                                                        )}

                                                    </MenuItem>
                                                    <MenuItem value="3">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: Detailed violence, blood or gore.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: 상세한 폭력, 피 또는 고어가 있는 장면.
                                                            </span>
                                                        )}

                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                        <li className="w-full h-[50px] flex items-center">

                                            {!language ? (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    Nudity
                                                </h1>
                                            ) : (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    누드
                                                </h1>
                                            )}

                                            <FormControl className="w-full">
                                                <Select
                                                    name="nudity"
                                                    value={selections.nudity}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-[50px] bg-white mt-3 rounded-md"
                                                    MenuProps={{ PaperProps: { sx: { maxWidth: '300px', whiteSpace: 'normal', } } }}
                                                >
                                                    <MenuItem value="">

                                                        {!language ? (
                                                            <span className="whitespace-normal">
                                                                Please select one
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal">
                                                                하나를 선택하세요
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="0">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: No nudity (partial and full).
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: No nudity (partial and full).
                                                            </span>
                                                        )}

                                                    </MenuItem>
                                                    <MenuItem value="1">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: Some characters in minimal clothing (e.g.,
                                                                bathing suit, lingerie), non-sexual themes.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: 일부 캐릭터가 최소한의 옷을 입고 있음 (예: 수영복, 속옷), 비성적 주제.
                                                            </span>
                                                        )}

                                                    </MenuItem>
                                                    <MenuItem value="2">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: Comedic nudity with strategic censoring.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: 전략적 검열이 있는 코믹한 누드.
                                                            </span>
                                                        )}

                                                    </MenuItem>
                                                    <MenuItem value="3">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: Fan-service panels (e.g., minimal clothing in
                                                                sexual posing). Sexually suggestive themes.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: 팬 서비스를 위한 장면 (예: 성적인 포즈를 취한 최소한의 옷).
                                                                성적으로 암시하는 주제.
                                                            </span>
                                                        )}

                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                        <li className="w-full h-[50px] flex items-center">
                                            {!language ? (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    Sexual content
                                                </h1>
                                            ) : (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    성적 콘텐츠
                                                </h1>
                                            )}

                                            <FormControl className="w-full">
                                                <Select
                                                    name="sexualContent"
                                                    value={selections.sexualContent}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-[50px] bg-white mt-3 rounded-md"
                                                    MenuProps={{ PaperProps: { sx: { maxWidth: '300px', whiteSpace: 'normal', } } }}
                                                >
                                                    <MenuItem value="">
                                                        {!language ? (
                                                            <span className="whitespace-normal">
                                                                Please select one
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal">
                                                                하나를 선택하세요
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="0">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: No sexual content or themes.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: 성적 콘텐츠 또는 주제 없음.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="1">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: Mild sexual themes.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: 경미한 성적 주제.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="2">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: Sexual content or innuendos in a few episodes.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: 일부 에피소드에서 성적 콘텐츠 또는 암시가 있다.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="3">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: Sexual content and sexually suggestive themes
                                                                throughout series.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: 시리즈 전체에서 성적 콘텐츠와 성적 암시 주제.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                        <li className="w-full h-[50px] flex items-center">
                                            {!language ? (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    Profanity
                                                </h1>
                                            ) : (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    욕설
                                                </h1>
                                            )}

                                            <FormControl className="w-full">
                                                <Select
                                                    name="profanity"
                                                    value={selections.profanity}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-[50px] bg-white mt-3 rounded-md"
                                                    MenuProps={{ PaperProps: { sx: { maxWidth: '300px', whiteSpace: 'normal', } } }}
                                                >
                                                    <MenuItem value="">
                                                        {!language ? (
                                                            <span className="whitespace-normal">
                                                                Please select one
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal">
                                                                하나를 선택하세요
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="0">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: No profanity.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: 욕설 없음.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="1">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: Fully censored profanity (e.g., #$%^) in a few episodes.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: 일부 에피소드에서 완전히 검열된 욕설.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="2">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: Uncensored or partially censored profanity in a few episodes.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: 일부 에피소드에서 검열되지 않거나 부분적으로 검열된 욕설이 있다.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="3">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: Uncensored profanity throughout series.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: 시리즈 전체에 걸쳐 검열되지 않은 욕설.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                        <li className="w-full h-[50px] flex items-center">
                                            {!language ? (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    Alcohol, drugs or tobacco.
                                                </h1>
                                            ) : (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    알코올, 마약 또는 담배.
                                                </h1>
                                            )}

                                            <FormControl className="w-full">
                                                <Select
                                                    name="alcohol"
                                                    value={selections.alcohol}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-[50px] bg-white mt-3 rounded-md"
                                                    MenuProps={{ PaperProps: { sx: { maxWidth: '300px', whiteSpace: 'normal', } } }}
                                                >
                                                    <MenuItem value="">
                                                        {!language ? (
                                                            <span className="whitespace-normal">
                                                                Please select one
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal">
                                                                하나를 선택하세요
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="0">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: No alcohol, tobacco, or drugs.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: 알코올, 담배, 마약 없음.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="1">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: A few mentions of alcohol, tobacco, or drugs.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: 알코올, 담배 또는 마약이 몇 번 언급됨.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="2">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: Implied or mild consumption of alcohol, tobacco,
                                                                or drugs.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: 알코올, 담배, 마약 암시되거나 경미한 사용.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="3">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: Depiction of moderate to excessive consumption of
                                                                alcohol, tobacco, or drugs.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: 중간에서 과도한 알코올, 담배 또는 마약 사용 묘사.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </li>
                                        <li className="w-full h-[50px] flex items-center">
                                            {!language ? (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    Sensitive themes and topics
                                                </h1>
                                            ) : (
                                                <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                                    민감한 주제와 토픽
                                                </h1>
                                            )}

                                            <FormControl className="w-full">
                                                <Select
                                                    name="sensitiveThemes"
                                                    value={selections.sensitiveThemes}
                                                    onChange={handleSelectChange}
                                                    displayEmpty
                                                    className="w-full h-[50px] bg-white mt-3 rounded-md"
                                                    MenuProps={{ PaperProps: { sx: { maxWidth: '300px', whiteSpace: 'normal', } } }}
                                                >
                                                    <MenuItem value="">
                                                        {!language ? (
                                                            <span className="whitespace-normal">
                                                                Please select one
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal">
                                                                하나를 선택하세요
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="0">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: No sensitive themes or topics.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                0: 민감한 주제나 토픽 없음.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="1">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: A few mentions of themes or topics such as
                                                                self-harm, bullying, or abuse.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                1: 자해, 괴롭힘, 학대 등의 주제나 토픽이 몇 번 언급됨.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="2">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: Sensitive themes or topics such as self-harm,
                                                                bullying, or abuse are mildly explored in some story
                                                                arcs.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                2: 자해, 괴롭힘, 학대와 같은 민감한 주제나 토픽는 일부  스토리 아크에서 약간 탐구됨.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem value="3">
                                                        {!language ? (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: Sensitive themes such as self-harm, bullying, or
                                                                abuse explored and are consistently present
                                                                throughout the series.
                                                            </span>
                                                        ) : (
                                                            <span className="whitespace-normal text-red-500">
                                                                3: 자해, 괴롭힘 또는 학대와 같은 민감한 주제가 탐구되며 시리즈 전반에 자해, 괴롭힘 또는 학대와 같은 민감한 주제가 탐구되며 시리즈.
                                                            </span>
                                                        )}
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>

                                        </li>
                                    </ul>

                                    {/* Khi chọn xong mới nhấn được check để qua phần tải tập video  */}
                                    <div className="mt-[60px]">
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
                                                <span>
                                                    I acknowledge that the assigned Content Rating of my series is
                                                </span>
                                            ) : (
                                                <span>
                                                    내 시리즈의 콘텐츠 등급이 ...로 지정된 것을 확인합니다
                                                </span>
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

                                {/* Nút để qua tập video */}
                                <div className="w-full pl-5 mt-[50px]">
                                    <button
                                        onClick={handleAdd}
                                        className={`w-[200px] h-[50px] ${isChecked ? 'bg-green-500' : 'bg-gray-200 cursor-not-allowed'} pl-2 rounded-full shadow text-white font-semibold flex items-center justify-center gap-5`}
                                        disabled={!isChecked}

                                    >
                                        {!language ? (
                                            <span>
                                                Create Series
                                            </span>
                                        ) : (
                                            <span>
                                                시리즈 만들기
                                            </span>
                                        )}

                                        <NavigateNextIcon className="mt-1" />
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

export default SeriesVideoPage;