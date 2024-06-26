import React from "react";
import { BiAlarm } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import moment from "moment";

const TodoItem = ({
  todo,
  openDeletedModal,
  updateDataInTodoInputValue,
  isTodoComplete,
}) => {
  const boxColor = todo.isComplete ? "bg-green-500" : "bg-purple-600";
  return (
    <div className="flex w-full items-center p-4 mb-2  ">
      <input
        type="checkbox"
        name="isComplete"
        id="isComplete"
        className="h-6 rounded-full border w-[4%]"
        checked={todo.isComplete}
        onChange={(e) => isTodoComplete(todo.id)}
        value={todo.isComplete}
      />
      <div className="flex justify-between items-center w-[96%] pb-4 border-b-2">
        <div className="text-base break-words w-[80%] pl-4">
          <p className="text-lg font-semibold w-11/12">{todo.title}</p>
          <p className="flex items-center text-gray-400 text-sm">
            <BiAlarm /> {moment(todo.time).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 w-[22%]">
          <div className="flex items-center text-xl cursor-pointer">
            <MdDelete onClick={() => openDeletedModal(todo.id)} />
            <MdEdit onClick={() => updateDataInTodoInputValue(todo)} />
          </div>
          <div
            className={`${
              moment(todo.time).isBefore(new Date(), "minute")
                ? "bg-red-500"
                : boxColor
            } rounded-3xl w-4 h-4`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
