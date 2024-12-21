
const Pagination = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <div>Showing 1 to 10 out of 60 records</div>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg">
          1
        </button>
        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg">
          2
        </button>
        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg">
          3
        </button>
      </div>
    </div>
  );
};

export default Pagination;
