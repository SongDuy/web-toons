import React from 'react';

const CreateOriginalPage = () => {
    return (
        <div>

            <div className="w-full h-full bg-gray-100">

                <div className="w-full h-[70px] bg-white shadow flex items-center justify-center border-t">
                    <ul className="flex gap-10">
                        <li className="uppercase font-semibold text-md text-black hover:text-black cursor-pointer flex items-center justify-center">
                            ONGOING
                        </li>
                        <li className="uppercase font-semibold text-md text-gray-400 hover:text-black cursor-pointer flex items-center justify-center">
                            COMPLETED
                        </li>
                    </ul>
                </div>

            </div>

        </div>

    );
}

export default CreateOriginalPage;