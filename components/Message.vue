<template>
  <div :class="[`
    p-4
    text-sm
    rounded-sm
    text-center
    text-white
    font-semibold
    transition-all
    ${type === 'success' && 'bg-green-500'}
    ${type === 'warn' && 'bg-orange-400'}
    ${type === 'error' && 'bg-red-400'}
  `]">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  type: "warn" | "error" | "success"
}>();
</script>