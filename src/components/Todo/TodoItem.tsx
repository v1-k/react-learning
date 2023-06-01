import { FC, useState } from "react";
import { TodoItemProps } from "./TodoItemProps";

interface TodoItemPropsExtended extends TodoItemProps {
  onChange?: (checked: boolean) => void;
  onDelete: () => void;
  onEdit: (label: string) => void; // New prop for handling edit
}
const TodoItem: FC<TodoItemPropsExtended> = ({
  id,
  label,
  checked = false,
  onChange,
  onDelete,
  onEdit,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  const handleEdit = () => {
    if (isEditing && editedLabel.trim() !== "") {
      onEdit(editedLabel.trim());
    }
    setIsEditing(!isEditing);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedLabel(e.target.value);
  };

  return (
    <>
      <span
        className={`todo-item border ${isEditing ? "editing" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={handleEdit}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked)}
          className="todo-item-checkbox"
        />
        {isEditing ? (
          <input
            className="todo-item-editable todo-input"
            type="text"
            value={editedLabel}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className={`todo-item-label ${checked ? "checked" : ""}`}>
            {label}
          </span>
        )}

        {isHovered && !isEditing && (
          <>
            <button className="todo-delete" onClick={onDelete}>
              X
            </button>
          </>
        )}
      </span>
    </>
  );
};

export default TodoItem;
