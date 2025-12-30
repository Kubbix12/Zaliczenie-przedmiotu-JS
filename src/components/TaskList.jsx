import { useMemo, useRef, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ThemeContext } from "../contexts/ThemeContext";

const STORAGE_KEY = "todo_tasks_v1";

const SortButton = ({ sortDirection, onSort, sortTextColor }) => {
  return (
    <button
      type="button"
      onClick={onSort}
      style={{ width: "400px", color: sortTextColor }}
    >
      Sort: {sortDirection === "asc" ? "desc" : "asc"}
    </button>
  );
};

const TaskItem = ({
  task,
  isEditing,
  editText,
  onStartEdit,
  onCancelEdit,
  onChangeEditText,
  onSaveEdit,
  onRemove,
  textColor,
  inputBg,
  inputBorder,
}) => {
  return (
    <li
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        color: textColor,
        width: "100%",
        minWidth: 0,
      }}
    >
      {!isEditing ? (
        <>
          <span
            style={{
              flex: 1,
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: textColor,
            }}
            title={task.text}
          >
            {task.text}
          </span>

          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button type="button" onClick={() => onStartEdit(task)}>
              Edit
            </button>

            <button type="button" onClick={() => onRemove(task.id)}>
              X
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ flex: 1, minWidth: 0 }}>
            <input
              style={{
                width: "100%",
                boxSizing: "border-box",
                color: textColor,
                background: inputBg,
                border: `1px solid ${inputBorder}`,
                padding: "6px 8px",
                borderRadius: 6,
                outline: "none",
              }}
              value={editText}
              onChange={(e) => onChangeEditText(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveEdit(task.id);
                if (e.key === "Escape") onCancelEdit();
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button type="button" onClick={() => onSaveEdit(task.id)}>
              Save
            </button>

            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          </div>
        </>
      )}
    </li>
  );
};

const TaskForm = ({ onAddTask, textColor, inputBg, inputBorder }) => {
  const [newTask, setNewTask] = useState("");
  const inputTaskRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = newTask.trim();
    if (!trimmed) {
      inputTaskRef.current?.focus();
      return;
    }

    onAddTask(trimmed);
    setNewTask("");
    inputTaskRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        ref={inputTaskRef}
        placeholder="Add a task..."
        style={{
          flex: 1,
          minWidth: 0,
          boxSizing: "border-box",
          color: textColor,
          background: inputBg,
          border: `1px solid ${inputBorder}`,
          padding: "6px 8px",
          borderRadius: 6,
          outline: "none",
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

function TaskList() {
  const { theme } = useContext(ThemeContext);

  const textColor = theme === "light" ? "#000" : "#fff";
  const inputBg = theme === "light" ? "#fff" : "#111";
  const inputBorder = theme === "light" ? "#bbb" : "#333";

  const renderCount = useRef(0);
  renderCount.current += 1;

  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [sortDirection, setSortDirection] = useState("asc");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignoruje błędy storage
    }
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const sorted = [...tasks].sort((a, b) => a.text.localeCompare(b.text));
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [tasks, sortDirection]);

  const handleAddTask = (text) => {
    const next = { id: uuidv4(), text, createdAt: Date.now() };
    setTasks((prev) => [...prev, next]);
  };

  const handleRemoveTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setEditText("");
    }
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleSaveEdit = (id) => {
    const trimmed = editText.trim();
    if (!trimmed) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );

    setEditingId(null);
    setEditText("");
  };

  const handleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        display: "grid",
        gap: 10,
        color: textColor,
        boxSizing: "border-box",
      }}
    >
      <p style={{ color: textColor }}>Liczba renderów: {renderCount.current}</p>

      <TaskForm
        onAddTask={handleAddTask}
        textColor={textColor}
        inputBg={inputBg}
        inputBorder={inputBorder}
      />

      <SortButton
        sortDirection={sortDirection}
        onSort={handleSortDirection}
        textColor={textColor}
      />

      <ul
        style={{
          display: "grid",
          gap: 8,
          paddingLeft: 18,
          margin: 0,
          width: "100%",
          boxSizing: "border-box",
          color: textColor,
        }}
      >
        {visibleTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isEditing={editingId === task.id}
            editText={editingId === task.id ? editText : ""}
            onStartEdit={handleStartEdit}
            onCancelEdit={handleCancelEdit}
            onChangeEditText={setEditText}
            onSaveEdit={handleSaveEdit}
            onRemove={handleRemoveTask}
            textColor={textColor}
            inputBg={inputBg}
            inputBorder={inputBorder}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
