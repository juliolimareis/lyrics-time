<template>
  <Loader v-if="isLoading" class="m-auto" :size="loadingSize" />

  <button
    v-else
    :class="[`
      px-3
      py-2
      gap-x-2
      text-sm
      shadow-sm
      rounded-md
      font-semibold
      hover:bg-primary-500
      focus-visible:outline
      focus-visible:outline-2
      focus-visible:outline-offset-2
      items-center
      focus-visible:outline-primary-600
      transition-all
      ${hasIcon && 'inline-flex justify-center'}
      ${isWidthFull && 'w-full'}
      ${secondary ? 'text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' : 'bg-primary-600 text-white'}
      ${params()}
      `, buttonClass
    ]"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  disabled?: boolean;
  secondary?: boolean;
  hasIcon?: boolean;
  isLoading?: boolean;
  isWidthFull?: boolean;
  loadingSize?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  buttonClass?: string;
}>();

const params = () => {
  if (props.disabled){
    return "disabled:opacity-50";
  }

  return "";
};

</script>
