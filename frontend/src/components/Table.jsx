import { RxPlusCircled } from "react-icons/rx";
import { RxCaretLeft } from "react-icons/rx";
import { RxChevronRight } from "react-icons/rx";

const data = [
  { name: 'Alice Johnson', gender: 'Female', birthdate: '1995-04-23', vaccinated: 'Yes' },
  { name: 'Bob Smith', gender: 'Male', birthdate: '1988-09-12', vaccinated: 'No' },
  { name: 'Carol Lee', gender: 'Female', birthdate: '2000-01-05', vaccinated: 'Yes' },
  { name: 'David Kim', gender: 'Male', birthdate: '1992-07-19', vaccinated: 'No' },
  { name: 'Alice Johnson', gender: 'Female', birthdate: '1995-04-23', vaccinated: 'Yes' },
  { name: 'Bob Smith', gender: 'Male', birthdate: '1988-09-12', vaccinated: 'No' },
  { name: 'Carol Lee', gender: 'Female', birthdate: '2000-01-05', vaccinated: 'Yes' },
  { name: 'David Kim', gender: 'Male', birthdate: '1992-07-19', vaccinated: 'No' },
  { name: 'Alice Johnson', gender: 'Female', birthdate: '1995-04-23', vaccinated: 'Yes' },
  { name: 'Bob Smith', gender: 'Male', birthdate: '1988-09-12', vaccinated: 'No' },
  { name: 'Carol Lee', gender: 'Female', birthdate: '2000-01-05', vaccinated: 'Yes' },
  { name: 'David Kim', gender: 'Male', birthdate: '1992-07-19', vaccinated: 'No' },
];

const Table = () => {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 border-2 border-[#e8e8e8] rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <h1>Emunurated</h1>
        <button className="flex  items-center gap-2 bg-[#0450ca] cursor-pointer text-white text-sm font-light rounded-md py-1 px-3">
          <RxPlusCircled /> Add
        </button>

      </div>

      <table className="min-w-full divide-y divide-gray-200 text-sm text-left  rounded-xl ">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Gender</th>
            <th className="table-header">Birthdate</th>
            <th className="table-header">Vaccinated</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((person, index) => (
            <tr key={index}>
              <td className="table-cell">{person.name}</td>
              <td className="table-cell">{person.gender}</td>
              <td className="table-cell">{person.birthdate}</td>
              <td className="table-cell">
                <span className={person.vaccinated === 'Yes' ? 'vaccinated-yes' : 'vaccinated-no'}>
                  {person.vaccinated}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
