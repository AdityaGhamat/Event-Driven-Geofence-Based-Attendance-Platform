import { useAuth } from "../../auth/hooks/useAuth";
import OfficeHeader from "../components/OfficeHeader";
import OfficeSearch from "../components/OfficeSearch";
import SandL from "../components/SandL";
import SearchResults from "../components/SearchResults";

const Office = () => {
  const { user } = useAuth();

  return (
    <>
      <title>Office | Attendify</title>
      <meta
        name="description"
        content="Office of your Attendify account to manage workforce attendance and geofence settings."
        key="desc"
      />
      <meta property="og:title" content="Office | Attendify" />
      <meta
        property="og:description"
        content="Office for Attendify workforce management."
      />
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
