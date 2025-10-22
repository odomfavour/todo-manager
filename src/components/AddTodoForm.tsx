import React from "react";
import type { CreateTodoInput, Priority } from "../types/ProductTypes";

interface AddTodoFormProps {
  todoData: CreateTodoInput;
  setTodoData: React.Dispatch<React.SetStateAction<CreateTodoInput>>;
  addTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({
  todoData,
  setTodoData,
  addTodo,
}) => {
  return (
    <form onSubmit={addTodo} className="space-y-5">
      {/* Title */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter task"
          value={todoData.title}
          onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter description (optional)"
          value={todoData.description || ""}
          onChange={(e) =>
            setTodoData({ ...todoData, description: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
        />
      </div>

      {/* Priority */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="priority" className="text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          id="priority"
          value={todoData.priority}
          onChange={(e) =>
            setTodoData({
              ...todoData,
              priority: e.target.value as Priority,
            })
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
