import { RxPlusCircled } from "react-icons/rx";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-3 py-4 bg-[#fafafa]  border-b-2 border-[#e8e8e8] ">
      <h1 className="text-xl font-semibold text-gray-900">Vaccination Census</h1>
      <button className="flex items-center gap-2"> <RxPlusCircled /> Add</button>
    </div>
  )
}

export default Header