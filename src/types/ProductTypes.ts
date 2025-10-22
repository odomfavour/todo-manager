export type Priority = "high" | "medium" | "low";

export interface Todo {
  _id?: string; // ObjectId as string
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
}