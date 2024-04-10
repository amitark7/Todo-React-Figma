import React, { useEffect, useState } from "react";
import TopContainer from "./TopContainer";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TodoItem from "./TodoItem";

//moment use for handle date and time.
import moment from "moment";

const Todos = () => {
  //Add for remove moment deprecation warning
  moment.suppressDeprecationWarnings = true;
  const [todos, setTodos] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [currentTimeAndDate, setCurrentTimeAndDate] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [todoObj, setTodoObj] = useState({
    todoTitle: "",
    time: currentTimeAndDate,
  });

  //this is use for input datetime minimum value
  const currentDateAndTime = moment().format("YYYY-MM-DDTHH:mm");

  //this function check for todo complete or not.
  const hanldeIsComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        } else {
          return todo;
        }
      })
    );
  };

  const handleChange = (e) => {
    setTodoObj({ ...todoObj, [e.target.name]: e.target.value });
  };

  const handleModal = () => {
    setIsModal(true);
  };

  const cancelClick = () => {
    setIsModal(false);
  };

  //This function saveTodoAndUpdate
  const saveTodoAndUpdate = () => {
    if (todoObj.todoTitle.trim() === "") {
      setError(true);
      return;
    }

    //find todo index base on todoID
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);

    //If todoIndex>-1 that means user wants update their todos otherwise user add new Todos
    if (todoIndex > -1) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, title: todoObj.todoTitle, time: todoObj.time };
          } else {
            return todo;
          }
        })
      );
      setTodoId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        title: todoObj.todoTitle,
        time: todoObj.time,
        isComplete: false,
        color: "purple",
      };
      setTodos([...todos, newTodo]);
    }
    setTodoObj({
      todoTitle: "",
      time: currentTimeAndDate,
    });
    setIsModal(false);
    setError(false);
  };

  //This function check if todoId exist then it update modal container value
  const getTodoAndUpdateValue = () => {
    const todo = todos.find((todo) => todo.id === todoId);
    if (todo) {
      setTodoObj({ todoTitle: todo.title, time: todo.time });
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //this function select todoID when user click on update icon
  const selectTodoId = (id) => {
    setTodoId(id);
    setIsModal(true);
  };

  //We use useEffect for check user wants to update or not based on todoID and also we use setInterval for checking todos status
  useEffect(() => {
    getTodoAndUpdateValue();
    setInterval(() => {
      setCurrentTimeAndDate(moment().format("YYYY-MM-DDTHH:mm"));
    }, 1000);
  }, [todoId]);

  return (
    <div className="w-full mx-auto h-screen border-2 shadow-md sm:w-3/5 md:w-2/4 lg:w-2/5 2xl:w-2/6">
      <TopContainer />
      <div className="flex justify-between items-center px-3 mt-2 mb-6">
        <h1 className="text-3xl font-bold">Today</h1>
        <div
          className="text-3xl text-blue-500 cursor-pointer"
          onClick={handleModal}
        >
          <AiOutlinePlusCircle />
        </div>
      </div>
      {todos.map((todo, index) => {
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
            Add Todo
          </p>
          <textarea
            name="todoTitle"
            id="todoTitle"
            value={todoObj.todoTitle}
            onChange={handleChange}
            className={`w-full h-24 rounded border-2 outline-none ${
              error ? "border-red-700" : "border-gray-200"
            }`}
          ></textarea>
          <input
            type="datetime-local"
            name="time"
            id="time"
            value={todoObj.time}
            min={currentDateAndTime}
            onChange={handleChange}
            className="w-full rounded border-2 2xl:mt-2"
          />
          <div className="w-full flex justify-between text-lg font-semibold text-blue-500 mt-3 px-4 2xl:mt-4">
            <button onClick={cancelClick}>Cancel</button>
            <button onClick={saveTodoAndUpdate}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
