import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Dữ liệu mẫu
// Danh sách thể loại
const data = [
    { id: 1, name: "Drama", date: '23/05/2024' },
    { id: 2, name: "Fantasy", date: '23/05/2024' },
    { id: 3, name: "Comedy", date: '23/05/2024' },
    { id: 4, name: "Action", date: '23/05/2024' },
    { id: 5, name: "Slice Of Life", date: '23/05/2024' },
    { id: 6, name: "Romance", date: '23/05/2024' },
    { id: 7, name: "Superhero", date: '23/05/2024' },
    { id: 8, name: "Sci-Fi", date: '23/05/2024' },
    { id: 9, name: "Thriller", date: '23/05/2024' },
    { id: 10, name: "Supernatural", date: '23/05/2024' },
    { id: 11, name: "Mystery", date: '23/05/2024' },
    { id: 12, name: "Sports", date: '23/05/2024' },
    { id: 13, name: "Historical", date: '23/05/2024' },
    { id: 14, name: "Heartwarming", date: '23/05/2024' },
    { id: 15, name: "Horror", date: '23/05/2024' },
    { id: 16, name: "Informative", date: '23/05/2024' },
    { id: 17, name: "School", date: '23/05/2024' },
    { id: 18, name: "Animals", date: '23/05/2024' },
    { id: 19, name: "Zombies", date: '23/05/2024' },
    { id: 20, name: "Short Story", date: '23/05/2024' },

];

const AdminCategoriesPage = () => {
    return (
        <div className="w-full h-[600px] py-5 bg-white custom-scrollbar">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr className="w-full">
                        <th className="w-[50px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">ID</th>
                        <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Categories Name</th>
                        <th className="w-[300px] px-6 py-3 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Description</th>
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
                                {item.name}
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

export default AdminCategoriesPage;
