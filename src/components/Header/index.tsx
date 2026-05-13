import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import burgerIcon from "../../assets/Combined Shape.svg";
import Logo from "../../assets/logo.svg";
import SearchIcon from "../../assets/search-icon.svg";

interface HeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  onOpenMenu: () => void;
  headerRef: React.RefObject<HTMLDivElement> | null;
}

const Header = ({ search, setSearch, onOpenMenu, headerRef }: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRootRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!searchOpen) return;
    const id = requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        searchRootRef.current &&
        !searchRootRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [searchOpen]);

  return (
    <header className={styles.root} ref={headerRef}>
      <div className={styles.shell}>
        <div ref={topRef} className={styles.top}>
          <div className={styles.container}>
            <div
              className={`${styles.main} ${
                searchOpen ? styles.mainSearchOpen : ""
              }`.trim()}
            >
              <div className={styles.left}>
                <button
                  type="button"
                  className={`${styles["button-bg"]} ${styles.burger}`}
                  aria-label="Open menu"
                  onClick={onOpenMenu}
                >
                  <img src={burgerIcon} alt="burger-icon" />
                </button>
              </div>
              <div
                className={`${styles.center} ${
                  searchOpen ? styles.centerHiddenWhenSearchOpen : ""
                }`.trim()}
              >
                <img src={Logo} alt="github logo" className={styles.logo} />
              </div>
              <div className={styles.right}>
                <div className={styles.searchRoot} ref={searchRootRef}>
                  {!searchOpen ? (
                    <button
                      type="button"
                      className={`${styles["button-bg"]}`}
                      aria-label="Open search"
                      aria-expanded={false}
                      aria-controls="header-search-input"
                      onClick={() => setSearchOpen(true)}
                    >
                      <img src={SearchIcon} alt="search-icon" />
                    </button>
                  ) : (
                    <div className={styles.searchBar} role="search">
                      <img
                        src={SearchIcon}
                        alt=""
                        className={styles.searchBarIcon}
                        aria-hidden
                      />
                      <input
                        ref={searchInputRef}
                        id="header-search-input"
                        className={styles.searchInput}
                        type="search"
                        placeholder="Search posts…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search posts"
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            e.preventDefault();
                            setSearchOpen(false);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rule} aria-hidden />
      </div>
      <div className={styles.rule} aria-hidden />
    </header>
  );
};

export default Header;
