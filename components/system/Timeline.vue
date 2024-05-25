<template>
  <ol class="relative border-s border-gray-400 -dark:border-gray-700">
    <li v-for="timeline in timelines.reverse()" :key="String(timeline.id)" class="mb-10 ms-4">
      <div class="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white -dark:border-gray-900 -dark:bg-gray-700" />

      <div class="min-w-0 flex-1">
        <p>
          <NuxtLink href="#" class="hover:underline text-sm font-semibold text-gray-900 mr-2">
            {{ timeline.userCreated?.name }}
          </NuxtLink>
          <span class="text-sm text-gray-500">
            <a class="hover:underline">{{ timeline.createdAt }}</a>
          </span>
        </p>
      </div>

      <p class="text-base font-normal text-gray-500 -dark:text-gray-400">
        {{ timeline.text }}
      </p>

      <a v-for="file in timeline.files" :key="file.name" :href="file.path" target="_blank" class="mt-4 mr-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 -dark:bg-gray-800 -dark:text-gray-400 -dark:border-gray-600 -dark:hover:text-white -dark:hover:bg-gray-700 -dark:focus:ring-gray-700">
        {{ file.name }}&ensp;<ArrowDownTrayIcon class="w-4 h-4 " />
      </a>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import { ArrowDownTrayIcon, } from "@heroicons/vue/24/solid";
import Timeline from "~/composables/domains/Timeline";

defineProps<{ timelines: Timeline[] }>();

</script>
