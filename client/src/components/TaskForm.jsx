import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const defaultState = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
  tags: ""
};

const TaskForm = ({ initialValues, onSubmit, onCancel, submitting }) => {
  const [formState, setFormState] = useState(
    initialValues
      ? {
          ...initialValues,
          dueDate: initialValues.dueDate?.slice(0, 10),
          tags: initialValues.tags?.join(", ") || ""
        }
      : defaultState
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({ ...currentState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({
      ...formState,
      tags: formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    });

    if (!initialValues) {
      setFormState(defaultState);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Input label="Task title" name="title" value={formState.title} onChange={handleChange} required />
      <label className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span>Description</span>
        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
          rows={3}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
          <span>Priority</span>
          <select
            name="priority"
            value={formState.priority}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <Input
          label="Due date"
          name="dueDate"
          type="date"
          value={formState.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <Input
        label="Tags"
        name="tags"
        placeholder="work, health, planning"
        value={formState.tags}
        onChange={handleChange}
      />
      <div className="flex flex-wrap gap-3">
        <Button disabled={submitting} type="submit">
          {submitting ? "Saving..." : initialValues ? "Update task" : "Create task"}
        </Button>
        {onCancel ? (
          <Button variant="ghost" onClick={onCancel} type="button">
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
};

export default TaskForm;
