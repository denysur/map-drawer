import Layout from "../../components/Layout";
import Map from "../../components/Map";

import { useAuthorization } from "../../hooks/useAuthorization";

const MapPage = () => {
  const { logout } = useAuthorization();

  return (
    <Layout>
      <button
        type="button"
        className="focus:outline-none fixed z-10 left-10 top-10 text-white bg-red-700 hover:bg-red-900 font-medium rounded-lg text-sm px-5 py-2.5"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <Map />
    </Layout>
  );
};

export default MapPage;
