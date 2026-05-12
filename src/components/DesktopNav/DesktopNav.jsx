import styles from './DesktopNav.module.css';

export default function DesktopNav({ hidden, items }) {
  return (
    <div className={hidden ? styles.navWrapperHidden : styles.navWrapper}>
      <div className={styles.navInner}>
        <nav className={styles.desktopNav} aria-label="Главное меню">
          <ul>
            {items.map(item => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
                {item.sub && (
                  <ul className={styles.submenu}>
                    {item.sub.map(s => (
                      <li key={s}>
                        <a href="#">{s}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
