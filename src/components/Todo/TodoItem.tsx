import { FC, useState } from "react";
import { TodoItemProps } from "./TodoItemProps";

interface TodoItemPropsExtended extends TodoItemProps {
  onChange?: (checked: boolean) => void;
  onDelete: () => void;
}
const TodoItem: FC<TodoItemPropsExtended> = ({
  id,
  label,
  checked = false,
  onChange,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <label
        className="todo-item border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked)}
          className="todo-item-checkbox"
        />
        <span className={`todo-item-label ${checked ? "checked" : ""}`}>
          {label}
        </span>

        {isHovered && (
          <button className="todo-delete" onClick={onDelete}>
            X
          </button>
        )}
      </label>
    </>
  );
};

export default TodoItem;
