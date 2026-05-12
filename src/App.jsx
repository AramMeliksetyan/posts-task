import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { PostCard } from "./components/Posts/PostCard";
import { PostSkeletonGrid } from "./components/Posts/PostSkeleton";
import postsStyles from "./components/Posts/posts.module.css";
import { DesktopNav } from "./components/HeaderMenu";
import { useStickyNavBar } from "./hooks/useStickyNavBar";

const DATA_URL = "https://cloud.codesupply.co/endpoint/react/data.json";
const SKELETON_COUNT = 6;

function App() {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headerRef = useRef(null);
  const hidden = useStickyNavBar();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(DATA_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!controller.signal.aborted) {
          setPosts(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch (e) {
        if (e.name === "AbortError") return;
        setError("Could not load posts. Please refresh the page.");
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title, p.text, p.tags, p.autor].some((field) =>
        String(field || "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [posts, search]);

  return (
    <div className="App">
      <Header
        search={search}
        setSearch={setSearch}
        onOpenMenu={() => setSidebarOpen(true)}
        headerRef={headerRef}
      />
      <DesktopNav hidden={hidden} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className={postsStyles.feed}>
        {error ? (
          <p className={postsStyles.error} role="alert">
            {error}
          </p>
        ) : (
          <ul className={postsStyles.grid} aria-busy={loading}>
            {loading ? (
              <PostSkeletonGrid count={SKELETON_COUNT} />
            ) : (
              filtered.map((post, index) => (
                <PostCard key={`${post.title}-${index}`} post={post} />
              ))
            )}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
