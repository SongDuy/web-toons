import React, { useState } from "react";

const ChooseLanguage = (prop) => {
  const [Choose, setChoose] = useState("English");

  return (
    <div>
      <div>
        <p className="text-xl">{prop.title}</p>
      </div>
      <div className="flex  my-[30px]">
        <button
          className={`text-xl border border-gray-300 ${
            Choose === "English" ? "bg-gray-200" : "bg-white-100"
          } py-4 px-[50px] rounded-full mr-1`}
          onClick={() => setChoose("English")}
        >
          English
        </button>
        <button
          className={`text-xl border border-gray-300  ${
            Choose === "Français" ? "bg-gray-200" : "bg-white-100"
          }  py-4 px-[50px] rounded-full mx-1`}
          onClick={() => setChoose("Français")}
        >
          Français
        </button>
        <button
          className={`text-xl border border-gray-300  ${
            Choose === "Indonesia" ? "bg-gray-200" : "bg-white-100"
          }  py-4 px-[50px] rounded-full mx-1`}
          onClick={() => setChoose("Indonesia")}
        >
          Indonesia
        </button>
        <button
          className={`text-xl border border-gray-300  ${
            Choose === "中文" ? "bg-gray-200" : "bg-white-100"
          }  py-4 px-[50px] rounded-full mx-1`}
          onClick={() => setChoose("中文")}
        >
          中文 (繁體)
        </button>
        <button
          className={`text-xl border border-gray-300  ${
            Choose === "ภาษาไทย" ? "bg-gray-200" : "bg-white-100"
          }  py-4 px-[50px] rounded-full ml-1`}
          onClick={() => setChoose("ภาษาไทย")}
        >
          ภาษาไทย
        </button>
      </div>
    </div>
  );
};

export default ChooseLanguage;
