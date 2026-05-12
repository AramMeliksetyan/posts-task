import { Fragment } from 'react';
import brandStyles from '../Brand/Brand.module.css';
import styles from './MobileNav.module.css';

const NAV_ITEMS = [
  { label: 'Главная', href: '#' },
  {
    label: 'Категории',
    href: '#',
    sub: ['Технологии', 'Дизайн', 'Бизнес', 'Культура', 'Наука'],
  },
  { label: 'Архив', href: '#' },
  {
    label: 'О нас',
    href: '#',
    sub: ['Команда', 'Контакты'],
  },
];

export default function MobileNav({ isOpen, onClose }) {
  return (
    <div className={isOpen ? styles.overlayOpen : styles.overlay} aria-hidden={!isOpen}>
      <div className={styles.backdrop} onClick={onClose} role="presentation" />
      <nav className={styles.panel} aria-label="Мобильное меню">
        <div className={styles.panelHeader}>
          <a className={brandStyles.logoCompact} href="#">
            The<span className={brandStyles.accent}>Post</span>
          </a>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Закрыть меню">
            ×
          </button>
        </div>
        <ul className={styles.list}>
          {NAV_ITEMS.map(item => (
            <Fragment key={item.label}>
              <li>
                <a href={item.href} onClick={onClose}>
                  {item.label}
                </a>
              </li>
              {item.sub?.map(sub => (
                <li key={sub} className={styles.subItem}>
                  <a href="#" onClick={onClose}>
                    {sub}
                  </a>
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export { NAV_ITEMS };
