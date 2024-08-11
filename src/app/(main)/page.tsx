import PostEditor from "@/components/posts/editors/post-editor";
import Post from "@/components/posts/post";
import TrendsSidebar from "@/components/trends-sidebar";
import prisma from "@/lib/prisma";
import { PostDataInclude } from "@/lib/types";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: PostDataInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <TrendsSidebar />
    </main>
  );
}
