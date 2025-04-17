<template>
  <div>
    <label v-if="label" for="" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <div class="w-full border border-gray-200 rounded-lg bg-gray-50">
      <div class="px-3 py-2 border-b border-gray-200 dark:border-gray-600">
        <div class="flex flex-wrap items-center">
          <div class="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
            <button
              @click="editor.chain().focus().toggleBold().run()"
               id="toggleBoldButton"
              type="button"
              class="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"/>
              </svg>
              <span class="sr-only">Bold</span>
            </button>

            <button
              @click="editor.chain().focus().toggleItalic().run()"
              id="toggleItalicButton"
              type="button"
              class="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"/>
              </svg>
              <span class="sr-only">Italic</span>
            </button>

            <button
              @click="editor.chain().focus().toggleUnderline().run()"
              id="toggleUnderlineButton"
              type="button"
              class="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4"/>
              </svg>
              <span class="sr-only">Underline</span>
            </button>

            <button
              @click="editor.chain().focus().toggleStrike().run()"
              id="toggleStrikeButton"
              type="button"
              class="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477"/>
              </svg>
              <span class="sr-only">Strike</span>
            </button>

            <div class="px-1">
              <span class="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
            </div>

            <button
              @click="editor.chain().focus().toggleBulletList().run()"
              id="toggleListButton"
              type="button"
              class="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
              </svg>
              <span class="sr-only">Toggle list</span>
            </button>
          </div>
        </div>
      </div>

      <div class="px-4 py-2 bg-white rounded-b-lg">
        <EditorContent
          :editor="editor"
          class="block w-full text-gray-800 bg-white border-0 focus:ring-0" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = ref(null)

watch(() => props.modelValue, (val) => {
  const isSame = editor.value.getHTML() === val

  if (isSame) return

  editor.value.commands.setContent(val, false)
})

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [4, 5, 6]
        }
      }),
      Underline,
    ],
    content: props.modelValue,
    onUpdate: () => {
      emit('update:modelValue', editor.value.getHTML())
    },

    editorProps: {
      attributes: {
        class: '[&_ol]:list-decimal [&_ul]:list-disc focus:outline-none min-h-40 mx-2',
      },
    }
  })
})

onBeforeUnmount(() => { editor.value.destroy() })
</script>
