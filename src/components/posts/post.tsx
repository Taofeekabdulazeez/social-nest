import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../user-avatar";
import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/session-provider";
import PostMoreButton from "./post-more-btn";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
          <div>
            <Link
              href={`/users/${post.user.username}`}
              className="block font-semibold hover:underline"
            >
              {post.user.displayName}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="block text-muted-foreground hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>

      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
}
