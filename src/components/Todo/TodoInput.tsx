import { FC, useState } from "react";

interface TodoInputProps {
  onAdd: (label: string) => void;
}
const TodoInput: FC<TodoInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState("");
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(input);
    setInput("");
  };
  return (
    <>
      <form className="todo-form" onSubmit={(e) => submitForm(e)}>
        <input
          className="todo-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </>
  );
};
export default TodoInput;
