<template>
  <div class="px-4 sm:px-0">
    <h3 class="text-base font-semibold leading-7">{{ title }}</h3>
    <p class="mt-1 max-w-2xl text-sm leading-6">{{ subtitle }}</p>
  </div>

  <div class="mt-6 border-t border-gray-100">
    <dl class="divide-y divide-gray-100">

      <div v-for="item in items" :key="item.title" class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm leading-6 font-bold">{{ item.title }}</dt>
        <dd class="mt-1 flex text-sm leading-6 sm:col-span-2 sm:mt-0">
          <span class="flex-grow">
            <a
              v-if="item.isUrl && item.desc"
              :href="item.desc"
              class="text-primary-700 hover:text-primary-900"
              target="_blank"
            >
              {{ item.desc }}
            </a>

            <div v-else>
              {{ item.desc }}
            </div>
          </span>
          <span class="ml-4 flex-shrink-0">
            <button
              v-if="item?.button" @click="() => item?.button?.click(item.obj)"
              type="button"
              :class="`rounded-md bg-white font-medium text-primary-600 hover:text-primary-500 ${item.button.class}`"
            >
              {{ item.button.label }}
            </button>
          </span>
        </dd>
      </div>

    </dl>
  </div>
</template>

<script lang="ts" setup>
import { PaperClipIcon, } from "@heroicons/vue/20/solid";

export interface ItemList {
  title: string;
  desc: string;
  obj?: any;
  isUrl?: boolean;
  items?: ItemList;
  button?: {
    label: string;
    class: string;
    click: (objRow: any) => void;
  }
}

defineProps<{
  title?: string;
  subtitle?: string;
  items: ItemList[];
}>();
</script>