<template>
  <div class="text-center bg-black text-white w-screen h-screen">
    <div class="fixed ml-2 grid grid-rows-3">
      <NuxtLink to="/edit" title="Add step" class="w-fit mt-2 ml-[-1px] text-white focus:outline-none focus:ring-2 focus:ring-opacity-75">
        <PlusIcon class="w-5 h-5 text-green-500"/>
      </NuxtLink>
    </div>

    <div class="max-w-sm mx-auto">
      <template v-if="lyrics.length">
        <NuxtLink class="w-full m-auto grid grid-cols-12 mb-5 border-[1px] p-2 rounded-md border-gray-200" v-for="lyric in lyrics" :key="lyric.id" :to="'/lyric/' + lyric.id">
          <p class="col-span-11 text-xl font-bold text-center">
            {{ lyric.title }} - <span class="font-normal">{{ lyric.artist }}</span>
          </p>

          <NuxtLink :to="'/edit?lyric=' + lyric.id" title="Edit" class="col-span-1 text-white focus:outline-none focus:ring-2 focus:ring-opacity-75">
            <PencilSquareIcon class="w-4 h-4 text-green-500"/>
          </NuxtLink>
        </NuxtLink>
      </template>
  
      <template v-else>
        <p class="text-center">Carregando letras...</p>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlusIcon, PencilSquareIcon, } from "@heroicons/vue/24/outline";

const api = useLyric();

const lyrics = ref<Lyric[]>([]);

onMounted(() => {
  api.fetchAll()
    .then(res => {
      lyrics.value = res.data;
    });
});
</script>
