import { useEffect } from 'react';
import styles from './PostPopup.module.css';

export default function PostPopup({ post, onClose }) {
  useEffect(() => {
    const handleKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.box} role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <div className={styles.closeBar}>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </button>
        </div>

        {post.img && (
          <img
            className={styles.img}
            src={post.img}
            srcSet={post.img_2x ? `${post.img} 1x, ${post.img_2x} 2x` : undefined}
            alt={post.title}
          />
        )}

        <div className={styles.body}>
          <div className={styles.meta}>
            {post.category && <span className={styles.category}>{post.category}</span>}
            {post.date && <time className={styles.date}>{post.date}</time>}
            {post.autor && <span className={styles.author}>by {post.autor}</span>}
          </div>
          <h2 className={styles.title} id="popup-title">
            {post.title}
          </h2>
          <p className={styles.text}>{post.text}</p>
        </div>
      </div>
    </div>
  );
}
