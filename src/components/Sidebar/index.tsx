import { useEffect } from "react";
import Logo from "../../assets/logo.svg";
import { MobileNav } from "../HeaderMenu";
import styles from "./sidebar.module.css";
import CloseIcon from "../../assets/close.svg";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <div
      className={`${styles.overlay} ${open ? styles.overlayVisible : ""}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        aria-label="Side menu"
        aria-modal="true"
        role="dialog"
      >
        <div className={styles.header}>
          <img src={Logo} alt="Logo" className={styles.logo} />
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <img src={CloseIcon} alt="close-icon" />
          </button>
        </div>
        <div className={styles.body}>
          <MobileNav menuOpen={open} />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
