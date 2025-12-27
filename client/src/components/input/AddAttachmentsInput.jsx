import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const styles = {
  cardBtn: `
  cursor-pointer
  px-3 py-1.5
  text-white/90
    rounded-md
    font-medium
    border border-white
  text-nowrap
   hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)]
    flex items-center
    bg-white/10 hover:bg-white/20 `,
};
const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  // Add attachment
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  // Delete attachment
  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-white/20 border border-gray-100 px-3 py-2 rounded mb-2 mt-1"
        >
          <div className="flex text-[15px] text-white items-center ">
            <LuPaperclip className="text-white mr-2" />
            <p className="text-[15px] text-white">{item}</p>
          </div>

          <button onClick={() => handleDeleteOption(index)}>
            <HiOutlineTrash className="text-lg text-red-500 cursor-pointer  hover:drop-shadow-[0_0_10px_rgba(255,0,0,1)] " />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">
        <div className="flex-1 flex items-center gap-3 bg-white/10 border border-gray-100 rounded px-3 py-2">
          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-white/90 outline-none  placeholder:text-white/80 "
          />
          <LuPaperclip className="text-white" />
        </div>

        <button className={styles.cardBtn} onClick={handleAddOption}>
          <HiMiniPlus className="text-lg" />
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
