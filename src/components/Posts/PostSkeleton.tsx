import styles from "./posts.module.css";

export function PostSkeleton() {
  return (
    <li className={styles.card}>
      <div className={`${styles.shimmer} ${styles.skeletonImg}`} />
      <div className={styles.skeletonBody}>
        <div className={`${styles.shimmer} ${styles.skCat}`} />
        <div className={`${styles.shimmer} ${styles.skTitle}`} />
        <div className={`${styles.shimmer} ${styles.skTitleShort}`} />
        <div className={`${styles.shimmer} ${styles.skMeta}`} />
        <div className={`${styles.shimmer} ${styles.skLine}`} />
        <div className={`${styles.shimmer} ${styles.skLineMid}`} />
        <div className={`${styles.shimmer} ${styles.skLineShort}`} />
      </div>
    </li>
  );
}

export function PostSkeletonGrid({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <PostSkeleton key={i} />
      ))}
    </>
  );
}
