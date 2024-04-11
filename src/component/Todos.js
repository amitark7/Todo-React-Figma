import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TodoItem from "./TodoItem";
import moment from "moment";

const Todos = () => {
  const [todoList, setTodoList] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [currentTimeAndDate, setCurrentTimeAndDate] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [todoInput, setTodoInput] = useState({
    todoTitle: "",
    time: currentTimeAndDate,
  });
  const currentDateAndTime = moment().format("YYYY-MM-DDTHH:mm"); //this is use for input datetime minimum value
  //this function check for todo complete or not.
  const hanldeIsComplete = (id) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        } else {
          return todo;
        }
      })
    );
  };

  const handleChange = (e) => {
    setTodoInput({ ...todoInput, [e.target.name]: e.target.value });
  };

  const handleModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    setEditTodoId(null);
    setTodoInput({
      todoTitle: "",
      time: currentTimeAndDate,
    });
  };

  //This function handleEditAndAddTodo
  const hanldeEditAndAddTodo = () => {
    if (todoInput.todoTitle.trim() === "") {
      setError(true);
      return;
    }
    //find todo index base on todoID
    const todoIndex = todoList.findIndex((todo) => todo.id === editTodoId);
    //If todoIndex>-1 that means user wants update their todos otherwise user add new Todos
    if (todoIndex > -1) {
      setTodoList(
        todoList.map((todo) => {
          if (todo.id === editTodoId) {
            return {
              ...todo,
              title: todoInput.todoTitle,
              time: todoInput.time,
            };
          } else {
            return todo;
          }
        })
      );
      setEditTodoId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        title: todoInput.todoTitle,
        time: todoInput.time,
        isComplete: false,
        color: "purple",
      };
      setTodoList([...todoList, newTodo]);
    }
    setTodoInput({
      todoTitle: "",
      time: currentTimeAndDate,
    });
    setIsModal(false);
    setError(false);
  };

  //This function check if todoId exist then it update modal container value
  const getTodoAndUpdateValue = () => {
    const todo = todoList.find((todo) => todo.id === editTodoId);
    if (todo) {
      setTodoInput({ todoTitle: todo.title, time: todo.time });
    }
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  //this function select todoID when user click on update icon
  const selectTodoId = (id) => {
    setEditTodoId(id);
    setIsModal(true);
  };

  //We use useEffect for check user wants to update or not based on todoID and also we use setInterval for checking todos status
  useEffect(() => {
    getTodoAndUpdateValue();
    setInterval(() => {
      setCurrentTimeAndDate(moment().format("YYYY-MM-DDTHH:mm"));
    }, 1000);
  }, [editTodoId]);

  return (
    <div className="w-full mx-auto h-screen border-2 shadow-md sm:w-3/5 md:w-2/4 lg:w-2/5 2xl:w-2/6">
      <Navbar />
      <div className="flex justify-between items-center px-3 mt-2 mb-6">
        <h1 className="text-3xl font-bold">Today</h1>
        <div
          className="text-3xl text-blue-500 cursor-pointer"
          onClick={handleModal}
        >
          <AiOutlinePlusCircle />
        </div>
      </div>
      {todoList.map((todo, index) => {
        return (
          <TodoItem
            key={index}
            todo={todo}
            deleteTodo={deleteTodo}
            selectTodoId={selectTodoId}
            hanldeIsComplete={hanldeIsComplete}
          />
        );
      })}

      {isModal && (
        <div className="absolute w-11/12 top-1/4 left-4 bg-white border-2 p-2 rounded sm:w-2/4 sm:left-40 md:w-2/5 md:left-56 lg:w-2/6 lg:left-1/3 2xl:w-1/4 2xl:left-[36rem] 2xl:top-28 2xl:p-4">
          <p className="text-lg font-semibold mb-2 2xl:text-xl 2xl:mb-4">
            {editTodoId ? "Update" : "Add"} Todo
          </p>
          <textarea
            name="todoTitle"
            id="todoTitle"
            value={todoInput.todoTitle}
            onChange={handleChange}
            className={`w-full h-32 resize-none p-2 rounded border-2 outline-none ${
              error ? "border-red-700" : "border-gray-200"
            }`}
          ></textarea>
          <input
            type="datetime-local"
            name="time"
            id="time"
            value={todoInput.time}
            min={currentDateAndTime}
            onChange={handleChange}
            className="w-full rounded p-2 border-2 2xl:mt-2"
          />
          <div className="w-full flex justify-between text-lg font-semibold text-blue-500 mt-3 px-4 2xl:mt-4">
            <button onClick={closeModal}>Cancel</button>
            <button onClick={hanldeEditAndAddTodo}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
