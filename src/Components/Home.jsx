import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from '../../node_modules/react-redux/src/hooks/useDispatch';
import { addtopaste } from '../Redux/PasteSlice';
import { updatetopaste } from "../Redux/PasteSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setvalue] = useState("");
  const [searchParams, setsearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch()
  const allpaste = useSelector((state) => state.paste.pastes)

  const paste ={
        title: title,
        content: value,
        _id: pasteId || 
            Date.now().toString(36),
        createdAt: new Date().toISOString()
    }

  useEffect(() => {
  if (pasteId) {
    const paste = allpaste.find((p) => p._id === pasteId);
    if (paste) {
      setTitle(paste.title);
      setvalue(paste.content);
    }
  }
}, [pasteId, allpaste]);

  function createPaste(){
    // Validation checks
    if (title.trim().length < 3) {
      toast.error("Title must be at least 3 characters long");
      return;
    }
    
    if (value.trim().length < 15) {
      toast.error("Description must be at least 15 characters long");
      return;
    }

    const paste ={
        title: title,
        content: value,
        _id: pasteId || 
            Date.now().toString(36),
        createdAt: new Date().toISOString()
    }
    if(pasteId){

        dispatch(updatetopaste(paste))
    }
    else{
        //Create
        dispatch(addtopaste(paste))
    }

    setTitle("")
    setvalue("")
    setsearchParams({})
}


  return (
    <div className="flex flex-col items-center justify-center max-w-[100%]">
      <div className="mt-10 flex flex-row justify-center gap-4 w-[90%]">
        <input
          className="pl-6 py-2 rounded-xl w-[80%] border-[#e5e7eb] border-2"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button
          onClick={createPaste}
          className="p-3 rounded-xl bg-blue-500 text-white font-semibold hover:"
        >
          {pasteId ? "Update Paste" : "Crate My Paste"}
        </button>
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
          className="rounded-bl-2xl rounded-br-2xl w-[100%] p-4 border-1 border-[#e5e7eb]  "
          value={value}
          placeholder="Enter Content Here..."
          onChange={(e) => setvalue(e.target.value)}
          rows={20}
          required
        />
      </div>
    </div>
  );
};

export default Home;
