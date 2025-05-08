import { useEffect, useRef, useState } from "react";
import { RxPlusCircled } from "react-icons/rx";
import AddCensus from "./AddCensus";
import { useCensusStore } from "../store/store";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";


const Table = () => {
  const {
    fetchingTable,
    tableData,
    fetchTable,
    currentPage,
    totalPages,
    setCurrentPage
  } = useCensusStore();
  const dialogRef = useRef();
 

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    fetchTable(currentPage);
 
  }, [currentPage, fetchTable]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchTable(nextPage); 
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchTable(prevPage); 
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-4 border-2 border-[#e8e8e8] rounded-xl bg-white">
      <div className="flex justify-between items-center font-semibold text-xl">
        <h1>Census</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-gray-700">Page {currentPage}/{totalPages}</span>
            <button className=" cursor-pointer" onClick={goToPreviousPage} disabled={currentPage === 1}>
              <RxCaretLeft />
            </button>
            <button className=" cursor-pointer" onClick={goToNextPage} disabled={currentPage === totalPages}>
              <RxCaretRight />
            </button>
          </div>
          <button
            onClick={openDialog}
            className="flex items-center gap-2 bg-blue-500 cursor-pointer text-white text-sm font-light rounded-md py-1 px-3"
          >
            <RxPlusCircled /> Add
          </button>
        </div>

      </div>

      <table className="min-w-full table-fixed divide-y divide-gray-200 text-sm text-left rounded-xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="table-header min-w-[200px]:">Name</th>
            <th className="table-header">Gender</th>
            <th className="table-header">Birthdate</th>
            <th className="table-header">Vaccinated</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fetchingTable ? (
            [...Array(5)].map((_, idx) => (
              <tr key={idx}>
                <td colSpan={4}>
                  <div className="animate-pulse h-6 bg-gray-200 rounded my-2"></div>
                </td>
              </tr>
            ))
          ) : tableData.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">No data found</td>
            </tr>
          ) : (
            tableData.map((person) => (
              <tr key={person.id}>
                <td className="table-cell">{person.name}</td>
                <td className="table-cell capitalize">{person.gender}</td>
                <td className="table-cell">{person.birthdate.slice(0, 10)}</td>
                <td className="table-cell">
                  <span
                    className={
                      person.is_vaccinated ? "vaccinated-yes" : "vaccinated-no"
                    }
                  >
                    {person.is_vaccinated ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <AddCensus dialogRef={dialogRef} />
    </div>
  );
};

export default Table;
