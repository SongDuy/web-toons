import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LockClockIcon from '@mui/icons-material/LockClock';

// Dữ liệu mẫu
const data = [
    { id: 1, img: "https://i.pinimg.com/originals/1d/de/ab/1ddeabd0300a42b1c873a2e5fba59209.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 2, img: "https://i.pinimg.com/originals/1d/de/ab/1ddeabd0300a42b1c873a2e5fba59209.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 3, img: "https://i.pinimg.com/originals/1d/de/ab/1ddeabd0300a42b1c873a2e5fba59209.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 4, img: "https://i.pinimg.com/originals/1d/de/ab/1ddeabd0300a42b1c873a2e5fba59209.jpg", dayOfWeek: 'Mon', genre: "Comedy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 5, img: "https://i.pinimg.com/originals/1d/de/ab/1ddeabd0300a42b1c873a2e5fba59209.jpg", dayOfWeek: 'Mon', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 6, img: "https://i.pinimg.com/736x/44/d5/c7/44d5c7ec2369524788d06b01027b9b7e.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 7, img: "https://i.pinimg.com/736x/44/d5/c7/44d5c7ec2369524788d06b01027b9b7e.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 8, img: "https://i.pinimg.com/736x/44/d5/c7/44d5c7ec2369524788d06b01027b9b7e.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 9, img: "https://i.pinimg.com/736x/44/d5/c7/44d5c7ec2369524788d06b01027b9b7e.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 10, img: "https://i.pinimg.com/736x/44/d5/c7/44d5c7ec2369524788d06b01027b9b7e.jpg", dayOfWeek: 'Tue', genre: "School", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 11, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 12, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Wed', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 13, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 14, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 15, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Wed', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 16, img: "https://i.pinimg.com/originals/f5/50/17/f550170d7e4650ee076975204a7e6c93.jpg", dayOfWeek: 'Thu', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 17, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 18, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 19, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 20, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 21, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 22, img: "https://i.redd.it/uuvmyyb9h9fb1.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 23, img: "https://i.pinimg.com/originals/79/f5/f5/79f5f56085a73b1db28b8eb9751796fd.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 24, img: "https://i.pinimg.com/originals/79/f5/f5/79f5f56085a73b1db28b8eb9751796fd.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 25, img: "https://i.pinimg.com/originals/79/f5/f5/79f5f56085a73b1db28b8eb9751796fd.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 26, img: "https://i.pinimg.com/originals/79/f5/f5/79f5f56085a73b1db28b8eb9751796fd.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 27, img: "https://i.pinimg.com/originals/79/f5/f5/79f5f56085a73b1db28b8eb9751796fd.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 28, img: "https://i.pinimg.com/originals/79/f5/f5/79f5f56085a73b1db28b8eb9751796fd.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 29, img: "https://i.pinimg.com/736x/ff/85/15/ff851573b6e77758a1a0441ed5009103.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 30, img: "https://i.pinimg.com/736x/ff/85/15/ff851573b6e77758a1a0441ed5009103.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 31, img: "https://i.pinimg.com/736x/ff/85/15/ff851573b6e77758a1a0441ed5009103.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 32, img: "https://i.pinimg.com/736x/ff/85/15/ff851573b6e77758a1a0441ed5009103.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 33, img: "https://i.pinimg.com/736x/ff/85/15/ff851573b6e77758a1a0441ed5009103.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 34, img: "https://i.pinimg.com/736x/ff/85/15/ff851573b6e77758a1a0441ed5009103.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 35, img: "https://wallpapercave.com/wp/wp5102463.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 36, img: "https://wallpapercave.com/wp/wp5102463.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 37, img: "https://wallpapercave.com/wp/wp5102463.jpg", dayOfWeek: 'Mon', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 38, img: "https://wallpapercave.com/wp/wp5102463.jpg", dayOfWeek: 'Mon', genre: "Animals", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 39, img: "https://wallpapercave.com/wp/wp5102463.jpg", dayOfWeek: 'Mon', genre: "Comedy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 40, img: "https://wallpapercave.com/wp/wp5102463.jpg", dayOfWeek: 'Mon', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 41, img: "https://wallpapercave.com/wp/wp5102463.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 42, img: "https://wallpapercave.com/wp/wp5102463.jpg", dayOfWeek: 'Tue', genre: "Drama", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 43, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 44, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Tue', genre: "Historical", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 45, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Tue', genre: "School", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 46, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Thu', genre: "Action", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 47, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 48, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 49, img: "https://wallpapercave.com/wp/wp3788226.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 50, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Thu', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 51, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 52, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 53, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 54, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 55, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Fri', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 56, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 57, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 58, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 59, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 60, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sat', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 61, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 62, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 63, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 64, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
    { id: 65, img: "https://cdn.popsww.com/blog/sites/2/2022/03/Anh-mat-si-tinh-cua-nam-chinh-trong-Lai-duoc-gap-em-715x1080.jpg", dayOfWeek: 'Sun', genre: "Fantasy", name: "Peace Restaurant", auth: "Lee Nakeum , seewater", like: "200k", date: '23/05/2024', },
];


const AdminOriginalsPage = () => {
    return (
        <div className="w-full h-[600px] py-5 bg-white custom-scrollbar">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr className="w-full">
                        <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID</th>
                        <th className="w-[150px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Image</th>
                        <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Originals Name</th>
                        <th className="w-[100px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID User</th>
                        <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Date created</th>
                        <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Manager</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                                {item.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center text-gray-500">
                                <img
                                    src={item.img}
                                    alt="img"
                                    className="object-fill w-[100px] h-[100px] rounded-md"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {item.dayOfWeek}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {item.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                <button className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                    <RemoveRedEyeIcon />
                                </button>

                                <button className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                    <LockClockIcon />
                                </button>

                                <button className="w-[35px] h-[35px] text-red-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminOriginalsPage;
