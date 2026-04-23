import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const emptyGoal = {
  title: "",
  description: "",
  category: "Personal",
  targetDate: "",
  progress: 0
};

const GoalForm = ({ initialValues, onSubmit, onCancel, submitting }) => {
  const [formState, setFormState] = useState(
    initialValues
      ? { ...initialValues, targetDate: initialValues.targetDate?.slice(0, 10) }
      : emptyGoal
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: name === "progress" ? Number(value) : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(formState);

    if (!initialValues) {
      setFormState(emptyGoal);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Input label="Goal title" name="title" value={formState.title} onChange={handleChange} required />
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
        <Input
          label="Category"
          name="category"
          value={formState.category}
          onChange={handleChange}
          required
        />
        <Input
          label="Target date"
          name="targetDate"
          type="date"
          value={formState.targetDate}
          onChange={handleChange}
          required
        />
      </div>
      <label className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span>Progress: {formState.progress}%</span>
        <input
          type="range"
          name="progress"
          min="0"
          max="100"
          value={formState.progress}
          onChange={handleChange}
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <Button disabled={submitting} type="submit">
          {submitting ? "Saving..." : initialValues ? "Update goal" : "Create goal"}
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

export default GoalForm;
