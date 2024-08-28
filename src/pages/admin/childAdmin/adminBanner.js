import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Dữ liệu mẫu
const data = [
    { id: 1, img: 'https://image.baophapluat.vn/1200x630/Uploaded/2024/gznrxgmabianhgzmath/2022_05_30/doraemon-9528.jpg', name: 'John Doe', date: '23/05/2024', },
    { id: 2, img: 'https://wallpapers.com/images/hd/one-piece-pictures-bjm9tdff9yzguoup.jpg', name: 'Jane Smith', date: '23/05/2024', },
    { id: 3, img: 'https://i.redd.it/5mqp7trvxov51.jpg', name: 'Tom Brown',  date: '23/05/2024', },
    { id: 4, img: 'https://images.alphacoders.com/135/1353040.jpeg', name: 'Tom Brown', date: '23/05/2024', },
    { id: 5, img: 'https://wallpapergod.com/images/hd/anime-4k-5760X3240-wallpaper-par00nk6228xf5xm.jpeg', name: 'Tom Brown', date: '23/05/2024', },
    { id: 6, img: 'https://i.pinimg.com/originals/52/83/59/5283594dd6b1d0dd4b8a59c723a35024.gif', name: 'Tom Brown', date: '23/05/2024', },
    { id: 7, img: 'https://i.pinimg.com/originals/ef/7f/b1/ef7fb1b37078b6a2aef8e40710446bfa.jpg', name: 'Tom Brown', date: '23/05/2024', },
    { id: 8, img: 'https://i.redd.it/b5jec682hfk61.jpg', name: 'Tom Brown', date: '23/05/2024', },
    { id: 9, img: 'https://images.hdqwalls.com/download/alone-standing-at-roof-ff-1920x1080.jpg', name: 'Tom Brown', date: '23/05/2024', },
    { id: 10, img: 'https://i.redd.it/5mqp7trvxov51.jpg', name: 'Tom Brown', date: '23/05/2024', },
    { id: 11, img: 'https://i.pinimg.com/originals/82/bb/bf/82bbbffb0ee24320a2d8c4e7a35e9ea3.jpg', name: 'Tom Brown', date: '23/05/2024', },
    { id: 12, img: 'https://4kwallpapers.com/images/wallpapers/anime-girl-surreal-1920x1080-10028.jpg', name: 'Tom Brown', date: '23/05/2024', },
];

const AdminBannerPage = () => {
    return (
        <div className="w-full h-[600px] py-5 bg-white custom-scrollbar">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr className="w-full">
                        <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID</th>
                        <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Image</th>
                        <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Image Name</th>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                <img
                                    src={item.img}
                                    alt="img"
                                    className="object-fill w-full h-full rounded-md"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {item.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                <button className="w-[35px] h-[35px] text-blue-500 mx-1 bg-gray-100 hover:bg-gray-200 rounded-full">
                                    <EditIcon />
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

export default AdminBannerPage;
