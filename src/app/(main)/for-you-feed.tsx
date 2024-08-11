"use client";

import Post from "@/components/posts/post";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ForYouFeed() {
  const query = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const response = await fetch("/api/posts/for-you");
      if (!response.ok)
        throw new Error(`Request failed with status code ${response.status}`);

      return response.json();
    },
  });

  if (query.status === "pending")
    return <Loader2 className="mx-auto animate-spin" />;

  if (query.status === "error")
    return (
      <p className="text-center text-destructive">
        An error occured while loading posts.
      </p>
    );
  return (
    <>
      {query.data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
