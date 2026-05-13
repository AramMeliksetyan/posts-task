import { RefObject, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { PostsFeed } from "./components/Posts/PostsFeed";
import { DesktopNav } from "./components/HeaderMenu";
import { useStickyNavBar } from "./hooks/useStickyNavBar";
import { Post } from "./interfaces/posts.interface";

const DATA_URL = "https://cloud.codesupply.co/endpoint/react/data.json";

function App() {
  const [search, setSearch] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>("");
  const headerRef = useRef<HTMLDivElement | null>(null);
  const hidden = useStickyNavBar();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    (async () => {
      try {
        const res = await fetch(DATA_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!controller.signal.aborted) {
          setPosts(data);
          setLoading(false);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          if (e.name === "AbortError") return;
          setError("Could not load posts. Please refresh the page.");
          setLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <div className="App">
      <Header
        search={search}
        setSearch={setSearch}
        onOpenMenu={() => setSidebarOpen(true)}
        headerRef={headerRef as RefObject<HTMLDivElement>}
      />
      <DesktopNav hidden={hidden} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <PostsFeed
        error={error}
        loading={loading}
        posts={posts}
        search={search}
      />
    </div>
  );
}

export default App;
