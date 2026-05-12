import { useState, useEffect, useRef } from "react";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import DesktopNav from "./components/DesktopNav/DesktopNav";
import mainStyles from "./components/Main/Main.module.css";
import SkeletonCard from "./components/SkeletonCard/SkeletonCard";
import PostCard from "./components/PostCard/PostCard";
import PostPopup from "./components/PostPopup/PostPopup";
import MobileNav, { NAV_ITEMS } from "./components/MobileNav/MobileNav";
import useStickyNav from "./hooks/useStickyNav";

const DATA_URL = "https://cloud.codesupply.co/endpoint/react/data.json";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activePost, setActivePost] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef(null);
  const navHidden = useStickyNav(headerRef);

  useEffect(() => {
    const controller = new AbortController();

    fetch(DATA_URL, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError("Не удалось загрузить посты. Попробуйте обновить страницу.");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const query = search.trim().toLowerCase();
  const filtered = query
    ? posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(query) ||
          p.text?.toLowerCase().includes(query),
      )
    : posts;

  return (
    <>
      <SiteHeader
        headerRef={headerRef}
        mobileOpen={mobileOpen}
        onOpenMobileNav={() => setMobileOpen(true)}
        search={search}
        onSearchChange={setSearch}
      />

      <DesktopNav hidden={navHidden} items={NAV_ITEMS} />

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className={mainStyles.main}>
        {error ? (
          <p className={mainStyles.error}>{error}</p>
        ) : loading ? (
          <div className={mainStyles.postsGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className={mainStyles.postsGrid}>
            {filtered.length === 0 ? (
              <div className={mainStyles.noResults}>
                <p>Ничего не найдено</p>
                <p>Попробуйте другой запрос</p>
              </div>
            ) : (
              filtered.map((post, i) => (
                <PostCard
                  key={post.id ?? i}
                  post={post}
                  onClick={setActivePost}
                />
              ))
            )}
          </div>
        )}
      </main>

      {activePost && (
        <PostPopup post={activePost} onClose={() => setActivePost(null)} />
      )}
    </>
  );
}
