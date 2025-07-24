import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removefrompaste } from "../Redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const paste = useSelector((state) => state.paste.pastes);
  const [searchTerm, setsearchTerm] = useState("");

  const dispatch = useDispatch();

  const filterData = paste.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removefrompaste(pasteId));
  }
  return (
    <div className="flex flex-col justify-center items-center w-[100%]">
      <input
        className="pl-6 py-2 mt-[70px] rounded-xl w-[80%] border-[#e5e7eb] border-2"
        type="search"
        placeholder="Search Here..."
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}
      />
      <div className="border-2 w-[80%] mt-2 border-[#e5e7eb] rounded-t-xl pl-[20px] py-2 font-bold text-[50px]">
        <h1>All Paste</h1>
      </div>
      <div className="flex flex-col w-[80%] border-1 gap-3 pb-4 border-[#e5e7eb] rounded-b-xl">
        {filterData.map((paste) => {
          return (
            <div
              className="border-2 border-[#e5e7eb] rounded-xl mx-7 mt-4 px-5 py-3 flex flex-row justify-between"
              key={paste?._id}
            >
              <div className="flex flex-col gap-2 justify-center">
                <div className="text-[40px] font-bold">{paste.title}</div>
                <div className="text-[15px]">{paste.content}</div>
              </div>
              <div className="flex flex-col justify-between p-2 ">
                <div className="flex justify-evenly flex-row gap-3">
                  <button
                    className="border-2 border-[#e5e7eb] rounded-[3px] p-1"
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to Clipboard");
                    }}
                  >
                    <img
                      src="https://img.icons8.com/?size=100&id=cvB6JC7HJn9v&format=png&color=000000"
                      alt=""
                      className="h-5 w-5 hover:cursor-pointer"
                    />
                  </button>
                  <button className="border-2 border-[#e5e7eb] rounded-[3px] p-1">
                    <Link to={`/pastes/${paste?._id}`}>
                      <img
                        src="https://img.icons8.com/?size=100&id=tSKyyMXYaNRe&format=png&color=000000"
                        alt=""
                        className="h-5 w-5 hover:cursor-pointer"
                      />
                    </Link>
                  </button>
                  <button className="border-2 border-[#e5e7eb] rounded-[3px] p-1">
                    <Link to={`/?pasteId=${paste?._id}`}>
                      <img
                        src="https://img.icons8.com/?size=100&id=86715&format=png&color=000000"
                        alt=""
                        className="h-5 w-5 hover:cursor-pointer"
                      />
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="border-2 border-[#e5e7eb] rounded-[3px] p-1"
                  >
                    <img
                      src="https://img.icons8.com/?size=100&id=99933&format=png&color=000000"
                      alt=""
                      className="h-5 w-5 hover:cursor-pointer"
                    />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`http://localhost:5173/pastes/${paste?._id}`);
                      toast.success("Link Copied to Clipboard");
                    }}
                    className="border-2 border-[#e5e7eb] rounded-[3px] p-1"
                  >
                    <img
                      src="https://img.icons8.com/?size=100&id=90280&format=png&color=000000"
                      alt=""
                      className="h-5 w-5 hover:cursor-pointer"
                    />
                  </button>
                </div>
                <div className="flex flex-raw justify-start items-center gap-3">
                  <div>
                    <img
                      src="https://img.icons8.com/?size=100&id=23&format=png&color=000000"
                      alt=""
                      className="h-5 w-5"
                    />
                  </div>
                  <div>
                    {new Date(paste.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Paste;
