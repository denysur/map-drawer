import { useState } from "react";

import Layout from "../../components/Layout";
import Map from "../../components/Map";
import Button from "../../components/Common/Button";
import Toolbar from "../../components/Toolbar";
import Modal from "../../components/Common/Modal";
import IconsModal from "../../components/IconsModal";

import { useAuthorization } from "../../hooks/useAuthorization";

const MapPage = () => {
  const { logout } = useAuthorization();
  const [isIconsModalOpen, setIsIconsModalOpen] = useState(false);

  const openIconsModal = () => setIsIconsModalOpen(true);
  const closeIconsModal = () => setIsIconsModalOpen(false);

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

      <Button onClick={openIconsModal} className="fixed z-10 left-10 top-20">
        Іконки
      </Button>
      <Modal
        isOpen={isIconsModalOpen}
        title="Іконки маркеру"
        onClose={closeIconsModal}
      >
        <div className="flex flex-col gap-4">
          <IconsModal />
        </div>
      </Modal>

      <Map />
      <Toolbar />
    </Layout>
  );
};

export default MapPage;
