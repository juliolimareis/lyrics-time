<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-start px-4 py-6 sm:p-6 z-50">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <slot name="icon" />
                <!-- <InboxIcon class="h-6 w-6 text-gray-400" aria-hidden="true" /> -->
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-bold text-gray-900">
                  <slot name="title" />
                </p>
                <p class="mt-1 text-sm text-gray-900">
                  <slot name="text" />
                </p>
                <div class="mt-3 flex space-x-7">
                  <slot name="footer" />
                  <!-- <button type="button" class="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Undo</button>
                  <button type="button" class="rounded-md bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Dismiss</button> -->
                </div>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button type="button" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="show = false">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { XMarkIcon, } from "@heroicons/vue/20/solid";

const show = ref(true);

// const emit = defineEmits(["close"]);

defineProps<{
  timeout?: number;
}>();

// function handleClose(){
//   setTimeout(() => {
//     emit("close");
//   }, props.timeout ?? 10000);
// }

// onMounted(() => {
//   handleClose();
// });

</script>
