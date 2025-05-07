import { useForm } from "react-hook-form";
import { useCensusStore } from "../store/store";
import { RxCross2 } from "react-icons/rx";
import Spinner from "./Spinner";

const getDateLimits = () => {
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];

  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - 100);
  const minDate = pastDate.toISOString().split("T")[0];

  return { minDate, maxDate };
};

const AddCensus = ({ dialogRef }) => {
  const { addCensus, addingCensus } = useCensusStore();
  const { minDate, maxDate } = getDateLimits();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    await addCensus(data);
    handleClose();
  };

  // Close dialog and reset form
  const handleClose = () => {
    dialogRef.current?.close();
    reset();
  };

  return (
    <dialog
      ref={dialogRef}
      className="max-w-md w-full py-6 px-6 rounded-xl 
               open:fixed open:top-1/2 open:left-1/2 
               open:-translate-x-1/2 open:-translate-y-1/2 
               bg-white shadow-xl z-50"
    >
      <div className="flex justify-between items-center border-b-2 border-gray-300 mb-4 pb-2">
        <h2 className="text-lg font-semibold">Add Census</h2>
        <button onClick={handleClose} >
          <RxCross2 className="text-gray-600 hover:text-gray-800 cursor-pointer" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-700">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Full Name"
            autoComplete="off"
            className="border border-gray-300 rounded px-3 py-2 text-sm selection:bg-blue-200 outline-gray-400"
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        {/* Birthdate */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-700">Date of Birth</label>
          <input
            {...register("birthdate", { required: "Birthdate is required" })}
            type="date"
            min={minDate}
            max={maxDate}
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-gray-400 cursor-pointer"
          />
          {errors.birthdate && <p className="error-message">{errors.birthdate.message}</p>}
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-700">Gender</label>
          <div className="flex gap-4">
            {["male", "female", "other"].map((value) => (
              <label key={value} className="flex items-center gap-1 text-sm text-gray-700">
                <input type="radio" value={value} {...register("gender", { required: true })} />
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </label>
            ))}
          </div>
          {errors.gender && <p className="error-message">Please select a gender</p>}
        </div>

        {/* Vaccination */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-700">Vaccinated</label>
          <div className="flex gap-4 ">
            <label className="flex items-center gap-1 text-sm text-gray-700">
              <input className="" type="radio" value="true" {...register("is_vaccinated", { required: true })} />
              Yes
            </label>
            <label className="flex items-center gap-1 text-sm text-gray-700">
              <input type="radio" value="false" {...register("is_vaccinated", { required: true })} />
              No
            </label>
          </div>
          {errors.is_vaccinated && <p className="error-message">Select vaccination status</p>}
        </div>

        {/* Submit Only */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={addingCensus}
            className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md 
              ${addingCensus ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer'}`}
          >
            {addingCensus && <Spinner />}
            Submit
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default AddCensus;
