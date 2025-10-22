interface Props {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}

const Filters = ({ filter, setFilter }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {(["all", "active", "completed"] as const).map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === type
              ? "bg-purple-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Filters;
