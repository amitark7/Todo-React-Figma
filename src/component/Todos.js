import React, { useEffect, useState } from "react";
import TopContainer from "./TopContainer";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TodoItem from "./TodoItem";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [todoObj, setTodoObj] = useState({ todoTitle: "", time: "" });
  const [todoId, setTodoId] = useState(null);

  const handleChange = (e) => {
    setTodoObj({ ...todoObj, [e.target.name]: e.target.value });
  };

  const addTodo = () => {
    setIsModal(true);
  };

  const cancelClick = () => {
    setIsModal(false);
  };

  const saveTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: todoObj.todoTitle,
      time: `${new Date(todoObj.time).getHours()}:${new Date(
        todoObj.time
      ).getMinutes()}`,
    };

    setTodos([...todos, newTodo]);
    setIsModal(false);
  };

  const getTodo = () => {
    const todo = todos.find((todo) => todo.id === todoId);
    if (todo) {
      setTodoObj({ todoTitle: todo.title, time: todo.time });
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const selectTodoId = (id) => {
    setTodoId(id);
    setIsModal(true);
  };

  useEffect(() => {
    getTodo();
  }, [todoId]);
  return (
    <div className="w-full mx-auto h-screen border-2 border-blue-600 sm:w-3/5 md:w-2/4 lg:w-2/5 2xl:w-2/6">
      <TopContainer />
      <div className="flex justify-between items-center px-3 mt-2 mb-6">
        <h1 className="text-3xl font-bold">Today</h1>
        <div
          className="text-3xl text-blue-500 cursor-pointer"
          onClick={addTodo}
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
            className="w-full h-24 rounded border-2 outline-none"
          ></textarea>
          <input
            type="datetime-local"
            name="time"
            id="time"
            value={todoObj.time}
            onChange={handleChange}
            className="w-full rounded border-2 2xl:mt-2"
          />
          <div className="w-full flex justify-between text-lg font-semibold text-blue-500 mt-3 px-4 2xl:mt-4">
            <button onClick={cancelClick}>Cancel</button>
            <button onClick={saveTodo}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
