import moment from "moment";
import React from "react";

const PopUp = ({
  isModal,
  editTodoId,
  todoInput,
  changeTodoInputValue,
  closeTodoPopupModal,
  saveUpdateAndAddTodo,
  error,
}) => {
  const dateTimePickerMinValue = moment().format("YYYY-MM-DDTHH:mm");
  return (
    isModal && (
      <div className="absolute w-11/12 top-1/4 left-4 bg-white border-2 p-2 rounded sm:w-2/4 sm:left-40 md:w-2/5 md:left-56 lg:w-2/6 lg:left-1/3 2xl:w-1/4 2xl:left-[36rem] 2xl:top-28 2xl:p-4">
        <p className="text-lg font-semibold mb-2 2xl:text-xl 2xl:mb-4">
          {editTodoId ? "Update" : "Add"} Todo
        </p>
        <textarea
          name="todoTitle"
          id="todoTitle"
          value={todoInput.todoTitle}
          onChange={changeTodoInputValue}
          className={`w-full h-32 resize-none p-2 rounded border-2 outline-none ${
            error ? "border-red-700" : "border-gray-200"
          }`}
        ></textarea>
        <input
          type="datetime-local"
          name="time"
          id="time"
          value={todoInput.time}
          min={dateTimePickerMinValue}
          onChange={changeTodoInputValue}
          className="w-full rounded p-2 border-2 2xl:mt-2"
        />
        <div className="w-full flex justify-between text-lg font-semibold text-blue-500 mt-3 px-4 2xl:mt-4">
          <button onClick={closeTodoPopupModal}>Cancel</button>
          <button onClick={saveUpdateAndAddTodo}>Done</button>
        </div>
      </div>
    )
  );
};

export default PopUp;
