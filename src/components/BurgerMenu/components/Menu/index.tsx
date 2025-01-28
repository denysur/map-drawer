import { useState } from "react";

import Modal from "../../../../components/Common/Modal";
import IconsModal from "../../../../components/IconsModal";
import MenuItem from "../MenuItem";
import { Close, Logout, MapMarker } from "../../../Icons";

import { useAuthorization } from "../../../../hooks/useAuthorization";
import GuideModal from "../../../GuideModal";

const Menu = ({ onMenuClose }: { onMenuClose: () => void }) => {
  const { logout } = useAuthorization();
  const [isIconsModalOpen, setIconsModalOpen] = useState(false);
  const [isGuideModalOpen, setGuideModalOpen] = useState(false);

  const openIconsModal = () => setIconsModalOpen(true);
  const closeIconsModal = () => setIconsModalOpen(false);

  const openGuideModal = () => setGuideModalOpen(true);
  const closeGuideModal = () => setGuideModalOpen(false);

  return (
    <div className="fixed z-10 left-6 top-6 bg-white dark:bg-zinc-900 shadow-lg flex flex-col gap-1 rounded-3xl max-w-64 w-full">
      <div
        onClick={onMenuClose}
        className="absolute p-3 top-2 left-2 justify-self-endease duration-200 text-zinc-500 hover:bg-black/[.1] hover:text-black dark:hover:bg-white/[.05] dark:hover:text-white cursor-pointer rounded-2xl"
      >
        <Close />
      </div>
      <div className="text-black dark:text-white ml-10 p-[17px] pl-6 pb-2 font-bold text-lg">
        Налаштування
      </div>
      <div className="p-4 pt-0 flex flex-col gap-2">
        <MenuItem icon={MapMarker} label="Іконки" onClick={openIconsModal} />
        <MenuItem icon={Close} label="Довідка" onClick={openGuideModal} />
        <hr className="bg-gray-200 dark:bg-zinc-700 h-0.5 border-0" />
        <MenuItem
          icon={Logout}
          label="Вийти"
          color={"error"}
          onClick={() => {
            logout();
          }}
        />
      </div>
      <Modal
        isOpen={isIconsModalOpen}
        title="Іконки маркеру"
        onClose={closeIconsModal}
      >
        <IconsModal />
      </Modal>
      <Modal
        isOpen={isGuideModalOpen}
        onClose={closeGuideModal}
        className="max-w-6xl min-h-96"
      >
        <GuideModal />
      </Modal>
    </div>
  );
};

export default Menu;
