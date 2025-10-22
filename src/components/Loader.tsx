const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 dark:bg-white/20 backdrop-blur-sm z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#0074A8] dark:border-[#38BDF8]"></div>
    </div>
  );
};

export default Loader;
