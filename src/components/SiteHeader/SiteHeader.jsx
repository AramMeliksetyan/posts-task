import { useEffect, useRef, useState } from 'react';
import brandStyles from '../Brand/Brand.module.css';
import styles from './SiteHeader.module.css';

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

export default function SiteHeader({ headerRef, mobileOpen, onOpenMobileNav, search, onSearchChange }) {
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
    const onKey = e => e.key === 'Escape' && setSearchOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onPointerDown = e => {
      if (searchRootRef.current && !searchRootRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [searchOpen]);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Открыть меню"
            aria-expanded={mobileOpen}
            onClick={onOpenMobileNav}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={styles.center}>
          <a className={brandStyles.logo} href="#">
            The<span className={brandStyles.accent}>Post</span>
          </a>
        </div>
        <div className={styles.right}>
          <div className={styles.searchRoot} ref={searchRootRef}>
            {!searchOpen ? (
              <button
                type="button"
                className={`${styles.searchToggle}${search.trim() ? ` ${styles.searchToggleActive}` : ''}`}
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
                  onChange={e => onSearchChange(e.target.value)}
                  aria-label="Поиск постов"
                  onKeyDown={e => {
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      setSearchOpen(false);
                    }
                  }}
                />
                {search ? (
                  <button type="button" className={styles.searchClear} onClick={() => onSearchChange('')} aria-label="Очистить поиск">
                    ×
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
