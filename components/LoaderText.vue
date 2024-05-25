<template>
  <div id="loader-text" class="m-auto w-fit" name="loader-text">
    <Loader class="m-auto" :size="'md'" />
    <p class="text-center text-lg mt-5 text-green-500">
      <slot />
    </p>
  </div>
</template>
