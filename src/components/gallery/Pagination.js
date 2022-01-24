import ReactPaginate from 'react-paginate'

const Pagination = ({ onPageChange, pageCount }) => {
  return (
    <ReactPaginate
      pageClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
      activeClassName="z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
      previousClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      nextClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      containerClassName="w-full relative z-0 inline-flex justify-center rounded-md -space-x-px"
      breakLabel="..."
      nextLabel=" >"
      onPageChange={onPageChange}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="< "
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
