// src/services/todoService.ts
import { api } from "../lib/axios"; // your configured axios instance
import type { Todo } from "../types/ProductTypes";


// ✅ Get all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get("/todos");
  return data;
};

// ✅ Create a new todo
export const createTodo = async (todo: Partial<Todo>): Promise<Todo> => {
  const { data } = await api.post("/todos", todo);
  return data;
};

// ✅ Update an existing todo
export const updateTodo = async ({
  id,
  updates,
}: {
  id: string;
  updates: Partial<Todo>;
}): Promise<Todo> => {
  const { data } = await api.put(`/todos/${id}`, updates);
  return data;
};

// ✅ Delete a todo
export const deleteTodo = async (id: string): Promise<{ message: string }> => {
  const { data } = await api.delete(`/todos/${id}`);
  return data;
};
