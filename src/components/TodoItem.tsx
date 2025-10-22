import { Check, Calendar, Edit2, Trash2 } from "lucide-react";
import type { Todo, Priority } from "../types/ProductTypes";

interface Props {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  onEdit: () => void;
}

const getPriorityColor = (priority: Priority) => {
  if (priority === "high") return "bg-red-100 text-red-700";
  if (priority === "medium") return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
};

const TodoItem = ({ todo, toggleTodo, deleteTodo, onEdit }: Props) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => toggleTodo(todo._id || "")}
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                todo.completed
                  ? "bg-gradient-to-br from-purple-500 to-cyan-500 border-transparent"
                  : "border-gray-300 hover:border-purple-500"
              }`}
            >
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>

            <div className="flex-1">
              <span
                className={`font-medium ${
                  todo.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>

              {todo.description && (
                <p className="text-sm text-gray-500">{todo.description}</p>
              )}

              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                    todo.priority
                  )}`}
                >
                  {todo.priority}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(todo.createdAt || "").toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteTodo(todo?._id || "")}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
