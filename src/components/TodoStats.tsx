import type { Todo } from "../types/ProductTypes";

interface Props {
  todos: Todo[];
}

const TodoStats = ({ todos }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-purple-600">{todos.length}</div>
        <div className="text-sm text-gray-600">Total Tasks</div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-green-600">
          {todos.filter((t) => t.completed).length}
        </div>
        <div className="text-sm text-gray-600">Completed</div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-orange-600">
          {todos.filter((t) => !t.completed).length}
        </div>
        <div className="text-sm text-gray-600">Pending</div>
      </div>
    </div>
  );
};

export default TodoStats;
