"use client";
import React, { useEffect } from "react";
import Placeholder from "@tiptap/extension-placeholder";

import {
  useEditor,
  EditorContent,
  textblockTypeInputRule,
} from "@tiptap/react";
import Mention from "@tiptap/extension-mention";
import Heading from "@tiptap/extension-heading";
import CharacterCount from "@tiptap/extension-character-count";
import { mentionsUsersSuggestionOptions } from "./mention/mentionlist";
import { hashtagSuggestionOptions } from "./hashtags/hashtaglist";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";

const TweetInput = ({
  onChange,
  success,
  emoji,
  mode,
}: {
  onChange: (tweet: string) => void;
  success: boolean;
  emoji: string;
  mode: string;
}) => {
  const limit = 300;
  const editor = useEditor({
    onUpdate(props) {
      onChange(JSON.stringify(props.editor.getText()));
    },

    editorProps: {
      attributes: {
        class:
          "w-full p-2 rounded-sm focus-visible:ring-0 focus-visible:outline-none min-h-[100px]",
      },
    },
    extensions: [
      Document.extend({}),
      Text,
      Heading.extend({
        addInputRules() {
          return this.options.levels.map((level: number) => {
            return textblockTypeInputRule({
              find: new RegExp(`^(#{1,${level}}) $`),
              type: this.type,
              getAttributes: {
                level,
              },
            });
          });
        },
      }),

      CharacterCount.configure({
        limit,
        mode: "textSize",
      }),
      Placeholder.configure({
        placeholder: mode === "poll" ? "Ask a question" : "What's happening?",

        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-2 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
      }),
      Mention.extend({
        name: "userMention",
      }).configure({
        deleteTriggerWithBackspace: true,

        HTMLAttributes: {
          class: "text-primary",
        },

        suggestion: mentionsUsersSuggestionOptions,
      }),
      Mention.extend({
        name: "hastagsMentions",
      }).configure({
        HTMLAttributes: {
          class: "text-primary ",
        },

        suggestion: hashtagSuggestionOptions,
      }),
    ],
    content: success ? "" : undefined,
  });

  useEffect(() => {
    if (emoji) {
      editor?.commands.insertContent(emoji);
    }
  }, [emoji, editor?.commands]);

  useEffect(() => {
    if (success) {
      editor?.commands.clearContent();
    }
  }, [success, editor?.commands]);

  return (
    <div className="flex w-full flex-col items-end">
      <EditorContent className="w-full" editor={editor} />
      {editor && (
        <div className="mt-1 text-sm text-gray-500">
          {editor.storage.characterCount.characters()} / {limit} characters
        </div>
      )}
    </div>
  );
};

export default TweetInput;
