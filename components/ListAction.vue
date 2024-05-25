<template>
  <div class="col-span-1 flex rounded-md shadow-sm w-full cursor-pointer">
    <div :class="['bg-primary-700', 'flex w-14 flex-shrink-0 items-center justify-center text-sm font-medium text-white rounded-full']"></div>
    <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
      <div class="flex-1 truncate px-4 py-2 text-sm">
        <p class="font-medium text-gray-900">{{ company.socialName }}</p>
        <p class="text-gray-500">{{ company.street }}</p>
      </div>

      <div class="">
        <button type="button" 
          class="m-1"
          :class="button?.class"
        >
          {{ button?.label }} <component v-if="button?.icon" :is="button?.icon" class="h-5 w-5" @click="button.onClick" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { PlusIcon, } from "@heroicons/vue/20/solid";
import { FunctionalComponent, HTMLAttributes, VNodeProps } from "nuxt/dist/app/compat/vue-demi";

defineProps<{
  company: Company;
  title: string;
  subtitle?: string;
  button?: {
    label: string;
    onClick?:() => void;
    class?: Array<string> | string;
    icon?: FunctionalComponent<HTMLAttributes & VNodeProps, {}, any>
  }
}>();

</script>