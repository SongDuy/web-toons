import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

import '../../../App.css';

const top30Films = [
    { id: 1, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Shawshank Redemption", auth: "109", genre: "Fantasy", look: "88.8M" },
    { id: 2, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Godfather", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 3, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Godfather: Part II", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 4, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Dark Knight", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 5, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "12 Angry Men", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 6, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Schindler's List", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 7, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Pulp Fiction", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 8, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Lord of the Rings: The Return of the King", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 9, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Good, the Bad and the Ugly", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 10, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Fight Club", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 11, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Lord of the Rings: The Fellowship of the Ring", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 12, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Star Wars: Episode V - The Empire Strikes Back", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 13, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "City of God", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 14, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Se7en", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 15, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Silence of the Lambs", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 16, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "It's a Wonderful Life", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 17, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Life Is Beautiful", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 18, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Usual Suspects", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 19, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Léon: The Professional", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 20, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Spirited Away", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 21, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Saving Private Ryan", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 22, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Once Upon a Time in the West", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 23, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "American History X", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 24, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Interstellar", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 25, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Casablanca", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 26, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "City Lights", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 27, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Psycho", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 28, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Green Mile", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 29, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "The Intouchables", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
    { id: 30, img: "https://swebtoon-phinf.pstatic.net/20231117_39/17001732047764nikV_JPEG/6LandingPage_mobile.jpg?type=crop540_540", name: "Modern Times", auth: "sh00 , Violet Matter", genre: "Fantasy", look: "88.8M" },
];

const SearchPage = ({ closeModal }) => {

    // Mở và đóng modal tìm kiếm
    const [isSearch, setIsSearch] = useState(false);
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {

            setIsSearch(true);

            setTimeout(() => {
                closeModal(); // Gọi hàm closeModal khi nhấp vào nền
                setIsSearch(false);
            }, 800);
        }
    };

    // Hiển thị nội dung giống nội dung cần tìm
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTop30Films = top30Films.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
        //|| item.auth.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showNoResultsMessage = (searchTerm.trim() !== '' && filteredTop30Films.length === 0) || searchTerm.trim() === '';

    return (
        <div className="w-screen h-screen bg-black bg-opacity-50 flex fixed inset-0 z-50 " onClick={handleBackdropClick}>

            <div
                className={`w-[450px] h-screen pl-3 pr-8 py-3 ml-auto bg-gray-50 relative  ${!isSearch ? "slide-in" : "slide-out"} `}
            >
                {/* nút tắt tìm kiếm */}
                <button
                    className="w-[35px] h-[35px] z-50 bg-red-200 flex ml-auto hover:text-white rounded-md"
                    onClick={handleBackdropClick}
                >
                    <span
                        className="w-full h-full z-10 flex items-center justify-center"
                        onClick={handleBackdropClick}
                    >
                        <CloseIcon onClick={handleBackdropClick} sx={{ fontSize: 25 }} />
                    </span>

                </button>

                {/* Ô tìm kiếm */}
                <div className="w-full mt-5 mb-3">
                    <input
                        className="w-full h-[35px] px-2 border-2 rounded-md"
                        onChange={handleSearch}
                        placeholder="Search..."
                    />
                </div>

                {/* Danh sách nội dung phù hợp cần tìm */}
                <div className="w-full h-[630px] custom-scrollbar">
                    <ul className="grid grid-cols-1">
                        {showNoResultsMessage ? (
                            <p className="text-center text-gray-500">No relevant results found.</p>
                        ) : (
                            filteredTop30Films.map(item => (
                                <Link to={`/originals/original/series`} key={item.id}>
                                    <li className="w-full h-[90px] hover:bg-gray-100 flex items-center border-t border-b cursor-pointer">

                                        <div className="w-[80px] h-[80px] rounded">
                                            <img
                                                src={item.img}
                                                alt="img"
                                                className="object-fill w-full h-full rounded"
                                            />
                                        </div>

                                        <div className="h-full rounded-xl px-3 py-3 flex items-center">
                                            <div className="w-[280px] overflow-hidden ">
                                                <span className="w-full text-[15px] font-semibold line-clamp-1">
                                                    {item.name}
                                                </span>
                                                <div className="flex">
                                                    <span className="max-w-[150px] pr-2 border-r-2 line-clamp-1">
                                                        {item.auth}
                                                    </span>
                                                    <span className="max-w-[110px] px-2 border-l line-clamp-1">
                                                        {item.genre}
                                                    </span>
                                                </div>
                                                <span className="w-full text-[15px] text-yellow-500 flex items-center gap-1 font-semibold line-clamp-1">
                                                    <StarIcon />
                                                    {item.look}
                                                </span>
                                            </div>

                                        </div>
                                    </li>
                                </Link>
                            ))
                        )}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default SearchPage;
