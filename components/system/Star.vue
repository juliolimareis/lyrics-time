<template>
  <StarIcon v-if="isActive"/>
  <div v-else>
    <StarOutline class="text-gray-400"/>
  </div>
  </template>

<script lang="ts" setup>
import { StarIcon, } from "@heroicons/vue/24/solid";

defineProps<{
  isActive?: boolean;
}>();
</script>
