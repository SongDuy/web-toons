import React, { useState, useEffect } from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NorthIcon from '@mui/icons-material/North';
import CheckIcon from '@mui/icons-material/Check';

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

    // Tiêu đề video
    const [valueTitle, setValueTile] = useState('');
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
    const [isAge, setIsAge] = useState('');

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
                setIsAge('All Ages');
                break;
            case 1:
                setIsAge('Teen');
                break;
            case 2:
                setIsAge('Young Adult');
                break;
            case 3:
                setIsAge('Mature');
                break;
            default:
                setIsAge('Unrated');
        }
    }, [selections]);

    return (
        <div>

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
                            <span className="text-black">
                                VIDEO SERIES 
                            </span>
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
                            <span className="text-gray-400">
                                VIDEO EPISODES 
                            </span>
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
                                    <span className="w-full font-semibold text-xl">
                                        Square Thumbnail
                                    </span>
                                </div>

                                <div className="w-[350px] flex items-center justify-center">
                                    {/* Nút tải ảnh đại diện cho series video */}
                                    <button className="w-[200px] h-[200px] shadow border bg-red-50 rounded hover:border-green-500 hover:text-gray-500 flex items-center justify-center group">
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
                                        </div>
                                    </button>
                                </div>

                                <div className="w-full py-3">
                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Image size must be 1080x1080.
                                    </span>
                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Image must be less than 500KB.
                                    </span>

                                    <span className="block w-full font-semibold text-sm text-gray-500">
                                        Only JPG, JPEG, and PNG formats are allowed.
                                    </span>


                                </div>
                            </div>

                            {/* Phần tải ảnh nền cho series video */}
                            <div className="w-full h-full ">
                                <div className="w-full py-3">
                                    <span className="w-full font-semibold text-xl">
                                        Horizontal Thumbnail
                                    </span>
                                </div>

                                <div className="w-[350px] shadow flex items-center justify-center">
                                    {/* Nút tải ảnh nền cho serise video*/}
                                    <button className="w-[350px] h-[200px] shadow border bg-red-50 rounded hover:border-green-500 hover:text-gray-500 flex items-center justify-center group">
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
                                        </div>
                                    </button>
                                </div>

                                <div className="w-full py-3">
                                    <span className="block w-full font-semibold text-sm text-gray-500">Image size must be 1920x1080.</span>
                                    <span className="block w-full font-semibold text-sm text-gray-500">Image must be less than 700KB.</span>
                                    <span className="block w-full font-semibold text-sm text-gray-500">Only JPG, JPEG, and PNG formats are allowed.</span>
                                </div>


                            </div>
                        </div>

                        {/* Phần cột bên phải */}
                        <div className="w-[820px] h-full grid grid-cols-1">

                            {/* Phần tiêu đề series video  */}
                            <div className="w-full py-3 pl-5">
                                <h1 className="w-full font-semibold text-xl">
                                    Series title
                                </h1>

                                <input
                                    className="w-full h-[40px] mt-3 bg-white px-3"
                                    placeholder="Less than 50 characters"
                                    value={valueTitle}
                                    onChange={handleTitle}
                                />
                            </div>

                            {/* Phần mô tả series video  */}
                            <div className="w-full py-3 pl-5">
                                <h1 className="w-full font-semibold text-xl">
                                    Summary
                                </h1>

                                <textarea
                                    className="w-full h-[300px] mt-3 bg-white px-3 py-2"
                                    placeholder="Less than 500 characters"
                                    value={valueSummary}
                                    onChange={handleSummary}
                                />

                            </div>

                            {/* Phần hướng dẫn */}
                            <div className="w-full py-3 pl-5">
                                <h1 className="w-full font-semibold text-xl">
                                    CONTENT RATING SELF ASSESSMENT
                                </h1>

                                <div className="w-full mt-2 flex flex-wrap">
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
                                </div>
                            </div>

                            {/* Phần chọn nội dung video buộc chọn xong mới có thể nhấn nút check*/}
                            <div className="w-full py-3 pl-5">
                                {/* Khi chọn xong nội dung các ô thì sẽ trả về độ tuổi truyện */}
                                <ul className="grid grid-cols-1 gap-4">
                                    <li className="w-full h-[50px] flex items-center">
                                        <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                            Violent and graphic content
                                        </h1>

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
                                                    <span className="whitespace-normal">
                                                        Please select one
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="0" >
                                                    <span className="whitespace-normal text-red-500">
                                                        0: No violence, blood or gore
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="1" >
                                                    <span className="whitespace-normal text-red-500">
                                                        1: Mild or fantasy blood in a few episodes
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="2" >
                                                    <span className="whitespace-normal text-red-500">
                                                        2: Violent themes with moderate blood or gore
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="3" >
                                                    <span className="whitespace-normal text-red-500">
                                                        3: Detailed violence, blood or gore
                                                    </span>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </li>
                                    <li className="w-full h-[50px] flex items-center">
                                        <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                            Nudity
                                        </h1>

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
                                                    <span className="whitespace-normal">
                                                        Please select one
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="0" >
                                                    <span className="whitespace-normal text-red-500">
                                                        0: No nudity (partial and full)
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="1" >
                                                    <span className="whitespace-normal text-red-500">
                                                        1: Some characters in minimal clothing (e.g., bathing suit, lingerie), non-sexual themes
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="2" >
                                                    <span className="whitespace-normal text-red-500">
                                                        2: Comedic nudity with strategic censoring
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="3" >
                                                    <span className="whitespace-normal text-red-500">
                                                        3: Fan-service panels (e.g., minimal clothing in sexual posing). Sexually suggestive themes
                                                    </span>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </li>
                                    <li className="w-full h-[50px] flex items-center">
                                        <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                            Sexual content
                                        </h1>

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
                                                    <span className="whitespace-normal">
                                                        Please select one
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="0" >
                                                    <span className="whitespace-normal text-red-500">
                                                        0: No sexual content or themes
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="1" >
                                                    <span className="whitespace-normal text-red-500">
                                                        1: Mild sexual themes
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="2" >
                                                    <span className="whitespace-normal text-red-500">
                                                        2: Sexual content or innuendos in a few episodes
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="3" >
                                                    <span className="whitespace-normal text-red-500">
                                                        3: Sexual content and sexually suggestive themes throughout series
                                                    </span>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </li>
                                    <li className="w-full h-[50px] flex items-center">
                                        <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                            Profanity
                                        </h1>

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
                                                    <span className="whitespace-normal">
                                                        Please select one
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="0" >
                                                    <span className="whitespace-normal text-red-500">
                                                        0: No profanity
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="1" >
                                                    <span className="whitespace-normal text-red-500">
                                                        1: Fully censored profanity (e.g., #$%^) in a few episodes
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="2" >
                                                    <span className="whitespace-normal text-red-500">
                                                        2: Uncensored or partially censored profanity in a few episodes
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="3" >
                                                    <span className="whitespace-normal text-red-500">
                                                        3: Uncensored profanity throughout series
                                                    </span>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </li>
                                    <li className="w-full h-[50px] flex items-center">
                                        <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                            Alcohol, drugs or tobacco
                                        </h1>

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
                                                    <span className="whitespace-normal">
                                                        Please select one
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="0" >
                                                    <span className="whitespace-normal text-red-500">
                                                        0: No alcohol, tobacco, or drugs
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="1" >
                                                    <span className="whitespace-normal text-red-500">
                                                        1: A few mentions of alcohol, tobacco, or drugs
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="2" >
                                                    <span className="whitespace-normal text-red-500">
                                                        2: Implied or mild consumption of alcohol, tobacco, or drugs
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="3" >
                                                    <span className="whitespace-normal text-red-500">
                                                        3: Depiction of moderate to excessive consumption of alcohol, tobacco, or drugs
                                                    </span>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </li>
                                    <li className="w-full h-[50px] flex items-center">
                                        <h1 className="min-w-[250px] h-full flex items-center font-semibold">
                                            Sensitive themes and topics
                                        </h1>

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
                                                    <span className="whitespace-normal">
                                                        Please select one
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="0">
                                                    <span className="whitespace-normal text-red-500">
                                                        0: No sensitive themes or topics
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="1">
                                                    <span className="whitespace-normal text-red-500">
                                                        1: A few mentions of themes or topics such as self-harm, bullying, or abuse
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="2">
                                                    <span className="whitespace-normal text-red-500">
                                                        2: Sensitive themes or topics such as self-harm, bullying, or abuse are mildly explored in some story arcs
                                                    </span>
                                                </MenuItem>
                                                <MenuItem value="3">
                                                    <span className="whitespace-normal text-red-500">
                                                        3: Sensitive themes such as self-harm, bullying, or abuse explored and are consistently present throughout the series
                                                    </span>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>

                                    </li>
                                </ul>

                                {/* Khi chọn xong mới nhấn được check để qua phần tải tập video  */}
                                <div className="mt-[60px]">
                                    <button
                                        className={`w-[35px] h-[35px] border-2 rounded-full ${Object.values(selections).every(value => value !== '') ? (isChecked ? 'bg-green-500 text-white' : 'bg-gray-300') : 'bg-gray-300'}`}
                                        onClick={handleCheckboxClick}
                                        disabled={!Object.values(selections).every(value => value !== '')}
                                    >
                                        <CheckIcon />
                                    </button>
                                    <span className="ml-2 font-semibold">
                                        I acknowledge that the assigned Content Rating of my series is <span className="text-red-500"> {isAge}. </span>
                                    </span>
                                </div>

                            </div>

                            {/* Nút để qua tập video */}
                            <div className="w-full pl-5 mt-[50px]">
                                <button
                                    onClick={goToEposodes}
                                    className={`w-[200px] h-[50px] ${isChecked ? 'bg-green-500' : 'bg-gray-200 cursor-not-allowed'} pl-2 rounded-full shadow text-white font-semibold flex items-center justify-center gap-5`}
                                    disabled={!isChecked}
                                >
                                    Create Series
                                    <NavigateNextIcon className="mt-1" />
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div >

    );
}

export default SeriesVideoPage;