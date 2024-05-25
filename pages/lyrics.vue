<template>
  <div class="fixed p-2 grid grid-cols-12">
    <div class="col-span-11">
      <NuxtLink to="/edit" title="Add step" class="w-fit text-white focus:outline-none focus:ring-2 focus:ring-opacity-75">
        <PlusIcon class="w-7 h-7 text-green-500"/>
      </NuxtLink>
    </div>

    <div class="col-span-1">
      <NuxtLink to="/" @click="$logout" title="logout" class="w-fit float-right text-white focus:outline-none focus:ring-2 focus:ring-opacity-75">
        <ArrowRightEndOnRectangleIcon class="w-7 h-7 text-green-500"/>
      </NuxtLink>
    </div>

  </div>

  <div class="text-center bg-black text-white w-screen h-screen p-5 pt-14">
    <div v-if="isLoading">
      <Loader class="m-auto" size="md" />
    </div>

    <div v-else class="max-w-sm mx-auto">
      <template v-if="$lyrics.value.length">
        <NuxtLink class="w-full m-auto grid grid-cols-12 mb-5 border-[1px] p-2 rounded-md border-gray-200" v-for="lyric in $lyrics.value" :key="lyric.id" :to="'/lyric/' + lyric.id">
          <p class="col-span-11 text-xl font-bold text-center">
            {{ lyric.title }} - <span class="font-normal">{{ lyric.artist }}</span>
          </p>

          <NuxtLink :to="'/edit?lyric=' + lyric.id" title="Edit" class="col-span-1 text-white focus:outline-none focus:ring-2 focus:ring-opacity-75">
            <PencilSquareIcon class="w-6 h-6 text-green-500"/>
          </NuxtLink>
        </NuxtLink>
      </template>
  
      <template v-else>
        <div class="text-center text-green-500 mt-5 text-lg">
          Sem músicas cadastradas
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlusIcon, PencilSquareIcon, ArrowRightEndOnRectangleIcon} from "@heroicons/vue/24/outline";
import { Firebase } from "~/composables/Firebase"

const context = useNuxtApp();
const isLoading = ref(false);

const firebase = new Firebase();

onMounted(async () => {
  if(!context.$lyrics.value.length){
    context.$lyrics.value = await firebase.getLyrics();
  }
});
</script>
