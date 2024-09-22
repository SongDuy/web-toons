import React from 'react';
import Nav from "../../components/Account/nav";
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

const dataComic = [
    { id: 1, title: 'Dragon Ball', genre1: 'Fantasy', genre2: '', rate: '0.5', totalChapters: 10, createTime: "Aug 31, 2024", },
    { id: 2, title: 'Dragon Ball', genre1: 'Fantasy', genre2: '', rate: '0.5', totalChapters: 10, createTime: "Aug 31, 2024", },
    { id: 3, title: 'Dragon Ball', genre1: 'Fantasy', genre2: '', rate: '0.5', totalChapters: 10, createTime: "Aug 31, 2024", },
]

const dataVideo = [
    { id: 1, title: 'Doraemon', rate: '0.5', totalChapters: 10, createTime: "Aug 31, 2024", },
    { id: 2, title: 'Doraemon', rate: '0.5', totalChapters: 10, createTime: "Aug 31, 2024", },
    { id: 3, title: 'Doraemon', rate: '0.5', totalChapters: 10, createTime: "Aug 31, 2024", },
]

const Dashboard = () => {
    return (
        <div>
            <Nav />
            <div className="w-full h-full border bg-gray-100 flex items-center justify-center pb-10">
                <div className="w-[1130px] ">
                    <div className="w-full h-full mt-4">
                        <div className="w-full h-full flex items-center">
                            <h1 className="font-semibold">
                                Select the original series
                            </h1>

                            <button className="w-[150px] h-[35px] text-white font-semibold bg-black ml-auto rounded-full flex items-center justify-center">
                                <AddIcon />
                                Create Series
                            </button>
                        </div>

                        <div className="w-full h-full mt-4">
                            <ul className="grid grid-cols-2 gap-4">

                                {/* khung nội dung */}
                                {dataComic.map((item) => (
                                    <li className="w-full h-[210px] bg-white rounded flex shadow">
                                        <div className="w-[210px] h-[210px] bg-red-200 rounded">
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIwJC19pR5MRoGAUw2-MW4DGgiUAuNZUd1dQ&s"
                                                alt="img"
                                                className="w-full h-full object-fill rounded"
                                            />
                                        </div>

                                        <div className="h-full px-3 py-3">
                                            <div className="w-[320px]">
                                                <div className="flex items-center">
                                                    <span className="text-gray-500">
                                                        {item.genre1}, {item.genre2}
                                                    </span>

                                                    <div className="flex ml-auto gap-2">
                                                        <button className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                                            Edit
                                                        </button>

                                                        <button className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="w-full mt-2">
                                                    <h1 className="font-semibold text-xl">
                                                        {item.title}
                                                    </h1>
                                                </div>
                                            </div>

                                            <div className="w-full mt-5">
                                                {(item.rate > 0) ?
                                                    <div className="w-full">
                                                        <span className="text-yellow-500 flex items-center gap-2">
                                                            <StarIcon />
                                                            {item.rate}
                                                        </span>
                                                    </div>
                                                    :
                                                    <div className="w-full">
                                                        <span className="text-red-500 flex items-center">
                                                            Not Yet Rated
                                                        </span>
                                                    </div>
                                                }
                                            </div>

                                            <div className="w-full mt-5">

                                                {(item.totalChapters > 0) ?
                                                    <div className="flex gap-5">
                                                        <span className="text-gray-500 text-sm flex gap-2">
                                                            Published {item.createTime}
                                                        </span>

                                                        <span className="text-gray-500 text-sm">
                                                            Episodes {item.totalChapters}
                                                        </span>
                                                    </div>
                                                    :
                                                    <div className="flex gap-5">
                                                        <span className="text-gray-500 text-sm">
                                                            Add episodes to publish your title.
                                                        </span>
                                                    </div>
                                                }

                                                <div className="mt-2 flex ml-auto gap-2">
                                                    <button className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                                        Edit Episode
                                                    </button>

                                                    <button className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                                        <AddIcon />
                                                        Add Episode
                                                    </button>
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
                            <h1 className="font-semibold">
                                Select the video series
                            </h1>

                            <button className="w-[150px] h-[35px] text-white font-semibold bg-black ml-auto rounded-full flex items-center justify-center">
                                <AddIcon />
                                Create Series
                            </button>
                        </div>

                        <div className="w-full h-full mt-4">
                            <ul className="grid grid-cols-2 gap-4">

                                {/* khung nội dung */}
                                {dataVideo.map((item) => (
                                    <li className="w-full h-[210px] bg-white rounded flex shadow">
                                        <div className="w-[210px] h-[210px] bg-red-200 rounded">
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIwJC19pR5MRoGAUw2-MW4DGgiUAuNZUd1dQ&s"
                                                alt="img"
                                                className="w-full h-full object-fill rounded"
                                            />
                                        </div>

                                        <div className="h-full px-3 py-3">
                                            <div className="w-[320px]">
                                                <div className="flex items-center">

                                                    <div className="flex ml-auto gap-2">
                                                        <button className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                                            Edit
                                                        </button>

                                                        <button className="px-2 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="w-full mt-2">
                                                    <h1 className="font-semibold text-xl">
                                                        {item.title}
                                                    </h1>
                                                </div>
                                            </div>

                                            <div className="w-full mt-5">
                                                {(item.rate > 0) ?
                                                    <div className="w-full">
                                                        <span className="text-yellow-500 flex items-center gap-2">
                                                            <StarIcon />
                                                            {item.rate}
                                                        </span>
                                                    </div>
                                                    :
                                                    <div className="w-full">
                                                        <span className="text-red-500 flex items-center">
                                                            Not Yet Rated
                                                        </span>
                                                    </div>
                                                }
                                            </div>

                                            <div className="w-full mt-5">

                                                {(item.totalChapters > 0) ?
                                                    <div className="flex gap-5">
                                                        <span className="text-gray-500 text-sm flex gap-2">
                                                            Published {item.createTime}
                                                        </span>

                                                        <span className="text-gray-500 text-sm">
                                                            Episodes {item.totalChapters}
                                                        </span>
                                                    </div>
                                                    :
                                                    <div className="flex gap-5">
                                                        <span className="text-gray-500 text-sm">
                                                            Add episodes to publish your title.
                                                        </span>
                                                    </div>
                                                }

                                                <div className="mt-2 flex ml-auto gap-2">
                                                    <button className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                                        Edit Episode
                                                    </button>

                                                    <button className="px-2 py-1 flex items-center bg-gray-200 hover:bg-gray-300 rounded shadow">
                                                        <AddIcon />
                                                        Add Episode
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
    );
}

export default Dashboard;
