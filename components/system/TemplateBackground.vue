<template>
  <div class="flex min-h-full flex-1 flex-col px-6 py-1 md:py-12 lg:px-8" :style="{ height: heightVh, backgroundImage: `linear-gradient(rgba(133,150,197,0.7), rgba(37,26,230,.6)), url(${backgroundUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }">
    <div class="cursor-pointer" @click="$router.push('/')">
      <img class="h-20 m-auto mm:h-28 md:h-[150px]" :src="Logo" alt="Conecta SJB Logo" />
    </div>

    <p class="mt-1 md:mt-3 text-lg tracking-tight text-white text-center">
      <slot name="label"/>
    </p>

    <div class="mt-1 md:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <slot name="content"/>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import backgroundUrl from "~/assets/images/folders/image_background.jpg";
import Logo from "~/assets/images/logo.png";

const heightVh = ref("100vh");

const handleResize = () => {
  let vh = 100;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const heightMin = 807;

  if(width < 268){
    setVh(vh + ((268 - width) / .59));
  }else if(width <= 375){
    setVh(vh + ((576 - width) / 3.0));
  }else if(width <= 576){
    setVh(vh + ((576 - width) / 5));
  }else if(height < 180){
    setVh(vh + ((heightMin - height) / 1.2));
  }else if(height < 250){
    setVh(vh + ((heightMin - height) / 1.7));
  }else if(width === 1080 && height === 810){
    setVh(115);
  }else if(width === 1280 && height === 800){
    setVh(110);
  }else if(height < heightMin){
    setVh(vh + ((heightMin - height) / 2.4));
  }else{
    setVh(100);
  }
};

const setVh = (vh: number) => {
  heightVh.value = `${vh}vh`;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

</script>