import styles from './PostCard.module.css';

export default function PostCard({ post, onClick }) {
  return (
    <article
      className={styles.card}
      onClick={() => onClick(post)}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick(post)}
    >
      <div className={styles.imgWrap}>
        <img
          src={post.img}
          srcSet={post.img_2x ? `${post.img} 1x, ${post.img_2x} 2x` : undefined}
          alt={post.title}
          loading="lazy"
        />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          {post.category && <span className={styles.category}>{post.category}</span>}
          {post.category && post.date && <span className={styles.metaSep} aria-hidden="true" />}
          {post.date && <time className={styles.date}>{post.date}</time>}
          {post.autor && (
            <>
              <span className={styles.metaSep} aria-hidden="true" />
              <span className={styles.author}>{post.autor}</span>
            </>
          )}
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.text}</p>
      </div>
      {post.views && (
        <div className={styles.footer}>
          <span aria-hidden="true">👁</span>
          <span>{post.views} views</span>
        </div>
      )}
    </article>
  );
}
