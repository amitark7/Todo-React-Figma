import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TodoItem from "./TodoItem";
import moment from "moment";
import PopUp from "./PopUp";

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
  //this function check for todo complete or not.
  const changeTodoIsCompleteStatus = (id) => {
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

  const changeTodoInput = (e) => {
    setTodoInput({ ...todoInput, [e.target.name]: e.target.value });
  };

  const openAddUpdateModal = () => {
    setIsModal(true);
  };

  const closeAddUpdateModal = () => {
    setIsModal(false);
    setEditTodoId(null);
    setTodoInput({
      todoTitle: "",
      time: currentTimeAndDate,
    });
  };

  //This function saveUpdateAndAddTodo
  const saveUpdateAndAddTodo = () => {
    if (todoInput.todoTitle.trim() === "") {
      setError(true);
      return;
    }
    //If editTodoId exist then we ente in true block and perform update operation otherwise add todo
    if (editTodoId) {
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

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  //this function set TodoInput base on id
  const updateDataInTodoInput = (id) => {
    const todo = todoList.find((todo) => todo.id === id);
    setTodoInput({ todoTitle: todo.title, time: todo.time });
    setEditTodoId(id);
    setIsModal(true);
  };

  //We use seInterval in useEffect for update currentTimeAndDate in every seconds. currenTimeAndDate used in time in todoInput.
  useEffect(() => {
    setInterval(() => {
      setCurrentTimeAndDate(moment().format("YYYY-MM-DDTHH:mm"));
    }, 1000);
  }, []);

  return (
    <div className="w-full mx-auto h-screen border-2 shadow-md sm:w-3/5 md:w-2/4 lg:w-2/5 2xl:w-2/6">
      <Navbar />
      <div className="flex justify-between items-center px-3 mt-2 mb-6">
        <h1 className="text-3xl font-bold">Today</h1>
        <div
          className="text-3xl text-blue-500 cursor-pointer"
          onClick={openAddUpdateModal}
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
            updateDataInTodoInput={updateDataInTodoInput}
            changeTodoIsCompleteStatus={changeTodoIsCompleteStatus}
          />
        );
      })}

      <PopUp
        isModal={isModal}
        editTodoId={editTodoId}
        todoInput={todoInput}
        changeTodoInput={changeTodoInput}
        closeAddUpdateModal={closeAddUpdateModal}
        saveUpdateAndAddTodo={saveUpdateAndAddTodo}
        error={error}
      />
    </div>
  );
};

export default Todos;
