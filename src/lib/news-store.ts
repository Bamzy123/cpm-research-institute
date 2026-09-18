export type ManagedNewsPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  featured: boolean;
  status: "draft" | "published";
  updatedAt: string;
};

const STORAGE_KEY = "cpm-managed-news-posts";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getManagedNewsPosts(): ManagedNewsPost[] {
  if (!canUseStorage()) return [];

  try {
    const storedPosts = window.localStorage.getItem(STORAGE_KEY);
    if (!storedPosts) return [];

    const parsedPosts = JSON.parse(storedPosts) as unknown;
    return Array.isArray(parsedPosts) ? (parsedPosts as ManagedNewsPost[]) : [];
  } catch {
    return [];
  }
}

export function saveManagedNewsPosts(posts: ManagedNewsPost[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function getPublishedManagedNewsPosts() {
  return getManagedNewsPosts().filter((post) => post.status === "published");
}
