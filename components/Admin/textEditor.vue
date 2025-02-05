<template>
  <div class="edit-container">
    <div class="toolbar">
      <button @click="toggleBold">B</button>
      <button @click="toggleItalic"><i>I</i></button>
      <button @click="toggleStrike"><s>S</s></button>
      <button @click="toggleHighlight">🖍️</button>

      <button @click="toggleHeading(1)">H1</button>
      <button @click="toggleHeading(2)">H2</button>
      <button @click="toggleHeading(3)">H3</button>

      <button @click="toggleBulletList">• List</button>
      <button @click="toggleOrderedList">1. Numbered</button>
    </div>
    <editor-content :editor="editor" class="editor" />
  </div>
</template>

<script setup>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import TextStyle from "@tiptap/extension-text-style";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

const modelValue = defineModel({ type: String, default: "" });
const editor = ref(null);

watch(modelValue, (newValue) => {
  if (editor.value && editor.value.getHTML() !== newValue) {
    editor.value.commands.setContent(newValue, false);
  }
});

const toggleBold = () => editor.value.chain().focus().toggleBold().run();
const toggleItalic = () => editor.value.chain().focus().toggleItalic().run();
const toggleUnderline = () =>
  editor.value.chain().focus().toggleUnderline().run();
const toggleStrike = () => editor.value.chain().focus().toggleStrike().run();
const toggleHighlight = () =>
  editor.value.chain().focus().toggleHighlight().run();
const toggleHeading = (level) =>
  editor.value.chain().focus().toggleHeading({ level }).run();
const toggleBulletList = () =>
  editor.value.chain().focus().toggleBulletList().run();
const toggleOrderedList = () =>
  editor.value.chain().focus().toggleOrderedList().run();

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      TextStyle,
      Bold,
      Italic,
      Strike,
      Highlight,
      Heading,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: modelValue.value,
    onUpdate: () => {
      modelValue.value = editor.value.getHTML();
    },
  });
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style lang="scss" scoped>
.editor-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
}

.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.toolbar button {
  padding: 5px 10px;
  border: none;
  background: #f3f3f3;
  cursor: pointer;
  border-radius: 4px;
}

.toolbar button:hover {
  background: #ddd;
}

::v-deep .editor > .tiptap.ProseMirror {
  min-height: 150px;
  border: 1px solid rgb(196, 196, 196) !important;
}


.tiptap {
  :focus {
    border: 1px solid grey;
  }
  :first-child {
    margin-top: 0;
  }

  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}
</style>