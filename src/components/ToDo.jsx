import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import ToDoItems from "./ToDoItems";

const ToDo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevToDos) => prevToDos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  // Autofocus the input
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/*-----title-----*/}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="ToDo Icon" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/*-----input-----*/}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add a task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer hover:bg-orange-700 transition-colors"
        >
          Add Task
        </button>
      </div>

      {/*-----list-----*/}
      <div>
        {todoList.length === 0 ? (
          <p className="text-center text-slate-500 mt-5">
            No tasks yet. Add one!
          </p>
        ) : (
          todoList.map((item) => (
            <ToDoItems
              key={item.id}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ToDo;
