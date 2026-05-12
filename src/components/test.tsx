import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./header.module.css";
import burgerIcon from "../../assets/Combined Shape.svg";
import Logo from "../../assets/logo.svg";
import SearchIcon from "../../assets/search.svg";

interface HeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const Header = ({ search, setSearch }: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRootRef = useRef(null);
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (!searchOpen) return;
    const id = requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e) => e.key === "Escape" && setSearchOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onPointerDown = (e) => {
      if (searchRootRef.current && !searchRootRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [searchOpen]);

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.main}>
          <button className={styles.burger}>
            <img src={burgerIcon} alt="burger-menu" />
          </button>
          <div>
            <img src={Logo} alt="github logo" className={styles.logo} />
          </div>
          <div className={styles.right}>
            <div className={styles.searchRoot} ref={searchRootRef}>
              {!searchOpen ? (
                <button
                  type="button"
                  className={`${styles.searchToggle}${search.trim() ? ` ${styles.searchToggleActive}` : ""}`}
                  aria-label="Открыть поиск"
                  aria-expanded={false}
                  aria-controls="header-search-input"
                  onClick={() => setSearchOpen(true)}
                >
                  <SearchIcon />
                </button>
              ) : (
                <div className={styles.searchBar} role="search">
                  <span className={styles.searchIcon} aria-hidden="true">
                    <SearchIcon />
                  </span>
                  <input
                    ref={searchInputRef}
                    id="header-search-input"
                    type="search"
                    placeholder="Поиск…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Поиск постов"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        e.preventDefault();
                        setSearchOpen(false);
                      }
                    }}
                  />
                  {search ? (
                    <button
                      type="button"
                      className={styles.searchClear}
                      onClick={() => setSearch("")}
                      aria-label="Очистить поиск"
                    >
                      ×
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
