export type NavItem = {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
};

export const HEADER_MENU: NavItem[] = [
  {
    id: "demos",
    label: "Demos",
    children: [
      { id: "demos-classic", label: "Classic", href: "#" },
      { id: "demos-magazine", label: "Magazine", href: "#" },
      { id: "demos-minimal", label: "Minimal", href: "#" },
    ],
  },
  {
    id: "post",
    label: "Post",
    children: [
      { id: "post-layout-default", label: "Default", href: "#" },
      { id: "post-layout-wide", label: "Wide", href: "#" },
      { id: "share-buttons", label: "Share Buttons", href: "#" },
      { id: "gallery-post", label: "Gallery Post", href: "#" },
      { id: "video-post", label: "Video Post", href: "#" },
    ],
  },
  {
    id: "features",
    label: "Features",
    children: [
      { id: "features-shortcodes", label: "Shortcodes", href: "#" },
      { id: "features-widgets", label: "Widgets", href: "#" },
    ],
  },
  {
    id: "categories",
    label: "Categories",
    children: [
      { id: "cat-lifestyle", label: "Lifestyle", href: "#" },
      { id: "cat-travel", label: "Travel", href: "#" },
      { id: "cat-style", label: "Style", href: "#" },
    ],
  },
  {
    id: "shop",
    label: "Shop",
    children: [
      { id: "shop-catalog", label: "Catalog", href: "#" },
      { id: "shop-cart", label: "Cart", href: "#" },
    ],
  },
  { id: "buy-now", label: "Buy Now", href: "#" },
];
