import { useState } from "react";

import Menu from "./components/Menu";
import IconButton from "../Common/IconButton";
import Burger from "../Icons/Burger";

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isMenuOpen) {
    return <Menu onMenuClose={() => setIsMenuOpen(false)} />;
  }

  return (
    <IconButton
      iconComponent={Burger}
      className="fixed z-10 left-10 top-5 bg-white !text-blue-700 hover:!text-white"
      onClick={() => setIsMenuOpen(true)}
    />
  );
};

export default BurgerMenu;
