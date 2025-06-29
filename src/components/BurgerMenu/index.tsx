import { useState } from "react";

import Menu from "./components/Menu";
import Burger from "../Icons/Burger";

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isMenuOpen) {
    return <Menu onMenuClose={() => setIsMenuOpen(false)} />;
  }

  return (
    <button
      className="fixed z-20 left-6 top-6 ease duration-200 rounded-full bg-white dark:bg-zinc-900 shadow-lg text-blue-700 dark:text-blue-300 hover:bg-gray-200 dark:hover:bg-zinc-700 p-3"
      onClick={() => setIsMenuOpen(true)}
    >
      <Burger />
    </button>
  );
};

export default BurgerMenu;
