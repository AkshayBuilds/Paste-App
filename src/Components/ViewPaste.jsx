import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allpaste = useSelector((state) => state.paste.pastes);
  const paste = allpaste.filter((p) => p._id === id)[0];

  if (!paste) {
    return <div className="text-red-500 mt-10">Paste not found!</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-[100%]">
      <div className="mt-10 flex flex-row justify-center gap-4 w-[90%]">
        <input
          className="pl-6 py-2 rounded-xl w-[90%] border-[#e5e7eb] border-2 hover:cursor-not-allowed "
          type="text"
          placeholder="Enter Title Here"
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
          disabled
        />
      </div>
      <div className="flex flex-row justify-between align-items-center w-[81%] mt-5  px-[40px] py-2 rounded-tl-2xl rounded-tr-2xl border-1 border-[#e5e7eb] ">
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <div className="flex flex-row justify-center items-center">
            <svg
            onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to Clipboard");
                  }}
            className="w-5 h-5 hover:cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
          </svg>
        </div>
      </div>
      <div className="w-[81%]">
        <textarea
          className="rounded-bl-2xl rounded-br-2xl w-[100%] p-4 border-1 border-[#e5e7eb] hover:cursor-not-allowed "
          value={paste.content}
          placeholder="Enter Content Here..."
          onChange={(e) => setvalue(e.target.value)}
          rows={20}
          disabled
        />
      </div>
    </div>
  );
};

export default ViewPaste;
