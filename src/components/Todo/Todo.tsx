import "./Todo.css";
import { useCallback, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import { TodoItemProps } from "./TodoItemProps";

export default function Todo() {
  const [todos, setTodos] = useState<TodoItemProps[]>([]);

  const addTodos = useCallback((label: string) => {
    setTodos((prevTodos) => [
      {
        id: uuid(),
        label: label,
        checked: false,
        created_at: new Date().toISOString(),
        completed_at: "",
      },
      ...prevTodos,
    ]);
  }, []);

  const handleChange = useCallback((id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id === id) {
          const checked = !prevTodo.checked;
          const completed_at = checked ? new Date().toISOString() : "";
          return { ...prevTodo, checked, completed_at };
        }
        return prevTodo;
      });
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  }, []);

  const handleEdit = useCallback((id: string, label: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id === id) {
          return { ...prevTodo, label: label };
        }
        return prevTodo;
      });
    });
  }, []);
  return (
    <>
      <div className="todo-main">
        <div className="todo-header">Todo items</div>
        <TodoInput onAdd={addTodos} />
        <ul>
          {todos
            .sort((a, b) => {
              if (!a.checked && !b.checked) {
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              } else if (a.checked && b.checked) {
                return (
                  new Date(b.completed_at).getTime() -
                  new Date(a.completed_at).getTime()
                );
              } else if (a.checked && !b.checked) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                onChange={() => handleChange(todo.id)}
                onDelete={() => handleDelete(todo.id)}
                onEdit={(label) => handleEdit(todo.id, label)}
              />
            ))}
        </ul>
      </div>
    </>
  );
}
