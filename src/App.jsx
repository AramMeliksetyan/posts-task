import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { PostsFeed } from "./components/Posts/PostsFeed";
import { DesktopNav } from "./components/HeaderMenu";
import { useStickyNavBar } from "./hooks/useStickyNavBar";

const DATA_URL = "https://cloud.codesupply.co/endpoint/react/data.json";

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
