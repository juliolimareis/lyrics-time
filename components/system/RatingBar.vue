<template>
  <div class="flex">
    <div class="text-sm text-gray-600 w-32">{{ label }}</div>

    <div class="w-36 bg-gray-300 rounded-sm h-4 mt-1 -ml-3 mr-3">
      <div v-if="value" class="bg-orange-500 text-xs h-4 font-medium text-blue-100 text-center p-0.5 leading-none rounded-sm" :style="{ width: String(value).concat('%') }"></div>
    </div>

    <div class="text-sm text-gray-600 w-10">
      {{ value ?? 0 }}%
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
  value?: number | string;
}>();
</script>