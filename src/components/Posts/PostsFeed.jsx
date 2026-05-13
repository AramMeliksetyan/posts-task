import { useDeferredValue, useMemo } from "react";
import { PostCard } from "./PostCard";
import { PostSkeletonGrid } from "./PostSkeleton";
import postsStyles from "./posts.module.css";

const SKELETON_COUNT = 6;

export function PostsFeed({ error, loading, posts, search }) {
  const deferredSearch = useDeferredValue(search);
  const isSearchStale = search !== deferredSearch;

  const filtered = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title, p.text, p.tags, p.autor].some((field) =>
        String(field || "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [posts, deferredSearch]);

  const showSkeleton = loading || (!error && isSearchStale);

  return (
    <main className={postsStyles.feed}>
      {error ? (
        <p className={postsStyles.error} role="alert">
          {error}
        </p>
      ) : (
        <ul className={postsStyles.grid} aria-busy={showSkeleton}>
          {showSkeleton ? (
            <PostSkeletonGrid count={SKELETON_COUNT} />
          ) : (
            filtered.map((post, index) => (
              <PostCard key={`${post.title}-${index}`} post={post} />
            ))
          )}
        </ul>
      )}
    </main>
  );
}
