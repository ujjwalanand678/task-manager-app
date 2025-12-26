import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

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
const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  // Add new task
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  // Delete task
  const handleDeleteOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div>
      {todoList.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-white/20 border border-gray-100 px-3 py-2 rounded mb-2 mt-1"
        >
          <p className="text-[15px] text-white">
            <span className="text-sm text-white font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}{" )"}
            </span>
            {item}
          </p>

          <button
          
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500 cursor-pointer  hover:drop-shadow-[0_0_10px_rgba(255,0,0,1)] " />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className="w-full bg-white/10 text-[13px] text-white/90 outline-none placeholder:text-white/80 border border-white    rounded px-3 py-2"
        />

        <button
               className={styles.cardBtn} 
          onClick={handleAddOption}
        >
          <HiMiniPlus className="text-lg" />
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
