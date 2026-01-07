import { Search } from "lucide-react";
import { useOffice } from "../hooks/useOffice";
const OfficeSearch = () => {
  const { search, setSearch } = useOffice();
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400 pointer-events-none" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="office name"
        className="w-full text-white pl-10 pr-4 py-2 bg-[#3c354d] border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/70"
      />
    </div>
  );
};

export default OfficeSearch;
