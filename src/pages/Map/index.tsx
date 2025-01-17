import Layout from "../../components/Layout";
import Map from "../../components/Map";
import Button from "../../components/Common/Button";
import Toolbar from "../../components/Toolbar";

import { useAuthorization } from "../../hooks/useAuthorization";

const MapPage = () => {
  const { logout } = useAuthorization();

  return (
    <Layout>
      <Button
        onClick={() => {
          logout();
        }}
        color="error"
        className="fixed z-10 left-10 top-5"
      >
        Вийти
      </Button>
      <Button
        onClick={() => {
          // open modal with icons
        }}
        className="fixed z-10 left-10 top-20"
      >
        Іконки
      </Button>
      <Map />
      <Toolbar />
    </Layout>
  );
};

export default MapPage;
