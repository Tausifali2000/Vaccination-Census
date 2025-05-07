import { useEffect, useRef } from "react";
import { RxPlusCircled } from "react-icons/rx";
import AddCensus from "./AddCensus";
import { useCensusStore } from "../store/store";

const Table = () => {
  const { fetchingTable, tableData, fetchTable } = useCensusStore();
  const dialogRef = useRef();

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    fetchTable();
  }, [fetchTable]);

  return (
    <div className="flex flex-col gap-3 px-4 py-4 border-2 border-[#e8e8e8] rounded-xl bg-white">
      <div className="flex justify-between items-center font-semibold text-xl">
        <h1>Census</h1>
        <button
          onClick={openDialog}
          className="flex items-center gap-2 bg-blue-500 cursor-pointer text-white text-sm font-light rounded-md py-1 px-3"
        >
          <RxPlusCircled /> Add
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-sm text-left rounded-xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Gender</th>
            <th className="table-header">Birthdate</th>
            <th className="table-header">Vaccinated</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fetchingTable ? (
            <tr>
              <td colSpan={4} className="text-center py-4">Loading...</td>
            </tr>
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
