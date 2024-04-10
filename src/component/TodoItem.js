import React from "react";
import { BiAlarm } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import moment from "moment";

const TodoItem = ({ todo, deleteTodo, selectTodoId, hanldeIsComplete }) => {
  const boxColor = todo.isComplete ? "bg-green-500" : "bg-purple-600";
  return (
    <div className="flex w-full items-center gap-4 pl-4 mb-2  ">
      <input
        type="checkbox"
        name="isComplete"
        id="isComplete"
        className="w-6 h-6 rounded-full align-middle border "
        checked={todo.isComplete}
        onChange={(e) => hanldeIsComplete(todo.id)}
        value={todo.isComplete}
      />
      <div className="flex justify-between items-center w-full gap-4 pb-4 pr-4 border-b-2">
        <div className="text-base">
          <p className="text-lg font-semibold">{todo.title}</p>
          <p className="flex items-center gap-1 text-gray-400 text-sm">
            <BiAlarm /> {moment(todo.time).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex text-xl cursor-pointer gap-1">
            <MdDelete onClick={() => deleteTodo(todo.id)} />
            <MdEdit onClick={() => selectTodoId(todo.id)} />
          </div>
          <div
            className={`${
              moment(todo.time).isBefore(new Date(), "minute")
                ? "bg-red-500"
                : boxColor
            } rounded-3xl`}
            style={{ width: "15px", height: "15px" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
