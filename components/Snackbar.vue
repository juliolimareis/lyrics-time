<template>
  <Notify @close="$emit('close')">
    <template #icon>
      <ExclamationCircleIcon v-if="type === 'error'" class="w-6 h-6 mr-4 text-red-500" />
      <ExclamationTriangleIcon v-else-if="type === 'warning'" class="w-6 h-6 mr-4 text-yellow-500" />
      <CheckCircleIcon v-else class="w-6 h-6 mr-4 text-green-500" />
    </template>

    <template #title>
      {{ title }}
    </template>
    <template #text>
      {{ text }}
    </template>
  </Notify>
</template>

<script lang="ts" setup>
import { ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon, } from "@heroicons/vue/24/outline";

export interface SnackbarProps {
  type: "error" | "warning" | "success";
  title?: string;
  text?: string;
}

defineEmits(["close"]);

defineProps<SnackbarProps>();

</script>
