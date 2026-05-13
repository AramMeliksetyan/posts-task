import { useEffect, useState } from "react";
import arrowIcon from "../../assets/arrow.svg";
import type { NavItem } from "./constants";
import { HEADER_MENU } from "./constants";
import styles from "./headerMenu.module.css";

function ChevronDown() {
  return (
    <img src={arrowIcon} alt="" className={styles.chevronDown} aria-hidden />
  );
}

function ChevronRight() {
  return (
    <img src={arrowIcon} alt="" className={styles.chevronPushEnd} aria-hidden />
  );
}

export function DesktopNav({
  items = HEADER_MENU,
  hidden,
}: {
  items?: NavItem[];
  hidden: boolean;
}) {
  const [hoverMenuId, setHoverMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (hidden) setHoverMenuId(null);
  }, [hidden]);

  return (
    <div
      className={`${
        hidden ? styles.desktopNavStickyHidden : styles.desktopNavSticky
      }`}
    >
      <div className={styles.desktopNavInner}>
        <div className={styles.desktopNavContainer}>
          <nav aria-label="Main navigation">
            <ul className={styles.desktopList}>
              {items.map((item) =>
                item.children?.length ? (
                  <li
                    key={item.id}
                    className={`${styles.desktopItem} ${styles.desktopItemWithMenu}`}
                    onMouseEnter={() => setHoverMenuId(item.id)}
                    onMouseLeave={() => setHoverMenuId(null)}
                  >
                    <span className={styles.desktopLink}>
                      {item.label}
                      <ChevronDown />
                    </span>
                    <ul
                      className={`${styles.dropdown} ${
                        hoverMenuId === item.id ? styles.dropdownVisible : ""
                      }`.trim()}
                    >
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a href={child.href} className={styles.dropdownLink}>
                            <span className={styles.dropdownLabel}>
                              {child.label}
                            </span>
                            <ChevronRight />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.id} className={styles.desktopItem}>
                    <a href={item.href} className={styles.desktopLink}>
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

function MobileItem({
  item,
  expanded,
  toggle,
}: {
  item: NavItem;
  expanded: Record<string, boolean>;
  toggle: (id: string) => void;
}) {
  if (!item.children?.length) {
    return (
      <li>
        <a href={item.href} className={styles.mobileLink}>
          {item.label}
        </a>
      </li>
    );
  }

  const open = !!expanded[item.id];

  return (
    <li>
      <button
        type="button"
        className={styles.mobileLink}
        aria-expanded={open}
        onClick={() => toggle(item.id)}
      >
        {item.label}
        <ChevronDown />
      </button>
      {open && (
        <ul className={styles.mobileIndent}>
          {item.children.map((ch) => (
            <MobileItem
              key={ch.id}
              item={ch}
              expanded={expanded}
              toggle={toggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function MobileNav({
  items = HEADER_MENU,
  menuOpen = true,
}: {
  items?: NavItem[];
  menuOpen?: boolean;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!menuOpen) setExpanded({});
  }, [menuOpen]);

  return (
    <nav aria-label="Mobile menu">
      <ul className={styles.mobileRoot}>
        {items.map((item) => (
          <MobileItem
            key={item.id}
            item={item}
            expanded={expanded}
            toggle={(id) => setExpanded((e) => ({ ...e, [id]: !e[id] }))}
          />
        ))}
      </ul>
    </nav>
  );
}
