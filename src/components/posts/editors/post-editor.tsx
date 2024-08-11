"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { submitPost } from "../actions";
import { useSession } from "@/app/(main)/session-provider";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import "./styles.css";

export default function PostEditor() {
  const { user } = useSession();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bold: false, italic: false }),
      Placeholder.configure({ placeholder: "What's on your mind?" }),
    ],
  });

  const input = editor?.getText({ blockSeparator: "\n" }) || "";

  const submit = async () => {
    await submitPost(input);
    editor?.commands.clearContent();
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl border-0 bg-background px-5 py-3 outline-0"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={submit} disabled={!input.trim()} className="min-w-20">
          Post
        </Button>
      </div>
    </div>
  );
}
