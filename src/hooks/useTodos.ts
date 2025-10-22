// src/hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";
import { toast } from "react-toastify";
import type { Todo } from "../types/ProductTypes";

// ✅ Fetch all todos
export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};

// ✅ Create a todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      toast.success("Todo created successfully!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => toast.error("Failed to create todo."),
  });
};

// ✅ Update a todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      toast.success("Todo updated!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => toast.error("Failed to update todo."),
  });
};

// ✅ Delete a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      toast.success("Todo deleted!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => toast.error("Failed to delete todo."),
  });
};
