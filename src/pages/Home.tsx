import { useState } from "react";
import type { Todo } from "../types/ProductTypes";
import AddTodoForm from "../components/AddTodoForm";
import Filters from "../components/Filters";
import TodoItem from "../components/TodoItem";
import TodoStats from "../components/TodoStats";
import Modal from "../components/Modal";

import {
  useTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../hooks/useTodos";
import Loader from "../components/Loader";

const Home = () => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isEditing, setIsEditing] = useState(false);

  const [currentTodoId, setCurrentTodoId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // ✅ Single object for new todo
  const [todoData, setTodoData] = useState<Todo>({
    title: "",
    description: "",
    priority: "medium",
    completed: false,
  });

  // React Query hooks
  const { data: todos = [], isLoading } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditing && currentTodoId) {
      updateTodo.mutate(
        { id: currentTodoId, updates: todoData },
        { onSuccess: () => setIsModalOpen(false) }
      );
    } else {
      createTodo.mutate(todoData, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  // ✅ Toggle completion
  const toggleTodo = (id: string) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;
    updateTodo.mutate({
      id, // ✅ the id
      updates: { completed: !todo.completed }, // ✅ only send updated fields
    });
  };

  // ✅ Delete todo
  const handleDeleteClick = (id: string) => {
    setCurrentTodoId(id); // 👈 reuse existing id
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (currentTodoId) {
      deleteTodoMutation.mutate(currentTodoId, {
        onSuccess: () => {
          setIsConfirmOpen(false);
          setCurrentTodoId(null);
        },
      });
    }
  };
  // Add new todo
  const handleAddClick = () => {
    setIsEditing(false);
    setTodoData({
      title: "",
      description: "",
      priority: "medium",
      completed: false,
    });
    setIsModalOpen(true);
  };

  // Edit existing todo
  const handleEditClick = (todo: Todo) => {
    setIsEditing(true);
    setCurrentTodoId(todo._id || null);
    setTodoData({
      title: todo.title,
      description: todo.description || "",
      priority: todo.priority,
      completed: todo.completed,
    });
    setIsModalOpen(true);
  };

  // ✅ Filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (
    isLoading ||
    createTodo.isPending ||
    updateTodo.isPending ||
    deleteTodoMutation.isPending
  )
    return <Loader />;

  return (
    <div className="p-6 min-h-[80vh]">
      <TodoStats todos={todos} />
      <div className="absolute bottom-10 right-10">
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Todo
        </button>
      </div>

      <Filters filter={filter} setFilter={setFilter} />

      <div className="space-y-3 mt-4">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={handleDeleteClick}
            onEdit={() => handleEditClick(todo)}
          />
        ))}
      </div>

      {filteredTodos.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-500">
            {filter === "completed"
              ? "Complete some tasks to see them here"
              : "Add a new task to get started"}
          </p>
        </div>
      )}

      {/* ✅ Custom Tailwind Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Todo" : "Add New Todo"}
      >
        <AddTodoForm
          todoData={todoData}
          setTodoData={setTodoData}
          addTodo={handleSubmit}
        />
      </Modal>
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this todo? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
