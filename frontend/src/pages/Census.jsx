import BarChart from "../components/BarChart";
import Header from "../components/Header";
import LineChart from "../components/LineChart";
import Table from "../components/Table";

const Census = () => {
  return (
    <div className="w-full min-h-screen py-2 px-4 bg-[#fafafa]">
     
      <Header />

      
      <div className="flex flex-col md:flex-row gap-5 w-full mt-5 px-2">
       
        <div className="w-full md:w-1/2">
          <Table />
        </div>

        
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="flex-1">
            <LineChart />
          </div>
          <div className="flex-1"><BarChart /></div>
        </div>
      </div>
    </div>
  );
};

export default Census;
