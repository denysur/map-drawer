import { useState } from "react";

import Modal from "../../../Common/Modal";
import IconsModal from "../../../IconsModal";
import GuideModal from "../../../GuideModal";
import ThemeModal from "../../../ThemeModal";
import MenuItem from "../MenuItem";

import { Close, Info, Logout, MapMarker, Palette } from "../../../Icons";

import { useAuthorization } from "../../../../hooks/useAuthorization";

const Menu = ({ onMenuClose }: { onMenuClose: () => void }) => {
  const { logout } = useAuthorization();
  const [isIconsModalOpen, setIsIconsModalOpen] = useState(false);
  const [isGuideModalOpen, setGuideModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const openIconsModal = () => setIsIconsModalOpen(true);
  const closeIconsModal = () => setIsIconsModalOpen(false);

  const openThemeModal = () => setIsThemeModalOpen(true);
  const closeThemeModal = () => setIsThemeModalOpen(false);

  const openGuideModal = () => setGuideModalOpen(true);
  const closeGuideModal = () => setGuideModalOpen(false);

  return (
    <div className="ease duration-200 fixed z-10 left-6 top-6 bg-white dark:bg-zinc-900 shadow-lg flex flex-col gap-1 rounded-3xl max-w-64 w-full">
      <div
        onClick={onMenuClose}
        className="absolute p-3 top-2 left-2 justify-self-endease duration-200 text-zinc-500 hover:bg-black/[.1] hover:text-black dark:hover:bg-white/[.05] dark:hover:text-white cursor-pointer rounded-2xl"
      >
        <Close />
      </div>
      <div className="text-black dark:text-white ml-10 p-[17px] pl-6 pb-2 font-bold text-lg">
        Меню
      </div>
      <div className="p-4 pt-0 flex flex-col gap-2">
        <MenuItem icon={MapMarker} label="Іконки" onClick={openIconsModal} />
        <MenuItem
          icon={Palette}
          label="Змінити тему"
          onClick={openThemeModal}
        />
        <MenuItem icon={Info} label="Довідка" onClick={openGuideModal} />
        <hr className="ease duration-200 bg-gray-200 dark:bg-zinc-700 h-0.5 border-0" />
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
        isOpen={isThemeModalOpen}
        title="Змінити тему"
        onClose={closeThemeModal}
      >
        <ThemeModal />
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
