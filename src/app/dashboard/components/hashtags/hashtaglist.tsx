import api from "@/lib/api/";
import { cn } from "@/lib/utils";
import { MentionOptions } from "@tiptap/extension-mention";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import { SuggestionKeyDownProps, SuggestionProps } from "@tiptap/suggestion";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import tippy, { Instance as TippyInstance } from "tippy.js";
export type HashTagsSuggestion = {
  hashtag: string;
  id: string;
};

const DOM_RECT_FALLBACK: DOMRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON() {
    return {};
  },
};

export const hashtagSuggestionOptions: MentionOptions["suggestion"] = {
  char: "#",
  pluginKey: new PluginKey("hastagsMentions"),

  items: async ({ query }): Promise<HashTagsSuggestion[]> => {
    if (query.length < 1) {
      return [];
    }
    const debouncedCall = AwesomeDebouncePromise(
      (query: string) =>
        api.get<HashTagsSuggestion[]>(
          `hashtag?page=0&page_size=20&query=${query}`,
        ),
      200,
    );
    const res = await debouncedCall(query);

    return res.data;
  },

  render: () => {
    let component: ReactRenderer<MentionRef> | undefined;
    let popup: TippyInstance | undefined;

    return {
      onStart: (props) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: () =>
            props.clientRect?.() ?? DOM_RECT_FALLBACK,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        })[0];
      },

      onUpdate(props) {
        component?.updateProps(props);

        popup?.setProps({
          getReferenceClientRect: () =>
            props.clientRect?.() ?? DOM_RECT_FALLBACK,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup?.hide();
          return true;
        }

        if (!component?.ref) {
          return false;
        }

        return component?.ref.onKeyDown(props);
      },

      onExit() {
        popup?.destroy();
        component?.destroy();

        // Remove references to the old popup and component upon destruction/exit.
        // (This should prevent redundant calls to `popup.destroy()`, which Tippy
        // warns in the console is a sign of a memory leak, as the `suggestion`
        // plugin seems to call `onExit` both when a suggestion menu is closed after
        // a user chooses an option, *and* when the editor itself is destroyed.)
        popup = undefined;
        component = undefined;
      },
    };
  },
};

type MentionRef = {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
};

interface MentionProps extends SuggestionProps {
  items: HashTagsSuggestion[];
}

const MentionList = forwardRef<MentionRef, MentionProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    if (index >= props.items.length) {
      // Make sure we actually have enough items to select the given index. For
      // instance, if a user presses "Enter" when there are no options, the index will
      // be 0 but there won't be any items, so just ignore the callback here
      return;
    }

    const suggestion = props.items[index];

    // Set all of the attributes of our Mention based on the suggestion data. The fields
    // of `suggestion` will depend on whatever data you return from your `items`
    // function in your "suggestion" options handler. We are returning the
    // `MentionSuggestion` type we defined above, which we've indicated via the `items`
    // in `MentionProps`.
    const mentionItem = {
      id: suggestion.id,
      label: suggestion.hashtag,
    };
    props.command(mentionItem);
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length,
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return props.items.length > 0 ? (
    <div className="z-10 flex flex-col gap-1 rounded-sm border border-border bg-zinc-900 p-2">
      {props.items.map((item, index) => (
        <button
          className={cn(
            "min-w-[200px] rounded-sm p-2 text-left hover:bg-zinc-800",
            index === selectedIndex && "rounded-sm bg-zinc-800",
          )}
          key={index}
          onClick={() => selectItem(index)}
        >
          <div className="flex items-center gap-2"># {item.hashtag}</div>
        </button>
      ))}
    </div>
  ) : null;
});
