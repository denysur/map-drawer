import { useState } from "react";

import Button from "../../../../components/Common/Button";
import Modal from "../../../../components/Common/Modal";
import IconsModal from "../../../../components/IconsModal";

import { useAuthorization } from "../../../../hooks/useAuthorization";
import { Close } from "../../../Icons";

const Menu = ({ onMenuClose }: { onMenuClose: () => void }) => {
  const { logout } = useAuthorization();
  const [isIconsModalOpen, setIsIconsModalOpen] = useState(false);

  const openIconsModal = () => setIsIconsModalOpen(true);
  const closeIconsModal = () => setIsIconsModalOpen(false);

  return (
    <div className="fixed z-10 left-10 top-5 bg-white flex flex-col gap-2 p-4 pt-10 rounded-lg">
      <div
        onClick={onMenuClose}
        className="absolute p-1 top-0 right-0 justify-self-end rounded-lg ease duration-200 text-zinc-500 hover:bg-black/[.1] hover:text-black dark:hover:bg-white/[.05] dark:hover:text-white cursor-pointer"
      >
        <Close className="" />
      </div>
      <Button
        onClick={() => {
          logout();
        }}
        color="error"
      >
        Вийти
      </Button>

      <Button onClick={openIconsModal}>Іконки</Button>
      <Modal
        isOpen={isIconsModalOpen}
        title="Іконки маркеру"
        onClose={closeIconsModal}
      >
        <IconsModal />
      </Modal>
    </div>
  );
};

export default Menu;
