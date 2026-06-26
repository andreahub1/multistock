import { FiMenu } from "react-icons/fi";

type Props = {
  openMenu: () => void;
};

function Header({ openMenu }: Props) {
  return (
    <header className="header">
      <button className="mobile-menu-btn" onClick={openMenu}>
        <FiMenu />
      </button>

      Sistema de control de inventario
    </header>
  );
}

export default Header;