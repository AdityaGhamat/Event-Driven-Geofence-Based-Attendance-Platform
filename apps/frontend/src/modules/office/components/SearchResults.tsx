import { useEffect } from "react";
import { useOffice } from "../hooks/useOffice";
import OfficeCard from "./OfficeCard";
import { getOffices } from "../api";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

const SearchResults = () => {
  const { search, office, setOffice } = useOffice();
  const navigate = useNavigate();
  useEffect(() => {
    if (!search) {
      setOffice([]);
      return;
    }
    const timeoutId = setTimeout(async () => {
      try {
        const res = await getOffices(search);
        setOffice(res.data.offices);
      } catch (error) {
        console.error(error);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);
  const handleCreateNewOffice = () => {
    navigate("/dashboard/office/create");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-8">
      {office.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-[60vh] gap-y-8 text-center px-4">
          <div className="space-y-2">
            <h1 className="text-white text-3xl font-bold">
              Not assigned to an office yet?
            </h1>
            <p className="text-neutral-400">
              Create a new office space to get started managing your team.
            </p>
          </div>

          <button
            className="
              flex items-center justify-center gap-x-2
              px-6 py-3
              border border-purple-500
              text-purple-400
              font-semibold
              rounded-xl
              hover:bg-purple-500 hover:text-white
              transition-all duration-200
              shadow-[0_0_15px_rgba(168,85,247,0.15)]
              hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]
            "
            onClick={handleCreateNewOffice}
          >
            <Plus className="w-5 h-5" />
            <span className="text-white">Create New Office</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {office.map((o: any) => (
            <OfficeCard key={o._id} {...o} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
