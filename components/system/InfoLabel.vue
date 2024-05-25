<template>
  <div>
    <div class="text-sm text-gray-600">
      {{ label.toLocaleUpperCase() }}:
    </div>

    <div class="text-gray-800">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
}>();
</script>
