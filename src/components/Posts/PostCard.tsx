import { Post } from "../../interfaces/posts.interface";
import styles from "./posts.module.css";

interface PostCardProps {
  post: Post;
}

const SIZES =
  "(max-width: 600px) 92vw, (max-width: 900px) calc((min(100vw * 0.8, 1200px) - 32px) / 2), calc((min(100vw * 0.8, 1200px) - 6rem) / 3)";

export function PostCard({ post }: PostCardProps) {
  const src = post.img || post.img_2x;

  let srcSet;
  if (post.img && post.img_2x) {
    srcSet = `${post.img} 360w, ${post.img_2x} 720w`;
  } else if (post.img) {
    srcSet = `${post.img} 360w`;
  }

  return (
    <li className={styles.card}>
      <img
        className={styles.image}
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? SIZES : undefined}
        alt={post.title}
        loading="lazy"
        decoding="async"
      />
      <div className={styles.body}>
        <span className={styles.tag}>{post.tags}</span>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.info}>
          <span className={styles.autor}>{post.autor}</span> · {post.date} ·{" "}
          {post.views} Views
        </p>
        <p className={styles.description}>{post.text}</p>
      </div>
    </li>
  );
}
