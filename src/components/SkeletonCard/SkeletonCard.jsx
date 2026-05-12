import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={`${styles.skImg} ${styles.shimmer}`} />
      <div className={styles.skBody}>
        <div className={`${styles.skLine} ${styles.shimmer}`} style={{ width: '40%' }} />
        <div className={`${styles.skLine} ${styles.shimmer}`} style={{ width: '90%', height: 16 }} />
        <div className={`${styles.skLine} ${styles.shimmer}`} style={{ width: '80%', height: 16 }} />
        <div className={`${styles.skLine} ${styles.shimmer}`} style={{ width: '60%' }} />
      </div>
    </div>
  );
}
