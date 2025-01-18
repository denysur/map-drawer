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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          setIsModalOpen(true);
        }}
        className="fixed z-10 left-10 top-20"
      >
        Іконки
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Іконки маркеру</h2>
          </div>
          <IconsModal />
        </div>
      </Modal>

      <Map />
      <Toolbar />
    </Layout>
  );
};

export default MapPage;
