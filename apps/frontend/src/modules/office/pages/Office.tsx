import { useAuth } from "../../auth/hooks/useAuth";
import OfficeHeader from "../components/OfficeHeader";
import OfficeSearch from "../components/OfficeSearch";
import SandL from "../components/SandL";
import SearchResults from "../components/SearchResults";

const Office = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      {!user?.office ? (
        <div>
          <OfficeSearch />
          <main className="p-10">
            <SearchResults />
          </main>
        </div>
      ) : (
        <>
          <OfficeHeader />
          <SandL />
        </>
      )}
    </>
  );
};

export default Office;
